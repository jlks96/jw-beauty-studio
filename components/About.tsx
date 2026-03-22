
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { aboutCarouselImages } from '../constants';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const About: React.FC = () => {
    const t = useTranslations();
    const [currentIndex, setCurrentIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % aboutCarouselImages.length);
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + aboutCarouselImages.length) % aboutCarouselImages.length);
    };

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(nextSlide, 5000);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [currentIndex, nextSlide]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <Box
            id="about"
            component="section"
            ref={sectionRef}
            sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper', overflow: 'hidden' }}
        >
            <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: { xs: 4, md: 6 } }}>
                {/* Carousel Side */}
                <Box
                    sx={{
                        width: { xs: '100%', md: '42%' },
                        transition: 'all 0.7s ease-out',
                        transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
                        opacity: isVisible ? 1 : 0,
                    }}
                >
                    <Paper elevation={3} sx={{ bgcolor: '#FDF5E6', borderRadius: 3, p: 2 }}>
                        <Box
                            sx={{
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: 2,
                                height: 450,
                                width: '100%',
                                maxWidth: 450,
                                mx: 'auto',
                                '&:hover .carouselControl': { opacity: 1, transform: 'translateX(0)' },
                            }}
                        >
                            {/* Carousel Track */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    transition: 'transform 0.5s ease-in-out',
                                    height: '100%',
                                    transform: `translateX(-${currentIndex * 100}%)`,
                                }}
                            >
                                {aboutCarouselImages.map((image, index) => (
                                    <Box key={image.src} sx={{ width: '100%', flexShrink: 0, height: '100%' }}>
                                        <Box
                                            component="img"
                                            src={image.src}
                                            alt={image.alt}
                                            loading={index === 0 ? "eager" : "lazy"}
                                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onError={(e: any) => (e.target.src = 'https://placehold.co/500x500/F5E9E2/78350F?text=Studio+View')}
                                        />
                                    </Box>
                                ))}
                            </Box>

                            {/* Controls */}
                            <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1 }}>
                                <IconButton
                                    className="carouselControl"
                                    onClick={prevSlide}
                                    aria-label="Previous slide"
                                    sx={{ bgcolor: 'rgba(255,255,255,0.6)', opacity: 0, transform: 'translateX(-16px)', transition: 'all 0.3s', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}
                                >
                                    <ChevronLeftIcon />
                                </IconButton>
                                <IconButton
                                    className="carouselControl"
                                    onClick={nextSlide}
                                    aria-label="Next slide"
                                    sx={{ bgcolor: 'rgba(255,255,255,0.6)', opacity: 0, transform: 'translateX(16px)', transition: 'all 0.3s', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}
                                >
                                    <ChevronRightIcon />
                                </IconButton>
                            </Box>

                            {/* Dots */}
                            <Box sx={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 1, zIndex: 1 }}>
                                {aboutCarouselImages.map((_, index) => (
                                    <Box
                                        key={index}
                                        component="button"
                                        onClick={() => goToSlide(index)}
                                        aria-label={`Go to slide ${index + 1}`}
                                        sx={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: '50%',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s',
                                            bgcolor: currentIndex === index ? 'common.white' : 'rgba(255,255,255,0.6)',
                                            transform: currentIndex === index ? 'scale(1.25)' : 'scale(1)',
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Paper>
                </Box>

                {/* Text Side */}
                <Box
                    sx={{
                        width: { xs: '100%', md: '58%' },
                        transition: 'all 0.7s ease-out 0.2s',
                        transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
                        opacity: isVisible ? 1 : 0,
                    }}
                >
                    <Typography variant="h2" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: 'primary.dark', mb: 3, textAlign: { xs: 'center', md: 'left' } }}>
                        {t.aboutTitle}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.8, fontSize: '1.125rem' }}>
                        {t.aboutP1}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.8 }}>
                        {t.aboutP2}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'primary.main', lineHeight: 1.8, fontWeight: 500 }}>
                        {t.aboutP3}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default About;