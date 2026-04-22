import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CleverAds from './components/Adbar';
import Home from './pages/Home';
import LiveScores from './pages/LiveScores';
import Series from './pages/Series';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Rankings from './pages/Rankings';
import MatchDetail from './pages/MatchDetail';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/live"       element={<LiveScores />} />
          <Route path="/series"     element={<Series />} />
          <Route path="/news"       element={<News />} />
          <Route path="/news/:id"   element={<NewsDetail />} />
          <Route path="/rankings"   element={<Rankings />} />
          <Route path="/match/:id"  element={<MatchDetail />} />
        </Routes>
      </main>
      <Footer />
      <CleverAds />
    </div>
  );
}

export default App;
