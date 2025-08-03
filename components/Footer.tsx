
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

const Footer: React.FC = () => {
    const t = useTranslations();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#D4BFAD] text-[#4E342E] py-10 border-t-2 border-[#E29578]/30">
            <div className="container mx-auto px-4 sm:px-6 text-center">
                <p className="text-base">
                    © {currentYear} <span className="font-playfair text-yellow-900">{t.contactStudioName}</span>. All Rights Reserved.
                </p>
                <p className="text-sm mt-2">{t.footerAddress}</p>
                <p className="text-xs mt-1" dangerouslySetInnerHTML={{ __html: t.footerTagline as string }} />
            </div>
        </footer>
    );
};

export default Footer;
