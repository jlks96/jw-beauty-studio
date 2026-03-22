
import React, { useState } from 'react';
import { useTranslations } from '../../hooks/useTranslations';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface CalendarProps {
    selectedDate: string;
    onDateSelect: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
    const t = useTranslations() as any;
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const changeMonth = (amount: number) => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + amount, 1));
    };

    const handleDateClick = (day: number) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        if (newDate < today) return;
        onDateSelect(formatDate(newDate));
    };
    
    const formatDate = (date: Date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const renderHeader = () => {
        const dateFormat = { year: 'numeric', month: 'long' } as const;
        const locale = t.dateLocale;

        return (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <IconButton size="small" onClick={() => changeMonth(-1)} sx={{ '&:hover': { bgcolor: '#FEF3EF' } }}>
                    <ChevronLeftIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                </IconButton>
                <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                    {new Intl.DateTimeFormat(locale, dateFormat).format(currentMonth)}
                </Typography>
                <IconButton size="small" onClick={() => changeMonth(1)} sx={{ '&:hover': { bgcolor: '#FEF3EF' } }}>
                    <ChevronRightIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                </IconButton>
            </Box>
        );
    };

    const renderDaysOfWeek = () => {
        const days = t.calendarDays as string[];
        
        return (
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', mb: 1 }}>
                {days.map(day => (
                    <Typography key={day} variant="caption" color="text.disabled" fontWeight={500}>
                        {day}
                    </Typography>
                ))}
            </Box>
        );
    };

    const renderCells = () => {
        const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        
        const daysInMonth = monthEnd.getDate();
        const startDay = monthStart.getDay();

        const blanks = Array(startDay).fill(null);
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

        const cells = [...blanks, ...days].map((day, i) => {
            if (day === null) {
                return <Box key={`blank-${i}`} sx={{ p: 0.5 }} />;
            }
            
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const dateString = formatDate(date);
            const isPast = date < today;
            const isSelected = dateString === selectedDate;
            const isToday = formatDate(date) === formatDate(new Date());

            return (
                <Box key={day} sx={{ p: '2px' }}>
                    <Box
                        component="button"
                        type="button"
                        onClick={() => handleDateClick(day)}
                        disabled={isPast}
                        sx={{
                            width: '100%',
                            aspectRatio: '1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            border: 'none',
                            cursor: isPast ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                            fontSize: '0.875rem',
                            bgcolor: isSelected ? '#E29578' : 'transparent',
                            color: isSelected ? 'common.white' : isPast ? 'text.disabled' : 'text.primary',
                            fontWeight: isSelected || isToday ? 600 : 400,
                            outline: isToday && !isSelected ? '1px solid #E29578' : 'none',
                            '&:hover': !isPast && !isSelected ? { bgcolor: '#FEF3EF' } : {},
                            ...(isSelected && { boxShadow: 2, '&:hover': { bgcolor: '#D88468' } }),
                        }}
                    >
                        {day}
                    </Box>
                </Box>
            );
        });

        return <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>{cells}</Box>;
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 2, p: { xs: 1.5, sm: 2 } }}>
            {renderHeader()}
            {renderDaysOfWeek()}
            {renderCells()}
        </Box>
    );
};

export default Calendar;
