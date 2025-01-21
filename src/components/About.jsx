import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { LocalPizza, Favorite, People } from '@mui/icons-material';
import aboutUsImage from '../assets/images/aboutus.jpg';
import { memo, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
import logger from '../utils/logger';
import { trackComponentRender } from '../utils/performance';

const features = [
  {
    icon: <LocalPizza sx={{ fontSize: 40 }} aria-hidden="true" />,
    title: "Authentic Recipe",
    description: "Traditional Neapolitan techniques passed down through generations",
  },
  {
    icon: <Favorite sx={{ fontSize: 40 }} aria-hidden="true" />,
    title: "Made with Love",
    description: "Every pizza crafted with passion and attention to detail",
  },
  {
    icon: <People sx={{ fontSize: 40 }} aria-hidden="true" />,
    title: "Community First",
    description: "Bringing people together through the love of great food",
  },
];

const FeatureCard = memo(({ feature, index }) => {
  useEffect(() => {
    const stopTracking = trackComponentRender(`FeatureCard_${index}`);
    logger.trackComponentLifecycle(`FeatureCard_${index}`, 'mount');
    
    return () => {
      stopTracking();
      logger.trackComponentLifecycle(`FeatureCard_${index}`, 'unmount');
    };
  }, [index]);

  return (
    <Grid item xs={12} md={4}>
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 }}
        elevation={0}
        sx={{
          p: 4,
          textAlign: 'center',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          transition: '0.3s',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 8px 20px rgba(255, 75, 0, 0.2)',
          }
        }}
        role="article"
        aria-labelledby={`feature-${index}-title`}
        onClick={() => logger.trackUserAction('feature_card_click', { feature: feature.title })}
      >
        <Box sx={{ color: 'primary.main', mb: 2 }}>
          {feature.icon}
        </Box>
        <Typography variant="h5" gutterBottom id={`feature-${index}-title`}>
          {feature.title}
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.8 }}>
          {feature.description}
        </Typography>
      </Paper>
    </Grid>
  );
});

FeatureCard.displayName = 'FeatureCard';

function About() {
  useEffect(() => {
    const stopTracking = trackComponentRender('About');
    logger.trackComponentLifecycle('About', 'mount');
    
    return () => {
      stopTracking();
      logger.trackComponentLifecycle('About', 'unmount');
    };
  }, []);

  return (
    <ErrorBoundary componentName="About">
      <Box 
        component="section" 
        sx={{ 
          background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8))',
          py: 8,
          minHeight: '100vh',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            {/* Image Section */}
            <Grid item xs={12} md={6}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                sx={{
                  display: 'flex',
                  height: '100%',
                  minHeight: 400,
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                }}
              >
                <Box
                  component="img"
                  src={aboutUsImage}
                  alt="Sommi Pizza family business - wood-fired pizza truck"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    margin: 0,
                    padding: 0,
                  }}
                  loading="eager"
                  onError={(e) => {
                    logger.error('Image load failed', null, {
                      src: aboutUsImage,
                      component: 'About'
                    });
                    e.target.src = '/fallback-about.jpg'; // Make sure to add a fallback image
                  }}
                />
              </Box>
            </Grid>

            {/* Text Section */}
            <Grid item xs={12} md={6}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                role="article"
              >
                <Typography 
                  variant="h3" 
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    '& span': {
                      color: 'primary.main'
                    }
                  }}
                  component="h1"
                >
                  Our <span>Story</span>
                </Typography>
                <Typography variant="body1" paragraph sx={{ opacity: 0.9 }}>
                  After my mother sadly passed away nearly two years ago, the eldest of seven Sommi children, born to Anglo-Italian parents, Alfonso and Winnifred Sommi, I decided to fulfil one of my passions, as well as celebrate her life.
                </Typography>
                <Typography variant="body1" paragraph sx={{ opacity: 0.9 }}>
                  Last year I bought a van, got it converted and re-trained as a pizza chef. Together with my brother and sister we created 'sommipizza', a family run business solely focussed on creating great pizzas.
                </Typography>
                <Typography variant="body1" paragraph sx={{ opacity: 0.9 }}>
                  We make our own dough to the recipe of our friend and mentor Ciro Vitiello. Our pizzas are hand stretched and cooked in a traditional wood-fired oven on board the truck using a blend of the best Italian and English ingredients. Our mantra of 'less is more' means we only ever have a maximum of seven pizzas on the menu, one for each of the Sommi siblings.
                </Typography>
                <Typography variant="body1" paragraph sx={{ opacity: 0.9 }}>
                  In addition to this, we serve 'Winnies' Garlic Bread and the 'Alfonso', a pizza big enough for the whole family to share.
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Ultimately 'sommipizza' is all about the pizza but for us each and every one is a tribute to our beautiful and much missed mother Patricia Mary.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 8 }}>
            <Grid 
              container 
              spacing={4}
              role="list"
              aria-label="Our key features"
            >
              {features.map((feature, index) => (
                <FeatureCard key={feature.title} feature={feature} index={index} />
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </ErrorBoundary>
  );
}

export default memo(About); 