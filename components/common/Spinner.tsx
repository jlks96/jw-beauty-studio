
import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface SpinnerProps {
    isVisible: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ isVisible }) => {
    return (
        <Backdrop open={isVisible} sx={{ zIndex: 2000, bgcolor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(4px)' }}>
            <CircularProgress sx={{ color: 'primary.main' }} size={56} />
        </Backdrop>
    );
};

export default Spinner;
