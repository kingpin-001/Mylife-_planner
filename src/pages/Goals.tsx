import React, { useState } from 'react';
import { GoalCard } from '../components/Goals/GoalCard';
import { SavingsGoal } from '../types';
import { Plus, Filter, Search } from 'lucide-react';

interface GoalsProps {
  goals: SavingsGoal[];
}

export const Goals: React.FC<GoalsProps> = ({ goals }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredGoals = goals.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         goal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || goal.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'All Goals' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'business', label: 'Business' },
    { value: 'education', label: 'Education' },
    { value: 'travel', label: 'Travel' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'house', label: 'House' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Savings Goals</h1>
          <p className="text-gray-600">Track your progress towards financial milestones</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus size={16} />
          <span>New Goal</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search goals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <Filter size={16} className="text-gray-500 flex-shrink-0" />
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setFilterCategory(category.value)}
              className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filterCategory === category.value
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Goals Grid */}
      <div className="space-y-4">
        {filteredGoals.length > 0 ? (
          filteredGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No goals found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterCategory !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Create your first savings goal to get started'
              }
            </p>
            <button className="btn-primary">Create Your First Goal</button>
          </div>
        )}
      </div>
    </div>
  );
};