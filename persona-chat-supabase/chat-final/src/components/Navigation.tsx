import React from 'react';
import { Home, Wallet, Bookmark, User, MessageCircle } from 'lucide-react';
import { View } from '../types';

interface NavigationProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

export default function Navigation({ activeView, onViewChange }: NavigationProps) {
  const tabs: { id: string; icon: React.ElementType; isMain?: boolean }[] = [
    { id: 'home', icon: Home },
    { id: 'credit', icon: Wallet },
    { id: 'select', icon: MessageCircle, isMain: true },
    { id: 'scrap', icon: Bookmark },
    { id: 'profile', icon: User },
  ];

  return (
    <nav className="flex justify-around items-center h-20 bg-black border-t border-white/5 px-4 pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onViewChange(tab.id as View)}
          className={`flex items-center justify-center transition-all ${
            tab.isMain ? 'w-20' : 'w-12'
          } ${
            activeView === tab.id ? 'text-white' : 'text-white/20'
          } hover:text-white`}
        >
          <div className={`${
            tab.isMain
              ? `p-3 rounded-2xl border-2 ${activeView === tab.id ? 'border-white bg-white text-black' : 'border-white/10 bg-white/5'}`
              : 'p-2'
          } transition-all duration-300`}>
            <tab.icon size={tab.isMain ? 24 : 22} strokeWidth={activeView === tab.id ? 2.5 : 2} />
          </div>
        </button>
      ))}
    </nav>
  );
}
