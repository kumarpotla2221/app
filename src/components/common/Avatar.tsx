import React from 'react';
import { User, ShieldCheck } from 'lucide-react';

interface AvatarProps {
  type: 'caregiver' | 'elderly_female' | 'elderly_male' | 'contact';
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isVerified?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  type,
  name,
  size = 'md',
  isVerified = false,
}) => {
  const sizeClasses = {
    sm: 'w-9 h-9 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-20 h-20 text-lg',
  };

  const getTheme = () => {
    switch (type) {
      case 'caregiver':
        return {
          bg: 'bg-[#E7F5F1] text-[#168C83] border-[#168C83]/30',
          initials: 'AK',
        };
      case 'elderly_female':
        return {
          bg: 'bg-amber-50 text-amber-900 border-amber-200',
          initials: 'LD',
        };
      case 'elderly_male':
        return {
          bg: 'bg-sky-50 text-sky-900 border-sky-200',
          initials: 'RK',
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-800 border-slate-200',
          initials: name.slice(0, 2).toUpperCase(),
        };
    }
  };

  const theme = getTheme();

  return (
    <div className="relative inline-block shrink-0">
      <div
        className={`${sizeClasses[size]} ${theme.bg} rounded-full border flex items-center justify-center font-semibold select-none shadow-xs`}
        title={name}
      >
        <span>{theme.initials}</span>
      </div>
      {isVerified && (
        <span
          className="absolute -bottom-0.5 -right-0.5 bg-[#168C83] text-white p-0.5 rounded-full ring-2 ring-white"
          title="CareConnect Verified"
        >
          <ShieldCheck className="w-3 h-3" />
        </span>
      )}
    </div>
  );
};
