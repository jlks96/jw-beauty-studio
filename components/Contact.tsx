
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { STUDIO_WHATSAPP_NUMBER } from '../constants';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

const Contact: React.FC = () => {
    const t = useTranslations();

    return (
        <Box id="contact" component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
            <Container maxWidth="lg">
                <Typography variant="h2" align="center" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: 'primary.dark', mb: 6 }}>
                    {t.contactTitle}
                </Typography>
                <Paper
                    elevation={4}
                    sx={{
                        maxWidth: 640,
                        mx: 'auto',
                        p: { xs: 4, md: 5 },
                        borderRadius: 3,
                        textAlign: 'center',
                        border: '2px solid #FDF5E6',
                    }}
                >
                    <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600, color: 'primary.dark', mb: 3 }}>
                        {t.contactStudioName}
                    </Typography>
                    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <LocationOnIcon sx={{ mr: 1.5, color: 'primary.main' }} />
                        <Typography variant="body1" color="text.secondary">
                            {t.contactAddress}
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <PhoneIcon sx={{ mr: 1.5, color: 'primary.main' }} />
                        <Typography variant="body1" color="text.secondary">
                            {t.contactWhatsappLabel}
                        </Typography>
                        <Link
                            href={`https://wa.me/${STUDIO_WHATSAPP_NUMBER}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ ml: 0.5, color: 'primary.main', fontWeight: 500, '&:hover': { color: 'primary.dark' } }}
                        >
                            {STUDIO_WHATSAPP_NUMBER}
                        </Link>
                    </Box>
                    <Typography variant="body2" color="text.disabled">
                        {t.contactHoursNote}
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default Contact;
