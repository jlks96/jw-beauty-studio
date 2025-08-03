
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { Service } from '../types';

interface ServiceCardProps {
    service: Service;
    onBookService: (serviceId: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBookService }) => {
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
        <div className={`group bg-white rounded-xl overflow-hidden shadow-lg relative transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1.5 ${service.colSpan || ''}`}>
            {service.isPromo && (
                <div className="promo-badge absolute top-0 right-0 bg-[#E29578] text-white text-xs font-semibold px-2.5 py-1 rounded-bl-lg rounded-tr-lg z-10">
                    {t.promoBadge}
                </div>
            )}
            
            {/* Card Content */}
            {isFullWidth ? <div className="md:flex">{cardContent}</div> : cardContent}
            
            {/* Hover Interaction Layer */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
            <div className="absolute inset-0 flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform translate-y-4 group-hover:translate-y-0">
                <button
                    onClick={() => onBookService(service.id)}
                    className="pointer-events-auto bg-white text-[#78350F] px-6 py-2.5 rounded-lg shadow-md text-sm font-semibold uppercase tracking-wider transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-black/50"
                    aria-label={`${t.bookThisTreatment}: ${t[service.titleKey]}`}
                >
                    {t.bookThisTreatment}
                </button>
            </div>
        </div>
    );
};

export default ServiceCard;