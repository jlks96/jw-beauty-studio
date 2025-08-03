
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { STUDIO_WHATSAPP_NUMBER } from '../constants';
import { LocationMarkerIcon, PhoneIcon } from './common/Icons';

const Contact: React.FC = () => {
    const t = useTranslations();

    return (
        <section id="contact" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-[#78350F] font-playfair mb-12">
                    {t.contactTitle}
                </h2>
                <div className="max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-xl shadow-xl text-center border-2 border-[#FDF5E6]">
                    <h3 className="text-3xl font-semibold text-[#78350F] font-playfair mb-6">
                        {t.contactStudioName}
                    </h3>
                    <div className="mb-6">
                        <p className="text-[#5D4037] text-lg flex items-center justify-center flex-wrap">
                            <LocationMarkerIcon className="h-6 w-6 mr-3 text-[#E29578] flex-shrink-0" />
                            <span>{t.contactAddress}</span>
                        </p>
                    </div>
                    <div className="mb-8">
                        <p className="text-[#5D4037] text-lg flex items-center justify-center flex-wrap">
                            <PhoneIcon className="h-6 w-6 mr-3 text-[#E29578] flex-shrink-0" />
                            <span>{t.contactWhatsappLabel}</span>
                            <a href={`https://wa.me/${STUDIO_WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-[#C5735A] hover:text-[#78350F] font-medium ml-1 transition-colors">
                                {STUDIO_WHATSAPP_NUMBER}
                            </a>
                        </p>
                    </div>
                    <p className="text-stone-500 text-sm">
                       {t.contactHoursNote}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
