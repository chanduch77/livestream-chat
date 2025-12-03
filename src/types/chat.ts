export type UserStatus = 'online' | 'offline' | 'away';

export interface User {
  id: string;
  name: string;
  status: UserStatus;
  joinedAt: Date;
  isTyping?: boolean;
  avatar?: string;
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  type: 'message' | 'system' | 'join' | 'leave';
  queuePosition?: number;
}

export interface ChatState {
  users: User[];
  messages: Message[];
  currentUser: User | null;
  isConnected: boolean;
  typingUsers: string[];
}
