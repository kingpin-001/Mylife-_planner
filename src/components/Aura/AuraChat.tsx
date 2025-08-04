import React, { useState } from 'react';
import { AuraMessage } from '../../types';
import { format } from 'date-fns';
import { Send, Sparkles, TrendingUp, AlertTriangle, Gift } from 'lucide-react';
import { clsx } from 'clsx';

interface AuraChatProps {
  messages: AuraMessage[];
}

const messageTypeIcons = {
  advice: TrendingUp,
  congratulation: Gift,
  warning: AlertTriangle,
  reminder: Sparkles,
  education: Sparkles,
};

const messageTypeColors = {
  advice: 'bg-blue-50 border-blue-200 text-blue-800',
  congratulation: 'bg-green-50 border-green-200 text-green-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  reminder: 'bg-purple-50 border-purple-200 text-purple-800',
  education: 'bg-indigo-50 border-indigo-200 text-indigo-800',
};

export const AuraChat: React.FC<AuraChatProps> = ({ messages }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the AI backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Aura Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Sparkles size={24} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Aura</h2>
            <p className="text-sm opacity-90">Your AI Financial Coach</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-96">
        {messages.map((message) => {
          const Icon = messageTypeIcons[message.type];
          
          return (
            <div key={message.id} className="flex space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-primary-600" />
              </div>
              
              <div className="flex-1">
                <div className={clsx(
                  'p-3 rounded-lg border',
                  messageTypeColors[message.type]
                )}>
                  <p className="text-sm">{message.content}</p>
                  {message.actionRequired && (
                    <button className="mt-2 text-xs font-medium underline hover:no-underline">
                      Take Action
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {format(message.timestamp, 'MMM dd, HH:mm')}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask Aura anything about your finances..."
            className="flex-1 input-field"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="btn-primary px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};