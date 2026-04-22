import { useState, useEffect } from 'react';
import { fetchCricketNews } from '../utils/api';
import { newsUpdates as fallbackNews } from '../data';

export function useNews() {
  const [news, setNews] = useState(fallbackNews);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const items = await fetchCricketNews();
        if (!cancelled && items && items.length > 0) {
          const normalized = items.map((item, i) => ({
            id: i,
            title: item.title,
            time: new Date(item.pubDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            category: item.categories?.[0] ?? 'Cricket',
            image: item.thumbnail || item.enclosure?.link || `https://picsum.photos/seed/cric${i}/600/350`,
            link: item.link,
            description: item.description?.replace(/<[^>]+>/g, '').slice(0, 120) + '...',
          }));
          setNews(normalized);
        } else if (!cancelled) {
          setNews(fallbackNews);
        }
      } catch {
        if (!cancelled) setNews(fallbackNews);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { news, loading };
}
