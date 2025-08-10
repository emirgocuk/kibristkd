import { Router } from "express";
import multer from "multer";
import { AppDataSource } from "../data-source.js";
import { Author } from "../entities/Author.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";
import { uniqueSlug } from "../utils/slug.js";

export const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

// PUBLIC — kısa liste
router.get("/", async (_req, res) => {
  const repo = AppDataSource.getRepository(Author);
  const list = await repo.find({ order: { id: "DESC" } });
  return res.json({ success: true, data: list.map(a => ({ id: a.id, name: a.name, slug: a.slug })) });
});

// ADMIN — tam liste
router.get("/admin", requireAuth, requireAdmin, async (_req, res) => {
  const repo = AppDataSource.getRepository(Author);
  const list = await repo.find({ order: { id: "DESC" } });
  return res.json({ success: true, data: list });
});

// CREATE
router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const repo = AppDataSource.getRepository(Author);
  const name = String(req.body?.name || "").trim();
  if (!name) return res.status(400).json({ success: false, message: "İsim zorunlu" });

  const slug = await uniqueSlug(repo as any, name);
  const a = repo.create({
    name,
    slug,
    bio: req.body?.bio ?? null,
    socials: req.body?.socials ?? null,
  });
  await repo.save(a);
  return res.json({ success: true, data: a });
});

// DELETE
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const repo = AppDataSource.getRepository(Author);
  const r = await repo.delete({ id });
  if (!r.affected) return res.status(404).json({ success: false, message: "Yazar bulunamadı" });
  return res.json({ success: true, message: "Silindi" });
});

// AVATAR UPLOAD
router.post("/:id/avatar", requireAuth, requireAdmin, upload.single("file"), async (req, res) => {
  const id = Number(req.params.id);
  const repo = AppDataSource.getRepository(Author);
  const a = await repo.findOne({ where: { id } });
  if (!a) return res.status(404).json({ success: false, message: "Yazar bulunamadı" });
  if (!req.file) return res.status(400).json({ success: false, message: "Dosya zorunlu" });

  a.avatarBlob = req.file.buffer;
  a.avatarMime = req.file.mimetype || "application/octet-stream";
  await repo.save(a);
  return res.json({ success: true, message: "Avatar yüklendi" });
});

// AVATAR SERVE
router.get("/:id/avatar", async (req, res) => {
  const id = Number(req.params.id);
  const repo = AppDataSource.getRepository(Author);
  const a = await repo.findOne({ where: { id }, select: ["id", "avatarBlob", "avatarMime"] as any });
  if (!a?.avatarBlob) return res.status(404).send("Bulunamadı");
  res.setHeader("Content-Type", a.avatarMime || "application/octet-stream");
  res.send(a.avatarBlob);
});
