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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        pt: { xs: 4, sm: 6 },
        pb: { xs: 2, sm: 3 },
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%',
            maxWidth: '1000px',
            mx: 'auto',
          }}
        >
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {[home4, home1, home2].map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Box
                    component="img"
                    src={image}
                    alt={`Pizza ${index + 1}`}
                    sx={{
                      width: '100%',
                      height: { xs: 182, sm: 208, md: 234 },
                      objectFit: 'cover',
                      borderRadius: 2,
                      boxShadow: 3,
                    }}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: 'center',
                fontWeight: 600,
                color: 'white',
                letterSpacing: 2,
                lineHeight: 1.4,
                maxWidth: '900px',
                margin: '0 auto',
                mt: 6,
                mb: 8,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: '50%',
                  top: '-20px',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '3px',
                  background: 'primary.main',
                  borderRadius: '2px',
                },
                '& .highlight': {
                  color: 'primary.main',
                  fontStyle: 'italic',
                }
              }}
            >
              Bringing <span className="highlight">authentic wood-fired</span> pizzas to your favorite spots
            </Typography>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}

export default Hero; 