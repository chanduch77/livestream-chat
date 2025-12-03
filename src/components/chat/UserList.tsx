import { Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChatStore } from '@/hooks/useChatStore';
import { UserAvatar } from './UserAvatar';
import { StatusIndicator } from './StatusIndicator';

export function UserList() {
  const { users, currentUser, typingUsers } = useChatStore();
  
  const onlineUsers = users.filter(u => u.status === 'online');
  const offlineUsers = users.filter(u => u.status === 'offline');
  const awayUsers = users.filter(u => u.status === 'away');

  return (
    <div className="h-full flex flex-col glass-panel rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 neon-glow-sm">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Participants</h2>
            <p className="text-xs text-muted-foreground font-mono">
              {users.length} {users.length === 1 ? 'user' : 'users'} connected
            </p>
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-4">
        {/* Online Users */}
        {onlineUsers.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-2">
              <StatusIndicator status="online" size="sm" />
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Online — {onlineUsers.length}
              </span>
            </div>
            <div className="space-y-1">
              {onlineUsers.map(user => (
                <UserListItem 
                  key={user.id} 
                  user={user} 
                  isCurrentUser={currentUser?.id === user.id}
                  isTyping={typingUsers.includes(user.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Away Users */}
        {awayUsers.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-2">
              <StatusIndicator status="away" size="sm" />
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Away — {awayUsers.length}
              </span>
            </div>
            <div className="space-y-1">
              {awayUsers.map(user => (
                <UserListItem 
                  key={user.id} 
                  user={user} 
                  isCurrentUser={currentUser?.id === user.id}
                  isTyping={typingUsers.includes(user.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Offline Users */}
        {offlineUsers.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-2">
              <StatusIndicator status="offline" size="sm" />
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Offline — {offlineUsers.length}
              </span>
            </div>
            <div className="space-y-1">
              {offlineUsers.map(user => (
                <UserListItem 
                  key={user.id} 
                  user={user} 
                  isCurrentUser={currentUser?.id === user.id}
                  isTyping={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Queue Info */}
      <div className="p-3 border-t border-border/50 bg-muted/30">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground font-mono">FIFO Queue</span>
          <span className="text-primary font-mono font-semibold">Active</span>
        </div>
      </div>
    </div>
  );
}

interface UserListItemProps {
  user: { id: string; name: string; status: 'online' | 'offline' | 'away'; joinedAt: Date };
  isCurrentUser: boolean;
  isTyping: boolean;
}

function UserListItem({ user, isCurrentUser, isTyping }: UserListItemProps) {
  return (
    <div 
      className={cn(
        'flex items-center gap-3 p-2 rounded-lg transition-all duration-200',
        'hover:bg-muted/50',
        isCurrentUser && 'bg-primary/10 border border-primary/20'
      )}
    >
      <UserAvatar user={user} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={cn(
            'font-medium truncate',
            isCurrentUser && 'text-primary'
          )}>
            {user.name}
          </span>
          {isCurrentUser && (
            <span className="text-[10px] font-mono text-primary bg-primary/20 px-1.5 py-0.5 rounded">
              YOU
            </span>
          )}
        </div>
        {isTyping && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="animate-typing">typing</span>
            <span className="flex gap-0.5">
              <span className="w-1 h-1 rounded-full bg-muted-foreground animate-typing" style={{ animationDelay: '0s' }} />
              <span className="w-1 h-1 rounded-full bg-muted-foreground animate-typing" style={{ animationDelay: '0.2s' }} />
              <span className="w-1 h-1 rounded-full bg-muted-foreground animate-typing" style={{ animationDelay: '0.4s' }} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
