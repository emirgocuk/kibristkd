import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AppDataSource } from "../data-source.js";
import { User } from "../entities/User.js";

export const router = Router();

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "E-posta ve şifre zorunludur" });
    }

    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, message: "Geçersiz kimlik bilgileri" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ success: false, message: "Geçersiz kimlik bilgileri" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET missing");
      return res.status(500).json({ success: false, message: "Sunucu yapılandırma hatası (JWT)" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role };
    return res.json({ success: true, data: { token, user: safeUser } });
  } catch (e) {
    console.error("LOGIN ERROR:", e);
    return res.status(500).json({ success: false, message: "Sunucu hatası" });
  }
});

// ME
router.get("/me", async (req: any, res) => {
  try {
    const auth = (req.headers.authorization || "").split(" ");
    const token = auth[0] === "Bearer" ? auth[1] : null;
    if (!token) return res.status(401).json({ success: false, message: "Token bulunamadı" });

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ success: false, message: "Sunucu yapılandırma hatası (JWT)" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { id: decoded.id } });
    if (!user) return res.status(401).json({ success: false, message: "Token geçersiz" });

    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role };
    return res.json({ success: true, data: safeUser });
  } catch (e) {
    console.error("ME ERROR:", e);
    return res.status(401).json({ success: false, message: "Token geçersiz" });
  }
});

// TEMP: Admin seed (sadece ALLOW_SEED=true iken çalışır)
router.post("/seed-admin", async (req, res) => {
  try {
    if (process.env.ALLOW_SEED !== "true") {
      return res.status(403).json({ success: false, message: "Seed kapalı" });
    }
    const email = "emrggck@gmail.com";
    const repo = AppDataSource.getRepository(User);
    const exist = await repo.findOne({ where: { email } });
    if (exist) return res.json({ success: true, message: "Zaten var", data: { id: exist.id } });

    const password = await bcrypt.hash("Admin123!", 10);
    const user = repo.create({ email, password, name: "Admin", role: "admin" });
    await repo.save(user);
    return res.json({ success: true, data: { id: user.id, email: user.email } });
  } catch (e) {
    console.error("SEED ERROR:", e);
    return res.status(500).json({ success: false, message: "Seed hatası" });
  }
});
