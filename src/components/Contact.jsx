import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Email as EmailIcon, Phone as PhoneIcon } from '@mui/icons-material';
import contact1 from '../assets/images/contact1.png';

const eventTypes = [
  'Corporate Event',
  'Festival',
  'Wedding',
  'Private Party',
  'Other',
];

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    message: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSnackbar({
      open: true,
      message: 'Thank you for your inquiry! We will get back to you soon.',
      severity: 'success',
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      date: '',
      message: '',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box
      component="section"
      sx={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8))',
        minHeight: '100vh',
        pt: 8,
        pb: 6,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          align="center"
          sx={{ 
            mb: 6,
            fontWeight: 600,
            '& span': {
              color: 'primary.main'
            }
          }}
        >
          Get in <span>Touch</span>
        </Typography>
        
        <Grid container spacing={4}>
          {/* Left Column - Image */}
          <Grid item xs={12} md={6}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Box
                component="img"
                src={contact1}
                alt="Contact Us"
                sx={{
                  width: '70%',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: 2,
                }}
              />
            </Box>
          </Grid>

          {/* Right Column - Contact Form */}
          <Grid item xs={12} md={6}>
            <Box
              component={motion.form}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                bgcolor: 'white',
                p: 4,
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    name="name"
                    label="Name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    name="phone"
                    label="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    placeholder="+44 (0) XXXX XXXXXX"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="eventType"
                    select
                    label="Event Type"
                    value={formData.eventType}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  >
                    {eventTypes.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="date"
                    label="Event Date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    name="message"
                    label="Message"
                    value={formData.message}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                type="submit"
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    transition: 'transform 0.2s',
                  },
                }}
              >
                Send Message
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Information Box */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={{
          position: 'relative',
          mt: 6,
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          py: 3,
          color: 'white',
          width: '100%',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                Where We Operate
              </Typography>
              <Typography variant="body1">
                Based in Sevenoaks, Kent.<br />
                Available in London, the South & South East for events.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                Event Types
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                <Typography component="li">Corporate Events</Typography>
                <Typography component="li">Festivals</Typography>
                <Typography component="li">Weddings</Typography>
                <Typography component="li">Private Parties</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                Contact Information
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <EmailIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body1">
                  <a 
                    href="mailto:info@sommipizza.com" 
                    style={{ 
                      color: 'inherit', 
                      textDecoration: 'none',
                    }}
                    onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                  >
                    info@sommipizza.com
                  </a>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body1">+44 (0) 1242 123456</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Contact; 