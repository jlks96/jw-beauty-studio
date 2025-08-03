
import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface CalendarProps {
    selectedDate: string;
    onDateSelect: (date: string) => void;
    language: 'en' | 'zh';
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect, language }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const changeMonth = (amount: number) => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + amount, 1));
    };

    const handleDateClick = (day: number) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        if (newDate < today) return; // Prevent selecting past dates
        onDateSelect(formatDate(newDate));
    };
    
    const formatDate = (date: Date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const renderHeader = () => {
        const dateFormat = language === 'zh' 
            ? { year: 'numeric', month: 'long' } as const
            : { month: 'long', year: 'numeric' } as const;
        const locale = language === 'zh' ? 'zh-CN' : 'en-US';

        return (
            <div className="flex justify-between items-center mb-4">
                <button type="button" onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-[#FEF3EF] transition-colors">
                    <ChevronLeftIcon className="w-5 h-5 text-stone-600" />
                </button>
                <h3 className="font-semibold text-stone-700 text-base md:text-lg">
                    {new Intl.DateTimeFormat(locale, dateFormat).format(currentMonth)}
                </h3>
                <button type="button" onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-[#FEF3EF] transition-colors">
                    <ChevronRightIcon className="w-5 h-5 text-stone-600" />
                </button>
            </div>
        );
    };

    const renderDaysOfWeek = () => {
        const days = language === 'zh'
            ? ['日', '一', '二', '三', '四', '五', '六']
            : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        
        return (
            <div className="grid grid-cols-7 text-center text-xs text-stone-500 font-medium mb-2">
                {days.map(day => <div key={day}>{day}</div>)}
            </div>
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
                return <div key={`blank-${i}`} className="p-1"></div>;
            }
            
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const dateString = formatDate(date);
            const isPast = date < today;
            const isSelected = dateString === selectedDate;
            const isToday = formatDate(date) === formatDate(new Date());

            const baseClasses = "w-full aspect-square flex items-center justify-center rounded-full transition-colors text-sm";
            const disabledClasses = "text-stone-300 cursor-not-allowed";
            const activeClasses = "hover:bg-[#FEF3EF] cursor-pointer";
            const todayClasses = "font-bold text-[#E29578] ring-1 ring-[#E29578]";
            const selectedClasses = "bg-[#E29578] text-white font-semibold shadow-md hover:bg-[#D88468]";

            return (
                <div key={day} className="p-0.5">
                     <button
                        type="button"
                        onClick={() => handleDateClick(day)}
                        disabled={isPast}
                        className={`
                            ${baseClasses}
                            ${isPast ? disabledClasses : activeClasses}
                            ${isSelected ? selectedClasses : (isToday ? todayClasses : '')}
                        `}
                    >
                        {day}
                    </button>
                </div>
            );
        });

        return <div className="grid grid-cols-7">{cells}</div>;
    };

    return (
        <div className="bg-white border border-stone-300 rounded-lg p-3 sm:p-4">
            {renderHeader()}
            {renderDaysOfWeek()}
            {renderCells()}
        </div>
    );
};

export default Calendar;
