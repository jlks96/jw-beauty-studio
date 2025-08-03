
import React, { useEffect } from 'react';
import { CtaButton } from './CtaButton';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    buttonText: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message, buttonText }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center relative transform transition-all duration-300 ease-out animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <style>{`
                    @keyframes fade-in-up {
                        from { opacity: 0; transform: translateY(20px) scale(0.95); }
                        to { opacity: 1; transform: translateY(0) scale(1); }
                    }
                    .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
                `}</style>
                <p className="text-stone-700 text-base md:text-lg py-4">{message}</p>
                <CtaButton onClick={onClose} className="mt-4 px-6 py-2 text-sm">
                    {buttonText}
                </CtaButton>
            </div>
        </div>
    );
};

export default Modal;
