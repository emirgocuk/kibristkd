import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { AppDataSource } from "./data-source.js";
import { router as authRouter } from "./router/authRoute.js";
import { router as makaleRouter } from "./router/makaleRouter.js";
console.log("Veritabanı bağlantısı denetleniyor...");
AppDataSource.initialize()
    .then(() => {
    console.log("Veritabanı bağlantısı başarıyla kuruldu!");
    const app = express();
    app.use(cors({ origin: true, credentials: true }));
    app.use(express.json());
    app.use((err, _req, res, next) => {
        if (err?.type === "entity.parse.failed") {
            return res.status(400).json({ success: false, message: "Geçersiz JSON gövdesi" });
        }
        next(err);
    });
    app.get("/api/health", (_req, res) => res.json({ ok: true }));
    app.use("/api/auth", authRouter);
    app.use("/api/makaleler", makaleRouter);
    app.get("/api/settings/content", (_req, res) => {
        return res.json({
            success: true,
            data: {
                heroTitle: "Kıbrıs Türk Kültür Derneği",
                heroSubtitle: "Kültür, tarih ve haberler",
                banners: []
            }
        });
    });
    const port = Number(process.env.PORT || 5000);
    app.listen(port, () => {
        console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
    });
})
    .catch((err) => {
    console.error("Veritabanı bağlantısı sırasında hata oluştu:", err);
});
//# sourceMappingURL=server.js.map