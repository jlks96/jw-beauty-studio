import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { Service } from '../types';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface ServiceCardProps {
    service: Service;
    onBookService: (serviceId: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBookService }) => {
    const t = useTranslations();
    const isFullWidth = service.colSpan?.includes('lg:col-span-3');

    return (
        <Card 
            sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: isFullWidth ? { xs: 'column', md: 'row' } : 'column',
                position: 'relative',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: 6,
                    '& .hoverLayer': { opacity: 1 },
                    '& .bookButton': { transform: 'translateY(0)', opacity: 1 }
                }
            }}
        >
            {service.isPromo && (
                <Box sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'primary.main', color: 'common.white', px: 1.5, py: 0.5, borderRadius: '0 0 0 8px', zIndex: 1, fontWeight: 'bold', fontSize: '0.75rem' }}>
                    {t.promoBadge}
                </Box>
            )}
            
            <CardMedia
                component="img"
                image={service.image}
                alt={t[service.titleKey] as string}
                sx={{ width: isFullWidth ? { xs: '100%', md: '50%' } : '100%', height: isFullWidth ? { xs: 224, md: 'auto' } : 224 }}
                onError={(e: any) => (e.target.src = `https://placehold.co/600x400/FFEBCD/333333?text=${encodeURIComponent(t[service.titleKey] as string)}`)}
            />
            
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', p: { xs: 3, md: 4 } }}>
                <Typography variant="h5" component="h3" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600, color: 'primary.dark', mb: 1.5 }}>
                    {t[service.titleKey]}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                    {t[service.descriptionKey]}
                </Typography>
                <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600, mt: 'auto' }}>
                    {service.oldPriceKey && (
                        <Box component="span" sx={{ textDecoration: 'line-through', color: 'text.disabled', fontSize: '0.875rem', mr: 1 }}>
                            {t[service.oldPriceKey]}
                        </Box>
                    )}
                    {t[service.priceKey]}
                </Typography>
            </CardContent>

            <Box className="hoverLayer" sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', opacity: 0, transition: 'opacity 0.3s' }} />
            
            <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', p: 3, pointerEvents: 'none' }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className="bookButton"
                    onClick={() => onBookService(service.id)}
                    sx={{ pointerEvents: 'auto', opacity: 0, transform: 'translateY(16px)', transition: 'all 0.3s', bgcolor: 'common.white', color: 'primary.dark', '&:hover': { bgcolor: 'grey.100' } }}
                >
                    {t.bookThisTreatment}
                </Button>
            </Box>
        </Card>
    );
};

export default ServiceCard;