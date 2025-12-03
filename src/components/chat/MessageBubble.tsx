import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';
import { UserAvatar } from './UserAvatar';
import { ArrowRight, UserPlus, UserMinus } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar?: boolean;
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

export function MessageBubble({ message, isOwn, showAvatar = true }: MessageBubbleProps) {
  if (message.type === 'join' || message.type === 'leave') {
    return (
      <div className="flex justify-center py-2 animate-slide-up">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-border/30">
          {message.type === 'join' ? (
            <UserPlus className="h-3.5 w-3.5 text-online" />
          ) : (
            <UserMinus className="h-3.5 w-3.5 text-offline" />
          )}
          <span className="text-xs text-muted-foreground">
            {message.content}
          </span>
          <span className="text-[10px] font-mono text-muted-foreground/60">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    );
  }

  if (message.type === 'system') {
    return (
      <div className="flex justify-center py-2 animate-slide-up">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <span className="text-xs text-primary font-mono">
            {message.content}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        'flex gap-3 animate-slide-up',
        isOwn ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {showAvatar && (
        <UserAvatar 
          user={{ 
            id: message.userId, 
            name: message.userName, 
            status: 'online',
            joinedAt: new Date()
          }} 
          size="sm" 
          showStatus={false}
        />
      )}
      
      <div className={cn('flex flex-col max-w-[70%]', isOwn ? 'items-end' : 'items-start')}>
        <div className="flex items-center gap-2 mb-1 px-1">
          <span className={cn(
            'text-xs font-medium',
            isOwn ? 'text-primary' : 'text-foreground'
          )}>
            {message.userName}
          </span>
          <span className="text-[10px] font-mono text-muted-foreground">
            {formatTime(message.timestamp)}
          </span>
          {message.queuePosition && (
            <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground/50">
              <ArrowRight className="h-2.5 w-2.5" />
              #{message.queuePosition}
            </span>
          )}
        </div>
        
        <div 
          className={cn(
            'px-4 py-2.5 rounded-2xl',
            isOwn 
              ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-br-md' 
              : 'glass-panel rounded-bl-md'
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
}
