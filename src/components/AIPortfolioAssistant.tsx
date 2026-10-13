import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Minimize2,
  ChevronDown,
  ExternalLink,
  GraduationCap,
  Gamepad2,
  Code2,
  Phone
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome-msg',
  sender: 'assistant',
  text: `Hello! I am Sudarshan Lama's AI Portfolio Assistant. 

Ask me anything about his studies (SEE 3.62 GPA, Grade 12 SLC 2.94 GPA, BIT Semester 1), his GameHub Arcade web platform, C programming and web skills, or how to reach him directly on WhatsApp!`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

const SUGGESTED_QUESTIONS = [
  { label: '🎓 Education & GPA', prompt: 'Tell me about Sudarshan’s education background and GPA distinctions.' },
  { label: '🕹️ GameHub Arcade', prompt: 'Tell me about the GameHub Arcade project.' },
  { label: '💻 Technical Skills', prompt: 'What programming languages and technical skills does Sudarshan have?' },
  { label: '📱 WhatsApp Contact', prompt: 'How can I connect with Sudarshan directly on WhatsApp?' },
];

export const AIPortfolioAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || "I'm having trouble retrieving details right now. You can reach Sudarshan directly via WhatsApp at +977 9744690125!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      if (!isOpen) setHasUnread(true);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: "Sudarshan Lama is currently enrolled in BIT Semester 1 in Kathmandu (SEE: 3.62 GPA, Grade 12 SLC: 2.94 GPA). You can contact him directly on WhatsApp at +977 9744690125 or via email at sudarshanlama09@gmail.com!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-semibold text-xs shadow-xl shadow-blue-600/30 border border-white/20 backdrop-blur-md cursor-pointer transition-all duration-300"
          aria-label="Open AI Portfolio Assistant"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>

          <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse" />
          <span className="tracking-wide">Ask Sudarshan's AI</span>

          {hasUnread && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#090F1C]" />
          )}
        </motion.button>
      )}

      {/* Floating Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="w-[92vw] sm:w-[410px] h-[540px] max-h-[85vh] rounded-3xl bg-[#0B1120]/95 backdrop-blur-2xl border border-blue-900/60 shadow-2xl flex flex-col overflow-hidden relative"
          >
            {/* Top Glow Ambient Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500" />

            {/* Chat Header */}
            <div className="p-4 bg-[#080D18]/90 border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5 flex items-center justify-center shadow-md">
                    <img
                      src={PERSONAL_INFO.profileImage}
                      alt="Sudarshan Lama"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-[#080D18]" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white">Sudarshan's AI</h3>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-950/80 text-blue-300 border border-blue-800/40 font-mono">
                      v2.5
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Grounded Knowledge Assistant</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-blue-900/60 border border-blue-700/40 flex items-center justify-center shrink-0 mt-0.5 text-cyan-300">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-[#121B2E] text-slate-200 border border-white/5 rounded-bl-none'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    <span
                      className={`text-[9px] block text-right mt-1 opacity-60 ${
                        msg.sender === 'user' ? 'text-white' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5 text-slate-300">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-full bg-blue-900/60 border border-blue-700/40 flex items-center justify-center shrink-0 text-cyan-300">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-[#121B2E] border border-white/5 rounded-2xl rounded-bl-none px-4 py-2.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-3 py-2 bg-[#080D18]/70 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {SUGGESTED_QUESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(item.prompt)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-blue-950 text-slate-300 hover:text-cyan-300 border border-slate-700/80 hover:border-blue-700 text-[11px] whitespace-nowrap transition-colors shrink-0 disabled:opacity-50 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-[#080D18] border-t border-white/10 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about studies, skills, projects..."
                maxLength={1000}
                disabled={isLoading}
                className="flex-1 bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 focus:outline-none rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
