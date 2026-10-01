import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Globe } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { navigateTo, language, setLanguage, t, loginUser } = useApp();
  const [mobileNumber, setMobileNumber] = useState('98480 22341');
  const [password, setPassword] = useState('••••••••');
  const [useOtpMode, setUseOtpMode] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (useOtpMode) {
      navigateTo('otp');
    } else {
      loginUser(mobileNumber);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-white select-none">
      {/* Top language toggle */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-[#168C83]" />
          <span>Staff Portal</span>
        </div>

        <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
          <button
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              language === 'en' ? 'bg-white text-[#17324D] shadow-xs' : 'text-slate-600'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('te')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              language === 'te' ? 'bg-white text-[#17324D] shadow-xs' : 'text-slate-600'
            }`}
          >
            తెలుగు
          </button>
        </div>
      </div>

      {/* Main Login Form */}
      <div className="my-auto max-w-sm w-full mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#17324D] tracking-tight">
            {t('welcomeBack')}
          </h1>
          <p className="text-sm text-slate-500 mt-1.5">
            {t('signInSubtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              {t('mobileNumber')}
            </label>
            <div className="flex rounded-xl border border-slate-300 focus-within:border-[#168C83] focus-within:ring-1 focus-within:ring-[#168C83] overflow-hidden bg-white">
              <span className="inline-flex items-center px-3.5 bg-slate-50 text-slate-600 border-r border-slate-200 text-sm font-medium">
                +91
              </span>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="XXXXX XXXXX"
                className="w-full px-3.5 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                required
              />
            </div>
          </div>

          {!useOtpMode && (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-medium text-slate-700">
                  {t('password')}
                </label>
                <button
                  type="button"
                  className="text-xs text-[#168C83] hover:underline"
                  onClick={() => setUseOtpMode(true)}
                >
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-3.5 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#168C83] focus:ring-1 focus:ring-[#168C83]"
                required
              />
            </div>
          )}

          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              className="w-full h-12 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white font-medium text-sm rounded-xl flex items-center justify-center transition-colors shadow-xs"
            >
              {useOtpMode ? t('loginOtp') : t('continue')}
            </button>

            <button
              type="button"
              onClick={() => setUseOtpMode(!useOtpMode)}
              className="w-full h-11 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium text-xs rounded-xl flex items-center justify-center transition-colors"
            >
              {useOtpMode ? 'Sign in with Password instead' : t('loginOtp')}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigateTo('profile_setup')}
            className="text-xs text-[#168C83] font-medium hover:underline"
          >
            New caregiver? Complete registration setup
          </button>
        </div>
      </div>

      {/* Footer Legal */}
      <div className="text-center pt-4 border-t border-slate-100">
        <p className="text-[11px] text-slate-400 leading-relaxed">
          {t('termsPrivacy')}
        </p>
      </div>
    </div>
  );
};
