
import React, { ReactNode } from 'react';

interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
}

export const CtaButton: React.FC<CtaButtonProps> = ({ children, className = '', ...props }) => {
    return (
        <button
            {...props}
            className={`
                bg-[#E29578] text-white px-8 py-3 rounded-lg shadow-md
                text-sm sm:text-base font-semibold uppercase tracking-wider
                transition-all duration-300 ease-in-out
                transform hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#D88468]
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E29578] focus:ring-offset-[#FFFBF5]
                relative overflow-hidden
                cta-pulse
                ${className}
            `}
        >
            <style>{`
                .cta-pulse {
                    animation: ctaPulse 2s infinite cubic-bezier(0.4,0,0.6,1);
                }
                @keyframes ctaPulse {
                    0% {
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 0 rgba(226, 149, 120, 0.4);
                    }
                    70% {
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 12px rgba(226, 149, 120, 0);
                    }
                    100% {
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 0 rgba(226, 149, 120, 0);
                    }
                }
            `}</style>
            <span className="relative z-10">{children}</span>
        </button>
    );
};
