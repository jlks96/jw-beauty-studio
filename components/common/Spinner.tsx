
import React from 'react';

interface SpinnerProps {
    isVisible: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center">
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
            <div className="relative z-10">
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
                <div className="w-14 h-14 border-6 border-solid border-stone-200 border-t-[#E29578] rounded-full animate-spin"></div>
            </div>
        </div>
    );
};

export default Spinner;
