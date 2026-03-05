import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Loader2, Sparkles, Bot, User, Minimize2, Maximize2, RotateCcw, Zap, Heart, Dumbbell, Leaf, Brain } from 'lucide-react';
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

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://pihmoaogjjiicfnkmpbe.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpaG1vYW9namppaWNmbmttcGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMDU5NTIsImV4cCI6MjA2NDc4MTk1Mn0.AwP8FI4ykefc4CCq-48QF_f1jbK3vTy41STytcQ5SaU";
const CHAT_URL = `${SUPABASE_URL}/functions/v1/gymspayoga-ai`;

const MOOD_PROMPTS = [
  { icon: Dumbbell, label: "💪 Workout mode", prompt: "I want an intense workout today!", color: "#E53E3E" },
  { icon: Leaf, label: "🧘 Relax & heal", prompt: "I'm stressed and need relaxation", color: "#38A169" },
  { icon: Zap, label: "⚡ Lose weight", prompt: "Help me start my weight loss journey", color: "#D69E2E" },
  { icon: Brain, label: "🧠 Mental peace", prompt: "I need something for mental wellness", color: "#805AD5" },
  { icon: Heart, label: "🏢 List my business", prompt: "I want to list my gym/spa/yoga studio on GymSpaYoga", color: "#005EB8" },
];

const FOLLOW_UP_SUGGESTIONS = [
  ["Show me gyms nearby", "Any beginner-friendly options?", "What's the cheapest plan?"],
  ["Tell me about yoga benefits", "Book a trial session", "Compare gym vs yoga for me"],
  ["Find me a personal trainer", "Home training options?", "Online sessions available?"],
  ["Spa recommendations", "Couples spa packages?", "Ayurvedic treatments?"],
];

const WELLNESS_TIPS = [
  "💡 Did you know? Just 20 mins of walking reduces stress hormones by 30%!",
  "💡 Pro tip: Post-workout protein within 30 min = faster muscle recovery!",
  "💡 Ayurveda says: Warm water + lemon in the morning = digestive magic ✨",
  "💡 Fun fact: Laughing for 15 min burns ~40 calories. Hansi bhi exercise hai! 😄",
  "💡 Yoga nidra (yogic sleep) for 30 min = 2 hours of regular sleep quality!",
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
  const [tipIndex] = useState(() => Math.floor(Math.random() * WELLNESS_TIPS.length));
  const [followUpIndex, setFollowUpIndex] = useState(0);

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

  const streamChat = useCallback(async (userMessage: string) => {
    const userMsg: Message = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setInput('');
    setFollowUpIndex(prev => (prev + 1) % FOLLOW_UP_SUGGESTIONS.length);

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
        toast.error("Thoda ruko! 🙏 Too many requests. Try again in a moment.");
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
          if (jsonStr === '[DONE]') { streamDone = true; break; }

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
            if (content) assistantContent += content;
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
      setMessages(prev => prev.filter(m => m.content !== ''));
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      streamChat(input.trim());
    }
  };

  const handleReset = () => {
    setMessages([]);
    setInput('');
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
      isFloating && !isExpanded && "fixed bottom-6 right-6 w-[390px] h-[600px] z-50 rounded-2xl shadow-2xl",
      isFloating && isExpanded && "fixed inset-4 z-50 rounded-2xl shadow-2xl",
      !isFloating && "w-full h-full rounded-2xl shadow-lg",
      className
    )}>
      {/* Header */}
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
            <p className="text-[11px] text-white/70">Your Wellness Buddy 🤙</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={handleReset} title="New chat">
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
          {isFloating && (
            <>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={() => setIsOpen(false)}>
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
            {/* Welcome */}
            <div className="text-center py-4">
              <div className="h-16 w-16 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ background: '#005EB8' }}>
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-lg text-foreground">Hey there! 👋</h4>
              <p className="text-muted-foreground text-sm mt-2 max-w-[300px] mx-auto">
                Main hoon GSY — tumhara wellness buddy. Batao aaj ka mood kya hai? 🎯
              </p>
            </div>

            {/* Mood-based Quick Actions */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground text-center uppercase tracking-wider">Aaj ka vibe kya hai?</p>
              <div className="grid grid-cols-1 gap-2">
                {MOOD_PROMPTS.map((item, i) => (
                  <button
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border border-border/50 bg-white dark:bg-card shadow-sm hover:shadow-md"
                    onClick={() => streamChat(item.prompt)}
                    disabled={isLoading}
                  >
                    <span className="text-lg">{item.label.split(' ')[0]}</span>
                    <span className="text-foreground/80">{item.label.split(' ').slice(1).join(' ')}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Wellness Tip */}
            <div className="mt-3 px-3 py-2.5 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border border-green-200/50 dark:border-green-800/30">
              <p className="text-xs text-foreground/70">{WELLNESS_TIPS[tipIndex]}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
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
                    <div className="prose prose-sm dark:prose-invert max-w-none text-foreground [&_p]:mb-2 [&_ul]:mb-2 [&_ol]:mb-2">
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

            {/* Typing indicator */}
            {isLoading && messages[messages.length - 1]?.content === '' && (
              <div className="flex gap-3 animate-in fade-in duration-300">
                <div className="h-8 w-8 rounded-full flex items-center justify-center" style={{ background: '#EBF2FA' }}>
                  <Bot className="h-4 w-4" style={{ color: '#005EB8' }} />
                </div>
                <div className="bg-white dark:bg-card rounded-2xl rounded-bl-md px-4 py-3 border border-border/50 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="h-2 w-2 rounded-full animate-bounce" style={{ background: '#005EB8', animationDelay: '0ms' }} />
                      <span className="h-2 w-2 rounded-full animate-bounce" style={{ background: '#005EB8', animationDelay: '150ms' }} />
                      <span className="h-2 w-2 rounded-full animate-bounce" style={{ background: '#005EB8', animationDelay: '300ms' }} />
                    </div>
                    <span className="text-xs text-muted-foreground ml-1">Soch raha hoon...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Contextual follow-up suggestions */}
            {!isLoading && messages.length > 0 && messages[messages.length - 1]?.role === 'assistant' && messages[messages.length - 1]?.content !== '' && (
              <div className="flex flex-wrap gap-1.5 pt-1 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300">
                {FOLLOW_UP_SUGGESTIONS[followUpIndex].map((suggestion, i) => (
                  <button
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-full border border-[#005EB8]/25 text-[#005EB8] hover:bg-[#005EB8] hover:text-white transition-colors duration-200"
                    onClick={() => streamChat(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-3 border-t bg-white dark:bg-card">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
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
          Powered by <span className="font-semibold" style={{ color: '#005EB8' }}>GymSpaYoga AI</span> — Your Wellness Buddy
        </p>
      </form>
    </div>
  );

  return chatContent;
};

export default AIAssistant;
