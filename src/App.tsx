import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { BottomNavigation } from './components/Layout/BottomNavigation';
import { Dashboard } from './pages/Dashboard';
import { Budget } from './pages/Budget';
import { Goals } from './pages/Goals';
import { AuraCoach } from './pages/AuraCoach';
import { Profile } from './pages/Profile';
import { useLocalStorage } from './hooks/useLocalStorage';
import {
  mockUser,
  mockTransactions,
  mockBudgets,
  mockSavingsGoals,
  mockAchievements,
  mockAuraMessages,
  mockFinancialTips,
} from './data/mockData';

function App() {
  const [activeTab, setActiveTab] = useLocalStorage('activeTab', 'dashboard');
  const [user] = useLocalStorage('user', mockUser);
  const [transactions] = useLocalStorage('transactions', mockTransactions);
  const [budgets] = useLocalStorage('budgets', mockBudgets);
  const [goals] = useLocalStorage('goals', mockSavingsGoals);
  const [achievements] = useLocalStorage('achievements', mockAchievements);
  const [auraMessages] = useLocalStorage('auraMessages', mockAuraMessages);
  const [financialTips] = useLocalStorage('financialTips', mockFinancialTips);

  const hasUnreadMessages = auraMessages.some((msg: any) => !msg.isRead);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            user={user}
            transactions={transactions}
            budgets={budgets}
            goals={goals}
          />
        );
      case 'budget':
        return <Budget budgets={budgets} transactions={transactions} />;
      case 'goals':
        return <Goals goals={goals} />;
      case 'aura':
        return <AuraCoach messages={auraMessages} tips={financialTips} />;
      case 'profile':
        return <Profile user={user} achievements={achievements} />;
      default:
        return (
          <Dashboard
            user={user}
            transactions={transactions}
            budgets={budgets}
            goals={goals}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} hasNotifications={hasUnreadMessages} />
      
      <main className="px-4 py-6">
        {renderActiveTab()}
      </main>
      
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;