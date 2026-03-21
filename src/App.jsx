import React, { useState } from 'react';
import Navbar from './components/Navabar';
import MatchCard from './components/MatchCard';
import CleverAds from './components/Adbar';
import { liveMatches, newsUpdates } from './data';

function App() {
  const [activeTab, setActiveTab] = useState('live');

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Navbar />
      <CleverAds />

      {/* Hero Section */}
      <div className="bg-cricketDark text-white py-12 px-4 text-center">
        <h2 className="text-4xl font-bold mb-2">Follow the Game, Ball by Ball</h2>
        <p className="text-green-100">The fastest live scores and updates.</p>
      </div>

      <div className="container mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Match Scores */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Featured Matches</h2>
            <button className="text-cricketGreen font-semibold hover:underline">View All</button>
          </div>
          
          <div className="grid gap-6">
            {liveMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>

        {/* Right Column: News Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-cricketGreen pl-3">
              Latest News
            </h3>
            <div className="space-y-4">
              {newsUpdates.map((news) => (
                <div key={news.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <span className="text-xs font-bold text-blue-600 mb-1 block">
                    {news.category}
                  </span>
                  <p className="text-gray-700 font-medium hover:text-cricketGreen cursor-pointer transition-colors">
                    {news.title}
                  </p>
                  <span className="text-xs text-gray-400 mt-1 block">{news.time}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold">
              Read More News
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;