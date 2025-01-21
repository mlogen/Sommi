import { Box, Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import GrassIcon from '@mui/icons-material/Grass';
import CakeIcon from '@mui/icons-material/Cake';
import menu1 from '../assets/images/menu1.jpeg';
import { memo, useEffect, useRef } from 'react';
import ErrorBoundary from './ErrorBoundary';
import logger from '../utils/logger';
import { trackComponentRender } from '../utils/performance';

const menuItems = [
  {
    title: 'Classic Margherita',
    description: 'Fresh tomatoes, mozzarella, basil, and our signature sauce',
    price: '£14',
    icon: <LocalPizzaIcon aria-hidden="true" />,
    image: menu1,
    allergens: ['dairy', 'gluten'],
    dietary: ['vegetarian']
  },
  {
    title: 'Veggie Supreme',
    description: 'Courgette, aubergine, roasted peppers, and fresh basil pesto',
    price: '£16',
    icon: <GrassIcon aria-hidden="true" />,
    image: menu1,
    allergens: ['dairy', 'gluten', 'nuts'],
    dietary: ['vegetarian']
  },
  {
    title: 'Spicy Pepperoni',
    description: 'Italian pepperoni, chilli flakes, mozzarella, and tomato sauce',
    price: '£15',
    icon: <LocalFireDepartmentIcon aria-hidden="true" />,
    image: menu1,
    allergens: ['dairy', 'gluten'],
    dietary: []
  },
  {
    title: 'Mediterranean',
    description: 'Olives, sun-dried tomatoes, feta, and oregano',
    price: '£16',
    icon: <RestaurantIcon aria-hidden="true" />,
    image: menu1,
    allergens: ['dairy', 'gluten'],
    dietary: ['vegetarian']
  },
  {
    title: 'Quattro Formaggi',
    description: 'Mozzarella, gorgonzola, parmesan, and ricotta',
    price: '£17',
    icon: <SoupKitchenIcon aria-hidden="true" />,
    image: menu1,
    allergens: ['dairy', 'gluten'],
    dietary: ['vegetarian']
  },
  {
    title: 'Nutella & Berry',
    description: 'Nutella, mascarpone, fresh berries, and powdered sugar',
    price: '£15',
    icon: <CakeIcon aria-hidden="true" />,
    image: menu1,
    allergens: ['dairy', 'gluten', 'nuts'],
    dietary: ['vegetarian']
  }
];

const MenuItem = memo(({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });
  
  useEffect(() => {
    const stopTracking = trackComponentRender(`MenuItem_${index}`);
    logger.trackComponentLifecycle(`MenuItem_${index}`, 'mount');
    
    return () => {
      stopTracking();
      logger.trackComponentLifecycle(`MenuItem_${index}`, 'unmount');
    };
  }, [index]);

  return (
    <Grid item xs={12} sm={6} md={4} component="li" role="listitem">
      <Card
        ref={ref}
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.3) }}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          '&:hover': {
            transform: { xs: 'none', sm: 'translateY(-8px)' },
            boxShadow: '0 8px 20px rgba(255, 75, 0, 0.2)',
          }
        }}
        role="article"
        aria-labelledby={`menu-item-${index}-title`}
        onClick={() => logger.trackUserAction('menu_item_click', { item: item.title })}
      >
        <CardMedia
          component="img"
          height={{ xs: 160, sm: 180, md: 200 }}
          width="100%"
          image={item.image}
          alt={`${item.title} pizza`}
          sx={{ 
            objectFit: 'cover',
            aspectRatio: '16/9',
            backgroundColor: 'rgba(0,0,0,0.1)'
          }}
          loading={index > 2 ? "lazy" : "eager"}
          decoding="async"
          onError={(e) => {
            logger.error('Image load failed', null, {
              src: item.image,
              item: item.title
            });
            e.target.src = '/fallback-pizza.jpg';
          }}
        />
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box sx={{ color: 'primary.main', mr: 1 }} aria-hidden="true">
              {item.icon}
            </Box>
            <Typography 
              variant="h6" 
              component="h3" 
              id={`menu-item-${index}-title`}
              sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
            >
              {item.title}
            </Typography>
          </Box>
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 2, 
              opacity: 0.8,
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            {item.description}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'primary.main',
              fontWeight: 600 
            }}
          >
            {item.price}
          </Typography>
          {/* Allergen and Dietary Information */}
          <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {item.allergens.map((allergen) => (
              <Typography 
                key={allergen} 
                variant="caption" 
                sx={{ 
                  bgcolor: 'error.main',
                  px: 1,
                  borderRadius: 1,
                  opacity: 0.8
                }}
                role="note"
                aria-label={`Contains ${allergen}`}
              >
                {allergen}
              </Typography>
            ))}
            {item.dietary.map((diet) => (
              <Typography 
                key={diet} 
                variant="caption" 
                sx={{ 
                  bgcolor: 'success.main',
                  px: 1,
                  borderRadius: 1,
                  opacity: 0.8
                }}
                role="note"
                aria-label={`Suitable for ${diet}`}
              >
                {diet}
              </Typography>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
});

MenuItem.displayName = 'MenuItem';

function Menu() {
  useEffect(() => {
    const stopTracking = trackComponentRender('Menu');
    logger.trackComponentLifecycle('Menu', 'mount');
    
    // Add structured data for SEO
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Menu',
      name: 'Sommi Pizza Menu',
      hasMenuSection: [{
        '@type': 'MenuSection',
        name: 'Pizza Menu',
        hasMenuItem: menuItems.map(item => ({
          '@type': 'MenuItem',
          name: item.title,
          description: item.description,
          price: item.price,
          suitableForDiet: item.dietary.map(diet => `${diet}Diet`),
        }))
      }]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      stopTracking();
      logger.trackComponentLifecycle('Menu', 'unmount');
      document.head.removeChild(script);
    };
  }, []);

  return (
    <ErrorBoundary componentName="Menu">
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
          <Typography
            variant="h3"
            align="center"
            sx={{ 
              mb: 6, 
              fontWeight: 600,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              '& span': {
                color: 'primary.main'
              }
            }}
            component="h1"
          >
            Our <span>Menu</span>
          </Typography>
          <Grid 
            container 
            spacing={{ xs: 2, sm: 3, md: 4 }}
            role="list"
            aria-label="Pizza menu items"
            sx={{ listStyle: 'none', p: 0, m: 0 }}
          >
            {menuItems.map((item, index) => (
              <MenuItem key={item.title} item={item} index={index} />
            ))}
          </Grid>
        </Container>
      </Box>
    </ErrorBoundary>
  );
}

export default memo(Menu); 