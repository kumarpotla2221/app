import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { 
  Navigation as NavIcon, 
  Phone, 
  MapPin, 
  Compass, 
  CornerUpRight, 
  CheckCircle2,
  Clock
} from 'lucide-react';

export const NavigationScreen: React.FC = () => {
  const { currentPatient, navigateTo, showToast, t } = useApp();
  const [isNavigating, setIsNavigating] = useState(false);

  const patient = currentPatient || {
    name: 'Lakshmi Devi',
    address: 'Door 14-8-3, Tilak Road, Rajahmundry',
    distanceKm: 4.2,
    estimatedTravelMins: 12,
  };

  const handleStartNavigation = () => {
    setIsNavigating(true);
    showToast('GPS navigation started via Rajahmundry Main Road');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title="Route to Patient" />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Vector Road Map View */}
        <div className="relative flex-1 bg-slate-200 overflow-hidden flex flex-col justify-between">
          {/* Stylized SVG Map of Rajahmundry layout */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="#e2e8f0" />
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* River Godavari graphic */}
            <path
              d="M -20,20 Q 80,180 120,380 T 160,600"
              fill="none"
              stroke="#93c5fd"
              strokeWidth="42"
              opacity="0.6"
            />
            <text x="30" y="240" fill="#3b82f6" fontSize="10" fontWeight="600" opacity="0.7" transform="rotate(70, 30, 240)">
              Godavari River
            </text>

            {/* Main roads */}
            <path d="M 0,120 L 390,140" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" />
            <path d="M 120,0 L 220,500" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
            <path d="M 180,130 L 320,400" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
            <path d="M 50,300 L 360,260" stroke="#ffffff" strokeWidth="9" strokeLinecap="round" />

            {/* Teal GPS route path */}
            <path
              d="M 140,100 L 200,135 L 240,240 L 290,270"
              fill="none"
              stroke="#168C83"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={isNavigating ? '8,4' : 'none'}
              className={isNavigating ? 'animate-pulse' : ''}
            />

            {/* Caregiver Start Marker */}
            <circle cx="140" cy="100" r="7" fill="#17324D" />
            <circle cx="140" cy="100" r="14" fill="#17324D" opacity="0.2" />

            {/* Destination Marker */}
            <circle cx="290" cy="270" r="8" fill="#168C83" />
            <circle cx="290" cy="270" r="16" fill="#168C83" opacity="0.2" />
          </svg>

          {/* Floating Directions Card at Top */}
          <div className="relative z-10 m-3 p-3 bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200 shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E7F5F1] text-[#168C83] flex items-center justify-center shrink-0">
                <CornerUpRight className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">
                  In 400m, turn right onto Tilak Road
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  Towards Venkateswara Temple, Rajahmundry
                </p>
              </div>
            </div>
          </div>

          {/* Floating GPS Recenter button */}
          <div className="relative z-10 m-3 self-end">
            <button
              onClick={() => showToast('Re-centering on your live GPS location')}
              className="w-10 h-10 rounded-full bg-white text-slate-700 shadow-md border border-slate-200 flex items-center justify-center hover:bg-slate-50"
              title="Recenter"
            >
              <Compass className="w-5 h-5 text-[#168C83]" />
            </button>
          </div>
        </div>

        {/* Lower Location Details Bottom Sheet */}
        <div className="bg-white p-4 border-t border-slate-200 space-y-3.5 shadow-lg shrink-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1 pr-2">
              <h3 className="text-sm font-bold text-[#17324D] truncate">
                {patient.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 truncate">
                {patient.address}
              </p>
            </div>

            <div className="text-right shrink-0">
              <div className="text-sm font-bold text-[#168C83]">
                4.2 km
              </div>
              <div className="text-xs text-slate-500 font-medium">
                ~12 min
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleStartNavigation}
              className={`h-11 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                isNavigating
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#168C83] hover:bg-[#12726b] text-white shadow-xs'
              }`}
            >
              <NavIcon className="w-4 h-4" />
              <span>{isNavigating ? 'Navigating Live...' : t('startNavigation')}</span>
            </button>

            <button
              onClick={() => navigateTo('family_comm')}
              className="h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-4 h-4 text-slate-600" />
              <span>{t('callPatientFamily')}</span>
            </button>
          </div>

          {/* Manual Arrive trigger for field simulation */}
          <button
            onClick={() => navigateTo('arrival')}
            className="w-full py-2 text-center text-xs font-semibold text-[#168C83] hover:underline flex items-center justify-center gap-1 border-t border-slate-100 pt-2.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Simulate Reached Patient Home (Arrival Confirmation)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
