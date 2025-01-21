import { Box, Container, ImageList, ImageListItem, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import gallery2 from '../assets/images/gallery2.jpeg';
import gallery4 from '../assets/images/gallery4.jpeg';
import gallery5 from '../assets/images/gallery5.jpeg';
import gallery6 from '../assets/images/gallery6.jpeg';
import gallery7 from '../assets/images/gallery7.jpeg';
import gallery8 from '../assets/images/gallery8.jpeg';
import gallery9 from '../assets/images/gallery9.jpeg';
import gallery11 from '../assets/images/gallery11.jpeg';
import gallery12 from '../assets/images/gallery12.jpg';

const galleryItems = [
  { img: gallery5, title: 'Wood-Fired Oven', rows: 2, cols: 2 },
  { img: gallery4, title: 'Our Food Truck', rows: 1, cols: 2 },
  { img: gallery2, title: 'Fresh Ingredients', rows: 1, cols: 1 },
  { img: gallery6, title: 'Pizza Preparation', rows: 1, cols: 1 },
  { img: gallery11, title: 'Community Service', rows: 2, cols: 2 },
  { img: gallery7, title: 'Fresh from the Oven', rows: 1, cols: 1 },
  { img: gallery8, title: 'Artisan Process', rows: 1, cols: 2 },
  { img: gallery9, title: 'Perfect Crust', rows: 1, cols: 1 },
  { img: gallery12, title: 'Special Events', rows: 1, cols: 2 }
];

function Gallery() {
  return (
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
          component={motion.h2}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          variant="h2"
          align="center"
          sx={{ 
            mb: 6,
            fontWeight: 700,
            '& span': {
              color: 'primary.main'
            }
          }}
        >
          <span>Gallery</span>
        </Typography>
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ImageList
            variant="quilted"
            cols={4}
            rowHeight={200}
            gap={16}
            sx={{
              width: '100%',
              '& .MuiImageListItem-root': {
                overflow: 'hidden',
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                '& img': {
                  transition: 'transform 0.3s ease-in-out',
                },
                '&:hover img': {
                  transform: 'scale(1.1)',
                },
                '&:hover .image-overlay': {
                  transform: 'translateY(0)',
                  bgcolor: 'rgba(255, 75, 0, 0.8)',
                },
              },
            }}
          >
            {galleryItems.map((item, index) => (
              <ImageListItem 
                key={index} 
                cols={item.cols || 1} 
                rows={item.rows || 1}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  className="image-overlay"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    p: 1.5,
                    transform: 'translateY(100%)',
                    transition: 'all 0.3s ease-in-out',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {item.title}
                  </Typography>
                </Box>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Container>
    </Box>
  );
}

export default Gallery; 