import { useEffect } from 'react';
import { useChatStore } from '@/hooks/useChatStore';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { UserList } from './UserList';
import { User } from '@/types/chat';

// Simulated other users for demo
const simulatedUsers: Omit<User, 'joinedAt'>[] = [
  { id: 'user-2', name: 'Shailendra', status: 'online' },
  { id: 'user-3', name: 'Rohit', status: 'online' },
  { id: 'user-4', name: 'Tripura', status: 'away' },
];

export function ChatRoom() {
  const { addUser, setConnected, addMessage, setTyping, currentUser } = useChatStore();

  useEffect(() => {
    // Simulate connection
    setConnected(true);

    // Add simulated users with delays
    const timers: NodeJS.Timeout[] = [];

    simulatedUsers.forEach((user, index) => {
      const timer = setTimeout(() => {
        addUser({ ...user, joinedAt: new Date() });
      }, 1000 + index * 800);
      timers.push(timer);
    });

    // Simulate some messages from other users
    const messageTimer1 = setTimeout(() => {
      addMessage({
        userId: 'user-3',
        userName: 'Rohit',
        content: 'Hi! Welcome to the distributed chat system! 👋',
        timestamp: new Date(),
        type: 'message',
      });
    }, 3500);
    timers.push(messageTimer1);

    const messageTimer2 = setTimeout(() => {
      addMessage({
        userId: 'user-2',
        userName: 'Shailendra',
        content: 'This chat is using FIFO message queuing for reliable message delivery.',
        timestamp: new Date(),
        type: 'message',
      });
    }, 5500);
    timers.push(messageTimer2);

    // Simulate typing
    const typingTimer = setTimeout(() => {
      setTyping('user-4', true);
      setTimeout(() => {
        setTyping('user-4', false);
        addMessage({
          userId: 'user-4',
          userName: 'Tripura',
          content: 'How does the queue system work?',
          timestamp: new Date(),
          type: 'message',
        });
      }, 2500);
    }, 8000);
    timers.push(typingTimer);

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader />
        <div className="flex-1 flex flex-col overflow-hidden">
          <MessageList />
          <MessageInput />
        </div>
      </div>

      {/* Sidebar */}
      <div className="hidden lg:block w-72 p-4 pl-0">
        <UserList />
      </div>
    </div>
  );
}
