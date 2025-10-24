import React, { useState, useEffect } from 'react';
import { resultAPI } from '../utils/api';
import { LeaderboardEntry } from '../types';
import toast from 'react-hot-toast';

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await resultAPI.getLeaderboard();
        setLeaderboard(response.data.leaderboard);
      } catch (error) {
        toast.error('Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return '🥇';
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      default:
        return `#${index + 1}`;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-yellow-100 border-yellow-300';
      case 1:
        return 'bg-gray-100 border-gray-300';
      case 2:
        return 'bg-orange-100 border-orange-300';
      default:
        return 'bg-white border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🏆 Leaderboard
        </h1>
        <p className="text-lg text-gray-600">
          Top performers in the quiz community
        </p>
      </div>

      {leaderboard.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">
            No scores available yet.
          </div>
          <p className="text-gray-400">
            Be the first to take a quiz and appear on the leaderboard!
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Top Scorers
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {leaderboard.map((entry, index) => (
              <div
                key={index}
                className={`p-6 flex items-center justify-between ${getRankColor(index)}`}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                      index < 3 ? 'text-white' : 'text-gray-600'
                    } ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-gray-500' :
                      index === 2 ? 'bg-orange-500' :
                      'bg-gray-200'
                    }`}>
                      {getRankIcon(index)}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {entry.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {entry.quizzesCompleted} quiz{entry.quizzesCompleted !== 1 ? 'es' : ''} completed
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {entry.totalScore}
                  </div>
                  <div className="text-sm text-gray-600">
                    Total Score
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Section */}
      {leaderboard.length > 0 && (
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {leaderboard.length}
            </div>
            <div className="text-gray-600">
              Total Players
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-secondary mb-2">
              {leaderboard.reduce((sum, entry) => sum + entry.quizzesCompleted, 0)}
            </div>
            <div className="text-gray-600">
              Quizzes Completed
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {leaderboard.length > 0 ? Math.round(leaderboard.reduce((sum, entry) => sum + entry.totalScore, 0) / leaderboard.length) : 0}
            </div>
            <div className="text-gray-600">
              Average Score
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
