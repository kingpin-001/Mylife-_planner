import React from 'react';
import { Transaction } from '../../types';
import { formatCurrency } from '../../utils/currency';
import { format } from 'date-fns';
import { clsx } from 'clsx';

interface RecentTransactionsProps {
  transactions: Transaction[];
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

const paymentMethodNames: Record<string, string> = {
  mtn_momo: 'MTN MoMo',
  airteltigo: 'AirtelTigo Money',
  vodafone_cash: 'Vodafone Cash',
  bank: 'Bank Transfer',
  cash: 'Cash',
};

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {transactions.slice(0, 5).map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-lg">
                  {categoryIcons[transaction.category] || '📋'}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  {transaction.description}
                </p>
                <p className="text-xs text-gray-500">
                  {format(transaction.date, 'MMM dd')} • {paymentMethodNames[transaction.paymentMethod]}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className={clsx(
                'font-semibold text-sm',
                transaction.type === 'income' ? 'text-green-600' : 'text-gray-900'
              )}>
                {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};