import { create } from 'zustand';
import { User, Message, UserStatus } from '@/types/chat';

interface ChatStore {
  users: User[];
  messages: Message[];
  currentUser: User | null;
  isConnected: boolean;
  typingUsers: string[];
  messageQueue: Message[];
  queueCounter: number;
  
  // Actions
  setCurrentUser: (user: User) => void;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
  updateUserStatus: (userId: string, status: UserStatus) => void;
  addMessage: (message: Omit<Message, 'id' | 'queuePosition'>) => void;
  setTyping: (userId: string, isTyping: boolean) => void;
  setConnected: (connected: boolean) => void;
  clearChat: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

export const useChatStore = create<ChatStore>((set, get) => ({
  users: [],
  messages: [],
  currentUser: null,
  isConnected: false,
  typingUsers: [],
  messageQueue: [],
  queueCounter: 0,

  setCurrentUser: (user) => set({ currentUser: user }),

  addUser: (user) => set((state) => {
    if (state.users.find(u => u.id === user.id)) return state;
    
    const systemMessage: Message = {
      id: generateId(),
      userId: 'system',
      userName: 'System',
      content: `${user.name} joined the chat`,
      timestamp: new Date(),
      type: 'join',
      queuePosition: state.queueCounter + 1,
    };
    
    return {
      users: [...state.users, user],
      messages: [...state.messages, systemMessage],
      queueCounter: state.queueCounter + 1,
    };
  }),

  removeUser: (userId) => set((state) => {
    const user = state.users.find(u => u.id === userId);
    if (!user) return state;
    
    const systemMessage: Message = {
      id: generateId(),
      userId: 'system',
      userName: 'System',
      content: `${user.name} left the chat`,
      timestamp: new Date(),
      type: 'leave',
      queuePosition: state.queueCounter + 1,
    };
    
    return {
      users: state.users.filter(u => u.id !== userId),
      messages: [...state.messages, systemMessage],
      typingUsers: state.typingUsers.filter(id => id !== userId),
      queueCounter: state.queueCounter + 1,
    };
  }),

  updateUserStatus: (userId, status) => set((state) => ({
    users: state.users.map(u => 
      u.id === userId ? { ...u, status } : u
    ),
  })),

  addMessage: (message) => set((state) => {
    const newMessage: Message = {
      ...message,
      id: generateId(),
      queuePosition: state.queueCounter + 1,
    };
    
    return {
      messages: [...state.messages, newMessage],
      queueCounter: state.queueCounter + 1,
      typingUsers: state.typingUsers.filter(id => id !== message.userId),
    };
  }),

  setTyping: (userId, isTyping) => set((state) => ({
    typingUsers: isTyping 
      ? [...new Set([...state.typingUsers, userId])]
      : state.typingUsers.filter(id => id !== userId),
    users: state.users.map(u => 
      u.id === userId ? { ...u, isTyping } : u
    ),
  })),

  setConnected: (connected) => set({ isConnected: connected }),

  clearChat: () => set({
    users: [],
    messages: [],
    currentUser: null,
    isConnected: false,
    typingUsers: [],
    queueCounter: 0,
  }),
}));
