import { Router } from "express";

export const router = Router();

/**
 * Frontend GlobalContent.jsx beklediği için /api/settings/content geri eklendi.
 * Şimdilik statik payload dönüyoruz. İleride DB'den okuyacak şekilde genişletilebilir.
 */
router.get("/content", async (_req, res) => {
  const payload = {
    heroTitle: "Kıbrıs TKD",
    heroSubtitle: "Gündemden öne çıkanlar",
    banners: [],
    sections: []
  };
  return res.json({ success: true, data: payload });
});

