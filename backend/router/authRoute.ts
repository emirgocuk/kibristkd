import { Router } from "express";
import { AppDataSource } from "../data-source.js";
import { User } from "../entities/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { requireAuth, AuthRequest } from "../middleware/authMiddleware.js";

export const router = Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Kullanıcı bulunamadı" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Şifre hatalı" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });

    return res.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, role: user.role }
    });
  } catch {
    return res.status(500).json({ success: false, message: "Sunucu hatası" });
  }
});

// GET /api/auth/me
router.get("/me", requireAuth, async (req: AuthRequest, res) => {
  return res.json({ success: true, user: req.user });
});
