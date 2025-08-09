
import express from 'express';
import { AppDataSource } from './data-source.js';
import { router as authRouter } from './router/authRoute.js';
import { router as yazarRouter } from './router/yazarRouter.js';
import { router as makaleRouter } from './router/makaleRouter.js';
import { router as settingsRouter } from './router/settingsRouter.js';
import { router as devNoteRouter } from './router/devNoteRouter.js';

AppDataSource.initialize()
    .then(() => {
        console.log("Veritabanı bağlantısı başarıyla kuruldu!");

        const app = express();
        app.use(express.json());

        app.use('/api/auth', authRouter);
        app.use('/api/yazarlar', yazarRouter);
        app.use('/api/makaleler', makaleRouter);
        app.use('/api/settings', settingsRouter);
        app.use('/api/dev-notes', devNoteRouter);

        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
        });

    })
    .catch((err) => {
        console.error("Veritabanı bağlantısı sırasında hata oluştu:", err);
    });

