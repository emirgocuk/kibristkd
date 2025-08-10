import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AppDataSource } from "../data-source.js";
import { User } from "../entities/User.js";
export const router = Router();
/**
 * SEED — .env ALLOW_SEED=true ise tek seferlik admin oluşturur
 * ADMIN_EMAIL ve ADMIN_PASSWORD varsa onları kullanır; yoksa varsayılanlar.
 */
router.post("/seed-admin", async (_req, res) => {
    if ((process.env.ALLOW_SEED || "").toLowerCase() !== "true") {
        return res.status(403).json({ success: false, message: "Seed kapalı" });
    }
    const email = (process.env.ADMIN_EMAIL || "admin@example.com").toLowerCase().trim();
    const plain = process.env.ADMIN_PASSWORD || "admin123";
    const repo = AppDataSource.getRepository(User);
    const exists = await repo.findOne({ where: { email } });
    if (exists) {
        return res.json({ success: true, data: { id: exists.id, email: exists.email } });
    }
    const passwordHash = await bcrypt.hash(plain, 10);
    const u = repo.create({
        name: "Admin",
        email,
        role: "admin",
        // Not: password alanı HASH saklar
        password: passwordHash,
    });
    await repo.save(u);
    return res.status(201).json({ success: true, data: { id: u.id, email: u.email } });
});
/**
 * LOGIN — bcrypt ile doğrula.
 * Eğer DB’deki password düz metinse (eski kayıt), doğru girişte otomatik
 * bcrypt hash’e yükselt ve kaydet.
 */
router.post("/login", async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "E-posta ve şifre zorunludur" });
    }
    const repo = AppDataSource.getRepository(User);
    const u = await repo.findOne({ where: { email: String(email).toLowerCase().trim() } });
    if (!u) {
        return res.status(401).json({ success: false, message: "Geçersiz kimlik" });
    }
    const stored = u.password || "";
    let ok = false;
    if (stored.startsWith("$2a$") || stored.startsWith("$2b$") || stored.startsWith("$2y$")) {
        // Zaten bcrypt hash
        ok = await bcrypt.compare(String(password), stored);
    }
    else {
        // Eski düz-metinse, düz karşılaştır; doğruysa otomatik hash'e yükselt
        if (String(password) === stored) {
            ok = true;
            try {
                u.password = await bcrypt.hash(String(password), 10);
                await repo.save(u);
            }
            catch { }
        }
        else {
            ok = false;
        }
    }
    if (!ok) {
        return res.status(401).json({ success: false, message: "Geçersiz kimlik" });
    }
    const token = jwt.sign({ id: u.id }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });
    return res.json({
        success: true,
        data: {
            token,
            user: { id: u.id, name: u.name, email: u.email, role: u.role },
        },
    });
});
//# sourceMappingURL=authRoute.js.map