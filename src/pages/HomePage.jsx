import { Box } from '@mui/material';
import Hero from '../components/Hero';
import Calendar from '../components/Calendar';

function HomePage() {
  return (
    <Box 
      component="main" 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8))',
        bgcolor: 'background.default',
        pt: { xs: 8, md: 10 },
        pb: { xs: 4, md: 6 },
      }}
    >
      <Hero />
      <Calendar />
    </Box>
  );
}

export default HomePage; 