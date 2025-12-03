import { useState } from 'react';
import { NicknameModal } from '@/components/chat/NicknameModal';
import { ChatRoom } from '@/components/chat/ChatRoom';
import { useChatStore } from '@/hooks/useChatStore';

const Index = () => {
  const [hasJoined, setHasJoined] = useState(false);
  const { setCurrentUser, addUser } = useChatStore();

  const handleJoin = (nickname: string) => {
    const newUser = {
      id: `user-${Date.now()}`,
      name: nickname,
      status: 'online' as const,
      joinedAt: new Date(),
    };
    
    setCurrentUser(newUser);
    addUser(newUser);
    setHasJoined(true);
  };

  if (!hasJoined) {
    return <NicknameModal onSubmit={handleJoin} />;
  }

  return <ChatRoom />;
};

export default Index;
