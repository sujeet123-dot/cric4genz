import React, { useState } from 'react';
import { seriesList } from '../data';

const statusColor = {
  Ongoing:   'bg-green-100 text-green-700 border border-green-200',
  Upcoming:  'bg-blue-100 text-blue-700 border border-blue-200',
  Completed: 'bg-gray-100 text-gray-600 border border-gray-200',
};
const typeColor = {
  Test: 'bg-amber-100 text-amber-800',
  ODI:  'bg-blue-100 text-blue-800',
  T20I: 'bg-purple-100 text-purple-800',
  T20:  'bg-purple-100 text-purple-800',
};

const SeriesCard = ({ series }) => (
  <div className="bg-white rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-md transition-all p-5 animate-fadeIn">
    <div className="flex items-start justify-between gap-3 mb-3">
      <h3 className="font-bold text-gray-800 text-sm leading-snug">{series.name}</h3>
      <span className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${statusColor[series.status]}`}>
        {series.status}
      </span>
    </div>
    <div className="flex flex-wrap gap-2 mb-3">
      <span className={`text-xs font-bold px-2 py-0.5 rounded ${typeColor[series.type] ?? 'bg-gray-100 text-gray-600'}`}>
        {series.type}
      </span>
      <span className="text-xs text-gray-500">📍 {series.host}</span>
      <span className="text-xs text-gray-500">📅 {series.startDate} – {series.endDate}</span>
    </div>
    <div className="flex flex-wrap gap-1.5">
      {series.teams.map(team => (
        <span key={team} className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
          {team}
        </span>
      ))}
    </div>
  </div>
);

const Series = () => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Ongoing', 'Upcoming', 'Completed'];
  const filtered = filter === 'All' ? seriesList : seriesList.filter(s => s.status === filter);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-1">Cricket Series</h1>
          <p className="text-gray-400 text-sm">All ongoing, upcoming and completed international series</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 flex-wrap">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                filter === f
                  ? 'bg-red-600 text-white shadow'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-red-400 hover:text-red-600'
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-sm text-gray-400 self-center">{filtered.length} series</span>
        </div>

        {(['Ongoing', 'Upcoming', 'Completed']).map(group => {
          const items = filtered.filter(s => s.status === group);
          if (items.length === 0) return null;
          const icon = group === 'Ongoing' ? '🟢' : group === 'Upcoming' ? '🔵' : '✅';
          const borderColor = group === 'Ongoing' ? 'border-green-500' : group === 'Upcoming' ? 'border-blue-500' : 'border-gray-400';
          return (
            <section key={group} className="mb-8">
              {filter === 'All' && (
                <h2 className={`text-base font-bold text-gray-800 border-l-4 ${borderColor} pl-3 mb-4`}>
                  {icon} {group} Series
                </h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {items.map(s => <SeriesCard key={s.id} series={s} />)}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Series;
