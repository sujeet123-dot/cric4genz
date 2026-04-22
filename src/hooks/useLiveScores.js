import { useState, useEffect, useCallback } from 'react';
import { fetchLiveMatches } from '../utils/api';
import { liveMatches as fallbackMatches } from '../data';

const COUNTRY_FLAGS = {
  India: '🇮🇳', Australia: '🇦🇺', Pakistan: '🇵🇰',
  England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'New Zealand': '🇳🇿', 'South Africa': '🇿🇦',
  'Sri Lanka': '🇱🇰', Bangladesh: '🇧🇩', Afghanistan: '🇦🇫',
  'West Indies': '🏝️', Zimbabwe: '🇿🇼', Ireland: '🇮🇪',
  Netherlands: '🇳🇱', Scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', UAE: '🇦🇪', Nepal: '🇳🇵',
};

function formatScore(scoreArr, teamName) {
  if (!scoreArr || scoreArr.length === 0) return '—';
  // find inning belonging to this team
  const match = scoreArr.find(s =>
    s.inning && s.inning.toLowerCase().includes(teamName.toLowerCase())
  ) ?? scoreArr.find(s => s.inning?.includes(teamName.split(' ')[0]));
  if (!match) return '—';
  return `${match.r ?? 0}/${match.w ?? 0} (${match.o ?? 0})`;
}

function normalizeMatch(m) {
  const t1 = m.teams?.[0] ?? 'Team A';
  const t2 = m.teams?.[1] ?? 'Team B';
  return {
    id: m.id,
    team1: t1, flag1: COUNTRY_FLAGS[t1] ?? '🏏',
    team2: t2, flag2: COUNTRY_FLAGS[t2] ?? '🏏',
    score1: formatScore(m.score, t1),
    score2: formatScore(m.score, t2),
    status: m.status ?? 'In Progress',
    live: m.matchStarted && !m.matchEnded,
    upcoming: !m.matchStarted,
    matchType: (m.matchType ?? '').toUpperCase(),
    series: m.name ?? m.series ?? '',
    venue: m.venue ?? '',
  };
}

export function useLiveScores(refreshInterval = 60000) {
  const [matches, setMatches] = useState(fallbackMatches);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [usingLive, setUsingLive] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLiveMatches();
      if (data?.status === 'success' && Array.isArray(data.data) && data.data.length > 0) {
        setMatches(data.data.map(normalizeMatch));
        setUsingLive(true);
      } else {
        setMatches(fallbackMatches);
        setUsingLive(false);
        if (data?.status === 'failure') setError(data.reason ?? 'API error');
      }
    } catch (e) {
      setError(e.message);
      setMatches(fallbackMatches);
      setUsingLive(false);
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(load, refreshInterval);
    return () => clearInterval(timer);
  }, [load, refreshInterval]);

  return { matches, loading, error, lastUpdated, usingLive, reload: load };
}
