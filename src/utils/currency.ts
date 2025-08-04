export const formatCurrency = (amount: number, currency: string = 'GHS'): string => {
  const formatter = new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  return formatter.format(amount);
};

export const formatNumber = (amount: number): string => {
  return new Intl.NumberFormat('en-GH').format(amount);
};

export const calculatePercentage = (current: number, target: number): number => {
  if (target === 0) return 0;
  return Math.min((current / target) * 100, 100);
};

export const getProgressColor = (percentage: number): string => {
  if (percentage >= 80) return 'text-green-600';
  if (percentage >= 50) return 'text-yellow-600';
  return 'text-red-600';
};