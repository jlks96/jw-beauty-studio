
import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { GOOGLE_APP_SCRIPT_URL, STUDIO_WHATSAPP_NUMBER, services } from '../constants';
import { CtaButton } from './common/CtaButton';
import Calendar from './common/Calendar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface BookingFormProps {
    showModalAlert: (messageKey: string) => void;
    setIsLoading: (isLoading: boolean) => void;
    initialServiceId: string;
    setInitialServiceId: (id: string) => void;
}

interface FormState {
    name: string;
    phone: string;
    service: string;
    date: string;
    time: string;
}

const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

const BookingForm: React.FC<BookingFormProps> = ({ showModalAlert, setIsLoading, initialServiceId, setInitialServiceId }) => {
    const t = useTranslations();
    const [formState, setFormState] = useState<FormState>({
        name: '',
        phone: '',
        service: '',
        date: getTodayString(),
        time: '',
    });
    const [feedback, setFeedback] = useState<{ message: string; color: string } | null>(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (initialServiceId) {
            const serviceToSelect = services.find(s => s.id === initialServiceId);
            if (serviceToSelect) {
                const serviceTitle = t[serviceToSelect.titleKey as keyof typeof t] as string;
                setFormState(prevState => ({ ...prevState, service: serviceTitle }));
                setInitialServiceId('');
            }
        }
    }, [initialServiceId, setInitialServiceId, t]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsCalendarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState(prevState => ({ ...prevState, service: e.target.value }));
    };

    const handleDateSelect = (date: string) => {
        setFormState(prevState => ({ ...prevState, date }));
        setIsCalendarOpen(false);
    };

    const setFormFeedback = (key: string, color: string) => {
        setFeedback({ message: t[key as keyof typeof t] as string, color });
    };

    const timeOptions = [
        { key: 'morning', text: t.formTimeMorning, fullText: t.formTimeOptionMorning },
        { key: 'afternoon', text: t.formTimeAfternoon, fullText: t.formTimeOptionAfternoon },
        { key: 'evening', text: t.formTimeEvening, fullText: t.formTimeOptionEvening },
    ];
    
    const formatDateForDisplay = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(`${dateString}T00:00:00Z`);
        const dateLocale = t.dateLocale as string;
        return new Intl.DateTimeFormat(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setFormFeedback('feedbackProcessing', 'warning.main');

        try {
            const sheetData = {
                timestamp: new Date().toLocaleString('en-SG', { timeZone: 'Asia/Singapore' }),
                ...formState
            };
            fetch(GOOGLE_APP_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(sheetData),
            }).catch(err => console.error("Google Sheet fetch (no-cors) error:", err));
            
            setFormFeedback('feedbackSpreadsheetSent', 'success.main');

            const selectedDate = new Date(`${formState.date}T00:00:00`);
            const dateLocale = t.dateLocale as string;
            const selectedDateText = new Intl.DateTimeFormat(dateLocale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(selectedDate);
            const selectedTimeText = timeOptions.find(opt => opt.key === formState.time)?.fullText || formState.time;

            const studioName = t.contactStudioName as string;
            let msg = t.whatsappMessageTemplate as string;
            
            const replacements: Record<string, string> = {
                '%studioName%': studioName,
                '%name%': formState.name,
                '%phone%': formState.phone,
                '%service%': formState.service,
                '%date%': selectedDateText as string,
                '%time%': selectedTimeText as string,
            };

            Object.entries(replacements).forEach(([key, value]) => {
                msg = msg.replace(key, value);
            });
            
            const whatsappUrl = `https://wa.me/${STUDIO_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
            window.open(whatsappUrl, '_blank');

            setTimeout(() => {
                setFormFeedback('feedbackWhatsAppReady', 'success.main');
                showModalAlert('alertRequestSent');
                setFormState({ 
                    name: '', 
                    phone: '', 
                    service: '', 
                    date: getTodayString(), 
                    time: '' 
                });
            }, 2500);

        } catch (error) {
            console.error("Booking submission error:", error);
            showModalAlert('alertFormError');
        } finally {
            setTimeout(() => setIsLoading(false), 3000);
        }
    };

    const serviceOptions = [
      ...services.map(s => ({ value: t[s.titleKey as keyof typeof t] as string, key: s.id })),
      { value: t.formServiceOptionNotSure as string, key: 'not-sure' },
    ];

    return (
        <Box id="booking" component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.200' }}>
            <Container maxWidth="lg">
                <Typography variant="h2" align="center" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: 'primary.dark', mb: 6 }}>
                    {t.bookingTitle}
                </Typography>
                <Paper
                    component="form"
                    onSubmit={handleFormSubmit}
                    elevation={6}
                    sx={{ maxWidth: 600, mx: 'auto', p: { xs: 4, md: 5 }, borderRadius: 3 }}
                >
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5, mb: 2.5 }}>
                        <TextField
                            label={t.formName}
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            fullWidth
                            placeholder={t.formNamePlaceholder as string}
                            variant="outlined"
                            size="small"
                        />
                        <TextField
                            label={t.formPhone}
                            name="phone"
                            type="tel"
                            value={formState.phone}
                            onChange={handleChange}
                            required
                            fullWidth
                            placeholder={t.formPhonePlaceholder as string}
                            variant="outlined"
                            size="small"
                        />
                    </Box>

                    <TextField
                        select
                        label={t.formService}
                        name="service"
                        value={formState.service}
                        onChange={handleSelectChange}
                        required
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{ mb: 2.5 }}
                    >
                        <MenuItem value="" disabled>{t.formServiceOptionDefault}</MenuItem>
                        {serviceOptions.map(opt => (
                            <MenuItem key={opt.key} value={opt.value}>{opt.value}</MenuItem>
                        ))}
                    </TextField>

                    <Box ref={calendarRef} sx={{ mb: 2.5, position: 'relative' }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary', mb: 1 }}>
                            {t.formDate}
                        </Typography>
                        <Box
                            onClick={() => setIsCalendarOpen(prev => !prev)}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                px: 2,
                                py: 1.5,
                                cursor: 'pointer',
                                '&:hover': { borderColor: 'text.primary' }
                            }}
                        >
                            <Typography>{formatDateForDisplay(formState.date)}</Typography>
                            <CalendarMonthIcon sx={{ color: 'text.disabled' }} />
                        </Box>
                        {isCalendarOpen && (
                            <Box sx={{ position: 'absolute', zIndex: 10, top: '100%', mt: 1, width: '100%', boxShadow: 4, borderRadius: 2, overflow: 'hidden' }}>
                                <Calendar 
                                    selectedDate={formState.date}
                                    onDateSelect={handleDateSelect}
                                />
                            </Box>
                        )}
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary', mb: 1 }}>
                            {t.formTime}
                        </Typography>
                        <ToggleButtonGroup
                            value={formState.time}
                            exclusive
                            onChange={(_e, val) => { if (val !== null) setFormState(prev => ({ ...prev, time: val })); }}
                            fullWidth
                            sx={{ gap: 1 }}
                        >
                            {timeOptions.map(opt => (
                                <ToggleButton
                                    key={opt.key}
                                    value={opt.key}
                                    sx={{
                                        borderRadius: 2,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        textTransform: 'none',
                                        '&.Mui-selected': { bgcolor: '#FEF3EF', color: 'primary.main', borderColor: 'primary.main', fontWeight: 600 },
                                    }}
                                >
                                    {opt.text}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </Box>

                    <Box sx={{ textAlign: 'center' }}>
                        <CtaButton type="submit" fullWidth>
                            {t.formSubmitButton}
                        </CtaButton>
                    </Box>
                    {feedback && (
                        <Typography align="center" variant="body2" sx={{ mt: 2, color: feedback.color }}>
                            {feedback.message}
                        </Typography>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default BookingForm;