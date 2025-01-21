import { Box } from '@mui/material';
import Hero from '../components/Hero';
import Calendar from '../components/Calendar';

function HomePage() {
  return (
    <Box component="main" sx={{ flex: 1 }}>
      <Box sx={{ position: 'relative' }}>
        <Hero />
        <Calendar />
      </Box>
    </Box>
  );
}

export default HomePage; 