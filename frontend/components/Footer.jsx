import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
	return (
		<Box
			component="footer"
			sx={{
				backgroundColor: '#f8f9fa',
				borderTop: '1px solid #dee2e6',
				py: 4,
				mt: 'auto'
			}}
		>
			<Container maxWidth="lg">
				<Grid container spacing={4}>
					<Grid item xs={12} sm={4}>
						<Typography variant="h6" gutterBottom>
							Kıbrıs Türk Kültür Derneği
						</Typography>
						<Typography variant="body2" color="textSecondary">
							Derneğimiz hakkında daha fazla bilgi edinin ve etkinliklerimizi takip edin.
						</Typography>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Typography variant="h6" gutterBottom>
							Hızlı Bağlantılar
						</Typography>
						<Link href="/hakkimizda" color="inherit" display="block">Hakkımızda</Link>
						<Link href="/tarihce" color="inherit" display="block">Tarihçe</Link>
						<Link href="/yonetim-kurulu" color="inherit" display="block">Yönetim Kurulu</Link>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Typography variant="h6" gutterBottom>
							İletişim
						</Typography>
						<Typography variant="body2" color="textSecondary">
							Adres: Dernek Sokak No:1, Ankara
						</Typography>
						<Typography variant="body2" color="textSecondary">
							Email: info@kibristkd.org
						</Typography>
					</Grid>
				</Grid>
			</Container>
			<Box sx={{ bgcolor: '#333', color: '#fff', py: 3, textAlign: 'center', mt: 4 }}>
				<Typography variant="body2">
					© {new Date().getFullYear()} Kıbrıs Türk Kültür Derneği. Tüm hakları saklıdır.
				</Typography>
			</Box>
		</Box>
	);
};

export default Footer;
