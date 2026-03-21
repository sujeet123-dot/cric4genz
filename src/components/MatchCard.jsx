import React from 'react';

const MatchCard = ({ match }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {match.series}
        </span>
        {match.live && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
            LIVE
          </span>
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-center w-1/3">
          <h3 className="text-xl font-bold text-gray-800">{match.team1}</h3>
          <p className="text-lg font-mono text-cricketGreen mt-1">{match.score1}</p>
        </div>
        
        <div className="text-gray-400 font-bold text-xl">VS</div>

        <div className="text-center w-1/3">
          <h3 className="text-xl font-bold text-gray-800">{match.team2}</h3>
          <p className="text-lg font-mono text-cricketGreen mt-1">{match.score2}</p>
        </div>
      </div>

      <div className="border-t pt-3 text-center">
        <p className="text-sm font-medium text-blue-600">{match.status}</p>
      </div>
    </div>
  );
};

export default MatchCard;