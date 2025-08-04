import React, { useState } from 'react';
import { Budget as BudgetType, Transaction } from '../types';
import { formatCurrency, calculatePercentage } from '../utils/currency';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Plus, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';

interface BudgetProps {
  budgets: BudgetType[];
  transactions: Transaction[];
}

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

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export const Budget: React.FC<BudgetProps> = ({ budgets, transactions }) => {
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');

  // Calculate totals
  const totalAllocated = budgets.reduce((sum, b) => sum + b.allocated, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const remaining = totalAllocated - totalSpent;

  // Prepare chart data
  const pieData = budgets.map((budget, index) => ({
    name: categoryNames[budget.category],
    value: budget.spent,
    color: COLORS[index % COLORS.length],
  }));

  const barData = budgets.map(budget => ({
    category: categoryNames[budget.category].split(' ')[0],
    allocated: budget.allocated,
    spent: budget.spent,
    remaining: budget.allocated - budget.spent,
  }));

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budget</h1>
          <p className="text-gray-600">Track and manage your spending</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus size={16} />
          <span>Add Category</span>
        </button>
      </div>

      {/* Budget Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
            <TrendingUp size={24} className="text-blue-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Budget</p>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(totalAllocated)}</p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-2">
            <TrendingDown size={24} className="text-red-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Spent</p>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(totalSpent)}</p>
        </div>
        
        <div className="card text-center">
          <div className={clsx(
            'w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2',
            remaining >= 0 ? 'bg-green-50' : 'bg-red-50'
          )}>
            <AlertTriangle size={24} className={remaining >= 0 ? 'text-green-600' : 'text-red-600'} />
          </div>
          <p className="text-sm text-gray-600 mb-1">Remaining</p>
          <p className={clsx(
            'text-xl font-bold',
            remaining >= 0 ? 'text-green-600' : 'text-red-600'
          )}>
            {formatCurrency(remaining)}
          </p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setViewMode('overview')}
          className={clsx(
            'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors',
            viewMode === 'overview'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          )}
        >
          Overview
        </button>
        <button
          onClick={() => setViewMode('detailed')}
          className={clsx(
            'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors',
            viewMode === 'detailed'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          )}
        >
          Detailed
        </button>
      </div>

      {viewMode === 'overview' ? (
        <>
          {/* Spending Chart */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Budget vs Actual */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget vs Actual</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Bar dataKey="allocated" fill="#e5e7eb" name="Allocated" />
                  <Bar dataKey="spent" fill="#0ea5e9" name="Spent" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : (
        /* Detailed View */
        <div className="space-y-4">
          {budgets.map((budget) => {
            const percentage = calculatePercentage(budget.spent, budget.allocated);
            const isOverBudget = percentage > 100;
            const remaining = budget.allocated - budget.spent;
            
            return (
              <div key={budget.id} className="card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {categoryIcons[budget.category] || '📋'}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {categoryNames[budget.category] || 'Other'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(budget.spent)} of {formatCurrency(budget.allocated)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={clsx(
                      'text-lg font-bold',
                      isOverBudget ? 'text-red-600' : 'text-green-600'
                    )}>
                      {formatCurrency(remaining)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {isOverBudget ? 'Over budget' : 'Remaining'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className={clsx(
                      'font-medium',
                      isOverBudget ? 'text-red-600' : 'text-gray-900'
                    )}>
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={clsx(
                        'h-3 rounded-full transition-all duration-300',
                        isOverBudget ? 'bg-red-500' : 'bg-primary-500'
                      )}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  
                  {isOverBudget && (
                    <div className="flex items-center space-x-2 text-sm text-red-600 mt-2">
                      <AlertTriangle size={16} />
                      <span>You've exceeded your budget by {formatCurrency(Math.abs(remaining))}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};