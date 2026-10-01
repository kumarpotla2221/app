import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 max-w-[340px] w-full px-4 pointer-events-none animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="bg-[#17324D] text-white px-3.5 py-2.5 rounded-lg shadow-lg border border-slate-700/60 flex items-center gap-2 text-xs font-medium">
        <CheckCircle2 className="w-4 h-4 text-[#168C83] shrink-0" />
        <span className="flex-1 leading-snug">{toastMessage}</span>
      </div>
    </div>
  );
};
