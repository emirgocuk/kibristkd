import { Router } from 'express';
import { AppDataSource } from '../data-source.js';
import { Makale, MakaleStatus } from '../entities/Makale.js';
import { User, UserRole } from '../entities/user.js';
import { protect } from '../middleware/authMiddleware.js';
import { Setting } from '../entities/Setting.js';
export const router = Router();
const makaleRepository = AppDataSource.getRepository(Makale);
const userRepository = AppDataSource.getRepository(User);
const settingRepository = AppDataSource.getRepository(Setting);
// --- YENİ MAKALE OLUŞTURMA ---
// Sadece giriş yapmış kullanıcılar (yazarlar veya adminler) yeni makale oluşturabilir.
// Oluşturulan her yeni makalenin statüsü varsayılan olarak "pending" (onay bekliyor) olur.
router.post('/', protect, async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user?.id;
    const setting = await settingRepository.findOne({ where: { id: 1 } });
    if (setting && !setting.allowAppPublishing) {
        return res.status(403).json({ message: 'Makale yayınlama şu anda devre dışı.' });
    }
    if (!title || !content) {
        return res.status(400).json({ message: 'Başlık ve içerik alanları zorunludur.' });
    }
    try {
        const user = await userRepository.findOneBy({ id: userId });
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
        }
        const yeniMakale = new Makale();
        yeniMakale.title = title;
        yeniMakale.content = content;
        yeniMakale.author = user;
        yeniMakale.status = MakaleStatus.PENDING;
        await makaleRepository.save(yeniMakale);
        res.status(201).json(yeniMakale);
    }
    catch (error) {
        res.status(500).json({ message: 'Makale oluşturulurken bir hata oluştu.', error });
    }
});
// --- TÜM ONAYLANMIŞ MAKALELERİ GETİRME ---
// Herkes (giriş yapmamış kullanıcılar dahil) onaylanmış makaleleri görebilir.
router.get('/', async (req, res) => {
    try {
        const makaleler = await makaleRepository.find({
            where: { status: MakaleStatus.APPROVED },
            relations: ['author'],
        });
        res.json(makaleler);
    }
    catch (error) {
        res.status(500).json({ message: 'Makaleler getirilirken bir hata oluştu.', error });
    }
});
// --- ADMİN İÇİN: ONAY BEKLEYEN MAKALELERİ GETİRME ---
// Sadece admin rolündeki kullanıcılar bu endpoint'e erişebilir.
router.get('/pending', protect, async (req, res) => {
    const role = req.user?.role;
    if (role !== UserRole.ADMIN && role !== UserRole.SUPERADMIN) {
        return res.status(403).json({ message: 'Bu işleme yetkiniz yok.' });
    }
    try {
        const makaleler = await makaleRepository.find({
            where: { status: MakaleStatus.PENDING },
            relations: ['author'],
        });
        res.json(makaleler);
    }
    catch (error) {
        res.status(500).json({ message: 'Onay bekleyen makaleler getirilirken bir hata oluştu.', error });
    }
});
// --- ADMİN İÇİN: MAKALE STATÜSÜNÜ GÜNCELLEME (ONAYLAMA/REDDETME) ---
// Sadece adminler bir makalenin statüsünü değiştirebilir.
router.put('/:id/status', protect, async (req, res) => {
    const role = req.user?.role;
    if (role !== UserRole.ADMIN && role !== UserRole.SUPERADMIN) {
        return res.status(403).json({ message: 'Bu işleme yetkiniz yok.' });
    }
    const { status } = req.body;
    if (!status || !['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Geçersiz statü. Sadece "approved" veya "rejected" olabilir.' });
    }
    try {
        const makale = await makaleRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!makale) {
            return res.status(404).json({ message: 'Makale bulunamadı.' });
        }
        makale.status = status;
        await makaleRepository.save(makale);
        res.json(makale);
    }
    catch (error) {
        res.status(500).json({ message: 'Makale statüsü güncellenirken bir hata oluştu.', error });
    }
});
// --- MAKALE SİLME ---
// Makaleyi sadece yazarı veya bir admin silebilir.
router.delete('/:id', protect, async (req, res) => {
    const makaleId = parseInt(req.params.id);
    const userId = req.user?.id;
    const userRole = req.user?.role;
    try {
        const makale = await makaleRepository.findOne({
            where: { id: makaleId },
            relations: ['author']
        });
        if (!makale) {
            return res.status(404).json({ message: 'Makale bulunamadı.' });
        }
        // Kullanıcı admin değilse VE makalenin yazarı değilse, silme işlemini engelle
        if (userRole !== UserRole.ADMIN && userRole !== UserRole.SUPERADMIN && makale.author.id !== userId) {
            return res.status(403).json({ message: 'Bu makaleyi silme yetkiniz yok.' });
        }
        await makaleRepository.remove(makale);
        res.status(200).json({ message: 'Makale başarıyla silindi.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Makale silinirken bir hata oluştu.', error });
    }
});
export default router;
