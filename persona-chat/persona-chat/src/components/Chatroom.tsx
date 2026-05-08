import { Character, ScrapItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Bookmark, BookmarkCheck } from 'lucide-react';

function useBlinkEffect() {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const scheduleNextBlink = () => {
      const delay = (3 + Math.random() * 5) * 1000;
      timer = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 130 + Math.random() * 60);
      }, delay);
    };

    scheduleNextBlink();
    return () => clearTimeout(timer);
  }, []);

  return isBlinking;
}

interface ChatroomProps {
  character: Character;
  onExit: () => void;
  onAdvanceCount: () => void;
  onScrap: (item: ScrapItem) => void;
  scrappedIds: Set<string>;
}

export default function Chatroom({ character, onExit, onAdvanceCount, onScrap, scrappedIds }: ChatroomProps) {
  const [step, setStep] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizDone, setQuizDone] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [bgError, setBgError] = useState(false);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isBlinking = useBlinkEffect();

  const currentDialogue = character.dialogues[step];
  const scrapKey = `${character.id}-${step}`;
  const isScrapped = scrappedIds.has(scrapKey);

  const startTyping = useCallback((text: string) => {
    setDisplayedText('');
    setIsTyping(true);
    setSelectedOption(null);
    setQuizDone(false);
    let i = 0;
    const type = () => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        typingRef.current = setTimeout(type, 38);
      } else {
        setIsTyping(false);
      }
    };
    type();
  }, []);

  useEffect(() => {
    if (typingRef.current) clearTimeout(typingRef.current);
    startTyping(currentDialogue.text);
    return () => { if (typingRef.current) clearTimeout(typingRef.current); };
  }, [step, currentDialogue.text, startTyping]);

  const handleNext = () => {
    if (isTyping) {
      // 타이핑 중 탭 → 즉시 전체 텍스트 표시
      if (typingRef.current) clearTimeout(typingRef.current);
      setDisplayedText(currentDialogue.text);
      setIsTyping(false);
      return;
    }
    if (currentDialogue.type === 'quiz' && !quizDone) return;

    if (step < character.dialogues.length - 1) {
      setStep(step + 1);
    } else {
      onAdvanceCount();
      onExit();
    }
  };

  const handleQuizSelect = (idx: number) => {
    if (quizDone) return;
    setSelectedOption(idx);
    setQuizDone(true);
  };

  const handleScrap = () => {
    const item: ScrapItem = {
      id: scrapKey,
      characterId: character.id,
      characterName: character.name,
      characterAge: character.age,
      text: currentDialogue.text,
      date: new Date().toLocaleDateString('ko-KR'),
    };
    onScrap(item);
  };

  const isLastStep = step === character.dialogues.length - 1;
  const canAdvance = !isTyping && (currentDialogue.type !== 'quiz' || quizDone);

  return (
    <div className="relative h-full overflow-hidden bg-black flex flex-col select-none">

      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        {!bgError ? (
          <img
            src={character.bgImage}
            alt="background"
            className="object-cover w-full h-full"
            onError={() => setBgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-zinc-800 to-zinc-950" />
        )}
        {/* 하단 그라디언트 — 대화박스 위 자연스러운 페이드 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      </div>

      {/* 상단 버튼 영역 */}
      <div className="relative z-50 flex items-center justify-between px-5 pt-6">
        <button
          onClick={onExit}
          className="p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-black/60 transition-colors"
        >
          <ArrowLeft size={22} />
        </button>

        {/* 광고 배지 */}
        {currentDialogue.type === 'ad' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full"
          >
            <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">AD · {currentDialogue.adBrand}</span>
          </motion.div>
        )}

        {/* 스크랩 버튼 */}
        <button
          onClick={handleScrap}
          className={`p-3 backdrop-blur-md rounded-full border transition-all ${
            isScrapped
              ? 'bg-white text-black border-white'
              : 'bg-black/40 text-white border-white/10 hover:bg-black/60'
          }`}
        >
          {isScrapped ? <BookmarkCheck size={22} /> : <Bookmark size={22} />}
        </button>
      </div>

      {/* 캐릭터 이미지 — 배경 앞, 대화박스 뒤 */}
      <div className="absolute inset-0 z-10 flex items-end justify-center">
        {/* marginBottom을 줄여서 캐릭터를 아래로 내림 → 말풍선과의 빈 공간 제거 */}
        <div className="relative w-full max-w-sm" style={{ height: '80%', marginBottom: '160px' }}>
          {!imgError ? (
            <>
              {/* char.png */}
              <motion.img
                key={character.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                src={character.image}
                alt={character.name}
                className="w-full h-full object-contain object-bottom drop-shadow-2xl pointer-events-none"
                onError={() => setImgError(true)}
              />
              {/* blink.png — char.png와 동일 크기/위치로 겹침, 깜빡임 타이밍에만 보임 */}
              <img
                src="/blink.png"
                alt=""
                aria-hidden="true"
                className="absolute pointer-events-none transition-opacity object-contain"
                style={{
                  top: '41%',
                  left: '33%',
                  width: '32%',
                  height: 'auto',
                  opacity: isBlinking ? 1 : 0,
                  transitionDuration: isBlinking ? '30ms' : '60ms',
                }}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-end justify-center pb-4">
              <div className="w-48 h-64 bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center">
                <span className="text-white/20 text-6xl font-black">{character.name[0]}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 하단 대화 박스 — UI 이미지 구조 그대로 */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-6 pt-2">
        <div
          className="relative bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl"
          onClick={handleNext}
          style={{ cursor: canAdvance ? 'pointer' : 'default' }}
        >
          {/* 이름 태그 */}
          <div className="absolute -top-5 left-5 z-30">
            <div className="bg-black px-4 py-1.5 rounded-full shadow-lg">
              <span className="text-white font-black text-sm tracking-tight">
                {character.name} <span className="text-white/40 font-medium">/ {character.age}</span>
              </span>
            </div>
          </div>

          <div className="pt-8 px-6 pb-4">
            {/* 대화 텍스트 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="min-h-[80px] flex items-start"
              >
                <p className="text-black text-[16px] font-bold leading-relaxed tracking-tight">
                  {displayedText}
                  {isTyping && (
                    <span className="inline-block w-0.5 h-4 bg-black ml-0.5 animate-pulse align-middle" />
                  )}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* 퀴즈 선택지 */}
            {currentDialogue.type === 'quiz' && !isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 gap-2 mt-3 mb-1"
                onClick={(e) => e.stopPropagation()}
              >
                {currentDialogue.quizOptions?.map((option, idx) => {
                  const isCorrect = idx === currentDialogue.quizAnswer;
                  const isSelected = selectedOption === idx;
                  let btnStyle = 'bg-black/5 text-black border-black/10 hover:bg-black/10';
                  if (quizDone) {
                    if (isCorrect) btnStyle = 'bg-black text-white border-black';
                    else if (isSelected) btnStyle = 'bg-red-100 text-red-500 border-red-200';
                    else btnStyle = 'bg-black/5 text-black/30 border-black/5';
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizSelect(idx)}
                      className={`py-2.5 px-3 rounded-xl border text-sm font-bold transition-all text-left ${btnStyle}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </motion.div>
            )}

            {/* 하단: 힌트 텍스트 + 넥스트 버튼 */}
            <div className="flex items-center justify-between mt-3">
              <span className="text-black/20 text-[11px] font-bold">
                {isTyping
                  ? '탭하면 빠르게 볼 수 있어요'
                  : currentDialogue.type === 'quiz' && !quizDone
                  ? '답을 선택해주세요'
                  : isLastStep
                  ? '탭해서 대화 마치기'
                  : '탭해서 다음으로'}
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                disabled={currentDialogue.type === 'quiz' && !quizDone && !isTyping}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                  canAdvance
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-black/10 text-black/20'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3 8l10 0M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </motion.button>
            </div>
          </div>

          {/* 진행 바 */}
          <div className="h-1 bg-black/5">
            <motion.div
              className="h-full bg-black"
              animate={{ width: `${((step + 1) / character.dialogues.length) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
