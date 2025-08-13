import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

// Bu component, başlık ve içerik metni alarak basit bir sayfa oluşturur.
// Eğer content prop'u sağlanmazsa, varsayılan olarak Lorem Ipsum metni gösterir.
function GenericTextPage({ title, content }) {
  const defaultContent = (
    <>
      <Typography paragraph sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
        sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Nulla
        facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
        maximus est, id dignissim quam.
      </Typography>
      <Typography paragraph sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet,
        ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.
        Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
        Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.
      </Typography>
      <Typography paragraph sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
        Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis
        tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis.
        Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate
        magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan
        porttitor, facilisis luctus, metus.
      </Typography>
    </>
  );

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 } }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          {title}
        </Typography>
        <Box>
          {content || defaultContent}
        </Box>
      </Paper>
    </Container>
  );
}

export default GenericTextPage;
