export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  currency: 'GHS' | 'USD' | 'EUR';
  language: 'en' | 'tw' | 'ga' | 'ee';
  monthlyIncome: number;
  profilePicture?: string;
  joinedDate: Date;
  gamificationPoints: number;
  level: number;
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: TransactionCategory;
  type: 'income' | 'expense';
  date: Date;
  paymentMethod: 'mtn_momo' | 'airteltigo' | 'vodafone_cash' | 'bank' | 'cash';
  isRecurring?: boolean;
}

export interface Budget {
  id: string;
  category: TransactionCategory;
  allocated: number;
  spent: number;
  period: 'weekly' | 'monthly';
  startDate: Date;
  endDate: Date;
}

export interface SavingsGoal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  category: 'emergency' | 'education' | 'business' | 'travel' | 'wedding' | 'house' | 'other';
  isActive: boolean;
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  percentage: number;
  amount: number;
  achieved: boolean;
  achievedDate?: Date;
  reward?: string;
}

export interface AuraMessage {
  id: string;
  content: string;
  type: 'advice' | 'congratulation' | 'warning' | 'reminder' | 'education';
  timestamp: Date;
  isRead: boolean;
  actionRequired?: boolean;
  relatedGoal?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlockedDate?: Date;
  category: 'saving' | 'budgeting' | 'education' | 'consistency' | 'milestone';
}

export interface InsuranceProduct {
  id: string;
  provider: string;
  name: string;
  type: 'life' | 'health' | 'motor' | 'property';
  monthlyPremium: number;
  coverage: number;
  description: string;
  features: string[];
}

export type TransactionCategory = 
  | 'food_dining'
  | 'transportation'
  | 'utilities'
  | 'healthcare'
  | 'education'
  | 'entertainment'
  | 'shopping'
  | 'family_support'
  | 'business'
  | 'savings'
  | 'insurance'
  | 'other';

export interface FinancialTip {
  id: string;
  title: string;
  content: string;
  category: 'budgeting' | 'saving' | 'investing' | 'insurance' | 'general';
  language: 'en' | 'tw' | 'ga' | 'ee';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  readTime: number;
}