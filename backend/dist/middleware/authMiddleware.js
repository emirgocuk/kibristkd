import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source.js";
import { User } from "../entities/User.js";
export const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Token bulunamadı" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOneBy({ id: decoded.id });
        if (!user) {
            return res.status(401).json({ success: false, message: "Kullanıcı bulunamadı" });
        }
        req.user = user;
        next();
    }
    catch (err) {
        if (err?.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Oturum süresi doldu" });
        }
        return res.status(401).json({ success: false, message: "Token geçersiz" });
    }
};
export const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Admin yetkisi gerekli" });
    }
    next();
};
