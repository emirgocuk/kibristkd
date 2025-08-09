import { Router } from "express";
import { AppDataSource } from "../data-source.js";
import { Makale } from "../entities/Makale.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";
export const router = Router();
// Tüm makaleler
router.get("/", async (req, res) => {
    const repo = AppDataSource.getRepository(Makale);
    const makaleler = await repo.find({ order: { createdAt: "DESC" } });
    return res.json({ success: true, data: makaleler });
});
// Tek makale
router.get("/:id", async (req, res) => {
    const repo = AppDataSource.getRepository(Makale);
    const makale = await repo.findOneBy({ id: Number(req.params.id) });
    if (!makale) {
        return res.status(404).json({ success: false, message: "Makale bulunamadı" });
    }
    return res.json({ success: true, data: makale });
});
// Makale ekleme
router.post("/", requireAuth, requireAdmin, async (req, res) => {
    const { baslik, icerik } = req.body || {};
    if (!baslik || !icerik) {
        return res.status(400).json({ success: false, message: "Başlık ve içerik zorunludur" });
    }
    const repo = AppDataSource.getRepository(Makale);
    const yeniMakale = repo.create(req.body);
    await repo.save(yeniMakale);
    return res.json({ success: true, data: yeniMakale });
});
// Makale güncelleme
router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
    const { baslik, icerik } = req.body || {};
    if (!baslik || !icerik) {
        return res.status(400).json({ success: false, message: "Başlık ve içerik zorunludur" });
    }
    const repo = AppDataSource.getRepository(Makale);
    let makale = await repo.findOneBy({ id: Number(req.params.id) });
    if (!makale) {
        return res.status(404).json({ success: false, message: "Makale bulunamadı" });
    }
    repo.merge(makale, req.body);
    await repo.save(makale);
    return res.json({ success: true, data: makale });
});
// Makale silme
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
    const repo = AppDataSource.getRepository(Makale);
    const result = await repo.delete({ id: Number(req.params.id) });
    if (result.affected === 0) {
        return res.status(404).json({ success: false, message: "Makale bulunamadı" });
    }
    return res.json({ success: true, message: "Makale silindi" });
});
