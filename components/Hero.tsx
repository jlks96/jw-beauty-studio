import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
    const t = useTranslations();
    
    const stats = [
        { value: '100+', label: 'Happy Clients' },
        { value: '5.0★', label: 'Google Rating' },
        { value: '13+', label: 'Years Experience' },
    ];

    // Using the Streamable embed URL for iframe for robust playback
    const videoEmbedSrc = "https://streamable.com/e/fkns65?autoplay=1&muted=1&loop=1&nocontrols=1";

    return (
        <Box
            id="home"
            component="section"
            sx={{
                color: 'common.white',
                minHeight: { xs: '60vh', md: '65vh', lg: '75vh' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
                position: 'relative',
                overflow: 'hidden',
                bgcolor: 'common.white',
            }}
        >
            {/* Video Background Container */}
            <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                <Box
                    component="iframe"
                    src={videoEmbedSrc}
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    title="Promotional Video"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        minWidth: '177.78vh',
                        minHeight: '100vh',
                        width: '100vw',
                        height: '56.25vw',
                        maxWidth: 'none',
                        transform: {
                            xs: 'translate(-50%, -50%) scale(0.6)',
                            sm: 'translate(-50%, -50%) scale(0.7)',
                            md: 'translate(-50%, -50%) scale(0.8)',
                            lg: 'translate(-50%, -50%) scale(0.95)',
                        },
                    }}
                />
            </Box>

            {/* Overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
                    zIndex: 1,
                }}
            />

            <Container maxWidth="lg" sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 700,
                        color: 'common.white',
                        mb: 2,
                        textShadow: '0 2px 10px rgba(0,0,0,0.7)',
                        fontSize: { xs: '2.25rem', md: '3.75rem', lg: '4.5rem' },
                    }}
                >
                    {t.heroTitle}
                </Typography>
                
                <Typography
                    variant="h5"
                    sx={{
                        maxWidth: '800px',
                        mx: 'auto',
                        mb: 4,
                        color: 'common.white',
                        textShadow: '0 1px 5px rgba(0,0,0,0.7)',
                        fontSize: { xs: '1.125rem', md: '1.25rem', lg: '1.5rem' },
                    }}
                >
                    {t.heroSubtitle}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 10 }}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => scrollToSection('booking')}
                        sx={{
                            bgcolor: 'common.white',
                            color: 'primary.main',
                            fontWeight: 600,
                            px: 4,
                            py: 1.5,
                            '&:hover': { bgcolor: 'grey.100' },
                        }}
                    >
                        {t.navBookNow}
                    </Button>
                </Box>
                
                <Box sx={{ position: 'absolute', bottom: -60, left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 2rem)', maxWidth: '900px', mx: 'auto' }}>
                    <Paper
                        elevation={4}
                        sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(12px)',
                            borderRadius: 3,
                            p: 2,
                            color: 'common.white',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}
                    >
                        <Stack 
                            direction="row" 
                            divider={<Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />} 
                            justifyContent="space-evenly"
                        >
                            {stats.map((stat) => (
                                <Box key={stat.label} sx={{ textAlign: 'center', px: 1, flex: 1 }}>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '1.25rem', md: '2rem' }, color: 'common.white' }}>
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                                        {stat.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
};

export default Hero;