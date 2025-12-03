import { useEffect, useRef } from 'react';
import { useChatStore } from '@/hooks/useChatStore';
import { MessageBubble } from './MessageBubble';
import { MessageSquare } from 'lucide-react';

export function MessageList() {
  const { messages, currentUser, typingUsers, users } = useChatStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingUsers]);

  const typingUserNames = typingUsers
    .filter(id => id !== currentUser?.id)
    .map(id => users.find(u => u.id === id)?.name)
    .filter(Boolean);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <div className="p-4 rounded-2xl bg-muted/30 mb-4">
          <MessageSquare className="h-12 w-12 text-muted-foreground/50" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No messages yet</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Start the conversation! Messages are processed in FIFO order.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
      {messages.map((message) => (
        <MessageBubble 
          key={message.id} 
          message={message} 
          isOwn={message.userId === currentUser?.id}
        />
      ))}
      
      {/* Typing Indicator */}
      {typingUserNames.length > 0 && (
        <div className="flex items-center gap-3 px-4 py-2 animate-fade-in">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-typing" style={{ animationDelay: '0s' }} />
            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-typing" style={{ animationDelay: '0.2s' }} />
            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-typing" style={{ animationDelay: '0.4s' }} />
          </div>
          <span className="text-sm text-muted-foreground">
            {typingUserNames.length === 1 
              ? `${typingUserNames[0]} is typing...`
              : `${typingUserNames.slice(0, -1).join(', ')} and ${typingUserNames.slice(-1)} are typing...`
            }
          </span>
        </div>
      )}
      
      <div ref={bottomRef} />
    </div>
  );
}
