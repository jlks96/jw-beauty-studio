
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { aboutCarouselImages } from '../constants';

const About: React.FC = () => {
    const t = useTranslations();
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % aboutCarouselImages.length);
    }, []);

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [nextSlide]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section id="about" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="md:w-5/12 bg-[#FDF5E6] rounded-xl shadow-lg p-4">
                    <div className="relative overflow-hidden rounded-lg h-[450px] w-full max-w-[450px] mx-auto">
                        {aboutCarouselImages.map((src, index) => (
                            <div
                                key={src}
                                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <img
                                    src={src}
                                    alt={`JW Beauty Studio view ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                    onError={(e) => (e.currentTarget.src = 'https://placehold.co/500x500/F5E9E2/78350F?text=Studio+View')}
                                />
                            </div>
                        ))}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                            {aboutCarouselImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-2.5 h-2.5 rounded-full transition-colors ${currentIndex === index ? 'bg-white/90' : 'bg-white/50 hover:bg-white/70'}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="md:w-7/12">
                    <h2 className="text-4xl md:text-5xl font-bold text-center md:text-left text-[#78350F] font-playfair mb-6">
                        {t.aboutTitle}
                    </h2>
                    <p className="text-[#5D4037] mb-4 leading-relaxed text-lg">{t.aboutP1}</p>
                    <p className="text-[#5D4037] mb-4 leading-relaxed">{t.aboutP2}</p>
                    <p className="text-[#9F5440] leading-relaxed font-medium">{t.aboutP3}</p>
                </div>
            </div>
        </section>
    );
};

export default About;
