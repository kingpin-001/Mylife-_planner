import React from 'react';
import { AchievementBadge } from '../components/Profile/AchievementBadge';
import { User, Achievement } from '../types';
import { formatCurrency } from '../utils/currency';
import { 
  User as UserIcon, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  Award,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';

interface ProfileProps {
  user: User;
  achievements: Achievement[];
}

export const Profile: React.FC<ProfileProps> = ({ user, achievements }) => {
  const unlockedAchievements = achievements.filter(a => a.unlockedDate);
  const totalPoints = unlockedAchievements.reduce((sum, a) => sum + a.points, 0);

  const menuItems = [
    { icon: UserIcon, label: 'Personal Information', action: () => {} },
    { icon: Settings, label: 'App Settings', action: () => {} },
    { icon: Bell, label: 'Notifications', action: () => {} },
    { icon: Shield, label: 'Security & Privacy', action: () => {} },
    { icon: HelpCircle, label: 'Help & Support', action: () => {} },
    { icon: LogOut, label: 'Sign Out', action: () => {}, danger: true },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Profile Header */}
      <div className="card">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">
              {user.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">{user.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Award size={16} className="text-primary-600" />
              <span className="text-lg font-bold text-gray-900">Level {user.level}</span>
            </div>
            <p className="text-xs text-gray-600">Current Level</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <TrendingUp size={16} className="text-green-600" />
              <span className="text-lg font-bold text-gray-900">{totalPoints}</span>
            </div>
            <p className="text-xs text-gray-600">Total Points</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Calendar size={16} className="text-blue-600" />
              <span className="text-lg font-bold text-gray-900">
                {Math.ceil((new Date().getTime() - user.joinedDate.getTime()) / (1000 * 60 * 60 * 24))}
              </span>
            </div>
            <p className="text-xs text-gray-600">Days Active</p>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
          <span className="text-sm text-gray-600">
            {unlockedAchievements.length} of {achievements.length} unlocked
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {achievements.slice(0, 6).map((achievement) => (
            <AchievementBadge
              key={achievement.id}
              achievement={achievement}
              isUnlocked={!!achievement.unlockedDate}
            />
          ))}
        </div>
        
        {achievements.length > 6 && (
          <button className="w-full mt-4 text-primary-600 text-sm font-medium hover:text-primary-700">
            View All Achievements
          </button>
        )}
      </div>

      {/* Menu Items */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
        <div className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.action}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left ${
                  item.danger ? 'text-red-600' : 'text-gray-900'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* App Info */}
      <div className="card text-center">
        <h3 className="font-semibold text-gray-900 mb-2">MyLife Planner</h3>
        <p className="text-sm text-gray-600 mb-2">Version 1.0.0</p>
        <p className="text-xs text-gray-500">
          Made with ❤️ for the Ghanaian community
        </p>
      </div>
    </div>
  );
};