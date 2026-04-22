import React, { useRef, useEffect } from 'react';

const PX_PER_SECOND = 55; // readable scroll speed

const ScoreTicker = ({ matches }) => {
  const trackRef = useRef(null);

  const segments = (matches ?? []).map((m) => {
    const tag  = m.live ? ' 🔴 LIVE' : m.upcoming ? ' 🕐 UPCOMING' : ' ✅';
    const s1   = m.score1 && m.score1 !== '—' ? ` ${m.score1}` : '';
    const s2   = m.score2 && m.score2 !== '—' ? ` ${m.score2}` : '';
    return `${m.flag1 ?? ''} ${m.team1}${s1}  vs  ${m.flag2 ?? ''} ${m.team2}${s2}  —  ${m.status}${tag}`;
  });

  // build one copy; we'll render it twice side-by-side for seamless loop
  const oneCopy = segments.join('          ◆          ');

  // measure the width of one copy, set animation-duration so speed = PX_PER_SECOND
  useEffect(() => {
    if (!trackRef.current) return;
    const halfWidth = trackRef.current.scrollWidth / 2;
    const duration  = halfWidth / PX_PER_SECOND;
    trackRef.current.style.animationDuration = `${duration}s`;
  }, [oneCopy]);

  if (!oneCopy) return null;

  return (
    <div className="bg-gray-800 border-b border-gray-700 flex items-center h-9 overflow-hidden select-none">
      {/* Static label */}
      <div className="shrink-0 bg-red-600 text-white text-xs font-extrabold uppercase tracking-widest px-3 h-full flex items-center z-10">
        Live
      </div>

      {/* Scrolling track */}
      <div className="flex-1 overflow-hidden">
        <div
          ref={trackRef}
          className="whitespace-nowrap inline-flex text-gray-200 text-xs font-medium gap-0"
          style={{
            animation: 'ticker-scroll 120s linear infinite', // fallback; JS overrides duration
          }}
        >
          {/* Render two identical copies — animation moves exactly -50% (one copy) */}
          <span style={{ paddingRight: '6rem' }}>{oneCopy}</span>
          <span style={{ paddingRight: '6rem' }}>{oneCopy}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreTicker;
