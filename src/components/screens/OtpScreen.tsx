import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';

export const OtpScreen: React.FC = () => {
  const { navigateTo, t, loginUser } = useApp();
  const [otp, setOtp] = useState(['5', '2', '8', '1', '9', '4']);
  const [timer, setTimer] = useState(45);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser('+91 98480 22341');
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <Header showBack title={t('verifyNumber')} />

      <div className="flex-1 flex flex-col justify-between p-6">
        <div className="my-auto max-w-sm w-full mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-xl font-bold text-[#17324D] tracking-tight">
              {t('verifyNumber')}
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              {t('enterCode')}
            </p>
            <p className="text-sm font-semibold text-slate-800 mt-1">
              +91 98480 22341
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            {/* 6 OTP boxes */}
            <div className="flex items-center justify-between gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  className="w-11 h-13 text-center text-xl font-bold rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:border-[#168C83] focus:ring-1 focus:ring-[#168C83] bg-slate-50 focus:bg-white transition-all"
                  required
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
              {timer > 0 ? (
                <span>Resend code in <strong className="text-slate-700">{timer}s</strong></span>
              ) : (
                <button
                  type="button"
                  onClick={() => setTimer(45)}
                  className="text-[#168C83] font-medium hover:underline"
                >
                  {t('resendCode')}
                </button>
              )}

              <button
                type="button"
                onClick={() => navigateTo('login')}
                className="text-slate-600 hover:text-slate-900 font-medium"
              >
                {t('changeNumber')}
              </button>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white font-medium text-sm rounded-xl flex items-center justify-center transition-colors shadow-xs"
            >
              {t('verifyContinue')}
            </button>
          </form>
        </div>

        <div className="text-center text-xs text-slate-400">
          CareConnect Secure Workforce Authentication
        </div>
      </div>
    </div>
  );
};
