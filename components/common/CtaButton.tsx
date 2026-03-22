
import React, { ReactNode } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface CtaButtonProps extends ButtonProps {
    children: ReactNode;
}

export const CtaButton: React.FC<CtaButtonProps> = ({ children, sx, ...props }) => {
    return (
        <Button
            variant="contained"
            color="primary"
            {...props}
            sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
                animation: 'ctaPulse 2s infinite cubic-bezier(0.4,0,0.6,1)',
                '@keyframes ctaPulse': {
                    '0%': { boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 0 0 rgba(226, 149, 120, 0.4)' },
                    '70%': { boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 0 12px rgba(226, 149, 120, 0)' },
                    '100%': { boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 0 0 rgba(226, 149, 120, 0)' }
                },
                ...sx
            }}
        >
            {children}
        </Button>
    );
};
