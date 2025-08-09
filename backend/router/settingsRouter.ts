import { Router } from 'express';
import { AppDataSource } from '../data-source.js';
import { Setting } from '../entities/Setting.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { UserRole } from '../entities/user.js';

export const router = Router();
const settingRepo = AppDataSource.getRepository(Setting);

router.get('/', protect, authorize(UserRole.ADMIN, UserRole.SUPERADMIN), async (req, res) => {
        try {
                let setting = await settingRepo.findOne({ where: { id: 1 } });
                if (!setting) {
                        setting = settingRepo.create({ id: 1 });
                        await settingRepo.save(setting);
                }
                res.json(setting);
        } catch (error) {
                res.status(500).json({ message: 'Ayarlar yüklenirken bir hata oluştu.', error });
        }
});

router.put('/', protect, authorize(UserRole.ADMIN, UserRole.SUPERADMIN), async (req, res) => {
        try {
                const { allowAppPublishing } = req.body;
                let setting = await settingRepo.findOne({ where: { id: 1 } });
                if (!setting) {
                        setting = settingRepo.create({ id: 1 });
                }
                if (typeof allowAppPublishing === 'boolean') {
                        setting.allowAppPublishing = allowAppPublishing;
                }
                await settingRepo.save(setting);
                res.json(setting);
        } catch (error) {
                res.status(500).json({ message: 'Ayarlar güncellenirken bir hata oluştu.', error });
        }
});

export default router;
