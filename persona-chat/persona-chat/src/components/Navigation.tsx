import React from 'react';
import { Home, Wallet, Bookmark, User } from 'lucide-react';
import { View } from '../types';

interface NavigationProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

type Tab =
  | { id: string; icon: React.ElementType; isMain?: false }
  | { id: string; isMain: true };

export default function Navigation({ activeView, onViewChange }: NavigationProps) {
  const tabs: Tab[] = [
    { id: 'home', icon: Home },
    { id: 'credit', icon: Wallet },
    { id: 'select', isMain: true },
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
            !tab.isMain && activeView === tab.id ? 'text-white' : !tab.isMain ? 'text-white/20' : ''
          } hover:text-white`}
        >
          {tab.isMain ? (
            <div className={`p-[6px] rounded-2xl border-2 transition-all duration-300 ${
              activeView === tab.id
                ? 'border-white bg-white'
                : 'border-white/10 bg-white/5'
            }`}>
              <img
                src="/logo.png"
                alt="IMBY"
                className={`w-7 h-7 object-contain transition-all duration-300 ${
                  activeView === tab.id ? 'opacity-100' : 'opacity-40'
                }`}
              />
            </div>
          ) : (
            <div className="p-2 transition-all duration-300">
              {'icon' in tab && (
                <tab.icon
                  size={22}
                  strokeWidth={activeView === tab.id ? 2.5 : 2}
                />
              )}
            </div>
          )}
        </button>
      ))}
    </nav>
  );
}
