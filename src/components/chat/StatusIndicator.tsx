import { cn } from '@/lib/utils';
import { UserStatus } from '@/types/chat';

interface StatusIndicatorProps {
  status: UserStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const statusConfig = {
  online: {
    color: 'bg-online',
    label: 'Online',
    pulse: true,
  },
  offline: {
    color: 'bg-offline',
    label: 'Offline',
    pulse: false,
  },
  away: {
    color: 'bg-warning',
    label: 'Away',
    pulse: false,
  },
};

const sizeConfig = {
  sm: 'h-2 w-2',
  md: 'h-3 w-3',
  lg: 'h-4 w-4',
};

export function StatusIndicator({ status, size = 'md', showLabel = false, className }: StatusIndicatorProps) {
  const config = statusConfig[status];
  
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        <div 
          className={cn(
            'rounded-full',
            sizeConfig[size],
            config.color,
            config.pulse && 'animate-pulse-glow'
          )} 
        />
        {config.pulse && (
          <div 
            className={cn(
              'absolute inset-0 rounded-full',
              config.color,
              'opacity-40 animate-ping'
            )} 
          />
        )}
      </div>
      {showLabel && (
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          {config.label}
        </span>
      )}
    </div>
  );
}
