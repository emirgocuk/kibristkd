import { Router } from 'express';
import { AppDataSource } from '../data-source.js';
import { DevelopmentNote } from '../entities/DevelopmentNote.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { UserRole } from '../entities/user.js';

export const router = Router();
const devNoteRepo = AppDataSource.getRepository(DevelopmentNote);

// GET /api/dev-notes - List all development notes
router.get('/', async (req, res) => {
        try {
                const notes = await devNoteRepo.find();
                res.json(notes);
        } catch (error) {
                res.status(500).json({ message: 'Geli\u015ftirme notlar\u0131 getirilirken bir hata olu\u015ftu.', error });
        }
});

// POST /api/dev-notes - Create a new development note
router.post('/', protect, authorize(UserRole.ADMIN, UserRole.SUPERADMIN), async (req, res) => {
        const { title, content } = req.body;
        if (!title || !content) {
                return res.status(400).json({ message: 'Ba\u015fl\u0131k ve i\u00e7erik alanlar\u0131 zorunludur.' });
        }
        try {
                const note = new DevelopmentNote();
                note.title = title;
                note.content = content;
                await devNoteRepo.save(note);
                res.status(201).json(note);
        } catch (error) {
                res.status(500).json({ message: 'Geli\u015ftirme notu olu\u015fturulurken bir hata olu\u015ftu.', error });
        }
});

export default router;

