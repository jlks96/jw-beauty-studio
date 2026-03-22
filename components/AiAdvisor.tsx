
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useTranslations } from '../hooks/useTranslations';
import { systemInstruction } from '../locales/prompts';
import Typewriter from './common/Typewriter';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import SendIcon from '@mui/icons-material/Send';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PersonIcon from '@mui/icons-material/Person';

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
        if (messages.length > 0) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
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
            const errorMessage = t.aiError as string;
            setError(errorMessage);
            setMessages(prev => {
                const newMessages = [...prev];
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
        <Box id="ai-advisor" component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#FDF5E6' }}>
            <Container maxWidth="lg">
                <Typography variant="h2" align="center" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: 'primary.dark', mb: 2 }}>
                    {t.aiAdvisorTitle}
                </Typography>
                <Typography align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 640, mx: 'auto' }}>
                    {t.aiAdvisorSubtitle}
                </Typography>

                <Paper elevation={3} sx={{ maxWidth: 672, mx: 'auto', borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                    {/* Messages Area */}
                    <Box className="custom-scrollbar" sx={{ p: { xs: 2, sm: 3 }, height: 384, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {messages.length === 0 && !isLoading && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', color: 'text.disabled' }}>
                                <AutoAwesomeIcon sx={{ fontSize: 48, mb: 2, color: 'rgba(226, 149, 120, 0.5)' }} />
                                <Typography fontWeight={500}>{t.aiWelcomeMessage}</Typography>
                                <Typography variant="body2">{t.aiWelcomeExample}</Typography>
                                <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
                                    {suggestions.map((text, i) => (
                                        <Chip
                                            key={i}
                                            label={text}
                                            variant="outlined"
                                            onClick={() => handleSuggestionClick(text as string)}
                                            sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'grey.100' } }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        )}
                        {messages.map((msg, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                                {msg.sender === 'ai' && (
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                                        <AutoAwesomeIcon sx={{ fontSize: 18 }} />
                                    </Avatar>
                                )}
                                <Box sx={{ maxWidth: '75%', px: 2, py: 1.5, borderRadius: 2, bgcolor: msg.sender === 'user' ? '#FEF3EF' : 'grey.100', color: msg.sender === 'user' ? 'primary.dark' : 'text.secondary' }}>
                                    {msg.sender === 'ai' && !msg.text && isLoading ? (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, py: 0.5 }}>
                                            {[0, 1, 2].map(i => (
                                                <Box key={i} sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'text.disabled', animation: 'pulse 1.4s infinite', animationDelay: `${i * 0.15}s`, '@keyframes pulse': { '0%, 100%': { opacity: 0.4 }, '50%': { opacity: 1 } } }} />
                                            ))}
                                        </Box>
                                    ) : (
                                        <Typewriter 
                                            text={msg.text} 
                                            speed={10} 
                                            className="text-sm" 
                                            animate={index === messages.length - 1} 
                                            onType={() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
                                        />
                                    )}
                                </Box>
                                {msg.sender === 'user' && (
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'grey.300' }}>
                                        <PersonIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                    </Avatar>
                                )}
                            </Box>
                        ))}
                        <Box ref={messagesEndRef} />
                    </Box>

                    {/* Input Area */}
                    <Box sx={{ p: { xs: 2, sm: 3 }, borderTop: '1px solid', borderColor: 'divider' }}>
                        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <TextField
                                fullWidth
                                size="small"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder={t.aiInputPlaceholder as string}
                                disabled={isLoading}
                                aria-label="Your skincare question"
                                variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            />
                            <IconButton
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                aria-label="Send message"
                                sx={{
                                    bgcolor: 'primary.main',
                                    color: 'common.white',
                                    '&:hover': { bgcolor: 'primary.dark' },
                                    '&.Mui-disabled': { bgcolor: 'grey.300', color: 'grey.500' },
                                }}
                            >
                                <SendIcon sx={{ fontSize: 20 }} />
                            </IconButton>
                        </Box>
                        {error && <Typography color="error" variant="caption" align="center" sx={{ display: 'block', mt: 1 }}>{error}</Typography>}
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default AiAdvisor;
