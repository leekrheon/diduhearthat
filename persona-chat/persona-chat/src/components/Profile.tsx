import { UserCog, Bell, HelpCircle, LogOut, ChevronRight, X, Check } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KakaoUser } from './AuthCallback';

interface ProfileProps {
  totalCount: number;
  credits: number;
  user: KakaoUser;
  onLogout: () => void;
}

export default function Profile({ totalCount, credits, user, onLogout }: ProfileProps) {
  const [notifications, setNotifications] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [nickname, setNickname] = useState(user.nickname);
  const [editDone, setEditDone] = useState(false);

  const handleSaveEdit = () => {
    setEditDone(true);
    setTimeout(() => {
      setShowEditModal(false);
      setEditDone(false);
    }, 1200);
  };

  const menuItems = [
    {
      icon: UserCog,
      label: '프로필 편집',
      value: undefined,
      onClick: () => setShowEditModal(true),
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
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.nickname}
              className="w-24 h-24 rounded-[2rem] object-cover mb-4 mx-auto border border-white/10"
            />
          ) : (
            <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mb-4 mx-auto">
              <span className="text-white/40 text-3xl font-black">{user.nickname[0]}</span>
            </div>
          )}
          <button
            onClick={() => setShowEditModal(true)}
            className="absolute bottom-4 right-0 bg-white p-1.5 rounded-xl border-4 border-black hover:scale-110 transition-transform"
          >
            <UserCog size={14} className="text-black" />
          </button>
        </div>
        <h2 className="text-2xl font-black tracking-tight">{nickname}</h2>
        <p className="text-white/40 text-sm font-medium mt-1">IMBY Member</p>
      </header>

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
            onClick={onLogout}
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

      {/* 프로필 편집 모달 */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-end justify-center"
            style={{ background: 'rgba(0,0,0,0.85)' }}
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-t-[2.5rem] p-8 pb-12"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-black tracking-tight">프로필 편집</h3>
                <button onClick={() => setShowEditModal(false)} className="p-2 bg-black/5 rounded-full">
                  <X size={16} className="text-black/40" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                {editDone ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={28} className="text-white" />
                    </div>
                    <p className="font-black text-black text-lg">저장됐어요!</p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {/* 닉네임 */}
                    <div className="mb-5">
                      <label className="text-xs font-black text-black/40 uppercase tracking-widest mb-2 block">
                        닉네임
                      </label>
                      <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="w-full bg-black/5 rounded-2xl px-5 py-4 text-black font-bold text-base outline-none focus:bg-black/8 transition-colors"
                        placeholder="닉네임 입력"
                      />
                    </div>

                    {/* 카카오 연동 안내 */}
                    <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4 mb-6">
                      <p className="text-xs font-bold text-yellow-700 leading-relaxed">
                        🔒 카카오 계정으로 로그인 중이에요.<br />
                        비밀번호 변경은 카카오 계정 설정에서 가능합니다.
                      </p>
                      <button
                        onClick={() => window.open('https://accounts.kakao.com/login', '_blank')}
                        className="mt-3 text-xs font-black text-yellow-600 underline"
                      >
                        카카오 계정 설정 열기 →
                      </button>
                    </div>

                    <button
                      onClick={handleSaveEdit}
                      className="w-full bg-black text-white py-5 rounded-2xl font-black text-base active:scale-[0.98] transition-transform"
                    >
                      저장하기
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
