import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Card, CardActionArea, CardContent, CardMedia,
  Typography, Box
} from "@mui/material";

export default function HaberKarti({ haber, featured = false }) {
  if (!haber) return null;

  const title =
    haber.baslik || haber.title || "Başlık";
  const img =
    haber.kapakResmi || haber.image || "/placeholder.jpg";
  const raw =
    (haber.icerik || haber.content || haber.body || "").toString();
  const text = raw.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const excerpt = text.length > 150 ? text.slice(0, 150) + "…" : text;
  const date = new Date(
    haber.createdAt || haber.updatedAt || haber.date || haber.tarih || Date.now()
  ).toLocaleDateString("tr-TR");

  const to = `/haber/${haber.slug ?? haber.id ?? ""}`;

  return (
    <Card variant="outlined" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardActionArea component={RouterLink} to={to} sx={{ alignItems: "stretch" }}>
        {img && (
          <CardMedia
            component="img"
            image={img}
            alt={title}
            sx={{
              height: featured ? 260 : 160,
              objectFit: "cover"
            }}
            onError={(e) => { e.currentTarget.src = "/placeholder.jpg"; }}
          />
        )}
        <CardContent>
          <Typography variant={featured ? "h6" : "subtitle1"} fontWeight={700} gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {excerpt || "Detay için tıklayın."}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {date}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
