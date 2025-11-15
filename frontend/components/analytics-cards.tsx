'use client';

import { Card } from '@/components/ui/card';

interface AnalyticsCardsProps {
  stats: {
    total: number;
    avgRating: number;
    positive: number;
    negative: number;
  };
  isLoading: boolean;
}

export default function AnalyticsCards({ stats, isLoading }: AnalyticsCardsProps) {
  const cards = [
    {
      label: 'Total Feedbacks',
      value: stats.total,
      icon: '📊',
      color: 'from-blue-600 to-blue-700',
    },
    {
      label: 'Average Rating',
      value: stats.avgRating.toFixed(2),
      icon: '⭐',
      color: 'from-yellow-600 to-yellow-700',
    },
    {
      label: 'Positive (4-5)',
      value: stats.positive,
      icon: '👍',
      color: 'from-green-600 to-green-700',
    },
    {
      label: 'Negative (<3)',
      value: stats.negative,
      icon: '👎',
      color: 'from-red-600 to-red-700',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card
          key={index}
          className={`bg-gradient-to-br ${card.color} border-0 p-6 text-white overflow-hidden relative`}
        >
          <div className="relative z-10">
            <p className="text-slate-200 text-sm font-medium mb-2">{card.label}</p>
            <p className="text-3xl font-bold">{isLoading ? '-' : card.value}</p>
          </div>
          <div className="absolute top-2 right-2 text-3xl opacity-20">{card.icon}</div>
        </Card>
      ))}
    </div>
  );
}
