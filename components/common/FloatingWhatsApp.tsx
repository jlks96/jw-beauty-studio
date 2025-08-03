
import React from 'react';
import { STUDIO_WHATSAPP_NUMBER } from '../../constants';
import { useTranslations } from '../../hooks/useTranslations';
import { WhatsAppIcon } from './Icons';

const FloatingWhatsApp: React.FC = () => {
    const t = useTranslations();

    return (
        <a 
            href={`https://wa.me/${STUDIO_WHATSAPP_NUMBER}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed right-5 bottom-5 z-[1000] group"
            aria-label="Chat with us on WhatsApp"
        >
             <style>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-5px); }
                    100% { transform: translateY(0px); }
                }
            `}</style>
            <div className="flex items-center bg-[#25D366] text-white px-5 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform group-hover:-translate-y-0.5 group-hover:shadow-xl group-hover:bg-[#1EBE5A] animate-[float_3s_ease-in-out_infinite]">
                <WhatsAppIcon className="w-6 h-6 mr-2" />
                <span className="font-semibold text-sm">{t.whatsappChat}</span>
            </div>
        </a>
    );
};

export default FloatingWhatsApp;
