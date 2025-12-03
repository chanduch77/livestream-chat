import { cn } from '@/lib/utils';
import { User } from '@/types/chat';
import { StatusIndicator } from './StatusIndicator';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
};

const statusPosition = {
  sm: '-bottom-0.5 -right-0.5',
  md: '-bottom-0.5 -right-0.5',
  lg: 'bottom-0 right-0',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string): string {
  const colors = [
    'from-primary to-secondary',
    'from-secondary to-primary',
    'from-cyan-500 to-blue-500',
    'from-purple-500 to-pink-500',
    'from-emerald-500 to-teal-500',
    'from-orange-500 to-red-500',
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
}

export function UserAvatar({ user, size = 'md', showStatus = true, className }: UserAvatarProps) {
  return (
    <div className={cn('relative inline-flex', className)}>
      <div 
        className={cn(
          'rounded-full bg-gradient-to-br flex items-center justify-center font-mono font-semibold',
          sizeConfig[size],
          getAvatarColor(user.name)
        )}
      >
        {getInitials(user.name)}
      </div>
      {showStatus && (
        <div className={cn('absolute', statusPosition[size])}>
          <StatusIndicator status={user.status} size="sm" />
        </div>
      )}
    </div>
  );
}
