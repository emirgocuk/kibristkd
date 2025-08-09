import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import axios from 'axios';

const GlobalContent = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get('/api/settings/content');
        setContent(res.data.globalContent || '');
      } catch (err) {
        console.error(err);
      }
    };
    fetchContent();
  }, []);

  if (!content) return null;

  return (
    <Box sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', py: 2 }}>
      <Container dangerouslySetInnerHTML={{ __html: content }} />
    </Box>
  );
};

export default GlobalContent;
