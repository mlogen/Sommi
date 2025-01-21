import { Box, Container, Typography, TextField, Button, Grid, Paper, IconButton } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

function AdminDashboard() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([
    { day: 'Monday', location: 'The Brewery Quarter', address: 'St. George\'s Road, Cheltenham GL50 3LA', time: '12:00 - 20:00' },
    { day: 'Wednesday', location: 'High Street Market', address: 'High Street, Cheltenham GL50 1DZ', time: '11:00 - 19:00' },
    { day: 'Friday', location: 'Victoria Gardens', address: 'Royal Well Rd, Cheltenham GL50 3JN', time: '16:00 - 21:00' }
  ]);

  const [menuItems, setMenuItems] = useState([
    { name: 'Classic Margherita', description: 'Fresh tomatoes, mozzarella, basil, and our signature sauce', price: '14' },
    { name: 'Veggie Supreme', description: 'Courgette, aubergine, roasted peppers, and fresh basil pesto', price: '16' },
    { name: 'Spicy Pepperoni', description: 'Spicy pepperoni, mozzarella, chilli flakes', price: '15' }
  ]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  const handleLocationUpdate = (index, field, value) => {
    const newLocations = [...locations];
    newLocations[index] = { ...newLocations[index], [field]: value };
    setLocations(newLocations);
  };

  const handleMenuUpdate = (index, field, value) => {
    const newMenu = [...menuItems];
    newMenu[index] = { ...newMenu[index], [field]: value };
    setMenuItems(newMenu);
  };

  const handleSave = () => {
    // Here you would typically save to a backend
    console.log('Saving updates:', { locations, menuItems });
    // Show success message
    alert('Changes saved successfully!');
  };

  return (
    <Box sx={{ minHeight: '100vh', py: 4, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4">Admin Dashboard</Typography>
          <IconButton onClick={handleLogout} color="primary" title="Logout">
            <LogoutIcon />
          </IconButton>
        </Box>

        <Grid container spacing={4}>
          {/* Locations Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h5" sx={{ mb: 3 }}>Locations</Typography>
              {locations.map((loc, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        label="Day"
                        value={loc.day}
                        onChange={(e) => handleLocationUpdate(index, 'day', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        label="Location"
                        value={loc.location}
                        onChange={(e) => handleLocationUpdate(index, 'location', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        label="Address"
                        value={loc.address}
                        onChange={(e) => handleLocationUpdate(index, 'address', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        label="Time"
                        value={loc.time}
                        onChange={(e) => handleLocationUpdate(index, 'time', e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* Menu Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 3 }}>Menu Items</Typography>
              {menuItems.map((item, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        label="Name"
                        value={item.name}
                        onChange={(e) => handleMenuUpdate(index, 'name', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Description"
                        value={item.description}
                        onChange={(e) => handleMenuUpdate(index, 'description', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        label="Price (£)"
                        value={item.price}
                        onChange={(e) => handleMenuUpdate(index, 'price', e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default AdminDashboard; 