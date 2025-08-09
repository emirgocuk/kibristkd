import { Router } from 'express';
import { AppDataSource } from '../data-source.js';
import { DevNote } from '../entities/DevNote.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { UserRole } from '../entities/user.js';

export const router = Router();
const noteRepo = AppDataSource.getRepository(DevNote);

router.get(
  '/',
  protect,
  authorize(UserRole.ADMIN, UserRole.SUPERADMIN),
  async (req, res) => {
    try {
      const notes = await noteRepo.find({ order: { createdAt: 'DESC' } });
      res.json(notes);
    } catch (error) {
      res.status(500).json({ message: 'Notlar yüklenirken bir hata oluştu.', error });
    }
  }
);

router.post(
  '/',
  protect,
  authorize(UserRole.ADMIN, UserRole.SUPERADMIN),
  async (req, res) => {
    try {
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ message: 'Not içeriği gerekli.' });
      }
      const note = noteRepo.create({ content });
      await noteRepo.save(note);
      res.status(201).json(note);
    } catch (error) {
      res.status(500).json({ message: 'Not eklenirken bir hata oluştu.', error });
    }
  }
);

export default router;
