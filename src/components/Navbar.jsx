import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Link,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'About Us', path: '/about' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    handleCloseNavMenu();
  };

  return (
    <AppBar 
      position="fixed" 
      elevation={0} 
      sx={{
        bgcolor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        height: { xs: 72, sm: 84 },
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          height: '100%',
          position: 'relative'
        }}>
          <Link
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.5rem', sm: '1.75rem' },
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
          </Link>

          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            gap: 4,
            alignItems: 'center'
          }}>
            {pages.map((page) => (
              <Link
                key={page.path}
                component={RouterLink}
                to={page.path}
                sx={{
                  textDecoration: 'none',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {page.name}
              </Link>
            ))}
          </Box>

          {/* Mobile menu */}
          <Box sx={{ 
            display: { xs: 'flex', md: 'none' },
            position: 'absolute',
            right: 0,
          }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: '#F5F5F5' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  background: 'rgba(0, 0, 0, 0.9)',
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={page.path}
                  sx={{ color: '#F5F5F5' }}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
}

export default Navbar; 