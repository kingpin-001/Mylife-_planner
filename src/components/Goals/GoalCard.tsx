import React from 'react';
import { SavingsGoal } from '../../types';
import { formatCurrency, calculatePercentage } from '../../utils/currency';
import { format } from 'date-fns';
import { Target, Calendar, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';

interface GoalCardProps {
  goal: SavingsGoal;
  onGoalClick?: (goal: SavingsGoal) => void;
}

const categoryEmojis: Record<string, string> = {
  emergency: '🚨',
  education: '🎓',
  business: '💼',
  travel: '✈️',
  wedding: '💒',
  house: '🏠',
  other: '🎯',
};

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onGoalClick }) => {
  const percentage = calculatePercentage(goal.currentAmount, goal.targetAmount);
  const remaining = goal.targetAmount - goal.currentAmount;
  const daysLeft = Math.ceil((goal.targetDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <div 
      className="card cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={() => onGoalClick?.(goal)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
            <span className="text-2xl">
              {categoryEmojis[goal.category] || '🎯'}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{goal.title}</h3>
            <p className="text-sm text-gray-600">{goal.description}</p>
          </div>
        </div>
        
        <div className={clsx(
          'px-2 py-1 rounded-full text-xs font-medium',
          goal.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
        )}>
          {goal.isActive ? 'Active' : 'Paused'}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-semibold text-gray-900">
            {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 text-gray-600">
            <TrendingUp size={14} />
            <span>{percentage.toFixed(1)}% complete</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <Calendar size={14} />
            <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}</span>
          </div>
        </div>
        
        {remaining > 0 && (
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">
                {formatCurrency(remaining)}
              </span> remaining to reach your goal
            </p>
          </div>
        )}
      </div>
    </div>
  );
};