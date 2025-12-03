import { Zap, Server, Shield } from 'lucide-react';
import { useChatStore } from '@/hooks/useChatStore';

export function ChatHeader() {
  const { users, isConnected, queueCounter } = useChatStore();
  const onlineCount = users.filter(u => u.status === 'online').length;

  return (
    <div className="p-4 border-b border-border/50 glass-panel">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary neon-glow">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            {isConnected && (
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-online animate-pulse-glow" />
            )}
          </div>
          
          <div>
            <h1 className="text-xl font-bold neon-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Distributed Chat
            </h1>
            <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1">
                <Server className="h-3 w-3" />
                FIFO Queue
              </span>
              <span className="text-border">•</span>
              <span>{onlineCount} online</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Queue Status */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono text-muted-foreground">QUEUE</span>
            </div>
            <span className="text-sm font-mono font-semibold text-foreground">
              #{queueCounter}
            </span>
          </div>

          {/* Connection Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/30 border border-border/50">
            <Shield className={`h-4 w-4 ${isConnected ? 'text-online' : 'text-offline'}`} />
            <span className="text-xs font-mono">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
