import React, { useState } from "react";
import { Box, Button, Container, Paper, Stack, TextField, Typography, Alert } from "@mui/material";
import http from "../api/http";
import { useAuth } from "../context/AuthContext";

export default function GirnePanel() {
  const { logout } = useAuth();
  const [baslik, setBaslik] = useState("");
  const [icerik, setIcerik] = useState("");
  const [kategori, setKategori] = useState("");
  const [kapakResmi, setKapakResmi] = useState("");
  const [ok, setOk] = useState<string|null>(null);
  const [err, setErr] = useState<string|null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setOk(null); setErr(null);
    try {
      const body = { baslik, icerik, kategori, kapakResmi: kapakResmi || undefined, tarih: new Date().toISOString() };
      const r = await http.post("/api/makaleler", body);
      setOk("Makale eklendi (ID: " + r.data?.data?.id + ")");
      setBaslik(""); setIcerik(""); setKategori(""); setKapakResmi("");
    } catch (e: any) {
      const s = e?.response?.status;
      if (s === 401) setErr("Oturum gerekli. Lütfen /girne’den giriş yapın.");
      else if (s === 403) setErr("Admin izni gerekli.");
      else setErr(e?.response?.data?.message || e?.message || "Kayıt başarısız");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight={700}>Girne Paneli — Makale Ekle</Typography>
        <Button onClick={logout} color="inherit">Çıkış</Button>
      </Stack>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={submit}>
          <Stack spacing={2}>
            {ok && <Alert severity="success">{ok}</Alert>}
            {err && <Alert severity="error">{err}</Alert>}
            <TextField label="Başlık" value={baslik} onChange={e=>setBaslik(e.target.value)} required />
            <TextField label="Kategori" value={kategori} onChange={e=>setKategori(e.target.value)} placeholder="Basında KKTC" />
            <TextField label="Kapak Görseli (URL)" value={kapakResmi} onChange={e=>setKapakResmi(e.target.value)} />
            <TextField label="İçerik" value={icerik} onChange={e=>setIcerik(e.target.value)} multiline minRows={6} required />
            <Button type="submit" variant="contained">Kaydet</Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
