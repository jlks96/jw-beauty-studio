import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { MenuIcon } from './common/Icons';

interface HeaderProps {
    isNavVisible: boolean;
    scrollToSection: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ isNavVisible, scrollToSection }) => {
    const { language, toggleLanguage } = useLanguage();
    const t = useTranslations();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleNavClick = (sectionId: string) => {
        scrollToSection(sectionId);
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { id: 'home', labelKey: 'navHome' },
        { id: 'services', labelKey: 'navServices' },
        { id: 'about', labelKey: 'navAbout' },
        { id: 'google-reviews', labelKey: 'navReviews' },
        { id: 'contact', labelKey: 'navContact' },
    ];
    
    const NavLink: React.FC<{sectionId: string; labelKey: string; className?: string}> = ({sectionId, labelKey, className}) => (
        <button
            onClick={() => handleNavClick(sectionId)}
            className={`font-medium transition-colors duration-200 ease-in-out ${className}`}
        >
            {t[labelKey as keyof typeof t]}
        </button>
    );

    return (
        <header className={`bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 h-16 transition-transform duration-300 ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="container mx-auto px-2 sm:px-4 h-full flex justify-between items-center">
                <button onClick={() => handleNavClick('home')} className="flex items-center h-full rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E29578] focus:ring-offset-white/95">
                    <img src="/assets/logo.png" alt={t.contactStudioName} className="h-12 w-auto mr-3" />
                    <span className="font-playfair text-xl md:text-2xl font-bold text-[#78350F] tracking-wider" style={{ textShadow: '0px 1px 1px rgba(0,0,0,0.1)' }}>
                       {t.navStudioName}
                    </span>
                </button>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-1">
                    {navLinks.map(link => (
                         <NavLink key={link.id} sectionId={link.id} labelKey={link.labelKey} className="text-[#5D4037] hover:text-[#E29578] hover:bg-[#FFFBF5] px-3.5 py-2 rounded-md" />
                    ))}
                    <button
                        onClick={() => handleNavClick('booking')}
                        className="ml-2 px-4 py-2 bg-[#E29578] text-white text-xs font-medium uppercase tracking-wider rounded-lg shadow-md hover:bg-[#D88468] transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        {t.navBookNow}
                    </button>
                    <button
                        onClick={toggleLanguage}
                        aria-label={language === 'en' ? 'Switch to Chinese' : 'Switch to English'}
                        className="ml-3 px-3 py-1.5 text-sm text-stone-600 hover:text-[#E29578] border border-stone-300 hover:border-[#E29578] rounded-md transition-colors"
                    >
                        {language === 'en' ? '中文' : 'English'}
                    </button>
                </nav>

                {/* Mobile Nav Toggle */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={toggleLanguage}
                        aria-label={language === 'en' ? 'Switch to Chinese' : 'Switch to English'}
                        className="mr-2 px-3 py-1 text-xs text-stone-600 hover:text-[#E29578] border border-stone-300 hover:border-[#E29578] rounded-md transition-colors"
                    >
                        {language === 'en' ? '中文' : 'English'}
                    </button>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-stone-600 hover:text-[#E29578] p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E29578] focus:ring-offset-white/95">
                        <MenuIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-lg absolute w-full">
                    {navLinks.map(link => (
                        <NavLink key={link.id} sectionId={link.id} labelKey={link.labelKey} className="block w-full text-left text-[#5D4037] hover:text-[#E29578] hover:bg-[#FFFBF5] px-4 py-3" />
                    ))}
                    <button
                        onClick={() => handleNavClick('booking')}
                        className="block bg-[#E29578] text-white mx-4 my-3 px-4 py-3 rounded-lg text-center w-[calc(100%-2rem)] font-medium text-sm hover:bg-[#D88468]"
                    >
                        {t.navBookNow}
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;