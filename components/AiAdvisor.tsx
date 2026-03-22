
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useTranslations } from '../hooks/useTranslations';
import { systemInstruction } from '../locales/prompts';
import { SendIcon, UserIcon, SparklesIcon } from './common/Icons';
import Typewriter from './common/Typewriter';

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
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const sendMessage = async (messageText: string) => {
        if (!messageText.trim() || isLoading) return;

        const userMessage: Message = { sender: 'user', text: messageText };
        setMessages(prev => [...prev, userMessage, { sender: 'ai', text: '' }]);
        setInput('');
        setIsLoading(true);
        setError('');

        try {
            if (!process.env.GEMINI_API_KEY) {
                throw new Error("API key is not configured.");
            }
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            const responseStream = await ai.models.generateContentStream({
                model: 'gemini-2.5-flash',
                contents: messageText,
                config: {
                    systemInstruction: systemInstruction,
                },
            });

            for await (const chunk of responseStream) {
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastIndex = newMessages.length - 1;
                    if (lastIndex < 0) return prev;
                    
                    const lastMsg = { ...newMessages[lastIndex] };
                    
                    const newText = chunk.text || '';
                    
                    if (newText.startsWith(lastMsg.text) && lastMsg.text.length > 0) {
                        lastMsg.text = newText;
                    } else if (!lastMsg.text.endsWith(newText)) {
                        lastMsg.text += newText;
                    }
                    
                    newMessages[lastIndex] = lastMsg;
                    return newMessages;
                });
            }

        } catch (err) {
            console.error("AI Advisor Error:", err);
            const errorMessage = t.aiError;
            setError(errorMessage);
            setMessages(prev => {
                const newMessages = [...prev];
                // Find the last AI message (which should be the empty one) and update it with the error.
                const lastAiMessageIndex = newMessages.map(m => m.sender).lastIndexOf('ai');
                if(lastAiMessageIndex !== -1) {
                    newMessages[lastAiMessageIndex].text = errorMessage;
                }
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    const handleSuggestionClick = (suggestion: string) => {
        sendMessage(suggestion);
    };

    const suggestions = [
        t.aiSuggestion1,
        t.aiSuggestion2,
        t.aiSuggestion3
    ].filter(Boolean);

    return (
        <section id="ai-advisor" className="py-16 md:py-24 bg-[#FDF5E6]">
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-[#78350F] font-playfair mb-4">
                    {t.aiAdvisorTitle}
                </h2>
                <p className="text-center text-[#5D4037] mb-12 max-w-2xl mx-auto">{t.aiAdvisorSubtitle}</p>
                
                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-stone-200">
                    <div className="p-4 sm:p-6 h-96 overflow-y-auto space-y-4 custom-scrollbar">
                        {messages.length === 0 && !isLoading && (
                            <div className="flex flex-col items-center justify-center h-full text-center text-stone-500">
                                 <SparklesIcon className="w-12 h-12 mb-4 text-[#E29578]/50"/>
                                 <p className="font-medium">{t.aiWelcomeMessage}</p>
                                 <p className="text-sm">{t.aiWelcomeExample}</p>
                                 <div className="mt-6 flex flex-wrap justify-center gap-2">
                                     {suggestions.map((text, i) => (
                                         <button
                                             key={i}
                                             onClick={() => handleSuggestionClick(text as string)}
                                             className="px-3 py-1.5 bg-stone-100/80 text-stone-700 rounded-full text-xs hover:bg-stone-200/90 transition-colors border border-stone-200"
                                             aria-label={`Ask: ${text}`}
                                         >
                                             {text}
                                         </button>
                                     ))}
                                 </div>
                            </div>
                        )}
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-3 animate-fade-in ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                {msg.sender === 'ai' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E29578] flex items-center justify-center text-white"><SparklesIcon className="w-5 h-5"/></div>}
                                <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'user' ? 'bg-[#FEF3EF] text-[#78350F]' : 'bg-stone-100 text-[#5D4037]'}`}>
                                    {msg.sender === 'ai' && !msg.text && isLoading ? (
                                        <div className="flex items-center space-x-1 py-1">
                                            <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                            <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                            <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-pulse"></span>
                                        </div>
                                    ) : (
                                        <Typewriter 
                                            text={msg.text} 
                                            speed={10} 
                                            className="text-sm" 
                                            animate={index === messages.length - 1} 
                                            onType={() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
                                        />
                                    )}
                                </div>
                                {msg.sender === 'user' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-600"><UserIcon className="w-5 h-5"/></div>}
                            </div>
                        ))}
                         <div ref={messagesEndRef} />

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
