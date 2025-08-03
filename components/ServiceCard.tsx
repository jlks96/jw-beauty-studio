
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { Service } from '../types';

interface ServiceCardProps {
    service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    const t = useTranslations();

    const isFullWidth = service.colSpan?.includes('lg:col-span-3');

    const cardContent = (
        <>
            <img 
                src={service.image} 
                alt={t[service.titleKey]} 
                className={`w-full object-cover ${isFullWidth ? 'md:w-1/2 h-56 md:h-auto' : 'h-56'}`}
                loading="lazy"
                decoding="async"
                onError={(e) => (e.currentTarget.src = `https://placehold.co/600x400/FFEBCD/333333?text=${encodeURIComponent(t[service.titleKey])}`)}
            />
            <div className={`p-6 md:p-8 ${isFullWidth ? 'md:w-1/2 flex flex-col justify-center' : ''}`}>
                <h3 className="text-2xl font-semibold mb-3 text-[#78350F] font-playfair">
                    {t[service.titleKey]}
                </h3>
                <p className="text-[#5D4037] mb-4 text-sm leading-relaxed">
                    {t[service.descriptionKey]}
                </p>
                <p className="text-[#9F5440] font-semibold text-lg mt-auto">
                    {service.oldPriceKey && (
                        <span className="line-through text-gray-500 text-sm mr-2">
                            {t[service.oldPriceKey]}
                        </span>
                    )}
                    {t[service.priceKey]}
                </p>
            </div>
        </>
    );


    return (
        <div className={`bg-white rounded-xl overflow-hidden shadow-lg relative transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1.5 ${service.colSpan || ''}`}>
            {service.isPromo && (
                <div className="promo-badge absolute top-0 right-0 bg-[#E29578] text-white text-xs font-semibold px-2.5 py-1 rounded-bl-lg rounded-tr-lg z-10">
                    {t.promoBadge}
                </div>
            )}
            {isFullWidth ? <div className="md:flex">{cardContent}</div> : cardContent}
        </div>
    );
};

export default ServiceCard;
