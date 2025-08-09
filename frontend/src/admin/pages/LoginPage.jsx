import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const navigate = useNavigate();
	const [loginError, setLoginError] = React.useState('');

	const onSubmit = async (data) => {
		try {
			setLoginError('');
			const response = await axios.post('/api/auth/login', data);
			if (response.data.token) {
				localStorage.setItem('token', response.data.token);
				navigate('/admin/dashboard'); 
			}
		} catch (error) {
			console.error('Giriş hatası:', error);
			setLoginError('E-posta veya şifre hatalı.');
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography component="h1" variant="h5">
					Yönetici Girişi
				</Typography>
				<Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="E-posta Adresi"
						autoComplete="email"
						autoFocus
						{...register('email', { required: 'E-posta zorunludur' })}
						error={!!errors.email}
						helperText={errors.email?.message}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						label="Şifre"
						type="password"
						id="password"
						autoComplete="current-password"
						{...register('password', { required: 'Şifre zorunludur' })}
						error={!!errors.password}
						helperText={errors.password?.message}
					/>
					{loginError && (
						<Typography color="error" variant="body2" sx={{ mt: 1 }}>
							{loginError}
						</Typography>
					)}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Giriş Yap
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default LoginPage;
