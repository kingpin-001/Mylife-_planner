import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';
import { clsx } from 'clsx';

interface StatsCardProps {
  title: string;
  value: number;
  currency?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'red' | 'yellow';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  currency = 'GHS',
  icon: Icon,
  trend,
  color = 'blue',
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    yellow: 'bg-yellow-50 text-yellow-600',
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(value, currency)}
          </p>
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={clsx(
                  'text-xs font-medium',
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                )}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={clsx('p-3 rounded-lg', colorClasses[color])}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};