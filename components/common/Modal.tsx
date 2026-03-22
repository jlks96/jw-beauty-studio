
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { CtaButton } from './CtaButton';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    buttonText: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message, buttonText }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{ sx: { borderRadius: 3, p: 2, textAlign: 'center' } }}
        >
            <DialogContent>
                <Typography variant="body1" sx={{ py: 2 }}>
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                <CtaButton onClick={onClose}>
                    {buttonText}
                </CtaButton>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
