import { Box, Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import home1 from '../assets/images/home1.jpeg';
import home2 from '../assets/images/home2.jpeg';
import home4 from '../assets/images/home4.png';

function Hero() {
  return (
    <Box
      component="section"
      id="hero"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'relative',
        background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8))',
        bgcolor: 'background.default',
        pt: { xs: 10, sm: 12 },
        pb: 0,
        overflow: 'hidden',
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: '100%',
          position: 'relative',
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            textAlign: 'center',
            width: '100%',
            maxWidth: '1000px',
            mx: 'auto',
            mt: { xs: 2, sm: 3 },
          }}
        >
          <Grid container spacing={3} sx={{ mb: 4, maxWidth: '900px', justifyContent: 'center', mx: 'auto' }}>
            {[home4, home1, home2].map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  sx={{
                    height: { xs: 200, sm: 220, md: 250 },
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  }}
                >
                  <img
                    src={image}
                    alt={`Sommi Pizza ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              '& .sommi': {
                color: '#F5F5F5',
              },
              '& .pizza': {
                color: '#FF4B00',
              }
            }}
          >
            <span className="sommi">sommi</span>
            <span className="pizza">pizza</span>
          </Typography>
          <Typography
            variant="h3"
            sx={{
              mb: 3,
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.8rem' },
              fontWeight: 400,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              color: 'secondary.main',
              maxWidth: '800px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            Bringing authentic wood-fired pizzas to your favorite spots
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Hero; 