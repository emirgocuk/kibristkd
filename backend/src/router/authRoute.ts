import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source.js";
import { User } from "../entities/User.js";

export const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (String(process.env.ALLOW_SEED).toLowerCase() === "true") {
      const repo = AppDataSource.getRepository(User);
      let admin = await repo.findOne({ where: { email: "admin@example.com" } });
      if (!admin) {
        const hash = await bcrypt.hash("Admin123!", 10);
        admin = repo.create({ name: "Admin", email: "admin@example.com", role: "admin", password: hash });
        await repo.save(admin);
      }
      if (!email || !password) {
        return res.json({ success: true, data: { id: admin.id, email: admin.email } });
      }
    }

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "E-posta ve şifre zorunludur" });
    }

    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { email } });
    if (!user) return res.status(401).json({ success: false, message: "Geçersiz bilgiler" });

    const ok = await bcrypt.compare(password, user.password || "");
    if (!ok) return res.status(401).json({ success: false, message: "Geçersiz bilgiler" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });
    return res.json({
      success: true,
      data: { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } }
    });
  } catch {
    return res.status(500).json({ success: false, message: "Sunucu hatası" });
  }
});

router.get("/me", async (req, res) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ success: false, message: "Token bulunamadı" });

    const payload = jwt.verify(token, process.env.JWT_SECRET || "secret") as { id: number };
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { id: payload.id } });
    if (!user) return res.status(401).json({ success: false, message: "Geçersiz token" });

    return res.json({ success: true, data: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch {
    return res.status(401).json({ success: false, message: "Yetkisiz" });
  }
});
