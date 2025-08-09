import React, { useState, useEffect, useCallback } from 'react';
import {
	Box,
	TextField,
	Button,
	Typography,
	Paper,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	CircularProgress,
	Alert,
	Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';

// Yeni bileşen: Onay Bekleyen Makaleler
const OnayBekleyenMakaleler = () => {
	const [makaleler, setMakaleler] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const fetchPendingMakaleler = useCallback(async () => {
		setLoading(true);
		setError('');
		const token = localStorage.getItem('token');
		if (!token) {
			setError('Yetkiniz yok. Lütfen tekrar giriş yapın.');
			setLoading(false);
			return;
		}

		try {
			const response = await axios.get('/api/makaleler/pending', {
				headers: { Authorization: `Bearer ${token}` },
			});
			setMakaleler(response.data);
		} catch (err) {
			setError('Onay bekleyen makaleler yüklenirken bir sorun oluştu.');
			console.error(err);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchPendingMakaleler();
	}, [fetchPendingMakaleler]);

	const handleStatusUpdate = async (id, status) => {
		const token = localStorage.getItem('token');
		try {
			await axios.put(
				`/api/makaleler/${id}/status`,
				{ status },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			// Arayüzden makaleyi anında kaldır
			setMakaleler((prev) => prev.filter((makale) => makale.id !== id));
		} catch (err) {
			alert('İşlem sırasında bir hata oluştu.');
			console.error(err);
		}
	};

	if (loading) {
		return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;
	}

	if (error) {
		return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
	}

	return (
		<Paper sx={{ p: 3, mt: 4 }}>
			<Typography variant="h5" gutterBottom>
				Onay Bekleyen Makaleler
			</Typography>
			{makaleler.length === 0 ? (
				<Typography>Onay bekleyen makale bulunmuyor.</Typography>
			) : (
				<List>
					{makaleler.map((makale) => (
						<ListItem key={makale.id} divider>
							<ListItemText
								primary={makale.title}
								secondary={`Yazar: ${makale.author.name} - Tarih: ${new Date(
									makale.createdAt
								).toLocaleDateString()}`}
							/>
							<ListItemSecondaryAction>
								<IconButton
									edge="end"
									aria-label="onayla"
									onClick={() => handleStatusUpdate(makale.id, 'approved')}
									color="success"
								>
									<CheckCircleIcon />
								</IconButton>
								<IconButton
									edge="end"
									aria-label="reddet"
									onClick={() => handleStatusUpdate(makale.id, 'rejected')}
									color="error"
								>
									<CancelIcon />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					))}
				</List>
			)}
		</Paper>
	);
};


const MakaleYonetimi = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [message, setMessage] = useState(''); // Başarı veya hata mesajı için

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage(''); // Mesajı temizle

		const token = localStorage.getItem('token');
		if (!token) {
			setMessage('Yetkiniz yok. Lütfen tekrar giriş yapın.');
			return;
		}

		try {
			const response = await axios.post(
				'/api/makaleler',
				{ title, content },
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);

			setMessage(`'${response.data.title}' başlıklı makale başarıyla oluşturuldu ve onaya gönderildi.`);
			setTitle('');
			setContent('');
			// Yeni makale eklendiğinde onay bekleyenler listesini yenilemek için bir yöntem eklenebilir.
			// Ancak şu anki yapıda OnayBekleyenMakaleler bileşeni kendi içinde veriyi yeniliyor.
		} catch (error) {
			console.error('Makale oluşturma hatası:', error);
			setMessage('Makale oluşturulurken bir hata oluştu. Lütfen tüm alanları doldurduğunuzdan emin olun.');
		}
	};

	return (
		<Box>
			<Paper sx={{ p: 3 }}>
				<Typography variant="h5" gutterBottom>
					Yeni Makale Ekle
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						label="Makale Başlığı"
						fullWidth
						required
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						margin="normal"
					/>
					<TextField
						label="Makale İçeriği"
						fullWidth
						required
						multiline
						rows={10}
						value={content}
						onChange={(e) => setContent(e.target.value)}
						margin="normal"
					/>
					<Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
						Makaleyi Onaya Gönder
					</Button>
				</form>
				{message && (
					<Typography
						sx={{
							mt: 2,
							color: message.includes('hata') ? 'error.main' : 'success.main'
						}}
					>
						{message}
					</Typography>
				)}
			</Paper>

			<Divider sx={{ my: 4 }} />

			{/* Onay Bekleyen Makaleler bileşenini burada çağırıyoruz */}
			<OnayBekleyenMakaleler />
		</Box>
	);
};

export default MakaleYonetimi;
