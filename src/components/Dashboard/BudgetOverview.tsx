import React from 'react';
import { Budget } from '../../types';
import { formatCurrency, calculatePercentage } from '../../utils/currency';
import { clsx } from 'clsx';

interface BudgetOverviewProps {
  budgets: Budget[];
}

const categoryIcons: Record<string, string> = {
  food_dining: '🍽️',
  transportation: '🚗',
  utilities: '⚡',
  entertainment: '🎬',
  healthcare: '🏥',
  education: '📚',
  shopping: '🛍️',
  family_support: '👨‍👩‍👧‍👦',
  business: '💼',
  savings: '💰',
  insurance: '🛡️',
  other: '📋',
};

const categoryNames: Record<string, string> = {
  food_dining: 'Food & Dining',
  transportation: 'Transportation',
  utilities: 'Utilities',
  entertainment: 'Entertainment',
  healthcare: 'Healthcare',
  education: 'Education',
  shopping: 'Shopping',
  family_support: 'Family Support',
  business: 'Business',
  savings: 'Savings',
  insurance: 'Insurance',
  other: 'Other',
};

export const BudgetOverview: React.FC<BudgetOverviewProps> = ({ budgets }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Budget Overview</h3>
        <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {budgets.slice(0, 4).map((budget) => {
          const percentage = calculatePercentage(budget.spent, budget.allocated);
          const isOverBudget = percentage > 100;
          
          return (
            <div key={budget.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">
                    {categoryIcons[budget.category] || '📋'}
                  </span>
                  <span className="font-medium text-gray-900">
                    {categoryNames[budget.category] || 'Other'}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {formatCurrency(budget.spent)} / {formatCurrency(budget.allocated)}
                  </p>
                  <p className={clsx(
                    'text-xs font-medium',
                    isOverBudget ? 'text-red-600' : 'text-gray-500'
                  )}>
                    {percentage.toFixed(0)}% used
                  </p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={clsx(
                    'h-2 rounded-full transition-all duration-300',
                    isOverBudget ? 'bg-red-500' : 'bg-primary-500'
                  )}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};