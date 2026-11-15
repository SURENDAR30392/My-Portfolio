import React, { useState } from 'react';
import { Mail, Check, Trash2, MailOpen, Calendar, Clock, X, Eye } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminMessagesView = () => {
  const { data, markMessageRead, deleteMessage } = useData();
  const messages = data.messages || [];

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' | 'unread'

  const filtered = filter === 'all' 
    ? messages 
    : messages.filter(m => !m.read);

  const handleOpenMessage = (msg) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      markMessageRead(msg.id, true);
    }
  };

  const handleDelete = async (id, name, e) => {
    e?.stopPropagation();
    if (window.confirm(`Delete message from "${name}"?`)) {
      await deleteMessage(id);
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#102A28]">
            Contact Messages ({messages.length})
          </h1>
          <p className="text-sm text-[#4B5F5C] mt-1">
            Review incoming inquiries submitted through the public Contact Us form.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === 'all'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white text-[#4B5F5C] border border-[#DDE7E5]'
            }`}
          >
            All Messages ({messages.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === 'unread'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white text-[#4B5F5C] border border-[#DDE7E5]'
            }`}
          >
            Unread ({messages.filter(m => !m.read).length})
          </button>
        </div>
      </div>

      {/* Messages List */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-[#DDE7E5] rounded-xl p-12 text-center shadow-sm">
          <Mail size={36} className="text-[#8A9B98] mx-auto mb-3" />
          <h3 className="text-base font-semibold text-[#102A28] mb-1">
            No Messages Found
          </h3>
          <p className="text-xs text-[#8A9B98]">
            {filter === 'unread' ? "All messages have been marked as read." : "Your inbox is currently empty."}
          </p>
        </div>
      ) : (
        <div className="bg-white border border-[#DDE7E5] rounded-xl overflow-hidden shadow-sm divide-y divide-[#DDE7E5]">
          {filtered.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleOpenMessage(msg)}
              className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F7FAFA] transition-colors cursor-pointer ${
                !msg.read ? 'bg-[#E6F4F2]/30 font-medium' : ''
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  !msg.read 
                    ? 'bg-[#0F766E] text-white' 
                    : 'bg-[#EEF4F3] text-[#8A9B98]'
                }`}>
                  {!msg.read ? <Mail size={16} /> : <MailOpen size={16} />}
                </div>

                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-semibold text-[#102A28]">{msg.name}</span>
                    <span className="text-xs text-[#8A9B98]">{msg.email}</span>
                  </div>

                  {msg.subject && (
                    <div className="text-xs font-medium text-[#0F766E] mt-0.5">
                      Subject: {msg.subject}
                    </div>
                  )}

                  <p className="text-xs text-[#4B5F5C] mt-1 line-clamp-1 max-w-xl">
                    {msg.message}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center text-xs text-[#8A9B98]">
                <span>
                  {new Date(msg.timestamp || msg.createdAt || Date.now()).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    markMessageRead(msg.id, !msg.read);
                  }}
                  className="p-1.5 rounded-lg text-[#4B5F5C] hover:text-[#0F766E] hover:bg-[#E6F4F2]"
                  title={msg.read ? "Mark unread" : "Mark read"}
                >
                  <Check size={15} />
                </button>

                <button
                  type="button"
                  onClick={(e) => handleDelete(msg.id, msg.name, e)}
                  className="p-1.5 rounded-lg text-[#4B5F5C] hover:text-[#DC2626] hover:bg-[#FEF2F2]"
                  title="Delete message"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message Reader Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-[#DDE7E5] rounded-xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-start justify-between pb-4 border-b border-[#DDE7E5] mb-4">
              <div>
                <h2 className="text-lg font-semibold text-[#102A28]">
                  {selectedMessage.subject || "Contact Inquiry"}
                </h2>
                <div className="text-xs text-[#8A9B98] mt-1">
                  From: <span className="font-medium text-[#102A28]">{selectedMessage.name}</span> ({selectedMessage.email})
                </div>
              </div>
              <button 
                onClick={() => setSelectedMessage(null)}
                className="text-[#8A9B98] hover:text-[#102A28]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-4 text-sm text-[#102A28] leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                {selectedMessage.message}
              </div>

              <div className="text-xs text-[#8A9B98] flex items-center justify-between">
                <span>Received: {new Date(selectedMessage.timestamp || selectedMessage.createdAt || Date.now()).toLocaleString()}</span>
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Portfolio Inquiry')}`}
                  className="btn-primary text-xs h-8 px-3"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

