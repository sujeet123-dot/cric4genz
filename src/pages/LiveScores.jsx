import React, { useState } from 'react';
import MatchCard from '../components/MatchCard';
import ScoreTicker from '../components/ScoreTicker';
import { useLiveScores } from '../hooks/useLiveScores';

const TABS = ['All', 'Live', 'Upcoming', 'Completed', 'Test', 'ODI', 'T20I', 'T20'];

const LiveScores = () => {
  const [tab, setTab] = useState('All');
  const { matches, loading, lastUpdated, usingLive, error, reload } = useLiveScores(30000);

  const filtered = matches.filter(m => {
    if (tab === 'All')       return true;
    if (tab === 'Live')      return m.live;
    if (tab === 'Upcoming')  return m.upcoming && !m.live;
    if (tab === 'Completed') return !m.live && !m.upcoming;
    return m.matchType === tab;
  });

  const liveCount = matches.filter(m => m.live).length;

  return (
    <div className="bg-gray-100 min-h-screen">
      <ScoreTicker matches={matches} />

      {/* Page header */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-extrabold">Live Cricket Scores</h1>
            {liveCount > 0 && (
              <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
                {liveCount} LIVE
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm">
            {usingLive ? '✅ CricAPI connected' : '📊 Demo data — add your CricAPI key to .env'}
            {lastUpdated && ` · Updated ${lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`}
          </p>
          {error && <p className="text-red-400 text-xs mt-1">Error: {error}</p>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filter row */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                tab === t
                  ? 'bg-red-600 text-white shadow'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-red-400 hover:text-red-600'
              }`}
            >
              {t === 'Live' && liveCount > 0 ? `🔴 Live (${liveCount})` : t}
            </button>
          ))}
          <button
            onClick={reload}
            disabled={loading}
            className="ml-auto flex items-center gap-1.5 text-sm text-gray-600 font-semibold border border-gray-200 bg-white px-3 py-1.5 rounded-full hover:border-red-400 hover:text-red-600 disabled:opacity-40 transition-colors"
          >
            <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {loading ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>

        {!usingLive && (
          <div className="mb-6 bg-white border border-gray-200 rounded-xl p-4 flex gap-3 items-start">
            <span className="text-xl shrink-0">💡</span>
            <div className="text-sm">
              <p className="font-semibold text-gray-800">Get live scores in 2 minutes</p>
              <p className="text-gray-500 mt-0.5">
                Register free at{' '}
                <a href="https://cricapi.com" target="_blank" rel="noopener noreferrer" className="text-red-600 font-semibold hover:underline">
                  cricapi.com
                </a>{' '}
                (100 calls/day, no card needed), then add to your <code className="bg-gray-100 px-1 rounded">.env</code>:
              </p>
              <code className="block mt-2 bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-xs text-gray-700 font-mono">
                VITE_CRICAPI_KEY=your_key_here
              </code>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(i => <div key={i} className="bg-white rounded-xl h-48 animate-pulse border border-gray-200" />)}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(m => <MatchCard key={m.id} match={m} />)}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
            <p className="text-4xl mb-3">🏏</p>
            <p className="text-lg font-semibold text-gray-700">No {tab === 'All' ? '' : tab} matches found</p>
            <p className="text-sm text-gray-400 mt-1">Check back later or select a different filter</p>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-8">
          Auto-refreshes every 30 seconds · Scores may have up to 5 min delay
        </p>
      </div>
    </div>
  );
};

export default LiveScores;
