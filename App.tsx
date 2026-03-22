
import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from './context/LanguageContext';
import { useTranslations } from './hooks/useTranslations';
import Box from '@mui/material/Box';
import Header from './components/Header';
import Hero from './components/Hero';
import PromoBanner from './components/PromoBanner';
import Services from './components/Services';
import About from './components/About';
import Reviews from './components/Reviews';
import AiAdvisor from './components/AiAdvisor';
import Contact from './components/Contact';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import Modal from './components/common/Modal';
import Spinner from './components/common/Spinner';
import FloatingWhatsApp from './components/common/FloatingWhatsApp';

const App: React.FC = () => {
    const { language } = useLanguage();
    const t = useTranslations();
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [initialServiceId, setInitialServiceId] = useState('');

    const controlNavbar = useCallback(() => {
        if (window.scrollY > 64 && window.scrollY > lastScrollY) {
            setIsNavVisible(false);
        } else {
            setIsNavVisible(true);
        }
        setLastScrollY(window.scrollY);
    }, [lastScrollY]);

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [controlNavbar]);
    
    useEffect(() => {
      document.documentElement.lang = language;
      const htmlEl = document.querySelector('html');
      if (htmlEl) {
        // Remove all possible font classes before adding the current one
        htmlEl.classList.remove('font-noto-sans-sc');
        if (t.appFontClass) {
            htmlEl.classList.add(t.appFontClass as string);
        }
      }
    }, [language, t.appFontClass]);


    const showModalAlert = useCallback((messageKey: string) => {
        const message = (t[messageKey as keyof typeof t] || "An unexpected error occurred.") as string;
        setModalMessage(message);
        setIsModalOpen(true);
    }, [t]);

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerOffset = 64; // Height of the sticky navbar
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleBookService = (serviceId: string) => {
        setInitialServiceId(serviceId);
        scrollToSection('booking');
    };
    
    return (
        <Box 
            sx={{ 
                bgcolor: 'background.default', 
                color: 'text.primary', 
                minHeight: '100vh' 
            }} 
            className={t.appFontClass as string}
        >
            <Header isNavVisible={isNavVisible} scrollToSection={scrollToSection} />
            <main>
                <Hero scrollToSection={scrollToSection} />
                <PromoBanner scrollToSection={scrollToSection}/>
                <Services onBookService={handleBookService} />
                <About />
                <Reviews />
                <Contact />
                <BookingForm 
                    showModalAlert={showModalAlert} 
                    setIsLoading={setIsLoading} 
                    initialServiceId={initialServiceId}
                    setInitialServiceId={setInitialServiceId}
                />
                <AiAdvisor />
            </main>
            <Footer />
            <FloatingWhatsApp />
            <Spinner isVisible={isLoading} />
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                message={modalMessage}
                buttonText={t.modalOkButton as string}
            />
        </Box>
    );
};

export default App;