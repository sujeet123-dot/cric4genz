import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 mt-12">
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
      <div className="col-span-2 md:col-span-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🏏</span>
          <span className="text-white font-extrabold text-xl">
            Cric<span className="text-red-500">4GenZ</span>
          </span>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">
          Your go-to source for live cricket scores, breaking news, and in-depth analysis.
        </p>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          {[['/', 'Home'], ['/live', 'Live Scores'], ['/series', 'Series'], ['/news', 'News'], ['/rankings', 'ICC Rankings']].map(([to, label]) => (
            <li key={to}>
              <Link to={to} className="hover:text-white transition-colors">{label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Formats</h4>
        <ul className="space-y-2 text-sm">
          {['Test Cricket', 'ODI Cricket', 'T20 International', 'IPL 2025', "Women's Cricket"].map(f => (
            <li key={f}><span className="hover:text-white cursor-pointer transition-colors">{f}</span></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Top Teams</h4>
        <ul className="space-y-2 text-sm">
          {[['🇮🇳', 'India'], ['🇦🇺', 'Australia'], ['🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'England'], ['🇵🇰', 'Pakistan'], ['🇳🇿', 'New Zealand'], ['🇿🇦', 'South Africa']].map(([f, n]) => (
            <li key={n}><span className="hover:text-white cursor-pointer transition-colors">{f} {n}</span></li>
          ))}
        </ul>
      </div>
    </div>
    <div className="border-t border-gray-800 px-4 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-600">
        <p>© {new Date().getFullYear()} Cric4GenZ. All rights reserved.</p>
        <p>Live scores by <a href="https://cricapi.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">CricAPI</a> · News via Cricbuzz RSS</p>
      </div>
    </div>
  </footer>
);

export default Footer;
