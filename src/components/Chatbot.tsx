import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { CHATBOT_CONFIG } from '@/config/chatbot';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

function generateSessionId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function generateMessageId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const sessionIdRef = useRef<string>(generateSessionId());
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Seed greeting on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: generateMessageId(),
          role: 'assistant',
          content: CHATBOT_CONFIG.greeting,
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const userMessage: Message = {
        id: generateMessageId(),
        role: 'user',
        content: trimmed,
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsTyping(true);

      // If webhook is not configured, respond gracefully
      if (!CHATBOT_CONFIG.webhookUrl) {
        await new Promise((r) => setTimeout(r, 1200));
        setMessages((prev) => [
          ...prev,
          {
            id: generateMessageId(),
            role: 'assistant',
            content: CHATBOT_CONFIG.notConfiguredMessage,
          },
        ]);
        setIsTyping(false);
        if (!isOpen) setHasUnread(true);
        return;
      }

      // Send POST to n8n webhook
      try {
        const response = await fetch(CHATBOT_CONFIG.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: trimmed,
            sessionId: sessionIdRef.current,
          }),
        });

        if (!response.ok) {
          throw new Error(`Webhook returned ${response.status}`);
        }

        const data = await response.json();

        // Support multiple response shapes from n8n
        const reply =
          data.reply ||
          data.response ||
          data.message ||
          data.output ||
          (typeof data === 'string' ? data : null) ||
          CHATBOT_CONFIG.errorMessage;

        setMessages((prev) => [
          ...prev,
          {
            id: generateMessageId(),
            role: 'assistant',
            content: reply,
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: generateMessageId(),
            role: 'assistant',
            content: CHATBOT_CONFIG.errorMessage,
          },
        ]);
      } finally {
        setIsTyping(false);
        if (!isOpen) setHasUnread(true);
      }
    },
    [isTyping, isOpen],
  );

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Open chat assistant"
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
          bg-gradient-to-br from-electric-500 to-electric-700
          shadow-lg shadow-electric-500/40
          flex items-center justify-center text-white
          transition-all duration-300 hover:scale-110 hover:shadow-electric-500/60
          ${isOpen ? 'opacity-0 pointer-events-none scale-50' : 'opacity-100 scale-100'}`}
      >
        <MessageSquare className="w-6 h-6" />
        {hasUnread && (
          <span className="absolute top-1 right-1 w-3 h-3 bg-cyan-400 rounded-full ring-2 ring-midnight-950 animate-pulse" />
        )}
        <span className="absolute inset-0 rounded-full bg-electric-400/40 animate-ping" />
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[400px] h-[600px] max-h-[calc(100vh-3rem)]
          origin-bottom-right transition-all duration-300
          ${isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-90 opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col h-full glass rounded-2xl overflow-hidden shadow-2xl shadow-midnight-950/80 border-electric-500/20">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-electric-600/20 to-cyan-500/10 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-400 to-electric-700 flex items-center justify-center shadow-lg shadow-electric-500/30">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full ring-2 ring-midnight-900" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-sm">
                  {CHATBOT_CONFIG.headerTitle}
                </h3>
                <p className="text-xs text-gray-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  {CHATBOT_CONFIG.statusText}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-5 space-y-4 scrollbar-hide"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                    ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-electric-500 to-electric-700 text-white rounded-br-md shadow-lg shadow-electric-500/20'
                        : 'glass-card text-gray-200 rounded-bl-md'
                    }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start animate-slide-up">
                <div className="glass-card px-4 py-3.5 rounded-2xl rounded-bl-md flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-electric-400 rounded-full animate-typing" />
                  <span className="w-2 h-2 bg-electric-400 rounded-full animate-typing" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 bg-electric-400 rounded-full animate-typing" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}

            {/* Quick replies - show only after greeting, before first user message */}
            {messages.length === 1 && !isTyping && (
              <div className="flex flex-wrap gap-2 pt-2 animate-fade-in">
                {CHATBOT_CONFIG.quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3.5 py-2 rounded-full text-xs font-medium
                      glass-card text-gray-300 hover:text-white
                      hover:border-electric-500/40 hover:bg-electric-500/10
                      transition-all duration-300"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="px-4 py-3 border-t border-white/10 bg-midnight-900/50"
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isTyping}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5
                  text-sm text-white placeholder-gray-500
                  focus:outline-none focus:border-electric-500/50 focus:bg-white/10
                  transition-all duration-300 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-500 to-electric-700
                  flex items-center justify-center text-white
                  shadow-lg shadow-electric-500/20
                  transition-all duration-300 hover:scale-105 hover:shadow-electric-500/40
                  disabled:opacity-40 disabled:scale-100 disabled:cursor-not-allowed
                  active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
