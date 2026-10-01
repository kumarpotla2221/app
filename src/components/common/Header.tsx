import React from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, Bell, AlertTriangle } from 'lucide-react';
import { ScreenId } from '../../types';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  subtitle?: string;
  urgentNotice?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBack,
  rightAction,
  subtitle,
  urgentNotice = false,
}) => {
  const { goBack, navigateTo, notifications } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-4 h-14 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {showBack ? (
          <button
            onClick={handleBack}
            className="w-10 h-10 -ml-2 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors shrink-0"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        ) : null}

        <div className="min-w-0 flex-1">
          {title && (
            <h1 className="text-[17px] font-semibold text-[#17324D] truncate leading-tight">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-xs text-slate-500 truncate leading-tight mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {rightAction ? (
          rightAction
        ) : (
          <div className="flex items-center gap-1.5">
            {/* Quick Emergency 112 button */}
            {urgentNotice && (
              <button
                onClick={() => navigateTo('emergency')}
                className="w-9 h-9 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 flex items-center justify-center transition-colors"
                title="Emergency protocol"
                aria-label="Emergency protocol"
              >
                <AlertTriangle className="w-4 h-4" />
              </button>
            )}

            {/* Notifications trigger */}
            <button
              onClick={() => navigateTo('notifications')}
              className="w-10 h-10 rounded-lg text-slate-600 hover:bg-slate-100 active:bg-slate-200 flex items-center justify-center relative transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#168C83] ring-2 ring-white" />
              )}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
