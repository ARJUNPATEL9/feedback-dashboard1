'use client';

import { Card } from '@/components/ui/card';

interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  rating: number;
  createdAt: string;
}

interface FeedbackTableProps {
  feedbacks: Feedback[];
  isLoading: boolean;
}

const getRatingColor = (rating: number) => {
  if (rating >= 4) return 'bg-green-900/30 text-green-300';
  if (rating === 3) return 'bg-yellow-900/30 text-yellow-300';
  return 'bg-red-900/30 text-red-300';
};

const getRatingStars = (rating: number) => {
  return '⭐'.repeat(rating);
};

export default function FeedbackTable({ feedbacks, isLoading }: FeedbackTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="border border-slate-700 bg-slate-800/50 backdrop-blur p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Recent Feedbacks</h2>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-slate-400">Loading feedbacks...</p>
        </div>
      ) : feedbacks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-400">No feedbacks yet. Be the first to submit!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 font-semibold text-slate-300">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-300">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-300">Message</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-300">Rating</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-300">Date</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr key={feedback.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition">
                  <td className="py-3 px-4 text-white font-medium">{feedback.name}</td>
                  <td className="py-3 px-4 text-slate-400 text-xs">{feedback.email}</td>
                  <td className="py-3 px-4 text-slate-300 max-w-xs truncate">{feedback.message}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getRatingColor(feedback.rating)}`}
                    >
                      {getRatingStars(feedback.rating)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400 text-xs">{formatDate(feedback.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
