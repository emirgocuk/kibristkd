import { Router } from "express";
import multer from "multer";
import { AppDataSource } from "../data-source.js";
import { Makale } from "../entities/Makale.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";
import { uniqueSlug } from "../utils/slug.js";
export const router = Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
/** PUBLIC — Yalnızca yayımlanan makaleler (liste) */
router.get("/", async (_req, res) => {
    const repo = AppDataSource.getRepository(Makale);
    const list = await repo.find({
        where: { status: "published" },
        order: { createdAt: "DESC" },
    });
    return res.json({ success: true, data: list });
});
/** PUBLIC — Tek makale (slug ile) */
router.get("/slug/:slug", async (req, res) => {
    const repo = AppDataSource.getRepository(Makale);
    const m = await repo.findOne({
        where: { slug: req.params.slug, status: "published" },
    });
    if (!m)
        return res.status(404).json({ success: false, message: "Makale bulunamadı" });
    return res.json({ success: true, data: m });
});
/** ADMIN — tüm statüler (liste) */
router.get("/admin", requireAuth, requireAdmin, async (_req, res) => {
    const repo = AppDataSource.getRepository(Makale);
    const list = await repo.find({ order: { createdAt: "DESC" } });
    return res.json({ success: true, data: list });
});
/** PUBLIC — Tek makale (id ile, sadece published) */
router.get("/:id", async (req, res) => {
    const repo = AppDataSource.getRepository(Makale);
    const id = Number(req.params.id);
    const m = await repo.findOne({
        where: { id, status: "published" },
    });
    if (!m)
        return res.status(404).json({ success: false, message: "Makale bulunamadı" });
    return res.json({ success: true, data: m });
});
/** CREATE — default: pending; slug otomatik benzersiz */
router.post("/", requireAuth, async (req, res) => {
    try {
        const b = req.body || {};
        const baslik = (b.baslik ?? b.title ?? "").toString().trim();
        const icerik = (b.icerik ?? b.content ?? b.body ?? "").toString().trim();
        const kategori = (b.kategori ?? b.category ?? "").toString().trim() || null;
        const kapakResmi = (b.kapakResmi ?? b.image ?? "").toString().trim() || null;
        if (!baslik || !icerik) {
            return res.status(400).json({ success: false, message: "Başlık ve içerik zorunludur" });
        }
        const repo = AppDataSource.getRepository(Makale);
        const slug = await uniqueSlug(repo, baslik);
        let status = "pending";
        if (req.user?.role === "admin" && b.status) {
            const s = String(b.status).toLowerCase();
            if (["draft", "pending", "published"].includes(s))
                status = s;
        }
        const created = repo.create({
            baslik,
            icerik,
            kategori,
            kapakResmi,
            slug,
            status,
            createdBy: req.user || null,
        });
        await repo.save(created);
        return res.json({ success: true, data: created });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ success: false, message: "Sunucu hatası" });
    }
});
/** UPDATE — başlık değiştiyse slug’ı yeniden benzersizle */
router.put("/:id", requireAuth, async (req, res) => {
    const repo = AppDataSource.getRepository(Makale);
    const id = Number(req.params.id);
    const m = await repo.findOne({ where: { id } });
    if (!m)
        return res.status(404).json({ success: false, message: "Makale bulunamadı" });
    const isAdmin = (req.user?.role || "").toLowerCase() === "admin";
    const ownerId = m.createdBy?.id ?? null;
    if (!isAdmin && ownerId !== req.user?.id) {
        return res.status(403).json({ success: false, message: "Yetkiniz yok" });
    }
    const b = req.body || {};
    const patch = {};
    let titleChanged = false;
    if (b.baslik ?? b.title) {
        patch.baslik = String(b.baslik ?? b.title).trim();
        titleChanged = patch.baslik !== m.baslik;
    }
    if (b.icerik ?? b.content ?? b.body)
        patch.icerik = String(b.icerik ?? b.content ?? b.body);
    if ("kategori" in b || "category" in b)
        patch.kategori = (b.kategori ?? b.category ?? "").toString().trim() || null;
    if ("kapakResmi" in b || "image" in b)
        patch.kapakResmi = (b.kapakResmi ?? b.image ?? "").toString().trim() || null;
    if (isAdmin && b.status) {
        const s = String(b.status).toLowerCase();
        if (["draft", "pending", "published"].includes(s))
            patch.status = s;
    }
    else {
        patch.status = "pending";
    }
    // Slug değişimi
    if (titleChanged && patch.baslik) {
        patch.slug = await uniqueSlug(repo, patch.baslik, m.id);
    }
    repo.merge(m, patch);
    await repo.save(m);
    return res.json({ success: true, data: m });
});
/** DELETE — sadece admin */
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
    const repo = AppDataSource.getRepository(Makale);
    const id = Number(req.params.id);
    const result = await repo.delete({ id });
    if (result.affected === 0) {
        return res.status(404).json({ success: false, message: "Makale bulunamadı" });
    }
    return res.json({ success: true, message: "Makale silindi" });
});
/** STATUS — admin */
router.post("/:id/publish", requireAuth, requireAdmin, async (req, res) => {
    const repo = AppDataSource.getRepository(Makale);
    const id = Number(req.params.id);
    const m = await repo.findOne({ where: { id } });
    if (!m)
        return res.status(404).json({ success: false, message: "Makale bulunamadı" });
    m.status = "published";
    await repo.save(m);
    return res.json({ success: true, data: m });
});
router.post("/:id/draft", requireAuth, requireAdmin, async (req, res) => {
    const repo = AppDataSource.getRepository(Makale);
    const id = Number(req.params.id);
    const m = await repo.findOne({ where: { id } });
    if (!m)
        return res.status(404).json({ success: false, message: "Makale bulunamadı" });
    m.status = "draft";
    await repo.save(m);
    return res.json({ success: true, data: m });
});
/** ----- KAPAK GÖRSELİ BLOB ----- */
// Kapak yükle (form-data: field adı "file")
router.post("/:id/kapak", requireAuth, upload.single("file"), async (req, res) => {
    const repo = AppDataSource.getRepository(Makale);
    const id = Number(req.params.id);
    const m = await repo.findOne({ where: { id } });
    if (!m)
        return res.status(404).json({ success: false, message: "Makale bulunamadı" });
    const isAdmin = (req.user?.role || "").toLowerCase() === "admin";
    const ownerId = m.createdBy?.id ?? null;
    if (!isAdmin && ownerId !== req.user?.id) {
        return res.status(403).json({ success: false, message: "Yetkiniz yok" });
    }
    const file = req.file;
    if (!file)
        return res.status(400).json({ success: false, message: "Dosya zorunludur" });
    m.kapakResmiBlob = file.buffer;
    m.kapakResmiMime = file.mimetype || "application/octet-stream";
    await repo.save(m);
    return res.json({ success: true, message: "Kapak görseli yüklendi" });
});
// Kapak görüntüle (id ile) — select:false alanları almak için QB kullandık
router.get("/:id/kapak", async (req, res) => {
    const repo = AppDataSource.getRepository(Makale);
    const id = Number(req.params.id);
    const m = await repo
        .createQueryBuilder("m")
        .addSelect(["m.kapakResmiBlob", "m.kapakResmiMime"])
        .where("m.id = :id", { id })
        .getOne();
    if (!m || !m.kapakResmiBlob)
        return res.status(404).send("Bulunamadı");
    res.setHeader("Content-Type", m.kapakResmiMime || "application/octet-stream");
    res.send(m.kapakResmiBlob);
});
// Kapak görüntüle (slug ile)
router.get("/slug/:slug/kapak", async (req, res) => {
    const repo = AppDataSource.getRepository(Makale);
    const slug = req.params.slug;
    const m = await repo
        .createQueryBuilder("m")
        .addSelect(["m.kapakResmiBlob", "m.kapakResmiMime"])
        .where("m.slug = :slug", { slug })
        .getOne();
    if (!m || !m.kapakResmiBlob)
        return res.status(404).send("Bulunamadı");
    res.setHeader("Content-Type", m.kapakResmiMime || "application/octet-stream");
    res.send(m.kapakResmiBlob);
});
//# sourceMappingURL=makaleRouter.js.map