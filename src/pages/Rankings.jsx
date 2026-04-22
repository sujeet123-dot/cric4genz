import React, { useState } from 'react';
import { iccRankings } from '../data';

const formatLabel = { test: 'Test', odi: 'ODI', t20: 'T20I' };

const RankingsTable = ({ data, isTeam }) => (
  <div className="overflow-x-auto rounded-xl border border-gray-200">
    <table className="w-full bg-white text-sm">
      <thead>
        <tr className="bg-gray-900 text-white">
          <th className="text-left px-4 py-3 font-bold w-14">Rank</th>
          <th className="text-left px-4 py-3 font-bold">{isTeam ? 'Team' : 'Player'}</th>
          {!isTeam && <th className="text-left px-4 py-3 font-bold hidden sm:table-cell">Country</th>}
          <th className="text-right px-4 py-3 font-bold">Rating</th>
          {isTeam && <th className="text-right px-4 py-3 font-bold hidden sm:table-cell">Points</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3">
              <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                i === 0 ? 'bg-yellow-400 text-yellow-900' :
                i === 1 ? 'bg-gray-300 text-gray-700' :
                i === 2 ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'
              }`}>{item.rank}</span>
            </td>
            <td className="px-4 py-3 font-semibold text-gray-800">
              {isTeam ? item.team : item.player}
              {!isTeam && <p className="text-xs text-gray-400 font-normal sm:hidden">{item.country}</p>}
            </td>
            {!isTeam && <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{item.country}</td>}
            <td className="px-4 py-3 text-right font-mono font-bold text-red-600">{item.rating}</td>
            {isTeam && <td className="px-4 py-3 text-right text-gray-400 hidden sm:table-cell">{item.points?.toLocaleString()}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Rankings = () => {
  const [format, setFormat]     = useState('test');
  const [category, setCategory] = useState('batting');
  const isTeam = category === 'teams';
  const data   = iccRankings[category]?.[format] ?? [];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-1">ICC Rankings</h1>
          <p className="text-gray-400 text-sm">Official player and team rankings</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Category */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {['batting', 'bowling', 'teams'].map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-colors ${
                category === c ? 'bg-red-600 text-white shadow' : 'bg-white text-gray-600 border border-gray-200 hover:border-red-400 hover:text-red-600'
              }`}
            >
              {c === 'batting' ? '🏏 Batting' : c === 'bowling' ? '⚡ Bowling' : '🏆 Teams'}
            </button>
          ))}
        </div>

        {/* Format */}
        <div className="flex gap-2 mb-6">
          {['test', 'odi', 't20'].map(f => (
            <button key={f} onClick={() => setFormat(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-colors ${
                format === f ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-500 hover:text-gray-700'
              }`}
            >
              {formatLabel[f]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-base font-bold text-gray-800 mb-3">
              ICC {formatLabel[format]} {category.charAt(0).toUpperCase() + category.slice(1)} Rankings
            </h2>
            {data.length > 0
              ? <RankingsTable data={data} isTeam={isTeam} />
              : <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400"><p className="text-3xl mb-2">📊</p><p>Not available</p></div>
            }
            <p className="text-xs text-gray-400 mt-3 text-right">Rankings updated weekly</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-700 text-sm mb-4 border-l-4 border-yellow-400 pl-3">🥇 Current #1 Players</h3>
              <div className="space-y-2.5">
                {[
                  { label: 'Test Batting',    name: 'Joe Root',            flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
                  { label: 'ODI Batting',     name: 'Babar Azam',          flag: '🇵🇰' },
                  { label: 'T20I Batting',    name: 'Suryakumar Yadav',    flag: '🇮🇳' },
                  { label: 'Test Bowling',    name: 'Jasprit Bumrah',      flag: '🇮🇳' },
                  { label: 'ODI Bowling',     name: 'Jasprit Bumrah',      flag: '🇮🇳' },
                  { label: 'T20I Bowling',    name: 'Rashid Khan',         flag: '🇦🇫' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between text-sm py-1 border-b border-gray-50 last:border-0">
                    <span className="text-gray-500 text-xs">{item.label}</span>
                    <span className="font-semibold text-gray-800">{item.flag} {item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-5 text-white">
              <h3 className="font-bold text-sm mb-3 text-red-400">🏆 Top Ranked Teams</h3>
              {['test', 'odi', 't20'].map(f => {
                const top = iccRankings.teams[f]?.[0];
                return top ? (
                  <div key={f} className="flex justify-between text-sm py-2 border-b border-gray-800 last:border-0">
                    <span className="text-gray-400 uppercase text-xs font-bold">{formatLabel[f]}</span>
                    <span className="font-bold">{top.team}</span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rankings;
