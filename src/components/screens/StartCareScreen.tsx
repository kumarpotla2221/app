import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Avatar } from '../common/Avatar';
import { Clock, CheckSquare, ShieldCheck, Play, AlertCircle } from 'lucide-react';

export const StartCareScreen: React.FC = () => {
  const { currentPatient, currentAssignment, startCareShift, t } = useApp();
  const [hasAcknowledged, setHasAcknowledged] = useState(true);

  const patient = currentPatient || {
    name: 'Lakshmi Devi',
    age: 72,
    careType: 'Elderly Care',
    locality: 'Tilak Road, Rajahmundry',
  };

  const assignment = currentAssignment || {
    id: 'asg-today-01',
    timeRange: '8:00 AM – 4:00 PM',
  };

  const handleStart = () => {
    startCareShift(assignment.id);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title={t('startCareShift')} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Patient confirmation card */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <Avatar type="elderly_female" name={patient.name} size="md" />
            <div>
              <h2 className="text-base font-bold text-[#17324D]">{patient.name}</h2>
              <p className="text-xs text-slate-500">{patient.careType} · {patient.locality}</p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Shift Time: {assignment.timeRange}</span>
            </div>
            <span className="text-[#168C83] font-semibold">Scheduled: 8 Hours</span>
          </div>
        </div>

        {/* Assigned Tasks Summary */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Assigned Care Plan Tasks (10 Items)
          </h3>
          <ul className="text-xs text-slate-600 space-y-1.5">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#168C83]" />
              <span>Morning: Personal Hygiene, Breakfast, Medicine Reminder</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#168C83]" />
              <span>Midday: Mobility Support (Walker), Vital Signs Recording</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#168C83]" />
              <span>Afternoon: Lunch Support, Hydration, Comfort Monitoring</span>
            </li>
          </ul>
        </div>

        {/* Clinical Disclaimer & Caregiver Scope */}
        <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-[#168C83]" />
            <span>Caregiver Operating Standards</span>
          </div>
          <p className="leading-relaxed">
            I confirm that I will provide non-clinical attendant care, assist with prescribed medication reminders only, and report any medical deterioration or abnormal vitals immediately to CareConnect and family.
          </p>
        </div>

        {/* Acknowledgement Checkbox */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-start gap-3">
          <input
            id="acknowledge"
            type="checkbox"
            checked={hasAcknowledged}
            onChange={(e) => setHasAcknowledged(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded text-[#168C83] focus:ring-[#168C83] cursor-pointer"
          />
          <label htmlFor="acknowledge" className="text-xs text-slate-700 leading-snug cursor-pointer select-none">
            I have met the patient/family, reviewed the care requirements, and am ready to begin the care shift.
          </label>
        </div>
      </div>

      {/* Start Button */}
      <div className="p-4 bg-white border-t border-slate-200">
        <button
          onClick={handleStart}
          disabled={!hasAcknowledged}
          className={`w-full h-12 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs ${
            hasAcknowledged
              ? 'bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Play className="w-4 h-4 fill-current" />
          <span>{t('startCareShift')}</span>
        </button>
      </div>
    </div>
  );
};
