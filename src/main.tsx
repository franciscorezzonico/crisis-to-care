import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './contexts/LanguageContext.tsx';
import { MessagesProvider } from './contexts/MessagesContext.tsx';
import MessageInbox from './components/MessageInbox.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <MessagesProvider>
        <App />
        <MessageInbox />
      </MessagesProvider>
    </LanguageProvider>
  </StrictMode>,
);