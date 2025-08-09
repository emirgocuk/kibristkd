import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const HaberKarti = ({ image, title, description }) => {
    return (
        <Card sx={{ maxWidth: 345, m: 2 }}>
            {image && (
                <CardMedia
                    component="img"
                    height="180"
                    image={image}
                    alt={title}
                />
            )}
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default HaberKarti;
