
import React, { useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Reviews: React.FC = () => {
    const t = useTranslations();
    const embedScriptId = "shapo-embed-js";
    const schemaScriptId = "shapo-ratingschema-89a8f12c95";
    const widgetDivId = "shapo-widget-c1f5a102570c434bb845";

    useEffect(() => {
        if (document.getElementById(embedScriptId)) {
            return;
        }

        const schemaScript = document.createElement('script');
        schemaScript.id = schemaScriptId;
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);

        const embedScript = document.createElement('script');
        embedScript.id = embedScriptId;
        embedScript.src = "https://cdn.shapo.io/js/embed.js";
        embedScript.type = "text/javascript";
        embedScript.defer = true;
        document.head.appendChild(embedScript);

        return () => {
            const existingEmbedScript = document.getElementById(embedScriptId);
            const existingSchemaScript = document.getElementById(schemaScriptId);
            if (existingEmbedScript) {
                existingEmbedScript.remove();
            }
            if (existingSchemaScript) {
                existingSchemaScript.remove();
            }
        };
    }, []);

    return (
        <Box id="google-reviews" component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#FDF5E6' }}>
            <Container maxWidth="lg">
                <Typography variant="h2" align="center" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: 'primary.dark', mb: 5 }}>
                    {t.reviewsTitle}
                </Typography>
                {/* The Shapo script will find this div by its ID and populate it with the reviews widget. */}
                <Box id={widgetDivId} />
            </Container>
        </Box>
    );
};

export default Reviews;
