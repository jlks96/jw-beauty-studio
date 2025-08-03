
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
    const t = useTranslations();
    
    const stats = [
        { value: '100+', label: 'Happy Clients' },
        { value: '5.0★', label: 'Google Rating' },
        { value: '13+', label: 'Years Experience' },
    ];

    // Using the Streamable embed URL for iframe for robust playback
    const videoEmbedSrc = "https://streamable.com/e/y7su26?autoplay=1&muted=1&loop=1&nocontrols=1";

    return (
        <section
            id="home"
            className="text-white min-h-[60vh] md:min-h-[65vh] lg:min-h-[75vh] flex items-center justify-center py-16 relative overflow-hidden bg-black"
        >
            {/* Video Background Container */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <iframe
                    src={videoEmbedSrc}
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    title="Promotional Video"
                    className="absolute top-1/2 left-1/2 w-[180vh] h-[101vh] max-w-none"
                    style={{ 
                        transform: 'translate(-50%, -50%) scale(1.25) translateX(-3%)' 
                    }}
                />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10"></div>

            <div className="container mx-auto px-4 sm:px-6 text-center relative z-20">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-playfair mb-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}>
                    {t.heroTitle}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.7)' }}>
                    {t.heroSubtitle}
                </p>

                <div className="flex justify-center items-center space-x-4 mb-10">
                    <button
                        onClick={() => scrollToSection('booking')}
                        className="bg-white text-[#78350F] px-8 py-3 rounded-lg shadow-md text-sm sm:text-base font-semibold uppercase tracking-wider transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-black/50"
                    >
                        {t.navBookNow}
                    </button>
                </div>
                
                <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 grid grid-cols-3 divide-x divide-white/20 text-center shadow-lg">
                        {stats.map(stat => (
                            <div key={stat.label} className="px-2">
                                <p className="text-xl sm:text-2xl md:text-3xl font-bold">{stat.value}</p>
                                <p className="text-xs sm:text-sm text-stone-200">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;