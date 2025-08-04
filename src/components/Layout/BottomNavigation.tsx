import React from 'react';
import { Home, PieChart, Target, MessageCircle, User } from 'lucide-react';
import { clsx } from 'clsx';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'budget', label: 'Budget', icon: PieChart },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'aura', label: 'Aura', icon: MessageCircle },
  { id: 'profile', label: 'Profile', icon: User },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={clsx(
                'flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200',
                isActive
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};