
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Footer: React.FC = () => {
    const t = useTranslations();
    const currentYear = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'secondary.main',
                color: 'text.primary',
                py: 5,
                borderTop: '2px solid',
                borderColor: 'rgba(226, 149, 120, 0.3)',
            }}
        >
            <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                <Typography variant="body1">
                    © {currentYear}{' '}
                    <Box component="span" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: '#78350F' }}>
                        {t.contactStudioName}
                    </Box>
                    . All Rights Reserved.
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    {t.footerAddress}
                </Typography>
                <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }} dangerouslySetInnerHTML={{ __html: t.footerTagline as string }} />
            </Container>
        </Box>
    );
};

export default Footer;
