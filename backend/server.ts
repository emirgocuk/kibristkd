import express from 'express';
import { AppDataSource } from './data-source.js';
import { router as authRouter } from './router/authRoute.js';
import { router as yazarRouter } from './router/yazarRouter.js';
import { router as makaleRouter } from './router/makaleRouter.js';
import { router as settingsRouter } from './router/settingsRouter.js';

console.log('Veritabanı bağlantısı denetleniyor...');
AppDataSource.initialize()
  .then(() => {
    console.log('Veritabanı bağlantısı başarıyla kuruldu!');

    const app = express();
    app.use(express.json());
    // Eğer frontend başka origin'de ise CORS gerekebilir:
    // import cors from 'cors'; app.use(cors());

    app.use('/api/auth', authRouter);
    app.use('/api/yazarlar', yazarRouter);
    app.use('/api/makaleler', makaleRouter);
    app.use('/api/settings', settingsRouter);

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
    });
  })
  .catch((err) => {
    console.error('Veritabanı bağlantısı sırasında hata oluştu:', err);
  });
