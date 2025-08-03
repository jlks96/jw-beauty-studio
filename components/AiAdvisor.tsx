
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useTranslations } from '../hooks/useTranslations';
import { SendIcon, UserIcon, SparklesIcon } from './common/Icons';

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

const AiAdvisor: React.FC = () => {
    const t = useTranslations();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const systemInstruction = `You are an expert esthetician from JW Beauty Studio. Your tone must be friendly, professional, and helpful. Provide concise skincare advice. Use the detailed service list below to answer user questions and make recommendations. If a user's query can be addressed by a service, briefly mention it as a potential solution.

**JW Beauty Studio Service & Price List**

---

**Signature Treatment (高级护理)**
- **Cell Renewal Micro-Infusion / MTS Booster:** Microneedle with cell rejuvenation/hydration essence. Trial: $138 / UP: $198.
- **Power Lift HIFU:** Full-face HIFU lifting for contour improvement. Trial: $288 / UP: $388.

---

**Add-on Treatments (加购项目)**
- **RF Eye Care:** RF eye tightening, reduces fine lines. Trial: $28 / UP: $38.
- **RF Neck Care:** RF neck tightening, reduces neck wrinkles. Trial: $28 / UP: $38.
- **Korean LED Light Therapy:** For acne, repair, or whitening. Trial: $48 / UP: $68.
- **Skin Tag Removal:** $5 per tag / $98 for full face.

---

**Special Add-on Instruments (特别加购仪器项目)**
- **Any two instruments:** Trial $88 / UP $158.
- **Instruments list:** Ultrasonic Scrubber (exfoliate/cleanse), Sonic Collagen Booster (firming), Cold Therapy Machine (soothe/shrink pores), Nano Oxygen Spray (hydrate/brighten).

---

**Goddess Treatment Series (女神护理)**

**Basic Goddess Treatment (女神基础护理)**
- **Pure Glow Basic Facial:** Basic cleansing. Trial: $38 / UP: $68.
- **Crystal Ball Infusion:** Cold ball ampoule infusion. Trial: $48 / UP: $88.
- **Deep Cleansing & Purifying:** Deep cleanse and exfoliation. Trial: $58 / UP: $98.
- **Hydration / Collagen / Nano Oxy:** Custom instrument infusion. Trial: $68 / UP: $118.

**Advanced Goddess Treatment (女神进阶护理)**
- **RF Lift Treatment:** RF tightening. Face(F): Trial $88/UP $128. Face+Eye+Neck(F+E+N): Trial $108/UP $158.
- **Duo Tech Treatment:** Two-instrument combo. Trial: $98 / UP: $158.
- **Bright Radiance Whitening Treatment:** Whitening infusion + LED therapy. Trial: $108 / UP: $168.
- **ACNE Treatment:** Acne care + cold machine + LED therapy. Trial: $108 / UP: $168.
- **Deep Detox Trio Therapy:** Full detox with instruments. Trial: $128 / UP: $188.

---

**IMPORTANT RULES:**
1. Keep your answers to a maximum of 3-4 sentences.
2. **ALWAYS** include this disclaimer at the end of your response, on a new line: 'Disclaimer: This is AI-generated advice. For personalized treatment, please book a consultation.'`;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError('');

        try {
            // API_KEY is expected to be in the environment variables, as per guidelines.
            if (!process.env.API_KEY) {
                throw new Error("API key is not configured.");
            }
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: input,
                config: {
                    systemInstruction: systemInstruction,
                },
            });

            const aiMessage: Message = { sender: 'ai', text: response.text };
            setMessages(prev => [...prev, aiMessage]);

        } catch (err) {
            console.error("AI Advisor Error:", err);
            const errorMessage = t.aiError;
            setError(errorMessage);
            const aiErrorMessage: Message = { sender: 'ai', text: errorMessage };
            setMessages(prev => [...prev, aiErrorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="ai-advisor" className="py-16 md:py-24 bg-[#FDF5E6]">
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-[#78350F] font-playfair mb-4">
                    {t.aiAdvisorTitle}
                </h2>
                <p className="text-center text-[#5D4037] mb-12 max-w-2xl mx-auto">{t.aiAdvisorSubtitle}</p>
                
                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-stone-200">
                    <div className="p-4 sm:p-6 h-96 overflow-y-auto space-y-4 custom-scrollbar">
                        {messages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-center text-stone-500">
                                 <SparklesIcon className="w-12 h-12 mb-4 text-[#E29578]/50"/>
                                 <p className="font-medium">{t.aiWelcomeMessage}</p>
                                 <p className="text-sm">{t.aiWelcomeExample}</p>
                            </div>
                        )}
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-3 animate-fade-in ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                {msg.sender === 'ai' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E29578] flex items-center justify-center text-white"><SparklesIcon className="w-5 h-5"/></div>}
                                <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'user' ? 'bg-[#FEF3EF] text-[#78350F]' : 'bg-stone-100 text-[#5D4037]'}`}>
                                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                </div>
                                {msg.sender === 'user' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-600"><UserIcon className="w-5 h-5"/></div>}
                            </div>
                        ))}
                        {isLoading && (
                             <div className="flex items-start gap-3 animate-fade-in">
                                 <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E29578] flex items-center justify-center text-white"><SparklesIcon className="w-5 h-5"/></div>
                                 <div className="max-w-md p-3 rounded-lg bg-stone-100 text-[#5D4037]">
                                     <div className="flex items-center space-x-1">
                                         <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                         <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                         <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-pulse"></span>
                                     </div>
                                 </div>
                             </div>
                        )}
                         <style>{`
                            .custom-scrollbar::-webkit-scrollbar {
                                width: 6px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-track {
                                background: transparent;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb {
                                background-color: #D4BFAD;
                                border-radius: 10px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                background-color: #C5735A;
                            }
                            /* For Firefox */
                            .custom-scrollbar {
                                scrollbar-width: thin;
                                scrollbar-color: #D4BFAD transparent;
                            }
                            @keyframes fade-in {
                                from { opacity: 0; transform: translateY(10px); }
                                to { opacity: 1; transform: translateY(0); }
                            }
                            .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                        `}</style>
                    </div>
                    <div className="p-4 sm:p-6 border-t border-stone-200">
                        <form onSubmit={handleSubmit} className="flex items-center gap-3">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder={t.aiInputPlaceholder as string}
                                className="w-full bg-stone-100 border border-stone-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#E29578]/50 focus:border-[#E29578] outline-none transition"
                                disabled={isLoading}
                                aria-label="Your skincare question"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="bg-[#E29578] text-white p-3 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#D88468] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E29578] disabled:bg-stone-300 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                                aria-label="Send message"
                            >
                                <SendIcon className="w-5 h-5"/>
                            </button>
                        </form>
                        {error && <p className="text-red-600 text-xs mt-2 text-center">{error}</p>}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AiAdvisor;
