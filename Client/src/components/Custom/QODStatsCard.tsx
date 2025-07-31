import { useState, useEffect } from "react";
import { Calendar, Award, Target, TrendingUp } from "lucide-react";

interface QODStats {
  totalAnswered: number;
  correctAnswers: number;
  currentStreak: number;
  longestStreak: number;
  accuracy: number;
}

const QODStatsCard = () => {
  const [stats, setStats] = useState<QODStats>({
    totalAnswered: 0,
    correctAnswers: 0,
    currentStreak: 0,
    longestStreak: 0,
    accuracy: 0
  });

  useEffect(() => {
    calculateStats();
  }, []);

  const calculateStats = () => {
    const allKeys = Object.keys(localStorage);
    const qodKeys = allKeys.filter(key => key.startsWith('answeredQOD_'));
    
    let totalAnswered = 0;
    let correctAnswers = 0;
    
    qodKeys.forEach(key => {
      const data = JSON.parse(localStorage.getItem(key) || '{}');
      if (data.answered) {
        totalAnswered++;
        if (data.correct) {
          correctAnswers++;
        }
      }
    });

    const currentStreak = parseInt(localStorage.getItem('qodStreak') || '0');
    const longestStreak = parseInt(localStorage.getItem('qodLongestStreak') || currentStreak.toString());
    const accuracy = totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;

    setStats({
      totalAnswered,
      correctAnswers,
      currentStreak,
      longestStreak,
      accuracy
    });
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
        <Calendar className="text-indigo-400" size={20} />
        Question of the Day Stats
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-gray-700 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Target className="text-indigo-400" size={16} />
          </div>
          <div className="text-2xl font-bold text-indigo-400">{stats.totalAnswered}</div>
          <div className="text-sm text-gray-400">Questions Answered</div>
        </div>
        
        <div className="text-center p-3 bg-gray-700 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="text-green-400" size={16} />
          </div>
          <div className="text-2xl font-bold text-green-400">{stats.accuracy}%</div>
          <div className="text-sm text-gray-400">Accuracy</div>
        </div>
        
        <div className="text-center p-3 bg-gray-700 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Award className="text-yellow-400" size={16} />
          </div>
          <div className="text-2xl font-bold text-yellow-400">{stats.currentStreak}</div>
          <div className="text-sm text-gray-400">Current Streak</div>
        </div>
        
        <div className="text-center p-3 bg-gray-700 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Award className="text-orange-400" size={16} />
          </div>
          <div className="text-2xl font-bold text-orange-400">{stats.longestStreak}</div>
          <div className="text-sm text-gray-400">Best Streak</div>
        </div>
      </div>

      {stats.totalAnswered === 0 && (
        <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700 rounded-lg text-center">
          <p className="text-blue-300 text-sm">
            Start answering daily questions to see your stats here!
          </p>
        </div>
      )}

      {stats.currentStreak >= 7 && (
        <div className="mt-4 p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg text-center">
          <p className="text-yellow-300 text-sm font-semibold">
            🔥 Amazing! You're on a {stats.currentStreak}-day streak!
          </p>
        </div>
      )}
    </div>
  );
};

export default QODStatsCard;
