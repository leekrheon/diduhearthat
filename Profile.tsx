import { motion } from 'motion/react';

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_REST_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export default function Login() {
  const handleKakaoLogin = () => {
    const kakaoAuthUrl =
      `https://kauth.kakao.com/oauth/authorize` +
      `?client_id=${KAKAO_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className="flex flex-col h-full bg-black text-white relative overflow-hidden">
      {/* 배경 그라디언트 */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-white/3 rounded-full blur-3xl" />

      {/* 상단 로고 영역 */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center"
        >
          {/* 앱 아이콘 */}
          <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <span className="text-black text-3xl font-black tracking-tighter">I</span>
          </div>

          <h1 className="text-4xl font-black tracking-tight mb-3">IMBY</h1>
          <p className="text-white/40 text-sm font-medium leading-relaxed">
            친구처럼 대화하고<br />자연스럽게 정보를 얻어요
          </p>
        </motion.div>

        {/* 캐릭터 미리보기 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex gap-3 mt-12"
        >
          {['수진', '민호', '유나'].map((name, i) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="w-16 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
                style={{ opacity: 1 - i * 0.2 }}
              >
                <span className="text-white/20 text-2xl font-black">{name[0]}</span>
              </div>
              <span className="text-white/30 text-[10px] font-bold">{name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 하단 로그인 버튼 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative px-6 pb-12 space-y-3"
      >
        {/* 카카오 로그인 버튼 */}
        <button
          onClick={handleKakaoLogin}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-sm transition-transform active:scale-[0.98]"
          style={{ backgroundColor: '#FEE500', color: '#000' }}
        >
          {/* 카카오 로고 SVG */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 2C5.582 2 2 4.896 2 8.444c0 2.283 1.52 4.283 3.817 5.417L4.9 17.1c-.08.287.22.52.47.35l4.03-2.69c.196.016.394.024.6.024 4.418 0 8-2.896 8-6.444C18 4.896 14.418 2 10 2z"
              fill="#000"
            />
          </svg>
          카카오로 시작하기
        </button>

        <p className="text-center text-white/20 text-[11px] font-medium">
          로그인 시 서비스 이용약관 및 개인정보처리방침에 동의합니다
        </p>
      </motion.div>
    </div>
  );
}
