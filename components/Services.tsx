
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { services } from '../constants';
import ServiceCard from './ServiceCard';

const Services: React.FC = () => {
    const t = useTranslations();

    return (
        <section id="services" className="py-16 md:py-24 bg-[#FDF5E6]">
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-[#78350F] font-playfair mb-16">
                    {t.servicesTitle}
                </h2>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {services.map(service => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
