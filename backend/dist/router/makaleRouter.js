import { Router } from "express";
import { AppDataSource } from "../data-source.js";
import { Makale } from "../entities/Makale.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";
export const router = Router();
router.get("/", async (_req, res) => {
    const repo = AppDataSource.getRepository(Makale);
    const list = await repo.find({ where: { status: "published" }, order: { createdAt: "DESC" } });
    return res.json({ success: true, data: list });
});
router.get("/admin", requireAuth, requireAdmin, async (_req, res) => {
    const repo = AppDataSource.getRepository(Makale);
    const list = await repo.find({ order: { createdAt: "DESC" } });
    return res.json({ success: true, data: list });
});
router.get("/:id", async (req, res) => {
    const repo = AppDataSource.getRepository(Makale);
    const id = Number(req.params.id);
    const m = await repo.findOne({ where: { id, status: "published" } });
    if (!m)
        return res.status(404).json({ success: false, message: "Makale bulunamadı" });
    return res.json({ success: true, data: m });
});
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
        let status = "pending";
        if (req.user?.role === "admin" && b.status) {
            const s = String(b.status).toLowerCase();
            if (["draft", "pending", "published"].includes(s))
                status = s;
        }
        const repo = AppDataSource.getRepository(Makale);
        const created = repo.create({
            baslik, icerik, kategori, kapakResmi, status, createdBy: req.user || null
        });
        await repo.save(created);
        return res.json({ success: true, data: created });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ success: false, message: "Sunucu hatası" });
    }
});
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
    if (b.baslik ?? b.title)
        patch.baslik = String(b.baslik ?? b.title);
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
    repo.merge(m, patch);
    await repo.save(m);
    return res.json({ success: true, data: m });
});
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
    const repo = AppDataSource.getRepository(Makale);
    const id = Number(req.params.id);
    const result = await repo.delete({ id });
    if (result.affected === 0) {
        return res.status(404).json({ success: false, message: "Makale bulunamadı" });
    }
    return res.json({ success: true, message: "Makale silindi" });
});
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
//# sourceMappingURL=makaleRouter.js.map