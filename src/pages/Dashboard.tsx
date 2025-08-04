import React from 'react';
import { StatsCard } from '../components/Dashboard/StatsCard';
import { BudgetOverview } from '../components/Dashboard/BudgetOverview';
import { RecentTransactions } from '../components/Dashboard/RecentTransactions';
import { GoalCard } from '../components/Goals/GoalCard';
import type { User, Transaction, Budget, SavingsGoal } from '../types';
import { Wallet, TrendingUp, TrendingDown, PiggyBank, Plus } from 'lucide-react';

interface DashboardProps {
  user: User;
  transactions: Transaction[];
  budgets: Budget[];
  goals: SavingsGoal[];
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  transactions,
  budgets,
  goals,
}) => {
  // Calculate stats
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = Math.abs(transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0));
  
  const totalBalance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  return (
    <div className="space-y-6 pb-20">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <StatsCard
          title="Total Balance"
          value={totalBalance}
          icon={Wallet}
          color="blue"
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Monthly Income"
          value={user.monthlyIncome}
          icon={TrendingUp}
          color="green"
        />
        <StatsCard
          title="Monthly Expenses"
          value={totalExpenses}
          icon={TrendingDown}
          color="red"
        />
        <StatsCard
          title="Savings Rate"
          value={savingsRate}
          currency="%"
          icon={PiggyBank}
          color="yellow"
        />
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center space-x-2 p-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors">
            <Plus size={16} />
            <span className="text-sm font-medium">Add Transaction</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            <PiggyBank size={16} />
            <span className="text-sm font-medium">Create Goal</span>
          </button>
        </div>
      </div>

      {/* Budget Overview */}
      <BudgetOverview budgets={budgets} />

      {/* Active Goals */}
      {goals.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Active Goals</h3>
            <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {goals.slice(0, 2).map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      <RecentTransactions transactions={transactions} />
    </div>
  );
};