// frontend/src/pages/GirnePanel.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import http from "../api/http";

import {
  AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItemButton,
  ListItemText, Box, Container, Paper, Stack, TextField, Button, Divider,
  Chip, MenuItem, Snackbar, Alert, ListItemIcon, FormControlLabel, Switch, List as MList
} from "@mui/material";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import SlideshowRoundedIcon from "@mui/icons-material/SlideshowRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import UnpublishedRoundedIcon from "@mui/icons-material/UnpublishedRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const DRAWER_WIDTH = 260;
const APPBAR_HEIGHT = 64;

function Section({ children }) {
  return <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>{children}</Paper>;
}

export default function GirnePanel() {
  const { user, logout } = useAuth?.() || { user: null, logout: null };

  // sol menü seçimi
  const [menuOpen, setMenuOpen] = useState(false);
  const [section, setSection] = useState("posts"); // "posts" | "slider" | "authors" | "announcements"

  // bildirim
  const [toast, setToast] = useState({ open: false, msg: "", type: "success" });
  const ok = (m, t = "success") => setToast({ open: true, msg: m, type: t });

  // ----- ortak veriler
  const [authors, setAuthors] = useState([]);

  // ----- Makaleler
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [pTitle, setPTitle] = useState("");
  const [pBody, setPBody] = useState("");
  const [pCat, setPCat] = useState("");
  const [pAuthorId, setPAuthorId] = useState("");
  const [pFile, setPFile] = useState(null);

  const published = useMemo(() => posts.filter(p => p.status === "published"), [posts]);
  const pending   = useMemo(() => posts.filter(p => p.status === "pending"), [posts]);
  const drafts    = useMemo(() => posts.filter(p => p.status === "draft"), [posts]);

  // ----- Slider
  const [slides, setSlides] = useState([]);
  const [sTitle, setSTitle] = useState("");
  const [sSubtitle, setSSubtitle] = useState("");
  const [sHref, setSHref] = useState("");
  const [sSort, setSSort] = useState(0);
  const [sActive, setSActive] = useState(true);
  const [sFile, setSFile] = useState(null);

  // ----- Yazarlar
  const [aName, setAName] = useState("");
  const [aBio, setABio] = useState("");
  const [aTwitter, setATwitter] = useState("");
  const [aInsta, setAInsta] = useState("");
  const [aWeb, setAWeb] = useState("");
  const [aFile, setAFile] = useState(null);

  // ----- Duyurular
  const [anns, setAnns] = useState([]);
  const [anTitle, setAnTitle] = useState("");
  const [anMsg, setAnMsg] = useState("");
  const [anSort, setAnSort] = useState(0);
  const [anActive, setAnActive] = useState(true);

  // --- Label (InputLabel) rengi: varsayılan siyah, focus'ta kırmızı
  const labelProps = { sx: { color: 'text.primary', '&.Mui-focused': { color: 'error.main' } } };

  // -------- loaders
  async function loadAuthors() {
    const res = await http.get("/authors/admin");
    setAuthors(res.data?.data ?? []);
  }
  async function loadPosts() {
    try {
      setLoadingPosts(true);
      const res = await http.get("/makaleler/admin");
      setPosts(res.data?.data ?? []);
    } finally {
      setLoadingPosts(false);
    }
  }
  async function loadSlides() {
    const res = await http.get("/slider/admin");
    setSlides(res.data?.data ?? []);
  }
  async function loadAnnouncements() {
    const res = await http.get("/duyurular/admin"); // TR alias backend’de var
    setAnns(res.data?.data ?? []);
  }

  useEffect(() => {
    loadAuthors();
    loadPosts();
    loadSlides();
    loadAnnouncements();
  }, []);

  // -------- Makale actions
  async function createPost(e) {
    e.preventDefault();
    if (!pTitle.trim() || !pBody.trim()) return ok("Başlık ve içerik zorunlu", "warning");

    const created = (await http.post("/makaleler", {
      baslik: pTitle.trim(),
      icerik: pBody.trim(),
      kategori: pCat.trim() || null,
      authorId: pAuthorId ? Number(pAuthorId) : null
    })).data?.data;

    if (pFile && created?.id) {
      const fd = new FormData();
      fd.append("file", pFile);
      await http.post(`/makaleler/${created.id}/kapak`, fd, { headers: { "Content-Type": "multipart/form-data" } });
    }

    ok("Makale eklendi");
    setPTitle(""); setPBody(""); setPCat(""); setPAuthorId(""); setPFile(null);
    await loadPosts();
  }
  const publishPost = async (id) => { await http.post(`/makaleler/${id}/publish`); ok("Yayımlandı"); loadPosts(); };
  const draftPost   = async (id) => { await http.post(`/makaleler/${id}/draft`);   ok("Taslağa alındı","info"); loadPosts(); };
  const deletePost  = async (id) => { await http.delete(`/makaleler/${id}`);       ok("Silindi","warning"); loadPosts(); };

  // -------- Slider actions
  async function createSlide(e) {
    e.preventDefault();
    if (!sTitle.trim()) return ok("Başlık zorunlu", "warning");

    const created = (await http.post("/slider", {
      title: sTitle.trim(),
      subtitle: sSubtitle.trim() || null,
      linkHref: sHref.trim() || null,
      sort: Number(sSort) || 0,
      active: !!sActive
    })).data?.data;

    if (sFile && created?.id) {
      const fd = new FormData();
      fd.append("file", sFile);
      await http.post(`/slider/${created.id}/image`, fd, { headers: { "Content-Type": "multipart/form-data" } });
    }

    ok("Slider kaydı eklendi");
    setSTitle(""); setSSubtitle(""); setSHref(""); setSSort(0); setSActive(true); setSFile(null);
    await loadSlides();
  }
  const toggleSlide = async (s) => { await http.put(`/slider/${s.id}`, { active: !s.active }); loadSlides(); };
  const deleteSlide = async (id) => { await http.delete(`/slider/${id}`); ok("Silindi","warning"); loadSlides(); };

  // -------- Author actions
  async function createAuthor(e) {
    e.preventDefault();
    if (!aName.trim()) return ok("İsim zorunlu", "warning");

    const created = (await http.post("/authors", {
      name: aName.trim(),
      bio: aBio.trim() || null,
      socials: {
        twitter: aTwitter.trim() || undefined,
        instagram: aInsta.trim() || undefined,
        website: aWeb.trim() || undefined,
      }
    })).data?.data;

    if (aFile && created?.id) {
      const fd = new FormData();
      fd.append("file", aFile);
      await http.post(`/authors/${created.id}/avatar`, fd, { headers: { "Content-Type": "multipart/form-data" } });
    }

    ok("Yazar eklendi");
    setAName(""); setABio(""); setATwitter(""); setAInsta(""); setAWeb(""); setAFile(null);
    await loadAuthors();
  }
  const deleteAuthor = async (id) => { await http.delete(`/authors/${id}`); ok("Yazar silindi","warning"); loadAuthors(); };

  // -------- Duyuru actions
  async function createAnnouncement(e) {
    e.preventDefault();
    if (!anTitle.trim()) return ok("Başlık zorunlu", "warning");
    await http.post("/duyurular", {
      title: anTitle.trim(),
      message: anMsg.trim() || null,
      sort: Number(anSort) || 0,
      active: !!anActive,
    });
    ok("Duyuru eklendi");
    setAnTitle(""); setAnMsg(""); setAnSort(0); setAnActive(true);
    await loadAnnouncements();
  }
  const toggleAnnouncement = async (a) => {
    await http.put(`/duyurular/${a.id}`, { active: !a.active });
    await loadAnnouncements();
  };
  const deleteAnnouncement = async (id) => {
    await http.delete(`/duyurular/${id}`);
    ok("Silindi","warning");
    await loadAnnouncements();
  };

  // -------- logout
  const handleLogout = async () => {
    if (logout) {
      await logout();
    }
    window.location.href = "/girne";
  };

  // -------------------- Sol çekmece içeriği --------------------
  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* scroll edilebilir kısım */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <List sx={{ py: 0 }}>
          <ListItemButton selected={section==="posts"} onClick={()=>{setSection("posts"); setMenuOpen(false);}}>
            <ListItemIcon><DescriptionRoundedIcon /></ListItemIcon>
            <ListItemText primary="Makaleler" />
          </ListItemButton>
          <ListItemButton selected={section==="slider"} onClick={()=>{setSection("slider"); setMenuOpen(false);}}>
            <ListItemIcon><SlideshowRoundedIcon /></ListItemIcon>
            <ListItemText primary="Slider" />
          </ListItemButton>
          <ListItemButton selected={section==="authors"} onClick={()=>{setSection("authors"); setMenuOpen(false);}}>
            <ListItemIcon><PeopleAltRoundedIcon /></ListItemIcon>
            <ListItemText primary="Yazarlar" />
          </ListItemButton>
          <ListItemButton selected={section==="announcements"} onClick={()=>{setSection("announcements"); setMenuOpen(false);}}>
            <ListItemIcon><CampaignRoundedIcon /></ListItemIcon>
            <ListItemText primary="Duyurular" />
          </ListItemButton>
        </List>
      </Box>

      {/* alt sabit “Hoş geldiniz” */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          p: 2,
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="caption" sx={{ color: "text.primary", fontSize: 12, fontWeight: 600 }}>
          Hoş geldiniz,
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{user?.email || "—"}</Typography>
        <Button
          size="small"
          variant="outlined"
          startIcon={<LogoutRoundedIcon />}
          onClick={handleLogout}
          fullWidth
        >
          Çıkış Yap
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'error.main',
          color: 'common.white',
          borderRadius: 0,
          boxShadow: '0 1px 2px rgba(0,0,0,.08)',
          zIndex: (t) => t.zIndex.drawer + 1
        }}
      >
        <Toolbar sx={{ minHeight: APPBAR_HEIGHT, gap: 2 }}>
          <IconButton
            edge="start"
            onClick={() => setMenuOpen(true)}
            sx={{ color: 'common.white', display: { md: 'none' } }}
          >
            <MenuRoundedIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: .2, color: '#fff !important' }}>
            Yönetim Paneli
          </Typography>

          {/* AppBar sağında kayan duyuru */}
          <Box sx={{ ml: 'auto', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: { xs: '40%', md: '50%' } }}>
            <Box
              sx={{
                display: 'inline-block',
                px: 2,
                animation: 'marquee 15s linear infinite',
                '@keyframes marquee': {
                  '0%': { transform: 'translateX(100%)' },
                  '100%': { transform: 'translateX(-100%)' },
                },
                color: '#fff',
                opacity: 0.9,
                fontSize: 14,
              }}
              title={anns.filter(a=>a.active).map(a=>a.title).join(' • ')}
            >
              {anns.filter(a=>a.active).map(a => a.title).join(' • ') || 'Duyuru yok'}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sol Drawer (permanent) */}
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
            top: APPBAR_HEIGHT,
            overflow: 'hidden',
            borderRight: '1px solid',
            borderColor: 'divider',
            borderRadius: 0,
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      {/* Mobil Drawer (temporary) */}
      <Drawer
        variant="temporary"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          [`& .MuiDrawer-paper`]: {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
            top: APPBAR_HEIGHT,
            overflow: 'hidden',
            borderRadius: 0,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Sağ içerik */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
        {/* AppBar boşluğu */}
        <Toolbar sx={{ minHeight: APPBAR_HEIGHT }} />

        <Container maxWidth="lg" sx={{ px: 0 }}>
          {section === "posts" && (
            <>
              <Section>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>Yeni Makale</Typography>
                <Stack spacing={2} component="form" onSubmit={createPost}>
                  <TextField label="Başlık" value={pTitle} onChange={(e)=>setPTitle(e.target.value)} required InputLabelProps={labelProps} />
                  <TextField label="Kategori" value={pCat} onChange={(e)=>setPCat(e.target.value)} InputLabelProps={labelProps} />
                  <TextField label="İçerik" value={pBody} onChange={(e)=>setPBody(e.target.value)} multiline minRows={5} required InputLabelProps={labelProps} />
                  <TextField select label="Yazar (opsiyonel)" value={pAuthorId} onChange={(e)=>setPAuthorId(e.target.value)} InputLabelProps={labelProps}>
                    <MenuItem value="">— Yok —</MenuItem>
                    {authors.map(a => <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>)}
                  </TextField>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button component="label" variant="outlined" startIcon={<AddPhotoAlternateRoundedIcon />}>
                      Kapak Görseli
                      <input hidden type="file" accept="image/*" onChange={(e)=>setPFile(e.target.files?.[0]||null)} />
                    </Button>
                    {pFile && <Chip label={pFile.name} onDelete={()=>setPFile(null)} />}
                  </Stack>
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button onClick={()=>{ setPTitle(""); setPBody(""); setPCat(""); setPAuthorId(""); setPFile(null); }}>Temizle</Button>
                    <Button type="submit" variant="contained">Kaydet</Button>
                  </Stack>
                </Stack>
              </Section>

              <Section>
                <Typography variant="subtitle1" fontWeight={700}>Makaleler</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {loadingPosts ? "Yükleniyor..." : `Toplam: ${posts.length}`}
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Typography variant="overline">Bekleyen</Typography>
                {pending.length === 0 && <Typography sx={{ mb:1 }} color="text.secondary">Bekleyen yok</Typography>}
                {pending.map(m => (
                  <MList dense key={`p-${m.id}`}>
                    <ListItemButton>
                      <ListItemText primary={m.baslik} secondary={m.kategori || "—"} />
                      <Stack direction="row" spacing={1}>
                        <Button size="small" onClick={()=>publishPost(m.id)} startIcon={<PublishRoundedIcon/>}>Yayınla</Button>
                        <Button size="small" onClick={()=>deletePost(m.id)} color="error" startIcon={<DeleteRoundedIcon/>}>Sil</Button>
                      </Stack>
                    </ListItemButton>
                  </MList>
                ))}

                <Divider sx={{ my: 2 }} />
                <Typography variant="overline">Yayımlanan</Typography>
                {published.length === 0 && <Typography sx={{ mb:1 }} color="text.secondary">Yayımlı yok</Typography>}
                {published.map(m => (
                  <MList dense key={`pub-${m.id}`}>
                    <ListItemButton>
                      <ListItemText primary={m.baslik} secondary={m.kategori || "—"} />
                      <Stack direction="row" spacing={1}>
                        <Button size="small" onClick={()=>draftPost(m.id)} startIcon={<UnpublishedRoundedIcon/>}>Taslağa Al</Button>
                        <Button size="small" onClick={()=>deletePost(m.id)} color="error" startIcon={<DeleteRoundedIcon/>}>Sil</Button>
                      </Stack>
                    </ListItemButton>
                  </MList>
                ))}

                <Divider sx={{ my: 2 }} />
                <Typography variant="overline">Taslak</Typography>
                {drafts.length === 0 && <Typography sx={{ mb:1 }} color="text.secondary">Taslak yok</Typography>}
                {drafts.map(m => (
                  <MList dense key={`d-${m.id}`}>
                    <ListItemButton>
                      <ListItemText primary={m.baslik} secondary={m.kategori || "—"} />
                      <Stack direction="row" spacing={1}>
                        <Button size="small" onClick={()=>publishPost(m.id)} startIcon={<PublishRoundedIcon/>}>Yayınla</Button>
                        <Button size="small" onClick={()=>deletePost(m.id)} color="error" startIcon={<DeleteRoundedIcon/>}>Sil</Button>
                      </Stack>
                    </ListItemButton>
                  </MList>
                ))}
              </Section>
            </>
          )}

          {section === "slider" && (
            <>
              <Section>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>Yeni Slider</Typography>
                <Stack spacing={2} component="form" onSubmit={createSlide}>
                  <TextField label="Başlık" value={sTitle} onChange={(e)=>setSTitle(e.target.value)} required InputLabelProps={labelProps} />
                  <TextField label="Alt başlık" value={sSubtitle} onChange={(e)=>setSSubtitle(e.target.value)} InputLabelProps={labelProps} />
                  <TextField label="Link (opsiyonel)" value={sHref} onChange={(e)=>setSHref(e.target.value)} placeholder="/haber/slug-ya-da-url" InputLabelProps={labelProps} />
                  <TextField type="number" label="Sıra" value={sSort} onChange={(e)=>setSSort(e.target.value)} InputLabelProps={labelProps} />
                  <FormControlLabel control={<Switch checked={sActive} onChange={(e)=>setSActive(e.target.checked)} />} label="Aktif" />
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button component="label" variant="outlined" startIcon={<AddPhotoAlternateRoundedIcon />}>
                      Görsel Yükle
                      <input hidden type="file" accept="image/*" onChange={(e)=>setSFile(e.target.files?.[0]||null)} />
                    </Button>
                    {sFile && <Chip label={sFile.name} onDelete={()=>setSFile(null)} />}
                  </Stack>
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button onClick={()=>{ setSTitle(""); setSSubtitle(""); setSHref(""); setSSort(0); setSActive(true); setSFile(null); }}>Temizle</Button>
                    <Button type="submit" variant="contained">Kaydet</Button>
                  </Stack>
                </Stack>
              </Section>

              <Section>
                <Typography variant="subtitle1" fontWeight={700}>Slider Kayıtları</Typography>
                <Divider sx={{ my: 2 }} />
                {slides.length === 0 && <Typography color="text.secondary">Kayıt yok</Typography>}
                {slides.map(s => (
                  <MList dense key={s.id}>
                    <ListItemButton>
                      <ListItemText primary={`${s.sort}. ${s.title}`} secondary={s.subtitle || s.linkHref || "—"} />
                      <Stack direction="row" spacing={1}>
                        <Button size="small" onClick={()=>toggleSlide(s)}>{s.active ? "Pasifleştir" : "Aktifleştir"}</Button>
                        <Button size="small" onClick={()=>deleteSlide(s.id)} color="error">Sil</Button>
                      </Stack>
                    </ListItemButton>
                  </MList>
                ))}
              </Section>
            </>
          )}

          {section === "authors" && (
            <>
              <Section>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>Yeni Yazar</Typography>
                <Stack spacing={2} component="form" onSubmit={createAuthor}>
                  <TextField label="İsim" value={aName} onChange={(e)=>setAName(e.target.value)} required InputLabelProps={labelProps} />
                  <TextField label="Biyografi" value={aBio} onChange={(e)=>setABio(e.target.value)} multiline minRows={4} InputLabelProps={labelProps} />
                  <TextField label="Twitter" value={aTwitter} onChange={(e)=>setATwitter(e.target.value)} InputLabelProps={labelProps} />
                  <TextField label="Instagram" value={aInsta} onChange={(e)=>setAInsta(e.target.value)} InputLabelProps={labelProps} />
                  <TextField label="Web Sitesi" value={aWeb} onChange={(e)=>setAWeb(e.target.value)} InputLabelProps={labelProps} />
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button component="label" variant="outlined" startIcon={<AddPhotoAlternateRoundedIcon />}>
                      Avatar Yükle
                      <input hidden type="file" accept="image/*" onChange={(e)=>setAFile(e.target.files?.[0]||null)} />
                    </Button>
                    {aFile && <Chip label={aFile.name} onDelete={()=>setAFile(null)} />}
                  </Stack>
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button onClick={()=>{ setAName(""); setABio(""); setATwitter(""); setAInsta(""); setAWeb(""); setAFile(null); }}>Temizle</Button>
                    <Button type="submit" variant="contained">Kaydet</Button>
                  </Stack>
                </Stack>
              </Section>

              <Section>
                <Typography variant="subtitle1" fontWeight={700}>Yazarlar</Typography>
                <Divider sx={{ my: 2 }} />
                {authors.length === 0 && <Typography color="text.secondary">Yazar yok</Typography>}
                {authors.map(a => (
                  <MList dense key={a.id}>
                    <ListItemButton>
                      <ListItemText primary={a.name} secondary={`/${a.slug}`} />
                      <Button size="small" color="error" onClick={()=>deleteAuthor(a.id)}>Sil</Button>
                    </ListItemButton>
                  </MList>
                ))}
              </Section>
            </>
          )}

          {section === "announcements" && (
            <>
              <Section>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>Yeni Duyuru</Typography>
                <Stack spacing={2} component="form" onSubmit={createAnnouncement}>
                  <TextField label="Başlık" value={anTitle} onChange={(e)=>setAnTitle(e.target.value)} required InputLabelProps={labelProps} />
                  <TextField label="Mesaj (opsiyonel)" value={anMsg} onChange={(e)=>setAnMsg(e.target.value)} multiline minRows={3} InputLabelProps={labelProps} />
                  <TextField type="number" label="Sıra" value={anSort} onChange={(e)=>setAnSort(e.target.value)} InputLabelProps={labelProps} />
                  <FormControlLabel control={<Switch checked={anActive} onChange={(e)=>setAnActive(e.target.checked)} />} label="Aktif" />
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button onClick={()=>{ setAnTitle(""); setAnMsg(""); setAnSort(0); setAnActive(true); }}>Temizle</Button>
                    <Button type="submit" variant="contained">Kaydet</Button>
                  </Stack>
                </Stack>
              </Section>

              <Section>
                <Typography variant="subtitle1" fontWeight={700}>Duyurular</Typography>
                <Divider sx={{ my: 2 }} />
                {anns.length === 0 && <Typography color="text.secondary">Kayıt yok</Typography>}
                {anns.map(a => (
                  <MList dense key={a.id}>
                    <ListItemButton>
                      <ListItemText primary={`${a.sort}. ${a.title}`} secondary={a.message || "—"} />
                      <Stack direction="row" spacing={1}>
                        <Button size="small" onClick={()=>toggleAnnouncement(a)}>{a.active ? "Pasifleştir" : "Aktifleştir"}</Button>
                        <Button size="small" onClick={()=>deleteAnnouncement(a.id)} color="error">Sil</Button>
                      </Stack>
                    </ListItemButton>
                  </MList>
                ))}
              </Section>
            </>
          )}
        </Container>
      </Box>

      <Snackbar
        open={toast.open}
        autoHideDuration={2200}
        onClose={()=>setToast(t=>({ ...t, open:false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={()=>setToast(t=>({ ...t, open:false }))} severity={toast.type} variant="filled" sx={{ width: "100%" }}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}