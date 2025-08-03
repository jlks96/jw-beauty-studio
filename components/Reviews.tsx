
import React, { useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';

const Reviews: React.FC = () => {
    const t = useTranslations();
    const embedScriptId = "shapo-embed-js";
    const schemaScriptId = "shapo-ratingschema-89a8f12c95";
    const widgetDivId = "shapo-widget-c1f5a102570c434bb845";

    useEffect(() => {
        // Check if the main script is already added to prevent duplicates
        if (document.getElementById(embedScriptId)) {
            return;
        }

        // The schema script tag needs to exist for the embed script to populate it.
        const schemaScript = document.createElement('script');
        schemaScript.id = schemaScriptId;
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);

        // The main embed script that powers the widget.
        const embedScript = document.createElement('script');
        embedScript.id = embedScriptId;
        embedScript.src = "https://cdn.shapo.io/js/embed.js";
        embedScript.type = "text/javascript";
        embedScript.defer = true;
        document.head.appendChild(embedScript);

        // Cleanup function to remove the scripts when the component unmounts.
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
    }, []); // The empty dependency array ensures this effect runs only once on mount.

    return (
        <section id="google-reviews" className="py-12 md:py-16 bg-[#FDF5E6]">
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-[#78350F] font-playfair mb-10">
                    {t.reviewsTitle}
                </h2>
                {/* The Shapo script will find this div by its ID and populate it with the reviews widget. */}
                <div id={widgetDivId}></div>
            </div>
        </section>
    );
};

export default Reviews;
