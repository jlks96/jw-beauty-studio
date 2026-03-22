
import React from 'react';
import { STUDIO_WHATSAPP_NUMBER } from '../../constants';
import { useTranslations } from '../../hooks/useTranslations';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const FloatingWhatsApp: React.FC = () => {
    const t = useTranslations();

    return (
        <Fab
            component="a"
            href={`https://wa.me/${STUDIO_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            variant="extended"
            sx={{
                position: 'fixed',
                right: 20,
                bottom: 20,
                zIndex: 1000,
                bgcolor: '#25D366',
                color: 'common.white',
                '&:hover': { bgcolor: '#1EBE5A' },
                animation: 'float 3s ease-in-out infinite',
                '@keyframes float': {
                    '0%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-5px)' },
                    '100%': { transform: 'translateY(0px)' },
                },
            }}
        >
            <WhatsAppIcon sx={{ mr: 1 }} />
            <Typography variant="body2" fontWeight={600} color="inherit">
                {t.whatsappChat}
            </Typography>
        </Fab>
    );
};

export default FloatingWhatsApp;
