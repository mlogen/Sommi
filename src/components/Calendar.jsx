import { Box, Container, Typography, Grid, Card, CardContent, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { CalendarMonth, LocationOn, AccessTime } from '@mui/icons-material';

// Get current date and format it
const currentDate = new Date();
const nextWeek = new Date(currentDate);
nextWeek.setDate(currentDate.getDate() + 7);

const formatDate = (date) => {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

const locations = [
  {
    day: "Monday",
    dates: [formatDate(currentDate), formatDate(nextWeek)],
    location: "The Brewery Quarter",
    address: "St. George's Road, Cheltenham GL50 3LA",
    mapsUrl: "https://maps.google.com/?q=The+Brewery+Quarter+Cheltenham",
    time: "12:00 - 20:00",
  },
  {
    day: "Wednesday",
    dates: [
      formatDate(new Date(currentDate.setDate(currentDate.getDate() + 2))),
      formatDate(new Date(nextWeek.setDate(nextWeek.getDate() + 2)))
    ],
    location: "High Street Market",
    address: "High Street, Cheltenham GL50 1DZ",
    mapsUrl: "https://maps.google.com/?q=High+Street+Cheltenham",
    time: "11:00 - 19:00",
  },
  {
    day: "Friday",
    dates: [
      formatDate(new Date(currentDate.setDate(currentDate.getDate() + 2))),
      formatDate(new Date(nextWeek.setDate(nextWeek.getDate() + 2)))
    ],
    location: "Victoria Gardens",
    address: "Royal Well Rd, Cheltenham GL50 3JN",
    mapsUrl: "https://maps.google.com/?q=Victoria+Gardens+Cheltenham",
    time: "16:00 - 21:00",
  },
];

function Calendar() {
  return (
    <Box
      id="locations"
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        pt: 0,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component={motion.h2}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          align="center"
          sx={{ 
            mb: { xs: 2, md: 2 },
            fontWeight: 600, 
            color: 'white',
            fontSize: { xs: '1.25rem', md: '1.5rem' }
          }}
        >
          Where to Find Us
        </Typography>

        <Grid container spacing={{ xs: 1, md: 2 }}>
          {locations.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                elevation={2}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                }}
              >
                <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <CalendarMonth sx={{ color: 'primary.main', mr: 1, fontSize: '1.1rem' }} />
                    <Box>
                      <Typography variant="h6" component="h3" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                        {item.day}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.75rem' }}>
                        {item.dates[0]} & {item.dates[1]}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 0.5 }}>
                    <LocationOn sx={{ color: 'primary.main', mr: 1, mt: 0.25, fontSize: '1.1rem' }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>{item.location}</Typography>
                      <Link 
                        href={item.mapsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.7)',
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline',
                            color: 'primary.main'
                          },
                          fontSize: '0.75rem'
                        }}
                      >
                        <Typography variant="body2" sx={{ fontSize: 'inherit' }}>
                          {item.address}
                        </Typography>
                      </Link>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTime sx={{ color: 'primary.main', mr: 1, fontSize: '1.1rem' }} />
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.75rem' }}>
                      {item.time}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Calendar; 