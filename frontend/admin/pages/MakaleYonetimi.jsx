import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import axios from 'axios';

const MakaleYonetimi = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [message, setMessage] = useState(''); // Başarı veya hata mesajı için

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage(''); // Mesajı temizle

		// Tarayıcı hafızasından token'ı al
		const token = localStorage.getItem('token');
		if (!token) {
			setMessage('Yetkiniz yok. Lütfen tekrar giriş yapın.');
			return;
		}

		try {
			// Backend'e yeni makale oluşturma isteği gönder
			const response = await axios.post(
				'/api/makaleler', // Endpoint
				{ title, content }, // Gönderilecek veri
				{
					headers: {
						// Token'ı Authorization başlığına ekle
						'Authorization': `Bearer ${token}`
					}
				}
			);

			// Başarılı olursa...
			setMessage(`'${response.data.title}' başlıklı makale başarıyla oluşturuldu ve onaya gönderildi.`);
			// Formu temizle
			setTitle('');
			setContent('');
		} catch (error) {
			console.error('Makale oluşturma hatası:', error);
			setMessage('Makale oluşturulurken bir hata oluştu. Lütfen tüm alanları doldurduğunuzdan emin olun.');
		}
	};

	return (
		<Paper sx={{ p: 3 }}>
			<Typography variant="h4" gutterBottom>
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
	);
};

export default MakaleYonetimi;
