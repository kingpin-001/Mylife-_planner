import React from 'react';
import { Bell, Settings } from 'lucide-react';
import { User } from '../../types';
import { formatCurrency } from '../../utils/currency';

interface HeaderProps {
  user: User;
  hasNotifications?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ user, hasNotifications = false }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {user.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-600">{getGreeting()}</p>
            <p className="font-semibold text-gray-900">{user.name}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-xs text-gray-500">Level {user.level}</p>
            <p className="text-sm font-semibold text-primary-600">
              {user.gamificationPoints} pts
            </p>
          </div>
          
          <div className="relative">
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <Bell size={20} />
              {hasNotifications && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              )}
            </button>
          </div>
          
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};