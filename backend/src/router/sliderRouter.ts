import { Router } from "express";
import multer from "multer";
import { AppDataSource } from "../data-source.js";
import { Slider } from "../entities/Slider.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

export const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

// PUBLIC — aktif sliderlar
router.get("/", async (_req, res) => {
  const repo = AppDataSource.getRepository(Slider);
  const list = await repo.find({ where: { active: true }, order: { sort: "ASC", id: "DESC" } });
  return res.json({
    success: true,
    data: list.map(s => ({ id: s.id, title: s.title, subtitle: s.subtitle, linkHref: s.linkHref }))
  });
});

// ADMIN — tüm sliderlar
router.get("/admin", requireAuth, requireAdmin, async (_req, res) => {
  const repo = AppDataSource.getRepository(Slider);
  const list = await repo.find({ order: { sort: "ASC", id: "DESC" } });
  return res.json({ success: true, data: list });
});

// CREATE
router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const { title, subtitle, linkHref, sort, active } = req.body || {};
  const t = String(title || "").trim();
  if (!t) return res.status(400).json({ success: false, message: "Başlık zorunlu" });

  const repo = AppDataSource.getRepository(Slider);
  const s = repo.create({
    title: t,
    subtitle: subtitle ? String(subtitle) : null,
    linkHref: linkHref ? String(linkHref) : null,
    sort: Number(sort) || 0,
    active: active !== undefined ? !!active : true,
  });
  await repo.save(s);
  return res.json({ success: true, data: s });
});

// UPDATE
router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const repo = AppDataSource.getRepository(Slider);
  const s = await repo.findOne({ where: { id } });
  if (!s) return res.status(404).json({ success: false, message: "Kayıt bulunamadı" });

  const { title, subtitle, linkHref, sort, active } = req.body || {};
  if (title !== undefined) s.title = String(title);
  if (subtitle !== undefined) s.subtitle = subtitle ? String(subtitle) : null;
  if (linkHref !== undefined) s.linkHref = linkHref ? String(linkHref) : null;
  if (sort !== undefined) s.sort = Number(sort) || 0;
  if (active !== undefined) s.active = !!active;

  await repo.save(s);
  return res.json({ success: true, data: s });
});

// DELETE
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const repo = AppDataSource.getRepository(Slider);
  const r = await repo.delete({ id });
  if (!r.affected) return res.status(404).json({ success: false, message: "Kayıt bulunamadı" });
  return res.json({ success: true, message: "Silindi" });
});

// IMAGE UPLOAD
router.post("/:id/image", requireAuth, requireAdmin, upload.single("file"), async (req, res) => {
  const id = Number(req.params.id);
  const repo = AppDataSource.getRepository(Slider);
  const s = await repo.findOne({ where: { id } });
  if (!s) return res.status(404).json({ success: false, message: "Kayıt bulunamadı" });

  if (!req.file) return res.status(400).json({ success: false, message: "Dosya zorunlu" });
  s.imageBlob = req.file.buffer;
  s.imageMime = req.file.mimetype || "application/octet-stream";
  await repo.save(s);

  return res.json({ success: true, message: "Görsel yüklendi" });
});

// IMAGE SERVE
router.get("/:id/image", async (req, res) => {
  const id = Number(req.params.id);
  const repo = AppDataSource.getRepository(Slider);
  const s = await repo.findOne({ where: { id }, select: ["id", "imageBlob", "imageMime"] as any });
  if (!s?.imageBlob) return res.status(404).send("Bulunamadı");
  res.setHeader("Content-Type", s.imageMime || "application/octet-stream");
  res.send(s.imageBlob);
});
