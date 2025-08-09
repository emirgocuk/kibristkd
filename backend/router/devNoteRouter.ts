import { Router } from 'express';
import { AppDataSource } from '../data-source.js';
import { DevelopmentNote } from '../entities/DevelopmentNote.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { UserRole } from '../entities/user.js';

export const router = Router();
const devNoteRepo = AppDataSource.getRepository(DevelopmentNote);

router.get('/', protect, authorize(UserRole.ADMIN, UserRole.SUPERADMIN), async (req, res) => {
        try {
                const notes = await devNoteRepo.find();
                res.json(notes);
        } catch (error) {
                res.status(500).json({ message: 'Development notes fetch error.', error });
        }
});

router.post('/', protect, authorize(UserRole.ADMIN, UserRole.SUPERADMIN), async (req, res) => {
        const { content } = req.body;
        if (!content) {
                return res.status(400).json({ message: 'İçerik alanı zorunludur.' });
        }
        try {
                const note = devNoteRepo.create({ content });
                await devNoteRepo.save(note);
                res.status(201).json(note);
        } catch (error) {
                res.status(500).json({ message: 'Development note oluşturulurken bir hata oluştu.', error });
        }
});

export default router;
