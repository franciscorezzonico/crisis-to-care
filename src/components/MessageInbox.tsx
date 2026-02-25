// src/components/MessageInbox.tsx
import { useState } from 'react';
import { useMessages } from '../contexts/MessagesContext';
import { MessageSquare } from 'lucide-react';

export default function MessageInbox() {
  const { conversations, addMessage } = useMessages();
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');

  const activeConvo =
    conversations.find((c) => c.id === activeId) || conversations[conversations.length - 1];

  const handleSend = () => {
    const text = draft.trim();
    if (!activeConvo || !text) return;
    addMessage(activeConvo.id, 'user', text);
    setDraft('');
  };

  if (!conversations.length) {
    // Hide the button entirely until the user has started at least one conversation
    return null;
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-40 rounded-full bg-earth-sage text-white shadow-lg px-4 py-3 flex items-center gap-2"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-sm font-bold">Inbox</span>
      </button>

      {/* Panel */}
      {open && activeConvo && (
        <div className="fixed bottom-20 right-5 z-40 w-80 max-h-[70vh] bg-white rounded-2xl border border-earth-sand/30 shadow-2xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-earth-sand/30 flex items-center justify-between bg-earth-cream/60">
            <div className="text-sm font-semibold text-earth-charcoal">
              Counselor: {activeConvo.counselor.name}
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-xs text-earth-charcoal/60 hover:text-earth-charcoal"
            >
              Close
            </button>
          </div>

          {/* Conversation list selector (if multiple) */}
          {conversations.length > 1 && (
            <div className="px-3 py-2 border-b border-earth-sand/20 bg-earth-cream/40">
              <select
                value={activeConvo.id}
                onChange={(e) => setActiveId(e.target.value)}
                className="w-full text-xs border border-earth-sand/40 rounded-lg px-2 py-1 bg-white"
              >
                {conversations.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.counselor.name} – {new Date(c.createdAt).toLocaleDateString()}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 text-xs bg-earth-cream/20">
            {activeConvo.messages.map((m) => (
              <div
                key={m.id}
                className={m.from === 'user' ? 'text-right' : 'text-left'}
              >
                <div
                  className={
                    m.from === 'user'
                      ? 'inline-block px-3 py-2 rounded-2xl bg-earth-sage text-white'
                      : 'inline-block px-3 py-2 rounded-2xl bg-white border border-earth-sand/40 text-earth-charcoal'
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
            {!activeConvo.messages.length && (
              <p className="text-[11px] text-earth-charcoal/60">
                No messages yet. You can send a note below.
              </p>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-earth-sand/30 p-2 bg-white">
            <textarea
              rows={2}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Send another anonymous note..."
              className="w-full text-xs border border-earth-sand/40 rounded-lg px-2 py-1 resize-none"
            />
            <button
              onClick={handleSend}
              disabled={!draft.trim()}
              className="mt-2 w-full text-xs font-semibold rounded-lg bg-earth-sage text-white py-1.5 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
