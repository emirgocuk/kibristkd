import { Router } from "express";
import multer from "multer";
import { AppDataSource } from "../data-source.js";
import { SliderItem } from "../entities/SliderItem.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

export const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });

// PUBLIC — aktif olanlar, sıraya göre
router.get("/", async (_req, res) => {
  const repo = AppDataSource.getRepository(SliderItem);
  const list = await repo.find({ where: { active: true }, order: { sort: "ASC", createdAt: "DESC" } });
  const light = list.map(s => ({
    id: s.id, title: s.title, subtitle: s.subtitle, linkHref: s.linkHref,
    imageUrl: `/api/slider/${s.id}/image`
  }));
  return res.json({ success: true, data: light });
});

// ADMIN — tüm slider
router.get("/admin", requireAuth, requireAdmin, async (_req, res) => {
  const repo = AppDataSource.getRepository(SliderItem);
  const list = await repo.find({ order: { sort: "ASC", createdAt: "DESC" } });
  return res.json({ success: true, data: list });
});

// CREATE
router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const b = req.body || {};
  const title = String(b.title || "").trim();
  if (!title) return res.status(400).json({ success: false, message: "Başlık zorunludur" });

  const repo = AppDataSource.getRepository(SliderItem);
  const created = repo.create({
    active: !!b.active,
    sort: Number(b.sort ?? 0),
    title,
    subtitle: b.subtitle ?? null,
    linkHref: b.linkHref ?? null
  });
  await repo.save(created);
  return res.json({ success: true, data: created });
});

// UPDATE
router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  const repo = AppDataSource.getRepository(SliderItem);
  const id = Number(req.params.id);
  const s = await repo.findOne({ where: { id } });
  if (!s) return res.status(404).json({ success: false, message: "Kayıt bulunamadı" });

  const b = req.body || {};
  if ("active" in b) s.active = !!b.active;
  if ("sort" in b) s.sort = Number(b.sort);
  if ("title" in b) s.title = String(b.title || "").trim();
  if ("subtitle" in b) s.subtitle = b.subtitle ?? null;
  if ("linkHref" in b) s.linkHref = b.linkHref ?? null;

  await repo.save(s);
  return res.json({ success: true, data: s });
});

// DELETE
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  const repo = AppDataSource.getRepository(SliderItem);
  const id = Number(req.params.id);
  const r = await repo.delete({ id });
  if (!r.affected) return res.status(404).json({ success: false, message: "Kayıt bulunamadı" });
  return res.json({ success: true, message: "Silindi" });
});

// IMAGE upload
router.post("/:id/image", requireAuth, requireAdmin, upload.single("file"), async (req, res) => {
  const repo = AppDataSource.getRepository(SliderItem);
  const id = Number(req.params.id);
  const s = await repo.findOne({ where: { id } });
  if (!s) return res.status(404).json({ success: false, message: "Kayıt bulunamadı" });
  if (!req.file) return res.status(400).json({ success: false, message: "Dosya zorunludur" });

  s.imageBlob = req.file.buffer;
  s.imageMime = req.file.mimetype || "application/octet-stream";
  await repo.save(s);
  return res.json({ success: true, message: "Görsel yüklendi" });
});

// IMAGE serve
router.get("/:id/image", async (req, res) => {
  const repo = AppDataSource.getRepository(SliderItem);
  const id = Number(req.params.id);
  const s = await repo.findOne({ where: { id }, select: ["id","imageBlob","imageMime"] as any });
  if (!s?.imageBlob) return res.status(404).send("Bulunamadı");
  res.setHeader("Content-Type", s.imageMime || "application/octet-stream");
  res.send(s.imageBlob);
});
