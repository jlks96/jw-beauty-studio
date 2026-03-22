
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { services } from '../constants';
import ServiceCard from './ServiceCard';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

interface ServicesProps {
    onBookService: (serviceId: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onBookService }) => {
    const t = useTranslations();

    return (
        <Box id="services" component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#FDF5E6' }}>
            <Container maxWidth="lg">
                <Typography variant="h2" align="center" sx={{ fontWeight: 'bold', color: 'primary.dark', mb: 8, fontFamily: '"Playfair Display", serif' }}>
                    {t.servicesTitle}
                </Typography>
                <Grid container spacing={4}>
                    {services.map(service => (
                        <Grid size={{ xs: 12, md: service.colSpan?.includes('lg:col-span-3') ? 12 : 6, lg: service.colSpan?.includes('lg:col-span-3') ? 12 : 4 }} key={service.id}>
                            <ServiceCard service={service} onBookService={onBookService} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Services;