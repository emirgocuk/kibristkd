import React, { useState } from "react";
import { Box, Button, Container, Paper, Stack, TextField, Typography, Alert } from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GirneLogin() {
  const { user, login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string|null>(null);

  if (user) return <Navigate to="/girne/panel" replace />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    try { await login(email, password); nav("/girne/panel"); }
    catch (e: any) { setErr(e?.response?.data?.message || e?.message || "Giriş başarısız"); }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>Girne — Yönetim Girişi</Typography>
        <Box component="form" onSubmit={submit}>
          <Stack spacing={2}>
            {err && <Alert severity="error">{err}</Alert>}
            <TextField label="E-posta" value={email} onChange={e=>setEmail(e.target.value)} required />
            <TextField label="Şifre" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
            <Button type="submit" variant="contained">Giriş yap</Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
