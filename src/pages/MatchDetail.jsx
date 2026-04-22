import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLiveScores } from '../hooks/useLiveScores';
import { fetchMatchScorecard } from '../utils/api';

const mockScorecard = {
  innings: [
    {
      team: 'Pakistan', flag: '🇵🇰',
      total: '168/4', overs: '16.0',
      batters: [
        { name: 'Mohammad Rizwan', runs: 72, balls: 48, fours: 8, sixes: 3, sr: 150.0, dismissed: 'not out' },
        { name: 'Babar Azam',      runs: 45, balls: 32, fours: 5, sixes: 1, sr: 140.6, dismissed: 'c Root b Topley' },
        { name: 'Fakhar Zaman',    runs: 28, balls: 18, fours: 3, sixes: 1, sr: 155.5, dismissed: 'c Buttler b Wood' },
        { name: 'Shan Masood',     runs: 12, balls:  9, fours: 1, sixes: 0, sr: 133.3, dismissed: 'b Rashid' },
        { name: 'Shadab Khan',     runs: 11, balls:  7, fours: 1, sixes: 1, sr: 157.1, dismissed: 'not out' },
      ],
      bowlers: [
        { name: 'Mark Wood',         overs: '4', maidens: 0, runs: 32, wickets: 1, econ: 8.0 },
        { name: 'Adil Rashid',       overs: '4', maidens: 0, runs: 28, wickets: 1, econ: 7.0 },
        { name: 'Reece Topley',      overs: '4', maidens: 0, runs: 36, wickets: 1, econ: 9.0 },
        { name: 'Sam Curran',        overs: '3', maidens: 0, runs: 41, wickets: 0, econ: 13.7 },
        { name: 'Liam Livingstone',  overs: '1', maidens: 0, runs:  9, wickets: 0, econ: 9.0 },
      ],
    },
  ],
};

const MatchDetail = () => {
  const { id } = useParams();
  const { matches } = useLiveScores();
  const match = matches.find(m => m.id === id) ?? matches[0];
  const [scorecard, setScorecard] = useState(null);
  const [loading, setLoading]     = useState(true);
  const [tab, setTab]             = useState('scorecard');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const data = await fetchMatchScorecard(id);
      if (!cancelled) {
        setScorecard(data?.status === 'success' ? data.data : mockScorecard);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  if (!match) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🏏</p>
          <h2 className="text-xl font-bold text-gray-700 mb-2">Match not found</h2>
          <Link to="/live" className="text-red-600 font-semibold hover:underline">← Live Scores</Link>
        </div>
      </div>
    );
  }

  const card = scorecard ?? mockScorecard;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Match header */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Link to="/live" className="text-gray-400 hover:text-white text-sm inline-flex items-center gap-1 mb-4 transition-colors">
            ← Back to Live Scores
          </Link>

          <div className="flex items-center gap-2 mb-1">
            {match.matchType && (
              <span className="text-xs bg-gray-700 text-gray-300 font-bold px-2 py-0.5 rounded">{match.matchType}</span>
            )}
            {match.live && (
              <span className="flex items-center gap-1 text-xs bg-red-600 text-white font-bold px-2 py-0.5 rounded animate-pulse">
                <span className="w-1.5 h-1.5 bg-white rounded-full" /> LIVE
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm mb-5 leading-snug">{match.series}</p>

          {/* Scoreboard */}
          <div className="flex items-center gap-4">
            <div className="flex-1 text-center">
              <div className="text-4xl mb-2">{match.flag1}</div>
              <h2 className="text-lg md:text-xl font-extrabold">{match.team1}</h2>
              <p className={`font-mono font-bold text-2xl mt-1 ${match.live ? 'text-red-400' : 'text-gray-200'}`}>
                {match.score1}
              </p>
            </div>
            <div className="text-gray-600 font-bold text-lg">VS</div>
            <div className="flex-1 text-center">
              <div className="text-4xl mb-2">{match.flag2}</div>
              <h2 className="text-lg md:text-xl font-extrabold">{match.team2}</h2>
              <p className={`font-mono font-bold text-2xl mt-1 ${match.live ? 'text-red-400' : 'text-gray-200'}`}>
                {match.score2}
              </p>
            </div>
          </div>

          <div className="text-center mt-4 pt-4 border-t border-gray-800">
            <p className={`font-semibold text-sm ${match.live ? 'text-red-400' : 'text-gray-300'}`}>{match.status}</p>
            {match.venue && <p className="text-gray-500 text-xs mt-1">📍 {match.venue}</p>}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-14 z-30">
        <div className="max-w-5xl mx-auto px-4 flex gap-0">
          {['scorecard', 'info'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-sm font-semibold capitalize border-b-2 transition-colors ${
                tab === t ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {t === 'scorecard' ? '📋 Scorecard' : 'ℹ️ Match Info'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {tab === 'scorecard' && (
          <>
            {loading ? (
              <div className="space-y-4">
                {[1, 2].map(i => <div key={i} className="bg-white rounded-xl h-48 animate-pulse border border-gray-200" />)}
              </div>
            ) : (
              (card.innings ?? [mockScorecard.innings[0]]).map((inn, idx) => (
                <div key={idx} className="mb-8">
                  <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-xl">{inn.flag ?? (idx === 0 ? match.flag1 : match.flag2)}</span>
                    {inn.team ?? (idx === 0 ? match.team1 : match.team2)} Innings
                    <span className="text-gray-500 font-normal text-sm ml-1">— {inn.total} ({inn.overs} ov)</span>
                  </h3>

                  {/* Batting */}
                  <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto mb-3">
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Batting
                    </div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100 text-xs text-gray-500">
                          <th className="text-left px-4 py-2.5 font-semibold">Batter</th>
                          <th className="text-left px-4 py-2.5 font-semibold text-xs hidden md:table-cell">Dismissal</th>
                          <th className="text-right px-3 py-2.5 font-semibold">R</th>
                          <th className="text-right px-3 py-2.5 font-semibold">B</th>
                          <th className="text-right px-3 py-2.5 font-semibold hidden sm:table-cell">4s</th>
                          <th className="text-right px-3 py-2.5 font-semibold hidden sm:table-cell">6s</th>
                          <th className="text-right px-3 py-2.5 font-semibold">SR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inn.batters.map((b, bi) => (
                          <tr key={bi} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-2.5">
                              <span className="font-semibold text-gray-800">{b.name}</span>
                              {b.dismissed === 'not out' && (
                                <span className="ml-1.5 text-xs text-green-600 font-bold">*</span>
                              )}
                              <p className="text-xs text-gray-400 md:hidden mt-0.5">{b.dismissed}</p>
                            </td>
                            <td className="px-4 py-2.5 text-gray-400 text-xs hidden md:table-cell">{b.dismissed}</td>
                            <td className="px-3 py-2.5 text-right font-bold text-gray-800">{b.runs}</td>
                            <td className="px-3 py-2.5 text-right text-gray-500">{b.balls}</td>
                            <td className="px-3 py-2.5 text-right text-gray-500 hidden sm:table-cell">{b.fours}</td>
                            <td className="px-3 py-2.5 text-right text-gray-500 hidden sm:table-cell">{b.sixes}</td>
                            <td className="px-3 py-2.5 text-right text-gray-500 text-xs">{b.sr?.toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Bowling */}
                  <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Bowling
                    </div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100 text-xs text-gray-500">
                          <th className="text-left px-4 py-2.5 font-semibold">Bowler</th>
                          <th className="text-right px-3 py-2.5 font-semibold">O</th>
                          <th className="text-right px-3 py-2.5 font-semibold hidden sm:table-cell">M</th>
                          <th className="text-right px-3 py-2.5 font-semibold">R</th>
                          <th className="text-right px-3 py-2.5 font-semibold">W</th>
                          <th className="text-right px-3 py-2.5 font-semibold">Econ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inn.bowlers.map((b, bi) => (
                          <tr key={bi} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-2.5 font-semibold text-gray-800">{b.name}</td>
                            <td className="px-3 py-2.5 text-right text-gray-500">{b.overs}</td>
                            <td className="px-3 py-2.5 text-right text-gray-500 hidden sm:table-cell">{b.maidens}</td>
                            <td className="px-3 py-2.5 text-right text-gray-500">{b.runs}</td>
                            <td className="px-3 py-2.5 text-right font-bold text-red-600">{b.wickets}</td>
                            <td className="px-3 py-2.5 text-right text-gray-400 text-xs">{b.econ?.toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            )}

            {match.live && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 text-center font-medium">
                🔴 Live match — scorecard updates automatically every 30 seconds
              </div>
            )}
          </>
        )}

        {tab === 'info' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-800 mb-4 border-l-4 border-red-600 pl-3">Match Information</h3>
            <dl className="space-y-3 text-sm">
              {[
                ['Series',    match.series],
                ['Match Type', match.matchType],
                ['Venue',      match.venue],
                ['Status',     match.status],
              ].filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="flex gap-4 py-2 border-b border-gray-50 last:border-0">
                  <dt className="text-gray-400 font-medium w-28 shrink-0">{k}</dt>
                  <dd className="text-gray-800 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchDetail;
