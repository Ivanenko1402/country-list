import { Box, Link, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#333', color: '#fff', py: 2, px: 4 }}>
      <Typography variant="body2" align="center">
        Find me:
        {' '}
        <Link
          href="https://github.com/Ivanenko1402?tab=repositories"
          target="_blank"
          rel="noopener"
        >
          Github
        </Link>
        {' | '}
        <Link
          href="https://www.linkedin.com/in/valentyn-ivanenko-1b32111a0"
          target="_blank"
          rel="noopener"
        >
          Linkedin
        </Link>
        {' | '}
        <Link
          href="https://www.facebook.com/valentin.ivanenko.5"
          target="_blank"
          rel="noopener"
        >
          Facebook
        </Link>
      </Typography>
    </Box>
  );
};