import React from 'react';
import { Achievement } from '../../types';
import { format } from 'date-fns';
import { clsx } from 'clsx';

interface AchievementBadgeProps {
  achievement: Achievement;
  isUnlocked: boolean;
}

const categoryColors = {
  saving: 'bg-green-100 text-green-800 border-green-200',
  budgeting: 'bg-blue-100 text-blue-800 border-blue-200',
  education: 'bg-purple-100 text-purple-800 border-purple-200',
  consistency: 'bg-orange-100 text-orange-800 border-orange-200',
  milestone: 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievement,
  isUnlocked,
}) => {
  return (
    <div className={clsx(
      'p-4 rounded-lg border-2 transition-all duration-200',
      isUnlocked
        ? categoryColors[achievement.category]
        : 'bg-gray-50 text-gray-400 border-gray-200',
      isUnlocked && 'hover:scale-105 cursor-pointer'
    )}>
      <div className="text-center">
        <div className={clsx(
          'text-3xl mb-2',
          !isUnlocked && 'grayscale opacity-50'
        )}>
          {achievement.icon}
        </div>
        
        <h3 className={clsx(
          'font-semibold text-sm mb-1',
          !isUnlocked && 'text-gray-400'
        )}>
          {achievement.title}
        </h3>
        
        <p className={clsx(
          'text-xs mb-2',
          isUnlocked ? 'text-gray-600' : 'text-gray-400'
        )}>
          {achievement.description}
        </p>
        
        <div className="flex items-center justify-center space-x-2 text-xs">
          <span className={clsx(
            'font-medium',
            !isUnlocked && 'text-gray-400'
          )}>
            {achievement.points} pts
          </span>
          
          {isUnlocked && achievement.unlockedDate && (
            <span className="text-gray-500">
              • {format(achievement.unlockedDate, 'MMM dd')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};