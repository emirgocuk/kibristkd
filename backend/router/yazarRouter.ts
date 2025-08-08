import { Router } from "express";
import { AppDataSource } from "../server.js";
import { User, UserRole } from "../entities/user.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import bcrypt from 'bcryptjs';

export const router = Router();


// --- YAZAR (KULLANICI) YÖNETİMİ ---

// GET /api/yazarlar -> Tüm kullanıcıları listele
// Sadece SUPERADMIN ve ADMIN erişebilir.
router.get('/yazarlar', protect, authorize(UserRole.SUPERADMIN, UserRole.ADMIN), async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find({
            select: ["id", "name", "email", "role", "createdAt"]
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

// YENİ EKLENEN: POST /api/yazarlar -> Yeni bir kullanıcı (yazar) oluştur
// Sadece SUPERADMIN ve ADMIN erişebilir.
router.post('/yazarlar', protect, authorize(UserRole.SUPERADMIN, UserRole.ADMIN), async (req, res) => {
    const { name, email, password, role } = req.body;
    const userRepository = AppDataSource.getRepository(User);

    // Gerekli alanlar kontrol ediliyor
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Tüm alanlar (name, email, password, role) zorunludur.' });
    }

    // Admin'in superadmin oluşturmasını engelle
    const requesterRole = (req as any).user?.role;
    if (requesterRole === UserRole.ADMIN && role === UserRole.SUPERADMIN) {
        return res.status(403).json({ message: 'Adminler, superadmin rolünde kullanıcı oluşturamaz.' });
    }

    try {
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Bu e-posta adresi zaten kullanılıyor.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = userRepository.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await userRepository.save(newUser);
        // Güvenlik için şifreyi yanıtta geri gönderme
        const { password: _, ...userResponse } = newUser;
        res.status(201).json(userResponse);

    } catch (error) {
        console.error("Kullanıcı oluşturulurken hata:", error);
        res.status(500).json({ message: 'Sunucuda bir hata oluştu.' });
    }
});
// DELETE /api/yazarlar/:id -> Bir kullanıcıyı sil
// Sadece SUPERADMIN erişebilir.
router.delete('/yazarlar/:id', protect, authorize(UserRole.SUPERADMIN), async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const userToRemove = await userRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!userToRemove) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
        }
        await userRepository.remove(userToRemove);
        res.json({ message: 'Kullanıcı başarıyla silindi.' });
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});
