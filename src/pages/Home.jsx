import React from 'react';
import { Link } from 'react-router-dom';
import ScoreTicker from '../components/ScoreTicker';
import MatchCard from '../components/MatchCard';
import NewsCard from '../components/NewsCard';
import { useLiveScores } from '../hooks/useLiveScores';
import { useNews } from '../hooks/useNews';
import { iccRankings, seriesList } from '../data';

const SectionHeader = ({ title, linkTo, linkLabel = 'View All' }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-base font-bold text-gray-900 border-l-4 border-red-600 pl-3">{title}</h2>
    {linkTo && (
      <Link to={linkTo} className="text-xs text-red-600 font-semibold hover:text-red-700 hover:underline">
        {linkLabel} →
      </Link>
    )}
  </div>
);

const Home = () => {
  const { matches, loading, lastUpdated, usingLive, reload } = useLiveScores(60000);
  const { news } = useNews();

  const liveMatches   = matches.filter(m => m.live);
  const recentMatches = matches.filter(m => !m.live && !m.upcoming).slice(0, 3);
  const upcomingMatches = matches.filter(m => m.upcoming).slice(0, 2);

  return (
    <div className="bg-gray-100 min-h-screen">
      <ScoreTicker matches={matches} />

      {/* Hero */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE COVERAGE
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-3 leading-tight">
              Follow the Game,<br />
              <span className="text-red-500">Ball by Ball</span>
            </h1>
            <p className="text-gray-400 text-base mb-6">
              Real-time scores, breaking news, and deep analysis — all in one place.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link to="/live" className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-lg transition-colors text-sm">
                Live Scores
              </Link>
              <Link to="/news" className="border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 font-bold px-6 py-2.5 rounded-lg transition-colors text-sm">
                Latest News
              </Link>
            </div>
          </div>
          <div className="hidden md:block text-center">
            <div className="text-8xl mb-2">🏏</div>
            <p className="text-gray-500 text-xs">
              {usingLive
                ? '✅ Live'
                : '📊 Demo mode — add CricAPI key'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Main content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Live Matches */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-gray-900 border-l-4 border-red-600 pl-3">
                  🔴 Live Matches
                </h2>
                <div className="flex items-center gap-3">
                  {lastUpdated && (
                    <span className="text-xs text-gray-400">
                      {lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                  <button
                    onClick={reload}
                    disabled={loading}
                    className="text-xs text-red-600 font-semibold hover:underline disabled:opacity-40 flex items-center gap-1"
                  >
                    <svg className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="grid gap-4">{[1, 2].map(i => <div key={i} className="bg-white rounded-xl h-44 animate-pulse border border-gray-200" />)}</div>
              ) : liveMatches.length > 0 ? (
                <div className="grid gap-4">{liveMatches.map(m => <MatchCard key={m.id} match={m} />)}</div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
                  <p className="text-3xl mb-2">🏏</p>
                  <p className="font-semibold text-gray-600">No live matches right now</p>
                  <Link to="/live" className="text-red-600 text-sm font-semibold hover:underline mt-1 inline-block">
                    All matches →
                  </Link>
                </div>
              )}
            </section>

            {/* Recent Results */}
            {recentMatches.length > 0 && (
              <section>
                <SectionHeader title="Recent Results" linkTo="/live" />
                <div className="grid gap-4">{recentMatches.map(m => <MatchCard key={m.id} match={m} />)}</div>
              </section>
            )}

            {/* Top Stories grid */}
            <section>
              <SectionHeader title="Top Stories" linkTo="/news" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {news.slice(0, 4).map(n => <NewsCard key={n.id} news={n} />)}
              </div>
            </section>

            {/* Upcoming */}
            {upcomingMatches.length > 0 && (
              <section>
                <SectionHeader title="Upcoming Matches" linkTo="/live" />
                <div className="grid gap-4">{upcomingMatches.map(m => <MatchCard key={m.id} match={m} />)}</div>
              </section>
            )}
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">

            {/* Latest news list */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <SectionHeader title="Latest News" linkTo="/news" />
              <div className="space-y-4">
                {news.slice(0, 6).map(n => <NewsCard key={n.id} news={n} variant="list" />)}
              </div>
            </div>

            {/* ICC T20 Rankings snapshot */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <SectionHeader title="ICC T20I Rankings" linkTo="/rankings" linkLabel="Full Table" />
              <div className="divide-y divide-gray-50">
                {iccRankings.teams.t20.slice(0, 5).map(t => (
                  <div key={t.rank} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold ${
                        t.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                        t.rank === 2 ? 'bg-gray-300 text-gray-700' :
                        t.rank === 3 ? 'bg-orange-400 text-white' : 'bg-gray-100 text-gray-500'
                      }`}>{t.rank}</span>
                      <span className="text-sm text-gray-700 font-medium">{t.team}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-500">{t.rating}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ongoing Series */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <SectionHeader title="Ongoing Series" linkTo="/series" />
              <div className="space-y-3">
                {seriesList.filter(s => s.status === 'Ongoing').map(s => (
                  <div key={s.id} className="flex gap-2 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                    <span className={`shrink-0 text-xs font-bold px-1.5 py-0.5 rounded mt-0.5 ${
                      s.type === 'T20' || s.type === 'T20I' ? 'bg-purple-100 text-purple-700' :
                      s.type === 'ODI' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                    }`}>{s.type}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 leading-snug">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.startDate} – {s.endDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
