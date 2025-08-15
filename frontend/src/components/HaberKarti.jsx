import React from "react";
import { Link as RouterLink } from "react-router-dom";

export default function HaberKarti({ haber, featured = false }) {
  if (!haber) return null;

  // Bu mantık kısmı aynı kalıyor, çünkü UI kütüphanesinden bağımsız.
  const title = haber.baslik || haber.title || "Başlık";
  const raw = (haber.icerik || haber.content || haber.body || "").toString();
  const text = raw.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const excerpt = text.length > 150 ? text.slice(0, 150) + "…" : text;
  const date = new Date(
    haber.createdAt || haber.updatedAt || haber.date || haber.tarih || Date.now()
  ).toLocaleDateString("tr-TR");

  const to = `/haber/${haber.slug ?? haber.id ?? ""}`;

  return (
    // Card -> div
    // variant="outlined" -> border
    // sx={{ height: "100%" }} -> h-full
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow duration-300 hover:shadow-md">
      {/* CardActionArea -> RouterLink */}
      <RouterLink to={to} className="flex h-full flex-col bg-white p-6 hover:bg-gray-50">
        {/* CardContent içerisindeki yapıyı buraya taşıyoruz */}
        <div className="flex-grow">
            {/* Typography (title) -> h3 */}
            <h3 className={`font-bold ${featured ? "text-xl" : "text-lg"} mb-2 text-gray-800`}>
              {title}
            </h3>
            {/* Typography (excerpt) -> p */}
            <p className="mb-4 text-sm text-gray-600">
              {excerpt || "Detay için tıklayın."}
            </p>
        </div>
        
        {/* Box ve Typography (date) -> div ve p */}
        <div className="mt-auto">
            <p className="text-xs text-gray-500">
              {date}
            </p>
        </div>
      </RouterLink>
    </div>
  );
}