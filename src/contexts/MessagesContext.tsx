// src/contexts/MessagesContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

export type CounselorId = 'camila' | 'devon' | 'amina' | 'jorge';

export type Counselor = {
  id: CounselorId;
  name: string;
  role: string;
  background: string;
  isFirstGen: boolean;
};

export type Message = {
  id: string;
  from: 'user' | 'counselor';
  text: string;
  createdAt: string;
};

export type Conversation = {
  id: string;
  counselorId: CounselorId;
  counselor: Counselor;
  messages: Message[];
  createdAt: string;
};

type MessagesContextValue = {
  conversations: Conversation[];
  startConversation: (counselor: Counselor, firstMessage: string) => Conversation;
  addMessage: (conversationId: string, from: 'user' | 'counselor', text: string) => void;
};

const MessagesContext = createContext<MessagesContextValue | undefined>(undefined);

export const useMessages = () => {
  const ctx = useContext(MessagesContext);
  if (!ctx) throw new Error('useMessages must be used within MessagesProvider');
  return ctx;
};

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const startConversation = (counselor: Counselor, firstMessage: string): Conversation => {
    const id = `conv-${Date.now()}`;
    const createdAt = new Date().toISOString();
    const first: Message = {
      id: `msg-${Date.now()}-user`,
      from: 'user',
      text: firstMessage,
      createdAt,
    };

    const convo: Conversation = {
      id,
      counselorId: counselor.id,
      counselor,
      createdAt,
      messages: [first],
    };

    setConversations((prev) => [...prev, convo]);
    return convo;
  };

  const addMessage = (conversationId: string, from: 'user' | 'counselor', text: string) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              messages: [
                ...c.messages,
                {
                  id: `msg-${Date.now()}-${from}`,
                  from,
                  text,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : c
      )
    );
  };

  const value: MessagesContextValue = {
    conversations,
    startConversation,
    addMessage,
  };

  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>;
};
