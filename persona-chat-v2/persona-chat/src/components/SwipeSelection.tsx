import { Character } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronRight, ChevronLeft, Heart, X } from 'lucide-react';

interface SwipeSelectionProps {
  characters: Character[];
  onSelect: (character: Character) => void;
}

export default function SwipeSelection({ characters, onSelect }: SwipeSelectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % characters.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + characters.length) % characters.length);
  };

  const currentCharacter = characters[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 overflow-hidden">
      <h2 className="mb-6 text-xl font-bold text-white tracking-tight">친구를 선택하세요</h2>
      
      <div className="relative w-full max-w-[300px] aspect-[3/4.2]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentCharacter.id}
            initial={{ opacity: 0, scale: 0.9, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -100 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={() => onSelect(currentCharacter)}
            className="absolute inset-0 bg-[#111] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl cursor-pointer group"
          >
            <img
              src={currentCharacter.image}
              alt={currentCharacter.name}
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-3xl font-bold text-white">
                {currentCharacter.name} <span className="text-lg font-normal opacity-50 ml-1">{currentCharacter.age}</span>
              </h3>
              <p className="mt-2 text-sm text-gray-400 line-clamp-2 leading-relaxed">
                {currentCharacter.bio}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center mt-12 space-x-4">
        <button 
          onClick={handlePrev}
          className="p-5 transition-all bg-white/5 border border-white/10 rounded-full hover:bg-white/10 text-white"
        >
          <ChevronLeft size={20} />
        </button>
        
        <button 
          onClick={() => onSelect(currentCharacter)}
          className="flex items-center px-10 py-5 space-x-3 transition-all bg-white rounded-full hover:scale-105 active:scale-95 text-black font-bold shadow-xl shadow-white/5 z-50"
        >
          <Heart size={20} fill="black" />
          <span>선택하기</span>
        </button>

        <button 
          onClick={handleNext}
          className="p-5 transition-all bg-white/5 border border-white/10 rounded-full hover:bg-white/10 text-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
