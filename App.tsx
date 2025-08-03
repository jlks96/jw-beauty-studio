
import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from './context/LanguageContext';
import { useTranslations } from './hooks/useTranslations';
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
        if (language === 'zh') {
          htmlEl.classList.add('font-noto-sans-sc');
        } else {
          htmlEl.classList.remove('font-noto-sans-sc');
        }
      }
    }, [language]);


    const showModalAlert = useCallback((messageKey: string) => {
        const message = t[messageKey as keyof typeof t] || "An unexpected error occurred.";
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
    
    return (
        <div className={`bg-[#FFFBF5] text-[#5D4037] ${language === 'zh' ? 'font-noto-sans-sc' : 'font-poppins'}`}>
            <Header isNavVisible={isNavVisible} scrollToSection={scrollToSection} />
            <main>
                <Hero scrollToSection={scrollToSection} />
                <PromoBanner scrollToSection={scrollToSection}/>
                <Services />
                <About />
                <Reviews />
                <Contact />
                <BookingForm showModalAlert={showModalAlert} setIsLoading={setIsLoading} />
                <AiAdvisor />
            </main>
            <Footer />
            <FloatingWhatsApp />
            <Spinner isVisible={isLoading} />
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                message={modalMessage}
                buttonText={t.modalOkButton}
            />
        </div>
    );
};

export default App;