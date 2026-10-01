import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Wifi, 
  Battery, 
  Signal, 
  Smartphone, 
  Maximize2, 
  Globe, 
  AlertCircle,
  ShieldCheck,
  Layers,
  HeartHandshake,
  Stethoscope,
  RefreshCw
} from 'lucide-react';
import { ScreenId } from '../../types';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  const { 
    appMode,
    setAppMode,
    deviceViewMode, 
    setDeviceViewMode, 
    language, 
    setLanguage, 
    currentScreen, 
    navigateTo,
    activeShift,
    caregiver
  } = useApp();

  const customerScreens: { id: ScreenId; label: string }[] = [
    { id: 'customer_home', label: '1. Explore & Hire Home Care' },
    { id: 'customer_services', label: '2. All Care Services & Rates' },
    { id: 'customer_caregivers', label: '3. Verified Caregivers Directory' },
    { id: 'customer_caregiver_profile', label: '4. Caregiver Bio & Reviews' },
    { id: 'customer_hire_wizard', label: '5. Hire Caregiver Booking Wizard' },
    { id: 'customer_booking_confirmation', label: '6. Booking Confirmed Receipt' },
    { id: 'customer_active_care', label: '7. Live Shift Care Stream & Vitals' },
    { id: 'customer_bookings_list', label: '8. Family Bookings History' },
  ];

  const caregiverScreens: { id: ScreenId; label: string }[] = [
    { id: 'home', label: 'Screen 6: Home Dashboard' },
    { id: 'schedule', label: 'Screen 7 & 23: Schedule' },
    { id: 'assignment_details', label: 'Screen 8: Assignment Details' },
    { id: 'navigation', label: 'Screen 9: Navigation' },
    { id: 'arrival', label: 'Screen 10: Arrival Confirmation' },
    { id: 'start_care', label: 'Screen 11: Start Care' },
    { id: 'care_plan', label: 'Screen 12: Care Plan' },
    { id: 'task_details', label: 'Screen 13: Task Details' },
    { id: 'vitals', label: 'Screen 14: Vital Readings' },
    { id: 'condition_check', label: 'Screen 15: Patient Check-In' },
    { id: 'daily_report', label: 'Screen 16: Daily Care Report' },
    { id: 'family_comm', label: 'Screen 17: Family Updates' },
    { id: 'care_update', label: 'Screen 18: Send Family Update' },
    { id: 'emergency', label: 'Screen 19: Emergency 112' },
    { id: 'incident_report', label: 'Screen 20: Incident Report' },
    { id: 'patients', label: 'Screen 21: Patients List' },
    { id: 'patient_profile', label: 'Screen 22: Patient Profile' },
    { id: 'availability', label: 'Screen 24: Availability' },
    { id: 'assignment_request', label: 'Screen 25: Assignment Request' },
    { id: 'active_shift', label: 'Screen 26: Active Shift' },
    { id: 'end_shift', label: 'Screen 27: End Shift' },
    { id: 'earnings', label: 'Screen 28: Earnings' },
    { id: 'payment_details', label: 'Screen 29: Payment Details' },
    { id: 'notifications', label: 'Screen 30: Notifications' },
    { id: 'support', label: 'Screen 31: Support' },
    { id: 'replacement_request', label: 'Screen 32: Replacement Request' },
    { id: 'profile', label: 'Screen 33: Caregiver Profile' },
    { id: 'training', label: 'Screen 34: Training & Certs' },
    { id: 'documents', label: 'Screen 5 & 35: Documents Verification' },
    { id: 'profile_edit', label: 'Screen 36: Edit Profile' },
    { id: 'settings', label: 'Screen 37: Settings' },
    { id: 'notification_settings', label: 'Screen 38: Notification Settings' },
    { id: 'empty_states', label: 'Screen 39: Empty States' },
    { id: 'error_states', label: 'Screen 40: Error States' },
    { id: 'location_permission', label: 'Screen 41: Location Permission' },
    { id: 'camera_permission', label: 'Screen 42: Camera Permission' },
    { id: 'shift_reminder', label: 'Screen 43: Shift Reminder' },
    { id: 'design_system', label: 'Screen 44: Design System' },
    { id: 'splash', label: 'Screen 1: Splash Screen' },
    { id: 'login', label: 'Screen 2: Caregiver Login' },
    { id: 'otp', label: 'Screen 3: OTP Verification' },
    { id: 'profile_setup', label: 'Screen 4: Profile Setup' },
  ];

  return (
    <div className="min-h-screen bg-[#0d1622] text-slate-100 flex flex-col items-center justify-start p-0 sm:p-4 md:p-6 lg:p-8">
      {/* Top Operations Inspection Bar (CareConnect Operations Suite) */}
      <header className="w-full max-w-5xl mb-4 px-4 py-2.5 bg-[#172334] border border-slate-700/60 rounded-xl hidden sm:flex items-center justify-between text-xs shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#168C83] animate-pulse" />
            <span className="font-semibold text-white tracking-tight">CareConnect</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-300">Home Care Platform</span>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 ml-2">
            <button
              onClick={() => setAppMode('customer')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                appMode === 'customer'
                  ? 'bg-[#168C83] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Family App (Hire Care)</span>
            </button>
            <button
              onClick={() => setAppMode('caregiver')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                appMode === 'caregiver'
                  ? 'bg-[#168C83] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Caregiver Field App</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Quick Screen Jumper */}
          <div className="flex items-center gap-1.5 bg-slate-800/90 px-2 py-1 rounded border border-slate-700">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={currentScreen}
              onChange={(e) => navigateTo(e.target.value as ScreenId)}
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer max-w-[190px] truncate"
              aria-label="Jump directly to screen"
            >
              <optgroup label="Family Hiring Screens" className="bg-slate-900 text-[#168C83] font-bold">
                {customerScreens.map((s) => (
                  <option key={s.id} value={s.id} className="bg-slate-900 text-slate-200 font-normal">
                    {s.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Caregiver Workforce Screens" className="bg-slate-900 text-sky-400 font-bold">
                {caregiverScreens.map((s) => (
                  <option key={s.id} value={s.id} className="bg-slate-900 text-slate-200 font-normal">
                    {s.label}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Language Switch */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#168C83]" />
            <span>{language === 'en' ? 'తెలుగు' : 'English'}</span>
          </button>

          {/* Device Frame Toggle */}
          <button
            onClick={() => setDeviceViewMode(deviceViewMode === 'device' ? 'full' : 'device')}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors"
            title={deviceViewMode === 'device' ? 'Expand to Full Screen' : 'Switch to 390x844 Mobile Frame'}
          >
            {deviceViewMode === 'device' ? (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Full View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#168C83]" />
                <span className="hidden xl:inline">Mobile Frame (390×844)</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main App Container */}
      <main
        className={`w-full transition-all duration-200 ${
          deviceViewMode === 'device'
            ? 'max-w-[390px] h-[844px] rounded-[48px] border-[8px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden relative flex flex-col bg-[#F8FAFC]'
            : 'max-w-2xl min-h-[844px] rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden relative flex flex-col bg-[#F8FAFC]'
        }`}
      >
        {/* Device Status Bar */}
        <div className="w-full bg-[#F8FAFC] text-slate-800 px-6 pt-2.5 pb-1 flex items-center justify-between text-[13px] font-semibold select-none shrink-0 z-40 border-b border-transparent">
          <span className="tracking-tight">9:41</span>
          
          {/* Dynamic Island / Speaker Pill */}
          <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto -mt-1 hidden sm:block shadow-inner" />

          <div className="flex items-center gap-1.5 text-slate-700">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Mobile View In-App Mode Banner (For Touch Screen Users) */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-1 flex items-center justify-between text-[11px] shrink-0 z-30">
          <span className="text-slate-600 font-medium">
            Mode: <strong className="text-[#17324D]">{appMode === 'customer' ? 'Family Hiring App' : 'Caregiver Field App'}</strong>
          </span>
          <button
            onClick={() => setAppMode(appMode === 'customer' ? 'caregiver' : 'customer')}
            className="text-[#168C83] font-bold hover:underline flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Switch to {appMode === 'customer' ? 'Caregiver App' : 'Family Hiring'}</span>
          </button>
        </div>

        {/* Dynamic App Content Body */}
        <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative bg-[#F8FAFC]">
          {children}
        </div>

        {/* Mobile Home Indicator Bar */}
        {deviceViewMode === 'device' && (
          <div className="w-full py-2 bg-[#F8FAFC] flex justify-center shrink-0 z-30">
            <div className="w-32 h-1 bg-slate-300 rounded-full" />
          </div>
        )}
      </main>
    </div>
  );
};
