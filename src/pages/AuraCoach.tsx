import React from 'react';
import { AuraChat } from '../components/Aura/AuraChat';
import { AuraMessage, FinancialTip } from '../types';
import { Sparkles, BookOpen, TrendingUp, Target } from 'lucide-react';

interface AuraCoachProps {
  messages: AuraMessage[];
  tips: FinancialTip[];
}

export const AuraCoach: React.FC<AuraCoachProps> = ({ messages, tips }) => {
  const quickActions = [
    {
      icon: TrendingUp,
      title: 'Budget Analysis',
      description: 'Get insights on your spending patterns',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: Target,
      title: 'Goal Planning',
      description: 'Create a personalized savings strategy',
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: BookOpen,
      title: 'Financial Education',
      description: 'Learn about money management',
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="text-center py-6">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles size={32} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Meet Aura</h1>
        <p className="text-gray-600">Your AI-powered financial coach, here to help you achieve your money goals</p>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What can I help you with?</h3>
        <div className="space-y-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors text-left"
              >
                <div className={`p-2 rounded-lg ${action.color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{action.title}</h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="card p-0 overflow-hidden">
        <AuraChat messages={messages} />
      </div>

      {/* Financial Tips */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Financial Tips</h3>
        <div className="space-y-4">
          {tips.slice(0, 2).map((tip) => (
            <div key={tip.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{tip.title}</h4>
                <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                  {tip.readTime} min read
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{tip.content}</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span className="capitalize">{tip.category}</span>
                <span>•</span>
                <span className="capitalize">{tip.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};