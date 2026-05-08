import { Bookmark, Search, X, Share2 } from 'lucide-react';
import { ScrapItem } from '../types';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ScrapProps {
  items: ScrapItem[];
  onDelete: (id: string) => void;
}

export default function Scrap({ items, onDelete }: ScrapProps) {
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const filtered = items.filter(
    (item) =>
      item.text.includes(query) || item.characterName.includes(query)
  );

  return (
    <div className="flex flex-col h-full bg-black text-white p-6 overflow-y-auto pb-24 font-sans">
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-black tracking-tight">스크랩</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowSearch((v) => !v)}
            className="bg-white/5 p-3 rounded-2xl border border-white/10 text-white/60 hover:bg-white/10 transition-colors"
          >
            <Search size={20} />
          </button>
        </div>
      </header>

      {/* 검색창 */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-4"
          >
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="대화 내용 검색..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder-white/20 text-sm font-medium outline-none focus:border-white/30"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 카운트 */}
      {items.length > 0 && (
        <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-4">
          {filtered.length}개의 대화
        </p>
      )}

      {/* 빈 상태 */}
      {items.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center opacity-30">
          <div className="bg-white/10 p-6 rounded-[2rem] mb-6">
            <Bookmark size={40} />
          </div>
          <p className="font-bold text-xl mb-2 tracking-tight">수집된 대화가 없습니다</p>
          <p className="text-sm">대화 중 북마크 버튼으로 스크랩해보세요.</p>
        </div>
      )}

      {/* 스크랩 목록 */}
      <div className="space-y-4">
        <AnimatePresence>
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="bg-white/5 border border-white/10 rounded-[2rem] p-6 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-black text-[11px]">
                    {item.characterName[0]}
                  </div>
                  <span className="text-xs font-black opacity-40">
                    {item.characterName} / {item.characterAge}
                  </span>
                </div>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ text: item.text });
                      } else {
                        navigator.clipboard.writeText(item.text);
                      }
                    }}
                    className="p-1.5 bg-white/10 rounded-xl text-white/40 hover:text-white transition-colors"
                  >
                    <Share2 size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-1.5 bg-white/10 rounded-xl text-white/40 hover:text-red-400 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
              <p className="text-sm font-medium leading-relaxed italic text-white/80">
                "{item.text}"
              </p>
              <div className="mt-4 flex justify-end">
                <span className="text-[10px] font-bold text-white/20">{item.date}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
