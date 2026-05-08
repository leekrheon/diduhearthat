import { Calendar } from 'lucide-react';
import RingProgress from './RingProgress';
import { motion } from 'motion/react';

interface HomeProps {
  count: number;
  totalCount: number;
  weekCounts: number[];
  onStart: () => void;
}

export default function Home({ count, totalCount, weekCounts, onStart }: HomeProps) {
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const todayIndex = (new Date().getDay() + 6) % 7;
  const maxWeek = Math.max(...weekCounts, 1);

  return (
    <div className="flex flex-col h-full bg-black text-white p-6 overflow-y-auto pb-24">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="IMBY" className="w-9 h-9 object-contain" />
          <div>
            <h1 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">
              {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}
            </h1>
            <h2 className="text-3xl font-extrabold tracking-tight">활동 요약</h2>
          </div>
        </div>
        <button className="bg-white/5 p-3 rounded-2xl border border-white/10">
          <Calendar className="text-white" size={20} />
        </button>
      </header>

      {/* 주간 막대 그래프 */}
      <div className="flex justify-between items-end mb-10 bg-white/5 p-6 rounded-[2.5rem] border border-white/10 gap-2">
        {days.map((day, i) => {
          const h = weekCounts[i] ? Math.max((weekCounts[i] / maxWeek) * 48, 8) : 4;
          return (
            <div key={day} className="flex flex-col items-center flex-1">
              <motion.div
                className={`w-full rounded-full mb-2 ${i === todayIndex ? 'bg-white' : 'bg-white/15'}`}
                style={{ height: h }}
                animate={{ height: h }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
              <span className={`text-[10px] font-bold ${i === todayIndex ? 'text-white' : 'text-white/20'}`}>
                {day}
              </span>
            </div>
          );
        })}
      </div>

      {/* 메인 링 */}
      <div className="flex flex-col items-center justify-center py-10 bg-white/5 rounded-[3rem] mb-6 border border-white/10 shadow-2xl">
        <RingProgress current={count} total={5} size={200} strokeWidth={24} />
        <div className="mt-8 text-center">
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.25em] mb-2">오늘의 대화</p>
          <p className="text-5xl font-black tracking-tighter text-white">
            {count} <span className="text-xl text-white/30 font-medium">/ 5</span>
          </p>
          <p className="text-white/20 text-xs mt-2 font-medium">
            {count >= 5 ? '🎉 오늘 목표 달성!' : `${5 - count}개 남았어요`}
          </p>
        </div>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-7 bg-white/5 rounded-[2.5rem] border border-white/10">
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.1em]">누적 대화</p>
          <p className="text-2xl font-bold mt-2 tracking-tight">
            {totalCount} <span className="text-xs font-normal text-white/20 italic ml-1 font-mono">Total</span>
          </p>
        </div>
        <div className="p-7 bg-white/5 rounded-[2.5rem] border border-white/10">
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.1em]">주간 합계</p>
          <p className="text-2xl font-bold mt-2 tracking-tight">
            {weekCounts.reduce((a, b) => a + b, 0)}{' '}
            <span className="text-xs font-normal text-white/20 italic ml-1 font-mono">This week</span>
          </p>
        </div>
      </div>

    </div>
  );
}
