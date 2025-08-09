import { Router } from 'express';
import { AppDataSource } from '../data-source.js';
import { User, UserRole } from '../entities/user.js';
import { protect } from '../middleware/authMiddleware.js';
export const router = Router();
const userRepository = AppDataSource.getRepository(User);
// Tüm yazarları listele (Admin yetkisi gerekir)
router.get('/', protect, async (req, res) => {
    const role = req.user?.role;
    if (role !== UserRole.ADMIN && role !== UserRole.SUPERADMIN) {
        return res.status(403).json({ message: 'Bu bilgilere erişim yetkiniz yok.' });
    }
    try {
        const yazarlar = await userRepository.find({
            where: { role: UserRole.YAZAR },
            select: ["id", "name", "email", "role"]
        });
        res.json(yazarlar);
    }
    catch (error) {
        res.status(500).json({ message: 'Yazarlar listelenirken bir hata oluştu.', error });
    }
});
