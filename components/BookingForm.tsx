
import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { useLanguage } from '../context/LanguageContext';
import { GOOGLE_APP_SCRIPT_URL, STUDIO_WHATSAPP_NUMBER, services } from '../constants';
import { CtaButton } from './common/CtaButton';
import Calendar from './common/Calendar';
import { CalendarIcon } from './common/Icons';

interface BookingFormProps {
    showModalAlert: (messageKey: string) => void;
    setIsLoading: (isLoading: boolean) => void;
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


const BookingForm: React.FC<BookingFormProps> = ({ showModalAlert, setIsLoading }) => {
    const t = useTranslations();
    const { language } = useLanguage();
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleDateSelect = (date: string) => {
        setFormState(prevState => ({ ...prevState, date }));
        setIsCalendarOpen(false);
    };

    const setFormFeedback = (key: string, color: string) => {
        setFeedback({ message: t[key as keyof typeof t], color });
    };

    const timeOptions = [
        { key: 'morning', text: t.formTimeMorning, fullText: t.formTimeOptionMorning },
        { key: 'afternoon', text: t.formTimeAfternoon, fullText: t.formTimeOptionAfternoon },
        { key: 'evening', text: t.formTimeEvening, fullText: t.formTimeOptionEvening },
    ];
    
    const formatDateForDisplay = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(`${dateString}T00:00:00Z`);
        const dateLocale = language === 'zh' ? 'zh-CN' : 'en-US';
        return new Intl.DateTimeFormat(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setFormFeedback('feedbackProcessing', 'text-yellow-600');

        try {
            // Fire-and-forget request to Google Sheet
            const sheetData = {
                timestamp: new Date().toLocaleString('en-SG', { timeZone: 'Asia/Singapore' }),
                ...formState
            };
            fetch(GOOGLE_APP_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(sheetData),
            }).catch(err => console.error("Google Sheet fetch (no-cors) error:", err));
            
            setFormFeedback('feedbackSpreadsheetSent', 'text-green-600');

            // Find the selected date and time's translated text for the message
            const selectedDate = new Date(`${formState.date}T00:00:00`);
            const dateLocale = language === 'zh' ? 'zh-CN' : 'en-SG';
            const selectedDateText = new Intl.DateTimeFormat(dateLocale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(selectedDate);
            const selectedTimeText = timeOptions.find(opt => opt.key === formState.time)?.fullText || formState.time;

            // Prepare and open WhatsApp
            const studioName = t.contactStudioName;
            const msg = language === 'zh'
                ? `你好 ${studioName}！\n\n我想预约一项服务。\n\n*姓名:* ${formState.name}\n*电话:* ${formState.phone}\n*服务项目:* ${formState.service}\n*首选日期:* ${selectedDateText}\n*首选时间:* ${selectedTimeText}\n\n请告知您的可约时间。\n谢谢！`
                : `Hello ${studioName}!\n\nI would like to request an appointment.\n\n*Name:* ${formState.name}\n*Phone:* ${formState.phone}\n*Service:* ${formState.service}\n*Preferred Date:* ${selectedDateText}\n*Preferred Time:* ${selectedTimeText}\n\nPlease let me know your availability.\nThank you!`;
            
            const whatsappUrl = `https://wa.me/${STUDIO_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
            window.open(whatsappUrl, '_blank');

            setTimeout(() => {
                setFormFeedback('feedbackWhatsAppReady', 'text-green-600');
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
      ...services.map(s => ({ value: t[s.titleKey as keyof typeof t], key: s.id })),
      { value: t.formServiceOptionNotSure, key: 'not-sure' },
    ];

    return (
        <section id="booking" className="py-16 md:py-24 bg-stone-200">
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-[#78350F] font-playfair mb-12">
                    {t.bookingTitle}
                </h2>
                <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto bg-white p-8 md:p-10 rounded-xl shadow-2xl">
                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-5 mb-5">
                        <div>
                            <label htmlFor="name" className="block text-[#5D4037] font-medium mb-1 text-sm">{t.formName}</label>
                            <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} className="w-full bg-white border border-stone-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#E29578]/50 focus:border-[#E29578] outline-none" required placeholder={t.formNamePlaceholder as string} />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-[#5D4037] font-medium mb-1 text-sm">{t.formPhone}</label>
                            <input type="tel" id="phone" name="phone" value={formState.phone} onChange={handleChange} className="w-full bg-white border border-stone-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#E29578]/50 focus:border-[#E29578] outline-none" required placeholder={t.formPhonePlaceholder as string} />
                        </div>
                    </div>
                    
                    <div className="mb-5">
                         <label htmlFor="service" className="block text-[#5D4037] font-medium mb-1 text-sm">{t.formService}</label>
                         <div className="relative">
                            <select
                                id="service"
                                name="service"
                                value={formState.service}
                                onChange={handleChange}
                                className="w-full bg-white border border-stone-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#E29578]/50 focus:border-[#E29578] outline-none appearance-none"
                                required
                            >
                                <option value="" disabled>{t.formServiceOptionDefault}</option>
                                {serviceOptions.map(opt => (
                                    <option key={opt.key} value={opt.value}>{opt.value}</option>
                                ))}
                            </select>
                             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stone-700">
                                 <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                             </div>
                         </div>
                    </div>

                     <div className="mb-5 relative" ref={calendarRef}>
                        <label className="block text-[#5D4037] font-medium mb-2 text-sm">{t.formDate}</label>
                        <button
                            type="button"
                            onClick={() => setIsCalendarOpen(prev => !prev)}
                            className="w-full bg-white border border-stone-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#E29578]/50 focus:border-[#E29578] outline-none flex justify-between items-center text-left"
                        >
                            <span>{formatDateForDisplay(formState.date)}</span>
                            <CalendarIcon className="h-5 w-5 text-stone-500" />
                        </button>
                        {isCalendarOpen && (
                            <div className="absolute z-10 top-full mt-2 w-full shadow-lg rounded-lg animate-fade-in-up">
                                 <style>{`
                                    @keyframes fade-in-up {
                                        from { opacity: 0; transform: translateY(-10px) scale(0.98); }
                                        to { opacity: 1; transform: translateY(0) scale(1); }
                                    }
                                    .animate-fade-in-up { animation: fade-in-up 0.2s ease-out forwards; }
                                `}</style>
                                <Calendar 
                                    selectedDate={formState.date}
                                    onDateSelect={handleDateSelect}
                                    language={language}
                                />
                            </div>
                        )}
                    </div>
                    
                    <fieldset className="mb-6">
                        <legend className="block text-[#5D4037] font-medium mb-2 text-sm">{t.formTime}</legend>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {timeOptions.map(opt => (
                                <div key={opt.key}>
                                    <input
                                        type="radio"
                                        id={`time_${opt.key}`}
                                        name="time"
                                        value={opt.key}
                                        checked={formState.time === opt.key}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                        required
                                    />
                                    <label
                                        htmlFor={`time_${opt.key}`}
                                        className="flex items-center justify-center text-center h-full w-full px-2 py-3.5 rounded-lg border text-sm transition-all duration-200 cursor-pointer border-stone-300 bg-white peer-checked:border-[#E29578] peer-checked:bg-[#FEF3EF] peer-checked:text-[#9F5440] peer-checked:font-semibold peer-checked:shadow-sm hover:border-[#E29578]"
                                    >
                                        <span>{opt.text}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </fieldset>

                    <div className="text-center">
                        <CtaButton type="submit" className="w-full">
                            {t.formSubmitButton}
                        </CtaButton>
                    </div>
                    {feedback && (
                        <p className={`text-center mt-4 text-sm ${feedback.color}`}>{feedback.message}</p>
                    )}
                </form>
            </div>
        </section>
    );
};

export default BookingForm;
