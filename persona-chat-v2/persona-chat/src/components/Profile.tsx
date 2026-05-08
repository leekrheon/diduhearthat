import { User, Settings, Bell, HelpCircle, LogOut, ChevronRight, Shield } from 'lucide-react';
import { useState } from 'react';

interface ProfileProps {
  totalCount: number;
  credits: number;
}

export default function Profile({ totalCount, credits }: ProfileProps) {
  const [notifications, setNotifications] = useState(true);

  const menuItems = [
    {
      icon: Shield,
      label: '계정 보안',
      value: '안전',
      onClick: () => alert('계정 보안 설정은 준비 중입니다.'),
    },
    {
      icon: Bell,
      label: '알림 설정',
      value: notifications ? '켜짐' : '꺼짐',
      onClick: () => setNotifications((v) => !v),
    },
    {
      icon: HelpCircle,
      label: '고객 센터',
      value: undefined,
      onClick: () => alert('고객센터: support@imby.app'),
    },
  ];

  return (
    <div className="flex flex-col h-full bg-black text-white p-6 overflow-y-auto pb-24 font-sans">
      <header className="mb-8 text-center pt-8">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mb-4 mx-auto">
            <User size={40} className="text-white/20" />
          </div>
          <button
            onClick={() => alert('프로필 편집은 준비 중입니다.')}
            className="absolute bottom-4 right-0 bg-white p-1.5 rounded-xl border-4 border-black hover:scale-110 transition-transform"
          >
            <Settings size={14} className="text-black" />
          </button>
        </div>
        <h2 className="text-2xl font-black tracking-tight">사용자님</h2>
        <p className="text-white/40 text-sm font-medium mt-1">IMBY Member</p>
      </header>

      {/* 통계 요약 */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-5 text-center">
          <p className="text-2xl font-black tracking-tight">{totalCount}</p>
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-1">누적 대화</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-5 text-center">
          <p className="text-2xl font-black tracking-tight">{credits.toLocaleString()}</p>
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-1">보유 포인트</p>
        </div>
      </div>

      <div className="space-y-3">
        {menuItems.map((item, i) => (
          <button
            key={i}
            onClick={item.onClick}
            className="w-full flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-colors group text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/5 rounded-2xl">
                <item.icon size={20} className="text-white/60" />
              </div>
              <span className="font-bold text-sm tracking-tight">{item.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              {item.value && <span className="text-xs font-bold text-white/30">{item.value}</span>}
              <ChevronRight size={16} className="text-white/20 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}

        <div className="pt-4">
          <button
            onClick={() => alert('로그아웃 기능은 준비 중입니다.')}
            className="w-full flex items-center justify-between p-6 bg-white rounded-[2.5rem] text-black hover:scale-[0.98] transition-transform active:scale-95 shadow-xl"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-black/5 rounded-2xl">
                <LogOut size={20} className="text-black" />
              </div>
              <span className="font-bold text-sm tracking-tight">로그아웃</span>
            </div>
            <ChevronRight size={16} className="opacity-20" />
          </button>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em]">IMBY v1.0.0</p>
      </div>
    </div>
  );
}
