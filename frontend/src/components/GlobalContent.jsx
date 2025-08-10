import { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import http, { unwrap } from '../api/http';

const GlobalContent = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const r = await http.get('/api/settings/content');
        const data = unwrap(r, {});
        setContent(data.globalContent || '');
      } catch (err) {
        console.error(err);
        setError(true);
        setContent('');
      }
    };
    fetchContent();
  }, []);

  if (error || !content) return null;

  return (
    <Box sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', py: 2 }}>
      <Container dangerouslySetInnerHTML={{ __html: content }} />
    </Box>
  );
};

export default GlobalContent;
