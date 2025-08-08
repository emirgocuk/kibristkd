import { Router } from "express";
import { AppDataSource } from "../server.js";
import { User, UserRole } from "../entities/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const router = Router();
// YENİ EKLENEN KULLANICI KAYIT ROTASI
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Tüm alanlar (name, email, password) zorunludur." });
    }
    try {
        // Kullanıcının zaten var olup olmadığını kontrol et
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "Bu e-posta adresi zaten kullanılıyor." });
        }
        // Şifreyi hash'le
        const hashedPassword = await bcrypt.hash(password, 10);
        // Yeni kullanıcı oluştur
        const newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.password = hashedPassword;
        newUser.role = UserRole.ADMIN;
        await userRepository.save(newUser);
        res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu!", user: { id: newUser.id, name: newUser.name, email: newUser.email } });
    }
    catch (error) {
        console.error("Kullanıcı oluşturulurken sunucu hatası:", error);
        res.status(500).json({ message: "Sunucuda bir hata oluştu." });
    }
});
// POST /api/login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    if (!email || !password) {
        return res.status(400).json({ message: "E-posta ve şifre alanları zorunludur." });
    }
    try {
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Geçersiz e-posta veya şifre." });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Geçersiz e-posta veya şifre." });
        }
        const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, process.env.JWT_SECRET || 'varsayilan_gizli_anahtar', { expiresIn: '8h' });
        res.json({ message: "Giriş başarılı!", token });
    }
    catch (error) {
        console.error("Giriş sırasında sunucu hatası:", error);
        res.status(500).json({ message: "Sunucuda bir hata oluştu." });
    }
});
