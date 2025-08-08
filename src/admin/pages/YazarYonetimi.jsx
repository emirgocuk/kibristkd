
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Select, MenuItem, FormControl, InputLabel, CircularProgress, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { jwtDecode } from 'jwt-decode';

const getRoleName = (role) => {
    switch (role) {
        case 'superadmin': return 'Süper Admin';
        case 'admin': return 'Admin';
        case 'yazar': return 'Yazar';
        default: return role;
    }
};

function YazarYonetimi() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'yazar' });
    const [currentUser, setCurrentUser] = useState(null);

    const token = localStorage.getItem('token');
    const { role: userRole } = token ? jwtDecode(token) : {};

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/yazarlar', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Yazarlar yüklenemedi.');
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setNewUser({ name: '', email: '', password: '', role: 'yazar' });
    };

    const handleInputChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const res = await fetch('/api/yazarlar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newUser)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Kullanıcı oluşturulamadı.');
            fetchUsers();
            handleClose();
        } catch (err) {
            alert(err.message);
        }
    };
    
    const handleDelete = async (id) => {
        if(window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')){
             try {
                const res = await fetch(`/api/yazarlar/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('Kullanıcı silinemedi.');
                fetchUsers();
            } catch (err) {
                alert(err.message);
            }
        }
    };

    return (
        <Paper sx={{ p: 3, backgroundColor: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1" fontWeight="bold">Yazar Yönetimi</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
                    Yeni Yazar Ekle
                </Button>
            </Box>

            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            
            {!loading && !error && (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ad Soyad</TableCell>
                                <TableCell>E-posta</TableCell>
                                <TableCell>Rol</TableCell>
                                <TableCell>Kayıt Tarihi</TableCell>
                                <TableCell align="right">İşlemler</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{getRoleName(user.role)}</TableCell>
                                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small"><EditIcon /></IconButton>
                                        {userRole === 'superadmin' && (
                                            <IconButton size="small" color="error" onClick={() => handleDelete(user.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Yeni Yazar Ekle</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" name="name" label="Ad Soyad" type="text" fullWidth variant="outlined" onChange={handleInputChange} />
                    <TextField margin="dense" name="email" label="E-posta Adresi" type="email" fullWidth variant="outlined" onChange={handleInputChange} />
                    <TextField margin="dense" name="password" label="Şifre" type="password" fullWidth variant="outlined" onChange={handleInputChange} />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Rol</InputLabel>
                        <Select name="role" value={newUser.role} label="Rol" onChange={handleInputChange}>
                            {userRole === 'superadmin' && <MenuItem value="superadmin">Süper Admin</MenuItem>}
                            {userRole === 'superadmin' && <MenuItem value="admin">Admin</MenuItem>}
                            <MenuItem value="yazar">Yazar</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>İptal</Button>
                    <Button onClick={handleSubmit} variant="contained">Ekle</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}

export default YazarYonetimi;
