import { motion } from 'motion/react';

interface RingProgressProps {
  current: number;
  total: number;
  size?: number;
  strokeWidth?: number;
}

export default function RingProgress({ 
  current, 
  total, 
  size = 200, 
  strokeWidth = 24 
}: RingProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(current / total, 1);
  const offset = circumference - percentage * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Background Circle */}
      <svg className="absolute" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
        />
      </svg>
      
      {/* Progress Circle */}
      <svg className="absolute -rotate-90" width={size} height={size}>
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#ffffff"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))" }}
        />
      </svg>

      <div className="flex flex-col items-center">
        <span className="text-5xl font-bold text-white tracking-tighter">{current}</span>
      </div>
    </div>
  );
}
