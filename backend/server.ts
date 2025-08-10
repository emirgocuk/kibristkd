import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source.js";
import { router as authRouter } from "./src/router/authRoute.js";
import { router as makaleRouter } from "./src/router/makaleRouter.js";
import { router as settingsRouter } from "./src/router/settingsRouter.js";

console.log("Veritabanı bağlantısı denetleniyor...");

AppDataSource.initialize()
  .then(() => {
    console.log("Veritabanı bağlantısı başarıyla kuruldu!");
    const app = express();
    app.use(express.json());

    app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: false,
      })
    );

    app.use("/api/auth", authRouter);
    app.use("/api/makaleler", makaleRouter);
    app.use("/api/settings", settingsRouter);

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
    });
  })
  .catch((err) => {
    console.error("Veritabanı bağlantısı sırasında hata oluştu:", err);
  });
