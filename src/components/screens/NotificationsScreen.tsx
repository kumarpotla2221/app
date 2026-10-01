import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Bell, Calendar, IndianRupee, ShieldCheck, User, Headphones, Check } from 'lucide-react';
import { AppNotification } from '../../types';

export const NotificationsScreen: React.FC = () => {
  const { notifications, navigateTo } = useApp();
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', 'Assignments', 'Schedule', 'Payments', 'Verification'];

  const filteredNotifs = notifications.filter(
    (n) => filter === 'all' || n.category === filter
  );

  const getCategoryIcon = (cat: AppNotification['category']) => {
    switch (cat) {
      case 'Assignments':
      case 'Schedule':
        return <Calendar className="w-4 h-4 text-[#168C83]" />;
      case 'Payments':
        return <IndianRupee className="w-4 h-4 text-emerald-600" />;
      case 'Verification':
        return <ShieldCheck className="w-4 h-4 text-sky-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  const handleNotificationClick = (notif: AppNotification) => {
    if (notif.actionScreen) {
      navigateTo(notif.actionScreen);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title="Notifications" />

      {/* Filter Tabs */}
      <div className="bg-white px-4 py-2 border-b border-slate-200 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                filter === c
                  ? 'bg-[#168C83] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c === 'all' ? 'All Alerts' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Notification Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
        {filteredNotifs.map((n) => (
          <div
            key={n.id}
            onClick={() => handleNotificationClick(n)}
            className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
              n.read
                ? 'bg-white border-slate-200'
                : 'bg-teal-50/40 border-[#168C83]/30 shadow-2xs'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                {getCategoryIcon(n.category)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 truncate">
                    {n.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">
                    {n.timestamp}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {n.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
