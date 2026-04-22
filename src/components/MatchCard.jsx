import React from 'react';
import { Link } from 'react-router-dom';

const typeBadge = {
  TEST:  'bg-amber-100 text-amber-800',
  ODI:   'bg-blue-100 text-blue-800',
  T20I:  'bg-purple-100 text-purple-800',
  T20:   'bg-purple-100 text-purple-800',
};

const MatchCard = ({ match }) => (
  <Link
    to={`/match/${match.id}`}
    className="block bg-white rounded-xl border border-gray-200 hover:border-red-400 hover:shadow-md transition-all animate-fadeIn"
  >
    {/* Header strip */}
    <div className="flex items-center justify-between gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100 rounded-t-xl">
      <span className="text-xs text-gray-500 truncate font-medium">{match.series}</span>
      <div className="flex items-center gap-1.5 shrink-0">
        {match.matchType && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${typeBadge[match.matchType] ?? 'bg-gray-100 text-gray-600'}`}>
            {match.matchType}
          </span>
        )}
        {match.live && (
          <span className="flex items-center gap-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            LIVE
          </span>
        )}
        {match.upcoming && !match.live && (
          <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full border border-blue-200">
            UPCOMING
          </span>
        )}
      </div>
    </div>

    {/* Scores */}
    <div className="px-4 py-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 text-center">
          <div className="text-3xl mb-1">{match.flag1}</div>
          <p className="font-bold text-gray-800 text-sm">{match.team1}</p>
          <p className={`font-mono font-bold text-lg mt-1 ${match.live ? 'text-red-600' : 'text-gray-700'}`}>
            {match.score1}
          </p>
        </div>
        <div className="text-gray-300 font-bold text-base">VS</div>
        <div className="flex-1 text-center">
          <div className="text-3xl mb-1">{match.flag2}</div>
          <p className="font-bold text-gray-800 text-sm">{match.team2}</p>
          <p className={`font-mono font-bold text-lg mt-1 ${match.live ? 'text-red-600' : 'text-gray-700'}`}>
            {match.score2}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 text-center">
        <p className={`text-sm font-semibold ${match.live ? 'text-red-600' : 'text-gray-600'}`}>
          {match.status}
        </p>
        {match.venue && (
          <p className="text-xs text-gray-400 mt-1 truncate">📍 {match.venue}</p>
        )}
      </div>
    </div>
  </Link>
);

export default MatchCard;
