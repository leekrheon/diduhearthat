import { useState, useEffect } from 'react';
import Home from './components/Home';
import SwipeSelection from './components/SwipeSelection';
import Chatroom from './components/Chatroom';
import Credit from './components/Credit';
import Scrap from './components/Scrap';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import { CHARACTERS } from './data/characters';
import { Character, View, ScrapItem } from './types';
import { motion, AnimatePresence } from 'motion/react';

const STORAGE_KEYS = {
  credits: 'imby_credits',
  todayCount: 'imby_today_count',
  todayDate: 'imby_today_date',
  weekCounts: 'imby_week_counts',
  totalCount: 'imby_total_count',
  scraps: 'imby_scraps',
  scrappedIds: 'imby_scrapped_ids',
};

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

export default function App() {
  const [activeView, setActiveView] = useState<View>('home');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  // 날짜 리셋 처리
  const today = new Date().toDateString();
  const savedDate = loadStorage<string>(STORAGE_KEYS.todayDate, '');
  const isNewDay = savedDate !== today;

  const [credits, setCredits] = useState<number>(() => loadStorage(STORAGE_KEYS.credits, 0));
  const [todayCount, setTodayCount] = useState<number>(() =>
    isNewDay ? 0 : loadStorage(STORAGE_KEYS.todayCount, 0)
  );
  const [totalCount, setTotalCount] = useState<number>(() => loadStorage(STORAGE_KEYS.totalCount, 0));
  const [weekCounts, setWeekCounts] = useState<number[]>(() =>
    loadStorage(STORAGE_KEYS.weekCounts, [0, 0, 0, 0, 0, 0, 0])
  );
  const [scraps, setScraps] = useState<ScrapItem[]>(() => loadStorage(STORAGE_KEYS.scraps, []));
  const [scrappedIds, setScrappedIds] = useState<Set<string>>(
    () => new Set<string>(loadStorage<string[]>(STORAGE_KEYS.scrappedIds, []))
  );

  // 새 날이면 오늘 카운트 리셋
  useEffect(() => {
    if (isNewDay) {
      saveStorage(STORAGE_KEYS.todayDate, today);
      saveStorage(STORAGE_KEYS.todayCount, 0);
    }
  }, [isNewDay, today]);

  // persist
  useEffect(() => { saveStorage(STORAGE_KEYS.credits, credits); }, [credits]);
  useEffect(() => { saveStorage(STORAGE_KEYS.todayCount, todayCount); }, [todayCount]);
  useEffect(() => { saveStorage(STORAGE_KEYS.totalCount, totalCount); }, [totalCount]);
  useEffect(() => { saveStorage(STORAGE_KEYS.weekCounts, weekCounts); }, [weekCounts]);
  useEffect(() => { saveStorage(STORAGE_KEYS.scraps, scraps); }, [scraps]);
  useEffect(() => { saveStorage(STORAGE_KEYS.scrappedIds, [...scrappedIds]); }, [scrappedIds]);

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
    setActiveView('chat');
  };

  const handleExitChat = () => {
    setActiveView('select');
    setSelectedCharacter(null);
  };

  const handleAdvanceCount = () => {
    const newToday = Math.min(todayCount + 1, 10);
    setTodayCount(newToday);
    setTotalCount((p) => p + 1);
    setCredits((p) => p + 100);

    // 주간 카운트 업데이트 (월=0 ~ 일=6)
    const dayIdx = (new Date().getDay() + 6) % 7;
    setWeekCounts((prev) => {
      const next = [...prev];
      next[dayIdx] = (next[dayIdx] || 0) + 1;
      return next;
    });
  };

  const handleScrap = (item: ScrapItem) => {
    if (scrappedIds.has(item.id)) {
      // 토글 — 삭제
      setScrappedIds((prev) => { const s = new Set(prev); s.delete(item.id); return s; });
      setScraps((prev) => prev.filter((s) => s.id !== item.id));
    } else {
      setScrappedIds((prev) => new Set(prev).add(item.id));
      setScraps((prev) => [item, ...prev]);
    }
  };

  const handleDeleteScrap = (id: string) => {
    setScrappedIds((prev) => { const s = new Set(prev); s.delete(id); return s; });
    setScraps((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-black overflow-hidden shadow-2xl relative border-x border-white/5">
      <main className="flex-1 relative overflow-hidden">
        {activeView === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
            <Home
              count={todayCount}
              totalCount={totalCount}
              weekCounts={weekCounts}
              onStart={() => setActiveView('select')}
            />
          </motion.div>
        )}

        {activeView === 'select' && (
          <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-10">
            <SwipeSelection characters={CHARACTERS} onSelect={handleSelectCharacter} />
          </motion.div>
        )}

        {activeView === 'credit' && (
          <motion.div key="credit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-20">
            <Credit credits={credits} />
          </motion.div>
        )}

        {activeView === 'scrap' && (
          <motion.div key="scrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-20">
            <Scrap items={scraps} onDelete={handleDeleteScrap} />
          </motion.div>
        )}

        {activeView === 'profile' && (
          <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-20">
            <Profile totalCount={totalCount} credits={credits} />
          </motion.div>
        )}

        <AnimatePresence>
          {activeView === 'chat' && selectedCharacter && (
            <motion.div
              key="chat"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute inset-0 z-[100] bg-black"
            >
              <Chatroom
                character={selectedCharacter}
                onExit={handleExitChat}
                onAdvanceCount={handleAdvanceCount}
                onScrap={handleScrap}
                scrappedIds={scrappedIds}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {activeView !== 'chat' && (
        <div className="z-50">
          <Navigation activeView={activeView} onViewChange={setActiveView} />
        </div>
      )}
    </div>
  );
}
