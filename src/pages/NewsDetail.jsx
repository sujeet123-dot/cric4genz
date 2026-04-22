import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useNews } from '../hooks/useNews';
import NewsCard from '../components/NewsCard';

const NewsDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { news } = useNews();

  // prefer router state (instant), fall back to hook data
  const article = location.state?.news ?? news.find(n => String(n.id) === id);
  const related = news.filter(n => String(n.id) !== id).slice(0, 4);

  if (!article) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">📰</p>
          <h2 className="text-xl font-bold text-gray-700 mb-2">Article not found</h2>
          <Link to="/news" className="text-red-600 font-semibold hover:underline">← Back to News</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero image */}
      <div className="relative bg-gray-900 h-56 md:h-96 overflow-hidden">
        <img
          src={article.image ?? `https://picsum.photos/seed/n${article.id}/1200/600`}
          alt={article.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 pb-6">
          <Link to="/news" className="inline-flex items-center gap-1 text-gray-300 hover:text-white text-sm mb-3 transition-colors">
            ← Back to News
          </Link>
          <span className="block bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded mb-2 w-fit">
            {article.category}
          </span>
          <h1 className="text-xl md:text-3xl font-extrabold text-white leading-tight">
            {article.title}
          </h1>
          <p className="text-gray-400 text-sm mt-2">{article.time}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Article body */}
          <article className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">

              {/* Meta */}
              <div className="flex items-center gap-4 pb-5 mb-5 border-b border-gray-100">
                <span className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-lg">📰</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Cric4GenZ Sports Desk</p>
                  <p className="text-xs text-gray-400">{article.time}</p>
                </div>
                {article.link && article.link !== '#' && (
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto flex items-center gap-1.5 text-xs border border-gray-200 text-gray-600 hover:border-red-400 hover:text-red-600 px-3 py-1.5 rounded-full transition-colors font-semibold"
                  >
                    🔗 Original Source
                  </a>
                )}
              </div>

              {/* Description / content */}
              {article.description ? (
                <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                  <p className="text-base text-gray-800 font-medium mb-4 leading-relaxed">
                    {article.description}
                  </p>
                  <p className="text-gray-600">
                    Cricket continues to captivate millions around the world, with this latest development adding another exciting chapter to the sport's rich history. Fans and analysts alike are closely following every update.
                  </p>
                  <p className="text-gray-600 mt-4">
                    Stay tuned to Cric4GenZ for ball-by-ball coverage, expert analysis, and the latest news from around the cricket world. Our dedicated team of cricket journalists brings you comprehensive coverage 24/7.
                  </p>
                  {article.link && article.link !== '#' && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">Read the full story at the original source:</p>
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
                      >
                        Read Full Article →
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Full article content is available at the original source.</p>
              )}

              {/* Tags */}
              <div className="mt-6 pt-5 border-t border-gray-100 flex flex-wrap gap-2">
                {['Cricket', article.category, 'Sports', 'Cric4GenZ'].map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full border border-gray-200">
                    #{tag.replace(/\s+/g, '')}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Share */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-800 text-sm mb-3 border-l-4 border-red-600 pl-3">Share</h3>
              <div className="flex gap-2 flex-wrap">
                {[
                  { label: '🐦 Twitter', color: 'bg-sky-500 hover:bg-sky-600' },
                  { label: '📘 Facebook', color: 'bg-blue-600 hover:bg-blue-700' },
                  { label: '💬 WhatsApp', color: 'bg-green-500 hover:bg-green-600' },
                ].map(btn => (
                  <button key={btn.label} className={`${btn.color} text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors`}>
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Related news */}
            {related.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-bold text-gray-800 text-sm mb-4 border-l-4 border-red-600 pl-3">More Cricket News</h3>
                <div className="space-y-4">
                  {related.map(n => <NewsCard key={n.id} news={n} variant="list" />)}
                </div>
              </div>
            )}

            {/* Live scores promo */}
            <div className="bg-gray-900 rounded-xl p-5 text-white text-center">
              <p className="text-3xl mb-2">🏏</p>
              <h3 className="font-bold mb-1">Check Live Scores</h3>
              <p className="text-gray-400 text-xs mb-3">Real-time updates, ball by ball</p>
              <Link
                to="/live"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors"
              >
                Live Scores →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
