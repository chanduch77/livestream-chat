import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChatStore } from '@/hooks/useChatStore';

export function MessageInput() {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { currentUser, addMessage, setTyping } = useChatStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const handleSubmit = () => {
    if (!message.trim() || !currentUser) return;

    addMessage({
      userId: currentUser.id,
      userName: currentUser.name,
      content: message.trim(),
      timestamp: new Date(),
      type: 'message',
    });

    setMessage('');
    setTyping(currentUser.id, false);
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }

    // Typing indicator
    if (currentUser) {
      setTyping(currentUser.id, true);
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      typingTimeoutRef.current = setTimeout(() => {
        setTyping(currentUser.id, false);
      }, 2000);
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="p-4 border-t border-border/50">
      <div 
        className={cn(
          'relative flex items-end gap-3 p-3 rounded-2xl transition-all duration-300',
          'glass-panel',
          isFocused && 'ring-2 ring-primary/50 neon-glow-sm'
        )}
      >
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Type a message..."
          rows={1}
          className={cn(
            'flex-1 bg-transparent resize-none outline-none',
            'text-sm text-foreground placeholder:text-muted-foreground',
            'max-h-[120px]'
          )}
        />
        
        <button
          onClick={handleSubmit}
          disabled={!message.trim()}
          className={cn(
            'p-2.5 rounded-xl transition-all duration-300',
            'bg-gradient-to-br from-primary to-secondary',
            'text-primary-foreground',
            'hover:opacity-90 hover:scale-105',
            'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100',
            message.trim() && 'neon-glow-sm'
          )}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
      
      <p className="text-[10px] text-muted-foreground mt-2 text-center font-mono">
        Press Enter to send • Shift + Enter for new line
      </p>
    </div>
  );
}
