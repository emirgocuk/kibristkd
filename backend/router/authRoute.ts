import { Router, Request, Response } from "express";
import { AppDataSource } from "../server.js";
import { User } from "../entities/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const router = Router();

// POST /api/login
router.post("/login", async (req: Request, res: Response) => {
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

        const token = jwt.sign(
            { id: user.id, name: user.name, role: user.role },
            process.env.JWT_SECRET || 'varsayilan_gizli_anahtar',
            { expiresIn: '8h' }
        );

        res.json({ message: "Giriş başarılı!", token });

    } catch (error) {
        console.error("Giriş sırasında sunucu hatası:", error);
        res.status(500).json({ message: "Sunucuda bir hata oluştu." });
    }
});
