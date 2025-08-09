import { Router } from 'express';
import { AppDataSource } from '../data-source.js';
import { User, UserRole } from '../entities/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { protect } from '../middleware/authMiddleware.js';
export const router = Router();
const userRepository = AppDataSource.getRepository(User);
// Kullanıcı Kayıt
router.post('/register', async (req, res) => {
    const { name, password, email } = req.body;
    if (!name || !password || !email) {
        return res.status(400).json({ message: 'Tüm alanlar gereklidir.' });
    }
    try {
        const existingUser = await userRepository.findOne({ where: [{ name }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Bu kullanıcı adı veya e-posta zaten kullanılıyor.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User();
        newUser.name = name;
        newUser.password = hashedPassword;
        newUser.email = email;
        newUser.role = UserRole.YAZAR;
        await userRepository.save(newUser);
        res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Sunucu hatası', error });
    }
});
// Kullanıcı Giriş
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'E-posta ve şifre gereklidir.' });
    }
    try {
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Geçersiz kimlik bilgileri.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Geçersiz kimlik bilgileri.' });
        }
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error('JWT_SECRET ortam değişkeni tanımlanmamış!');
        }
        const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, secretKey, {
            expiresIn: '1h',
        });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: 'Sunucu hatası', error });
    }
});
// Mevcut Kullanıcı Bilgisini Getir
router.get('/me', protect, (req, res) => {
    res.json(req.user);
});
