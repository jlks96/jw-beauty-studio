
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { CtaButton } from './common/CtaButton';

interface PromoBannerProps {
  scrollToSection: (sectionId: string) => void;
}

const PromoBanner: React.FC<PromoBannerProps> = ({scrollToSection}) => {
    const t = useTranslations();

    return (
        <section id="promo-banner" className="bg-[#FEF3EF] py-8">
            <div className="container mx-auto px-4 sm:px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-playfair text-[#78350F] mb-3">
                    {t.promoBannerTitle}
                </h2>
                <p className="text-lg text-[#9F5440] mb-4" dangerouslySetInnerHTML={{ __html: t.promoBannerDesc as string }} />
                <CtaButton onClick={() => scrollToSection('booking')}>
                    {t.promoBannerButton}
                </CtaButton>
            </div>
        </section>
    );
};

export default PromoBanner;
