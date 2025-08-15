import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Yüklenme İskeleti Bileşeni (MUI Skeleton yerine)
const LoadingSkeleton = () => (
  <div className="container mx-auto max-w-4xl px-4 py-8">
    <div className="animate-pulse space-y-4">
      <div className="h-10 w-3/4 rounded bg-gray-300"></div>
      <div className="h-6 w-1/4 rounded bg-gray-300"></div>
      <div className="h-64 w-full rounded-lg bg-gray-300"></div>
      <div className="space-y-2">
        <div className="h-4 rounded bg-gray-300"></div>
        <div className="h-4 w-5/6 rounded bg-gray-300"></div>
        <div className="h-4 rounded bg-gray-300"></div>
        <div className="h-4 w-4/6 rounded bg-gray-300"></div>
      </div>
    </div>
  </div>
);


export default function HaberDetayPage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    async function load() {
      setLoading(true);
      try {
        // API endpoint'inin doğru olduğundan emin olun
        const res = await axios.get(`/api/makaleler/slug/${slug}`);
        if (alive) setData(res.data?.data ?? null);
      } catch (error) {
        console.error("Haber detayı yüklenirken hata:", error);
        if (alive) setData(null);
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => { alive = false; };
  }, [slug]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!data) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <p className="text-center text-gray-600">İçerik bulunamadı.</p>
      </div>
    );
  }

  const coverUrl = `/api/makaleler/slug/${data.slug}/kapak`;

  return (
    // Container -> div + container sınıfları
    <article className="container mx-auto max-w-4xl px-4 py-8">
      {/* Typography (Başlık) -> h1 */}
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-4xl">{data.baslik}</h1>

      {/* Kapak Görseli */}
      <img
        src={coverUrl}
        alt={data.baslik}
        onError={(e) => { e.currentTarget.style.display = "none"; }}
        className="mb-6 h-auto w-full max-h-96 rounded-lg object-cover shadow-md"
      />
      
      {/* İçerik */}
      {/* `prose` sınıfı, `dangerouslySetInnerHTML` ile gelen HTML içeriğini otomatik olarak stilize eder. */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: data.icerik.replace(/\n/g, "<br/>") }}
      />
    </article>
  );
}