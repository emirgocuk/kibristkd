import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Box, Skeleton } from "@mui/material";

export default function HaberDetayPage() {
  const { slug } = useParams(); // route: /haber/:slug
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    async function load() {
      setLoading(true);
      try {
        const res = await axios.get(`/api/makaleler/slug/${slug}`);
        if (alive) setData(res.data?.data ?? null);
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => { alive = false; };
  }, [slug]);

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Skeleton height={48} />
        <Skeleton height={320} sx={{ my: 2 }} />
        <Skeleton height={24} />
        <Skeleton height={24} />
      </Container>
    );
  }

  if (!data) return <Container sx={{ py: 4 }}><Typography>İçerik bulunamadı</Typography></Container>;

  const coverUrl = `/api/makaleler/slug/${data.slug}/kapak`;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>{data.baslik}</Typography>
      <Box
        component="img"
        src={coverUrl}
        alt={data.baslik}
        onError={(e) => { e.currentTarget.style.display = "none"; }}
        sx={{ width: "100%", maxHeight: 380, objectFit: "cover", borderRadius: 2, mb: 2 }}
      />
      <Typography dangerouslySetInnerHTML={{ __html: data.icerik.replace(/\n/g, "<br/>") }} />
    </Container>
  );
}
