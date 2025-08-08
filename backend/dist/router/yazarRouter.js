import { Router } from "express";
import { AppDataSource } from "../server.js";
import { User } from "../entities/user.js";
export const router = Router();
// YENİ: VERİTABANI TEST ENDPOINT'İ
router.get("/test-db", async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        console.log("Veritabanından çekilen kullanıcılar:", users);
        res.json({
            message: "Veritabanı bağlantısı ve sorgulama başarılı!",
            data: users,
        });
    }
    catch (error) {
        console.error("Veritabanı testi sırasında hata oluştu:", error);
        res.status(500).json({
            message: "Veritabanına bağlanırken veya sorgulama yaparken bir hata oluştu.",
            error: error.message,
        });
    }
});
