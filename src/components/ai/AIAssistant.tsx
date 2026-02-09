import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';
import woman1 from '@/assets/avatars/woman-1.png';
import woman2 from '@/assets/avatars/woman-2.png';
import woman3 from '@/assets/avatars/woman-3.png';
import woman4 from '@/assets/avatars/woman-4.png';
import woman5 from '@/assets/avatars/woman-5.png';
import man1 from '@/assets/avatars/man-1.png';
import man2 from '@/assets/avatars/man-2.png';
import man3 from '@/assets/avatars/man-3.png';
import man4 from '@/assets/avatars/man-4.png';
import man5 from '@/assets/avatars/man-5.png';

const AVATARS = [woman1, man1, woman2, man2, woman3, man3, woman4, man4, woman5, man5];

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantProps {
  isFloating?: boolean;
  defaultOpen?: boolean;
  className?: string;
}

const SUPABASE_URL = "https://pihmoaogjjiicfnkmpbe.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpaG1vYW9namppaWNmbmttcGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMDU5NTIsImV4cCI6MjA2NDc4MTk1Mn0.AwP8FI4ykefc4CCq-48QF_f1jbK3vTy41STytcQ5SaU";

const CHAT_URL = `${SUPABASE_URL}/functions/v1/gymspayoga-ai`;

const QUICK_PROMPTS = [
  "Find me a gym near me",
  "I'm stressed, need relaxation",
  "Looking for yoga classes",
  "Help me list my business",
];

export const AIAssistant: React.FC<AIAssistantProps> = ({
  isFloating = true,
  defaultOpen = false,
  className
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isExpanded, setIsExpanded] = useState(!isFloating);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [avatarIndex, setAvatarIndex] = useState(0);
  const [avatarFade, setAvatarFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAvatarFade(false);
      setTimeout(() => {
        setAvatarIndex(prev => (prev + 1) % AVATARS.length);
        setAvatarFade(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const streamChat = async (userMessage: string) => {
    const userMsg: Message = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setInput('');

    let assistantContent = '';

    try {
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          mode: 'user',
          context: {},
        }),
      });

      if (resp.status === 429) {
        toast.error("Too many requests. Please wait a moment and try again.");
        setIsLoading(false);
        return;
      }

      if (resp.status === 402) {
        toast.error("AI service temporarily unavailable.");
        setIsLoading(false);
        return;
      }

      if (!resp.ok || !resp.body) {
        throw new Error('Failed to start stream');
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let streamDone = false;

      // Add initial assistant message
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const updated = [...prev];
                if (updated.length > 0 && updated[updated.length - 1].role === 'assistant') {
                  updated[updated.length - 1] = { role: 'assistant', content: assistantContent };
                }
                return updated;
              });
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split('\n')) {
          if (!raw) continue;
          if (raw.endsWith('\r')) raw = raw.slice(0, -1);
          if (raw.startsWith(':') || raw.trim() === '') continue;
          if (!raw.startsWith('data: ')) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
            }
          } catch {}
        }
        setMessages(prev => {
          const updated = [...prev];
          if (updated.length > 0 && updated[updated.length - 1].role === 'assistant') {
            updated[updated.length - 1] = { role: 'assistant', content: assistantContent };
          }
          return updated;
        });
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Failed to get response. Please try again.');
      // Remove the empty assistant message if error occurred
      setMessages(prev => prev.filter(m => m.content !== ''));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      streamChat(input.trim());
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    if (!isLoading) {
      streamChat(prompt);
    }
  };

  // Floating chat button
  if (isFloating && !isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50" data-tour="ai-button">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex flex-col items-center gap-1 rounded-2xl bg-primary p-2 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          style={{ width: 80, height: 80 }}
        >
          <img
            src={AVATARS[avatarIndex]}
            alt="AI Assistant"
            className="h-12 w-12 rounded-full object-cover border-2 border-primary-foreground/30 transition-opacity duration-300"
            style={{ opacity: avatarFade ? 1 : 0 }}
          />
          <span className="text-primary-foreground font-bold text-[10px] leading-none">Ask me</span>
        </button>
      </div>
    );
  }

  const chatContent = (
    <div className={cn(
      "flex flex-col overflow-hidden border-0",
      isFloating && !isExpanded && "fixed bottom-6 right-6 w-[390px] h-[560px] z-50 rounded-2xl shadow-2xl",
      isFloating && isExpanded && "fixed inset-4 z-50 rounded-2xl shadow-2xl",
      !isFloating && "w-full h-full rounded-2xl shadow-lg",
      className
    )}>
      {/* Branded Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ background: '#005EB8' }}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={AVATARS[avatarIndex]}
              alt="GymSpaYoga AI"
              className="h-10 w-10 rounded-full object-cover border-2 border-white/40 transition-opacity duration-300"
              style={{ opacity: avatarFade ? 1 : 0 }}
            />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white tracking-wide">GymSpaYoga AI</h3>
            <p className="text-[11px] text-white/70">Train. Relax. Rejuvenate.</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {isFloating && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4 bg-[#f0f4f8] dark:bg-background" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="space-y-5">
            {/* Branded Welcome */}
            <div className="text-center py-6">
              <div className="h-16 w-16 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ background: '#005EB8' }}>
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-lg text-foreground">Namaste! 🙏 Welcome to GymSpaYoga</h4>
              <p className="text-muted-foreground text-sm mt-2 max-w-[280px] mx-auto">
                Batao, aaj ka mood kya hai — workout 💪, relaxation 🧖, ya yoga 🧘?
              </p>
              <p className="text-xs text-muted-foreground mt-1">Founded by Jagdeep Singh</p>
            </div>
            
            {/* Quick Prompts */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground text-center uppercase tracking-wider">Try asking</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {QUICK_PROMPTS.map((prompt, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    className="text-xs rounded-full border-[#005EB8]/30 text-[#005EB8] hover:bg-[#005EB8] hover:text-white transition-colors"
                    onClick={() => handleQuickPrompt(prompt)}
                    disabled={isLoading}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-3",
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {msg.role === 'assistant' && (
                  <div className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 border border-[#005EB8]/20" style={{ background: '#EBF2FA' }}>
                    <Bot className="h-4 w-4" style={{ color: '#005EB8' }} />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm",
                    msg.role === 'user'
                      ? 'rounded-br-md text-white'
                      : 'bg-white dark:bg-card rounded-bl-md border border-border/50'
                  )}
                  style={msg.role === 'user' ? { background: '#005EB8' } : undefined}
                >
                  {msg.role === 'assistant' ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none text-foreground">
                      <ReactMarkdown>{msg.content || '...'}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm">{msg.content}</p>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#005EB8' }}>
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.content === '' && (
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full flex items-center justify-center" style={{ background: '#EBF2FA' }}>
                  <Bot className="h-4 w-4" style={{ color: '#005EB8' }} />
                </div>
                <div className="bg-white dark:bg-card rounded-2xl rounded-bl-md px-4 py-3 border border-border/50 shadow-sm">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full animate-bounce" style={{ background: '#005EB8', animationDelay: '0ms' }} />
                    <span className="h-2 w-2 rounded-full animate-bounce" style={{ background: '#005EB8', animationDelay: '150ms' }} />
                    <span className="h-2 w-2 rounded-full animate-bounce" style={{ background: '#005EB8', animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Branded Input Area */}
      <form onSubmit={handleSubmit} className="p-3 border-t bg-white dark:bg-card">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about gyms, spas, yoga, trainers..."
            disabled={isLoading}
            className="flex-1 rounded-full border-[#005EB8]/20 focus-visible:ring-[#005EB8]/30"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="rounded-full h-10 w-10 shrink-0"
            style={{ background: '#005EB8' }}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : <Send className="h-4 w-4 text-white" />}
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          🏋️ Gym • 🧖 Spa • 🧘 Yoga — Powered by <span className="font-semibold" style={{ color: '#005EB8' }}>GymSpaYoga</span>
        </p>
      </form>
    </div>
  );

  return chatContent;
};

export default AIAssistant;
