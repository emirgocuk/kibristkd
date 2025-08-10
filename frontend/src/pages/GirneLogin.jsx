// submit handler
const submit = async (e) => {
  e.preventDefault(); setErr(null);
  try {
    const u = await login(email, password); // AuthContext user döndürüyor
    const role = (u?.role || "").toLowerCase();
    if (role === "admin") nav("/girne/panel", { replace: true });
    else setErr("Bu hesaba admin yetkisi tanımlı değil.");
  } catch (e2) {
    setErr(e2?.response?.data?.message || e2.message || "Giriş başarısız");
  }
};
