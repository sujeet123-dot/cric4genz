import React from 'react';
import { Link } from 'react-router-dom';

const catColor = {
  'IPL 2025':         'bg-purple-100 text-purple-700',
  'Champions Trophy': 'bg-blue-100 text-blue-700',
  'T20 International':'bg-pink-100 text-pink-700',
  'Records':          'bg-yellow-100 text-yellow-800',
  'Test Cricket':     'bg-amber-100 text-amber-800',
  'ICC Rankings':     'bg-emerald-100 text-emerald-700',
  'WPL':              'bg-rose-100 text-rose-700',
  'England Cricket':  'bg-indigo-100 text-indigo-700',
};

const NewsCard = ({ news, variant = 'card' }) => {
  const badge = catColor[news.category] ?? 'bg-gray-100 text-gray-600';

  if (variant === 'list') {
    return (
      <Link
        to={`/news/${news.id}`}
        state={{ news }}
        className="flex gap-3 items-start group pb-3 border-b border-gray-100 last:border-0 last:pb-0"
      >
        <img
          src={news.image ?? `https://picsum.photos/seed/n${news.id}/120/80`}
          alt=""
          className="w-20 h-14 object-cover rounded shrink-0"
        />
        <div className="min-w-0">
          <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${badge}`}>{news.category}</span>
          <p className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors mt-1 line-clamp-2 leading-snug">
            {news.title}
          </p>
          <p className="text-xs text-gray-400 mt-1">{news.time}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/news/${news.id}`}
      state={{ news }}
      className="block bg-white rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-md transition-all overflow-hidden group animate-fadeIn"
    >
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <img
          src={news.image ?? `https://picsum.photos/seed/n${news.id}/600/350`}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded shadow ${badge}`}>
          {news.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2 text-sm leading-snug">
          {news.title}
        </h3>
        {news.description && (
          <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{news.description}</p>
        )}
        <p className="text-xs text-gray-400 mt-2">{news.time}</p>
      </div>
    </Link>
  );
};

export default NewsCard;
