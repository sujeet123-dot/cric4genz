const CRICAPI_KEY = import.meta.env.VITE_CRICAPI_KEY || '';
const CRICAPI_BASE = 'https://api.cricapi.com/v1';

export const fetchLiveMatches = async () => {
  if (!CRICAPI_KEY) return null;
  try {
    const res = await fetch(`${CRICAPI_BASE}/currentMatches?apikey=${CRICAPI_KEY}&offset=0`);
    return res.json();
  } catch {
    return null;
  }
};

export const fetchSeriesList = async () => {
  if (!CRICAPI_KEY) return null;
  try {
    const res = await fetch(`${CRICAPI_BASE}/series?apikey=${CRICAPI_KEY}&offset=0`);
    return res.json();
  } catch {
    return null;
  }
};

export const fetchMatchScorecard = async (id) => {
  if (!CRICAPI_KEY) return null;
  try {
    const res = await fetch(`${CRICAPI_BASE}/match_scorecard?apikey=${CRICAPI_KEY}&id=${id}`);
    return res.json();
  } catch {
    return null;
  }
};

export const fetchCricketNews = async () => {
  try {
    const rssUrl = encodeURIComponent('https://www.cricbuzz.com/rss-feeds/cricket-news');
    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}&count=20`);
    const data = await res.json();
    if (data.status === 'ok') return data.items;
    return null;
  } catch {
    return null;
  }
};
