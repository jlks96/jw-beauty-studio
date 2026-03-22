import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
    isNavVisible: boolean;
    scrollToSection: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ isNavVisible, scrollToSection }) => {
    const { language, toggleLanguage } = useLanguage();
    const t = useTranslations();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleNavClick = (sectionId: string) => {
        scrollToSection(sectionId);
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { id: 'home', labelKey: 'navHome' },
        { id: 'services', labelKey: 'navServices' },
        { id: 'about', labelKey: 'navAbout' },
        { id: 'google-reviews', labelKey: 'navReviews' },
        { id: 'contact', labelKey: 'navContact' },
    ];

    return (
        <Slide appear={false} direction="down" in={isNavVisible}>
            <AppBar position="sticky" sx={{ bgcolor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(4px)' }} elevation={1}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 64 }}>
                        {/* Logo */}
                        <Box onClick={() => handleNavClick('home')} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <Box component="img" src="https://iili.io/F4Ghz5N.png" alt={t.contactStudioName as string} sx={{ height: 48, mr: 1.5 }} />
                            <Typography variant="h6" component="div" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: '#78350F', letterSpacing: 1, textShadow: '0px 1px 1px rgba(0,0,0,0.1)' }}>
                                {t.navStudioName}
                            </Typography>
                        </Box>

                        {/* Desktop Nav */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                            {navLinks.map((link) => (
                                <Button key={link.id} onClick={() => handleNavClick(link.id)} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'background.default' } }}>
                                    {t[link.labelKey as keyof typeof t]}
                                </Button>
                            ))}
                            <Button variant="contained" color="primary" onClick={() => handleNavClick('booking')} sx={{ ml: 1, boxShadow: 2 }}>
                                {t.navBookNow}
                            </Button>
                            <Button variant="outlined" color="inherit" onClick={toggleLanguage} sx={{ ml: 1, color: 'text.secondary', borderColor: 'divider' }}>
                                {language === 'en' ? '中文' : 'English'}
                            </Button>
                        </Box>

                        {/* Mobile Toggle */}
                        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                            <Button variant="outlined" size="small" color="inherit" onClick={toggleLanguage} sx={{ mr: 1, color: 'text.secondary', borderColor: 'divider' }}>
                                {language === 'en' ? '中文' : 'English'}
                            </Button>
                            <IconButton edge="end" color="inherit" aria-label="menu" onClick={() => setIsMobileMenuOpen(true)}>
                                <MenuIcon sx={{ color: 'text.secondary' }} />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>

                {/* Mobile Drawer */}
                <Drawer anchor="top" open={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} PaperProps={{ sx: { width: '100%', pt: 8 } }}>
                    <Box role="presentation">
                        <List>
                            {navLinks.map((link) => (
                                <ListItem key={link.id} disablePadding>
                                    <ListItemButton onClick={() => handleNavClick(link.id)} sx={{ textAlign: 'center' }}>
                                        <ListItemText primary={t[link.labelKey as keyof typeof t]} primaryTypographyProps={{ color: 'text.secondary', fontWeight: 500 }} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                            <ListItem disablePadding sx={{ px: 2, mt: 1, mb: 2 }}>
                                <Button fullWidth variant="contained" color="primary" onClick={() => handleNavClick('booking')} sx={{ py: 1.5 }}>
                                    {t.navBookNow}
                                </Button>
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
            </AppBar>
        </Slide>
    );
};

export default Header;