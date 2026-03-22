
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { CtaButton } from './common/CtaButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

interface PromoBannerProps {
  scrollToSection: (sectionId: string) => void;
}

const PromoBanner: React.FC<PromoBannerProps> = ({scrollToSection}) => {
    const t = useTranslations();

    return (
        <Box id="promo-banner" component="section" sx={{ bgcolor: '#FEF3EF', py: 8 }}>
            <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="h2" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: 'primary.main', mb: 2 }}>
                    {t.promoBannerTitle}
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4 }} dangerouslySetInnerHTML={{ __html: t.promoBannerDesc as string }} />
                <CtaButton onClick={() => scrollToSection('booking')}>
                    {t.promoBannerButton}
                </CtaButton>
            </Container>
        </Box>
    );
};

export default PromoBanner;
