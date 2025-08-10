import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source.js";
import { User } from "../entities/User.js";
export const requireAuth = async (req, res, next) => {
    try {
        const header = req.headers.authorization || "";
        const token = header.startsWith("Bearer ") ? header.slice(7) : null;
        if (!token)
            return res.status(401).json({ success: false, message: "Token bulunamadı" });
        const payload = jwt.verify(token, process.env.JWT_SECRET || "secret");
        const repo = AppDataSource.getRepository(User);
        const user = await repo.findOne({ where: { id: payload.id } });
        if (!user)
            return res.status(401).json({ success: false, message: "Geçersiz token" });
        req.user = user;
        next();
    }
    catch {
        return res.status(401).json({ success: false, message: "Yetkisiz" });
    }
};
export const requireAdmin = (req, res, next) => {
    if ((req.user?.role || "").toLowerCase() !== "admin") {
        return res.status(403).json({ success: false, message: "Yetkiniz yok" });
    }
    next();
};
//# sourceMappingURL=authMiddleware.js.map