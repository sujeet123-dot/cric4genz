import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import { useNews } from '../hooks/useNews';

const News = () => {
  const { news, loading } = useNews();
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');

  const categories = ['All', ...Array.from(new Set(news.map(n => n.category)))];

  const filtered = news.filter(n => {
    const matchesCat  = cat === 'All' || n.category === cat;
    const matchesSrch = !search || n.title.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSrch;
  });

  const showFeatured = cat === 'All' && !search;
  const featured = filtered[0];
  const rest     = showFeatured ? filtered.slice(1) : filtered;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-3">Cricket News</h1>
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search news…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🔍</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                cat === c
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-red-400 hover:text-red-600'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(i => <div key={i} className="bg-white rounded-xl h-64 animate-pulse border border-gray-200" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
            <p className="text-3xl mb-2">📰</p>
            <p className="font-semibold text-gray-700">No results for "{search || cat}"</p>
          </div>
        ) : (
          <>
            {/* Featured hero */}
            {showFeatured && featured && (
              <Link
                to={`/news/${featured.id}`}
                state={{ news: featured }}
                className="block mb-6 rounded-xl overflow-hidden border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all group"
              >
                <div className="relative h-56 md:h-80">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded mb-2 inline-block">
                      {featured.category}
                    </span>
                    <h2 className="text-white text-lg md:text-2xl font-extrabold leading-tight group-hover:text-red-200 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">{featured.time}</p>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {rest.map(n => <NewsCard key={n.id} news={n} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default News;
