import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Container, Paper, Stack, TextField, Button, Typography, Alert } from "@mui/material";

export default function GirneLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      // Panel’e yönlen ve "başarıyla giriş" bilgisini taşı
      navigate("/girne/panel", { replace: true, state: { justLoggedIn: true } });
    } catch (e) {
      console.error(e);
      setErr("Giriş başarısız. Bilgileri kontrol edin.");
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>Girne Panel Girişi</Typography>
        <Stack spacing={2} component="form" onSubmit={submit}>
          <TextField label="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField label="Şifre" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {err && <Alert severity="error">{err}</Alert>}
          <Button type="submit" variant="contained">Giriş Yap</Button>
        </Stack>
      </Paper>
    </Container>
  );
}
