
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { aboutCarouselImages } from '../constants';
import { ChevronLeftIcon, ChevronRightIcon } from './common/Icons';

const About: React.FC = () => {
    const t = useTranslations();
    const [currentIndex, setCurrentIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Fire animation only once
                }
            },
            {
                threshold: 0.15, // Trigger when 15% of the element is visible
            }
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % aboutCarouselImages.length);
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + aboutCarouselImages.length) % aboutCarouselImages.length);
    };

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(nextSlide, 5000);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [currentIndex, nextSlide]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section id="about" ref={sectionRef} className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className={`md:w-5/12 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                    <div className="bg-[#FDF5E6] rounded-xl shadow-lg p-4">
                        <div className="relative overflow-hidden rounded-lg h-[450px] w-full max-w-[450px] mx-auto group">
                            {/* Carousel Track */}
                            <div
                                className="flex transition-transform duration-500 ease-in-out h-full"
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                {aboutCarouselImages.map((src, index) => (
                                    <div key={src} className="w-full flex-shrink-0 h-full">
                                        <img
                                            src={src}
                                            alt={`JW Beauty Studio view ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            loading={index === 0 ? "eager" : "lazy"}
                                            decoding="async"
                                            onError={(e) => (e.currentTarget.src = 'https://placehold.co/500x500/F5E9E2/78350F?text=Studio+View')}
                                        />
                                    </div>
                                ))}
                            </div>
                            
                            {/* Controls */}
                            <div className="absolute inset-0 flex items-center justify-between p-2">
                                <button
                                    onClick={prevSlide}
                                    className="bg-white/60 p-2 rounded-full shadow-md hover:bg-white/90 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 -translate-x-4 group-hover:translate-x-0"
                                    aria-label="Previous slide"
                                >
                                    <ChevronLeftIcon className="h-5 w-5 text-stone-800"/>
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="bg-white/60 p-2 rounded-full shadow-md hover:bg-white/90 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 translate-x-4 group-hover:translate-x-0"
                                    aria-label="Next slide"
                                >
                                    <ChevronRightIcon className="h-5 w-5 text-stone-800"/>
                                </button>
                            </div>

                            {/* Dots */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                                {aboutCarouselImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white'}`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`md:w-7/12 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-x-0 delay-200' : 'opacity-0 translate-x-10'}`}>
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