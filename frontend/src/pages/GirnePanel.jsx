import React, { useEffect, useMemo, useRef, useState } from "react";
import http from "../api/http";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container, Grid, Paper, Stack, TextField, Button, Typography, Divider,
  List, ListItem, ListItemText, IconButton, Snackbar, Alert, Chip
} from "@mui/material";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import UnpublishedRoundedIcon from "@mui/icons-material/UnpublishedRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";

export default function GirnePanel() {
  // Toast
  const [toast, setToast] = useState({ open: false, msg: "", type: "success" });

  // Router
  const location = useLocation();
  const navigate = useNavigate();

  // Form state
  const [baslik, setBaslik] = useState("");
  const [icerik, setIcerik] = useState("");
  const [kategori, setKategori] = useState("");
  const [file, setFile] = useState(null);

  // Liste
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // İlk gelişte “başarıyla giriş yaptınız” bildirimi
  useEffect(() => {
    if (location.state?.justLoggedIn) {
      setToast({ open: true, msg: "Başarıyla giriş yaptınız. Hoş geldiniz!", type: "success" });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  async function loadAdmin() {
    try {
      setLoading(true);
      const res = await http.get("/makaleler/admin");
      setList(res?.data?.data || []);
    } catch (e) {
      console.error(e);
      setToast({ open: true, msg: "Liste yüklenemedi (401?)", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAdmin();
  }, []);

  async function submit(e) {
    e.preventDefault();
    try {
      if (!baslik.trim() || !icerik.trim()) {
        setToast({ open: true, msg: "Başlık ve içerik zorunludur", type: "warning" });
        return;
      }
      // 1) Makale oluştur
      const body = {
        baslik: baslik.trim(),
        icerik: icerik.trim(),
        kategori: kategori.trim() || null,
      };
      const res = await http.post("/makaleler", body);
      const created = res?.data?.data;

      // 2) Kapak varsa yükle
      if (created?.id && file) {
        const fd = new FormData();
        fd.append("file", file);
        await http.post(`/makaleler/${created.id}/kapak`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setToast({ open: true, msg: "Makale eklendi", type: "success" });
      setBaslik(""); setIcerik(""); setKategori(""); setFile(null);
      await loadAdmin();
    } catch (e) {
      console.error(e);
      setToast({ open: true, msg: "Ekleme başarısız", type: "error" });
    }
  }

  async function publish(id) {
    try {
      await http.post(`/makaleler/${id}/publish`);
      setToast({ open: true, msg: "Yayımlandı", type: "success" });
      await loadAdmin();
    } catch (e) {
      console.error(e);
      setToast({ open: true, msg: "Yayımlama başarısız", type: "error" });
    }
  }

  async function draft(id) {
    try {
      await http.post(`/makaleler/${id}/draft`);
      setToast({ open: true, msg: "Taslağa alındı", type: "info" });
      await loadAdmin();
    } catch (e) {
      console.error(e);
      setToast({ open: true, msg: "İşlem başarısız", type: "error" });
    }
  }

  async function remove(id) {
    try {
      await http.delete(`/makaleler/${id}`);
      setToast({ open: true, msg: "Silindi", type: "warning" });
      await loadAdmin();
    } catch (e) {
      console.error(e);
      setToast({ open: true, msg: "Silme başarısız", type: "error" });
    }
  }

  const published = useMemo(() => list.filter((m) => m.status === "published"), [list]);
  const pending   = useMemo(() => list.filter((m) => m.status === "pending"), [list]);
  const draftList = useMemo(() => list.filter((m) => m.status === "draft"), [list]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={800} gutterBottom>Girne Yönetim Paneli</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>Yeni Makale</Typography>
            <Stack spacing={2} component="form" onSubmit={submit}>
              <TextField label="Başlık" value={baslik} onChange={(e) => setBaslik(e.target.value)} required />
              <TextField label="Kategori" value={kategori} onChange={(e) => setKategori(e.target.value)} />
              <TextField
                label="İçerik"
                value={icerik}
                onChange={(e) => setIcerik(e.target.value)}
                multiline minRows={5}
                placeholder="Metni buraya yazın…"
                required
              />
              <Stack direction="row" spacing={2} alignItems="center">
                <Button component="label" variant="outlined" startIcon={<AddPhotoAlternateRoundedIcon />}>
                  Kapak Görseli
                  <input type="file" hidden accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </Button>
                {file && <Chip label={file.name} onDelete={() => setFile(null)} />}
              </Stack>
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button onClick={() => { setBaslik(""); setIcerik(""); setKategori(""); setFile(null); }}>Temizle</Button>
                <Button type="submit" variant="contained">Kaydet</Button>
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={700}>Makaleler</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {loading ? "Yükleniyor..." : `Toplam: ${list.length}`}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Typography variant="overline">Bekleyen</Typography>
            <List dense>
              {pending.map((m) => (
                <ListItem
                  key={m.id}
                  secondaryAction={
                    <Stack direction="row" spacing={1}>
                      <IconButton aria-label="publish" onClick={() => publish(m.id)}><PublishRoundedIcon /></IconButton>
                      <IconButton aria-label="delete" onClick={() => remove(m.id)}><DeleteRoundedIcon /></IconButton>
                    </Stack>
                  }
                >
                  <ListItemText primary={m.baslik} secondary={m.kategori || "—"} />
                </ListItem>
              ))}
              {pending.length === 0 && <Typography variant="body2" color="text.secondary" sx={{ pl: 2 }}>Bekleyen yok</Typography>}
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="overline">Yayımlanan</Typography>
            <List dense>
              {published.map((m) => (
                <ListItem
                  key={m.id}
                  secondaryAction={
                    <Stack direction="row" spacing={1}>
                      <IconButton aria-label="to-draft" onClick={() => draft(m.id)}><UnpublishedRoundedIcon /></IconButton>
                      <IconButton aria-label="delete" onClick={() => remove(m.id)}><DeleteRoundedIcon /></IconButton>
                    </Stack>
                  }
                >
                  <ListItemText primary={m.baslik} secondary={m.kategori || "—"} />
                </ListItem>
              ))}
              {published.length === 0 && <Typography variant="body2" color="text.secondary" sx={{ pl: 2 }}>Yayımlı yok</Typography>}
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="overline">Taslak</Typography>
            <List dense>
              {draftList.map((m) => (
                <ListItem
                  key={m.id}
                  secondaryAction={
                    <Stack direction="row" spacing={1}>
                      <IconButton aria-label="publish" onClick={() => publish(m.id)}><PublishRoundedIcon /></IconButton>
                      <IconButton aria-label="delete" onClick={() => remove(m.id)}><DeleteRoundedIcon /></IconButton>
                    </Stack>
                  }
                >
                  <ListItemText primary={m.baslik} secondary={m.kategori || "—"} />
                </ListItem>
              ))}
              {draftList.length === 0 && <Typography variant="body2" color="text.secondary" sx={{ pl: 2 }}>Taslak yok</Typography>}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={toast.open}
        autoHideDuration={2500}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          severity={toast.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.msg}
        </Alert>
      </Snackbar>
    </Container>
  );
}
