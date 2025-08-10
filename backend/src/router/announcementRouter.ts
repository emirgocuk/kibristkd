import { Router } from "express";
import { AppDataSource } from "../data-source.js";
import { Announcement } from "../entities/Announcement.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

export const router = Router();

// PUBLIC — aktif duyurular
router.get("/", async (_req, res) => {
  const repo = AppDataSource.getRepository(Announcement);
  const list = await repo.find({ where: { active: true }, order: { sort: "ASC", id: "DESC" } });
  return res.json({ success: true, data: list });
});

// ADMIN — tüm duyurular
router.get("/admin", requireAuth, requireAdmin, async (_req, res) => {
  const repo = AppDataSource.getRepository(Announcement);
  const list = await repo.find({ order: { sort: "ASC", id: "DESC" } });
  return res.json({ success: true, data: list });
});

// CREATE
router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const { title, message, sort, active } = req.body || {};
  const t = String(title || "").trim();
  if (!t) return res.status(400).json({ success: false, message: "Başlık zorunlu" });

  const repo = AppDataSource.getRepository(Announcement);
  const a = repo.create({
    title: t,
    message: message ? String(message) : null,
    sort: Number(sort) || 0,
    active: active !== undefined ? !!active : true,
  });
  await repo.save(a);
  return res.json({ success: true, data: a });
});

// UPDATE
router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const repo = AppDataSource.getRepository(Announcement);
  const a = await repo.findOne({ where: { id } });
  if (!a) return res.status(404).json({ success: false, message: "Kayıt bulunamadı" });

  const { title, message, sort, active } = req.body || {};
  if (title !== undefined) a.title = String(title);
  if (message !== undefined) a.message = message ? String(message) : null;
  if (sort !== undefined) a.sort = Number(sort) || 0;
  if (active !== undefined) a.active = !!active;

  await repo.save(a);
  return res.json({ success: true, data: a });
});

// DELETE
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const repo = AppDataSource.getRepository(Announcement);
  const r = await repo.delete({ id });
  if (!r.affected) return res.status(404).json({ success: false, message: "Kayıt bulunamadı" });
  return res.json({ success: true, message: "Silindi" });
});
