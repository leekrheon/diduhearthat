import { Bell, ChevronRight, Info, Plus, ArrowUpRight, Wallet, History, Gift } from 'lucide-react';
import { motion } from 'motion/react';

interface CreditProps {
  credits: number;
}

export default function Credit({ credits }: CreditProps) {
  return (
    <div className="flex flex-col h-full bg-black text-white p-6 overflow-y-auto pb-24 font-sans">
      <header className="flex items-center justify-between mb-10">
        <div className="relative">
          <Bell size={24} className="text-white" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full" />
        </div>
        <button className="bg-white/10 hover:bg-white/20 transition-colors px-4 py-1.5 rounded-full text-xs font-bold border border-white/20">
          Get +P
        </button>
      </header>

      <div className="mb-10 px-2 group cursor-pointer">
        <p className="text-sm font-bold text-white/40 uppercase tracking-[0.1em] mb-2">대화 포인트</p>
        <div className="flex items-baseline space-x-2">
          <h2 className="text-6xl font-black tracking-tighter">
            {credits.toLocaleString()} <span className="text-2xl text-white/30 font-medium">P</span>
          </h2>
          <ChevronRight size={24} className="text-white/20 group-hover:translate-x-1 transition-transform" />
        </div>
        <div className="mt-4 flex items-center space-x-2 text-white/40 hover:text-white transition-colors">
          <span className="text-xs font-bold border-b border-white/10 pb-0.5">대화당 100P 추가 적립 중</span>
          <ChevronRight size={14} />
        </div>
      </div>

      {/* Savings Card (Monochrome Style) */}
      <div className="bg-white rounded-[2.5rem] p-8 mb-8 text-black shadow-2xl">
        <div className="flex justify-between items-start mb-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Savings</p>
            <h3 className="text-3xl font-black tracking-tighter">
              {(credits * 0.1).toFixed(2)} <span className="text-lg font-medium opacity-30">P</span>
            </h3>
          </div>
          <div className="bg-black/5 p-3 rounded-2xl">
            <Wallet size={20} className="text-black" />
          </div>
        </div>
        <p className="text-[10px] font-bold py-2 px-3 bg-black/5 inline-block rounded-lg opacity-60">
          Bonus: 10.00% APY
        </p>
      </div>

      {/* Promo Banner */}
      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 mb-10 relative overflow-hidden group cursor-pointer">
        <div className="flex justify-between items-start relative z-10">
          <div className="max-w-[70%]">
            <h4 className="text-lg font-bold leading-tight mb-2 tracking-tight">
              페르소나 플러스와 함께<br />더 많은 적립을 경험하세요.
            </h4>
            <div className="flex items-center space-x-1 text-white/40 font-bold text-[10px] uppercase tracking-wide group-hover:text-white transition-colors">
              <span>혜택 보기</span>
              <ChevronRight size={10} />
            </div>
          </div>
          <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-white/5 group-hover:scale-110 transition-transform">
            <Plus size={28} className="text-black" />
          </div>
        </div>
        {/* Abstract shapes for visual interest in monochrome */}
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/[0.02] rounded-full blur-2xl" />
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-black tracking-tight mb-6 px-2">포인트 관리</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white hover:bg-gray-100 transition-colors p-6 rounded-[2rem] text-black shadow-xl">
            <div className="bg-black p-2.5 rounded-xl inline-block mb-4 shadow-lg shadow-black/20">
              <Gift size={20} className="text-white" />
            </div>
            <p className="font-bold text-sm">기프트 샵</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] text-white hover:bg-white/10 transition-colors">
            <div className="bg-white/10 p-2.5 rounded-xl inline-block mb-4">
              <History size={20} className="text-white" />
            </div>
            <p className="font-bold text-sm">적립 내역</p>
          </div>
        </div>
      </div>
    </div>
  );
}
