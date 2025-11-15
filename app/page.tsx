'use client';

import { useState, useEffect } from 'react';
import FeedbackForm from '@/components/feedback-form';
import AnalyticsCards from '@/components/analytics-cards';
import FeedbackTable from '@/components/feedback-table';

interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  rating: number;
  createdAt: string;
}

interface Stats {
  total: number;
  avgRating: number;
  positive: number;
  negative: number;
}

export default function Home() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    avgRating: 0,
    positive: 0,
    negative: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/feedback`);
      if (!response.ok) throw new Error('Failed to fetch feedbacks');
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/stats`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchFeedbacks(), fetchStats()]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleFeedbackSubmit = async (formData: Omit<Feedback, 'id' | 'createdAt'>) => {
    try {
      const response = await fetch(`${API_URL}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit feedback');
      await response.json();

      // Refresh data
      await fetchFeedbacks();
      await fetchStats();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Feedback Dashboard
          </h1>
          <p className="text-slate-400 text-lg">
            Collect and analyze customer feedback in real-time
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <FeedbackForm onSubmit={handleFeedbackSubmit} />
            </div>
          </div>

          {/* Right Column - Analytics & Table */}
          <div className="lg:col-span-2 space-y-8">
            {/* Analytics Cards */}
            <AnalyticsCards stats={stats} isLoading={isLoading} />

            {/* Feedbacks Table */}
            <FeedbackTable feedbacks={feedbacks} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </main>
  );
}
