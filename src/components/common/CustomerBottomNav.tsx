import React from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, Users, CalendarPlus, Activity, Clock } from 'lucide-react';
import { CustomerTabId } from '../../types';

export const CustomerBottomNav: React.FC = () => {
  const { customerTab, setCustomerTab } = useApp();

  const tabs: { id: CustomerTabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'caregivers', label: 'Caregivers', icon: Users },
    { id: 'hire', label: 'Hire Care', icon: CalendarPlus },
    { id: 'active_care', label: 'Live Care', icon: Activity },
    { id: 'bookings', label: 'Bookings', icon: Clock },
  ];

  return (
    <nav className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 shrink-0">
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = customerTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCustomerTab(tab.id)}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors relative ${
                isActive ? 'text-[#168C83]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#168C83]" />
                )}
              </div>
              <span className={`text-[11px] font-medium tracking-tight mt-1 truncate max-w-[64px] ${
                isActive ? 'font-semibold text-[#168C83]' : 'text-slate-600'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
