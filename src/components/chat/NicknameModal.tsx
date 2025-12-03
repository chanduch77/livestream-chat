import { useState } from 'react';
import { User, Zap, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NicknameModalProps {
  onSubmit: (nickname: string) => void;
}

export function NicknameModal({ onSubmit }: NicknameModalProps) {
  const [nickname, setNickname] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim().length >= 2) {
      onSubmit(nickname.trim());
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-border/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-border/30 rounded-full" />
      </div>

      {/* Modal */}
      <div className="relative w-full max-w-md animate-fade-in">
        <div className="glass-panel rounded-3xl p-8 gradient-border">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-secondary neon-glow">
                <Zap className="h-10 w-10 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-online animate-pulse-glow" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2 neon-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to Distributed Chat
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your nickname to join the conversation
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                Your Nickname
              </label>
              <div 
                className={cn(
                  'relative flex items-center gap-3 p-4 rounded-xl transition-all duration-300',
                  'bg-muted/30 border border-border/50',
                  isFocused && 'ring-2 ring-primary/50 border-primary/50'
                )}
              >
                <User className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Enter your nickname"
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                  maxLength={20}
                  autoFocus
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 font-mono">
                Minimum 2 characters • Maximum 20 characters
              </p>
            </div>

            <button
              type="submit"
              disabled={nickname.trim().length < 2}
              className={cn(
                'w-full flex items-center justify-center gap-2 p-4 rounded-xl',
                'bg-gradient-to-br from-primary to-secondary',
                'text-primary-foreground font-semibold',
                'transition-all duration-300',
                'hover:opacity-90 hover:scale-[1.02]',
                'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100',
                nickname.trim().length >= 2 && 'neon-glow'
              )}
            >
              <span>Join Chat</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          {/* Features */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-mono font-bold text-primary">FIFO</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Queue</div>
              </div>
              <div>
                <div className="text-lg font-mono font-bold text-secondary">Real-time</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Updates</div>
              </div>
              <div>
                <div className="text-lg font-mono font-bold text-online">Presence</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Tracking</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
