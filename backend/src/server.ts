// backend/src/server.ts
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "./data-source.js";
import { router as authRouter } from "./router/authRoute.js";
import { router as makaleRouter } from "./router/makaleRouter.js";
import { router as authorRouter } from "./router/authorRouter.js";
import { router as sliderRouter } from "./router/sliderRouter.js";
import { router as announcementRouter } from "./router/announcementRouter.js";

console.log("Veritabanı bağlantısı denetleniyor...");

AppDataSource.initialize()
  .then(() => {
    console.log("Veritabanı bağlantısı başarıyla kuruldu!");

    const app = express();

    // JSON body
    app.use(express.json());

    // Geçersiz JSON geldiğinde HTML yerine JSON döndür
    app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
      if (err?.type === "entity.parse.failed") {
        return res.status(400).json({ success: false, message: "Geçersiz JSON gövdesi" });
      }
      next(err);
    });

    // CORS
    app.use(cors({ origin: true, credentials: true }));

    // Sağlık kontrolü
    app.get("/api/health", (_req, res) => res.json({ ok: true }));

    // API rotaları
    app.use("/api/auth", authRouter);
    app.use("/api/makaleler", makaleRouter);
    app.use("/api/authors", authorRouter);
    app.use("/api/slider", sliderRouter);
    app.use("/api/duyurular", announcementRouter);

    // Global içerik (stub)
    app.get("/api/settings/content", (_req, res) => {
      return res.json({
        success: true,
        data: {
          heroTitle: "Kıbrıs Türk Kültür Derneği",
          heroSubtitle: "Kültür, tarih ve haberler",
          banners: [],
        },
      });
    });

    // Basit 404
    app.use("/api", (_req, res) =>
      res.status(404).json({ success: false, message: "Bulunamadı" })
    );

    const port = Number(process.env.PORT || 5000);
    app.listen(port, () => {
      console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
    });
  })
  .catch((err) => {
    console.error("Veritabanı bağlantısı sırasında hata oluştu:", err);
  });
