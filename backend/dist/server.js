import express from 'express';
import { AppDataSource } from './data-source.js';
import { router as authRouter } from './router/authRoute.js';
import { router as yazarRouter } from './router/yazarRouter.js';
import { router as makaleRouter } from './router/makaleRouter.js';
AppDataSource.initialize()
    .then(() => {
    console.log("Veritabanı bağlantısı başarıyla kuruldu!");
    const app = express();
    app.use(express.json());
    app.use('/api/auth', authRouter);
    app.use('/api/yazarlar', yazarRouter);
    app.use('/api/makaleler', makaleRouter);
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
    });
})
    .catch((err) => {
    console.error("Veritabanı bağlantısı sırasında hata oluştu:", err);
});
