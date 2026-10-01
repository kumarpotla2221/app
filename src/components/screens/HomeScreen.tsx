import React from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { BottomNav } from '../common/BottomNav';
import { 
  Calendar, 
  Users, 
  FileCheck2, 
  Headphones, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Play, 
  StopCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { 
    caregiver, 
    isAvailable, 
    toggleAvailability, 
    activeShift, 
    assignments, 
    navigateTo, 
    setSelectedAssignmentId,
    setSelectedPatientId,
    endCareShift,
    t 
  } = useApp();

  const primaryAssignment = assignments[0]; // Lakshmi Devi

  // Format elapsed seconds to hh:mm:ss or hh:mm
  const formatElapsed = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hours.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  const handleOpenAssignment = () => {
    setSelectedAssignmentId(primaryAssignment.id);
    setSelectedPatientId(primaryAssignment.patientId);
    navigateTo('assignment_details');
  };

  const handleViewCarePlan = () => {
    setSelectedAssignmentId(primaryAssignment.id);
    setSelectedPatientId(primaryAssignment.patientId);
    navigateTo('care_plan');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      {/* Top Caregiver Header */}
      <div className="bg-white px-5 pt-4 pb-3.5 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0 pr-3">
            <h1 className="text-lg font-bold text-[#17324D] tracking-tight truncate">
              {t('greetingMorning')}
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {t('todayDate')}
            </p>
          </div>

          <button
            onClick={() => navigateTo('profile')}
            className="focus:outline-none"
            title="View Profile"
          >
            <Avatar type="caregiver" name={caregiver.name} size="md" isVerified />
          </button>
        </div>

        {/* Availability Toggle Strip */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isAvailable ? 'bg-emerald-500 ring-2 ring-emerald-100' : 'bg-slate-400'
              }`}
            />
            <span className="text-xs font-medium text-slate-700">
              {isAvailable ? t('availableStatus') : t('unavailableStatus')}
            </span>
          </div>

          <button
            onClick={toggleAvailability}
            className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-colors ${
              isAvailable
                ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {isAvailable ? 'Go Offline' : 'Go Online'}
          </button>
        </div>
      </div>

      {/* Scrollable Dashboard Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* SHIFT STATUS CARD (When Shift is Active) */}
        {activeShift?.isActive && (
          <div className="bg-[#17324D] text-white p-4 rounded-2xl shadow-sm border border-slate-700/60">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-semibold tracking-wide uppercase text-emerald-300">
                  {t('careShiftActive')}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-300">
                {t('started')} {activeShift.startedAt}
              </span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Patient in Care</p>
                <h2 className="text-base font-bold text-white mt-0.5">
                  Lakshmi Devi
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Elderly Care · Tilak Road, Rajahmundry
                </p>
              </div>

              <div className="text-right">
                <p className="text-[11px] text-slate-400">{t('elapsed')}</p>
                <p className="text-sm font-mono font-bold text-emerald-400 mt-0.5">
                  {formatElapsed(activeShift.elapsedSeconds)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/60">
              <button
                onClick={handleViewCarePlan}
                className="h-10 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>{t('viewCarePlan')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('end_shift')}
                className="h-10 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-rose-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-rose-900/40"
              >
                <StopCircle className="w-4 h-4 text-rose-400" />
                <span>{t('endShift')}</span>
              </button>
            </div>
          </div>
        )}

        {/* PRIMARY ASSIGNMENT CARD (Today's Care) */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              {t('todaysCare')}
            </h2>
            <button
              onClick={() => navigateTo('schedule')}
              className="text-xs font-semibold text-[#168C83] hover:underline"
            >
              Full Schedule
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar type="elderly_female" name={primaryAssignment.patientName} size="md" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-[#17324D] leading-tight">
                      {primaryAssignment.patientName}
                    </h3>
                    <span className="text-xs text-slate-500 font-normal">
                      · {primaryAssignment.patientAge} yrs
                    </span>
                  </div>
                  <p className="text-xs font-medium text-[#168C83] mt-0.5">
                    {primaryAssignment.careType}
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {activeShift?.isActive ? 'In Progress' : 'Upcoming'}
              </span>
            </div>

            <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{primaryAssignment.timeRange}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">Rajahmundry ({primaryAssignment.distanceKm} km)</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={handleOpenAssignment}
                className="flex-1 h-11 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span>{t('viewAssignment')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('navigation')}
                className="h-11 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                title="Navigate to patient"
              >
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>Directions</span>
              </button>
            </div>
          </div>
        </section>

        {/* QUICK ACTIONS (4 Practical Actions) */}
        <section>
          <h2 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
            Quick Operations
          </h2>

          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => navigateTo('schedule')}
              className="bg-white p-3 rounded-xl border border-slate-200 hover:border-slate-300 flex flex-col items-center justify-center text-center transition-colors min-h-[72px]"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#168C83] flex items-center justify-center mb-1.5">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium text-slate-700 leading-tight">
                Schedule
              </span>
            </button>

            <button
              onClick={() => navigateTo('patients')}
              className="bg-white p-3 rounded-xl border border-slate-200 hover:border-slate-300 flex flex-col items-center justify-center text-center transition-colors min-h-[72px]"
            >
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center mb-1.5">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium text-slate-700 leading-tight">
                Patients
              </span>
            </button>

            <button
              onClick={() => navigateTo('daily_report')}
              className="bg-white p-3 rounded-xl border border-slate-200 hover:border-slate-300 flex flex-col items-center justify-center text-center transition-colors min-h-[72px]"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-1.5">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium text-slate-700 leading-tight">
                Care Report
              </span>
            </button>

            <button
              onClick={() => navigateTo('support')}
              className="bg-white p-3 rounded-xl border border-slate-200 hover:border-slate-300 flex flex-col items-center justify-center text-center transition-colors min-h-[72px]"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center mb-1.5">
                <Headphones className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium text-slate-700 leading-tight">
                Support
              </span>
            </button>
          </div>
        </section>

        {/* TODAY'S SECOND ASSIGNMENT PREVIEW */}
        <section>
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                5:30
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  Ravi Kumar (68 yrs)
                </p>
                <p className="text-[11px] text-slate-500">
                  Hospital Assistance · 5:30 PM – 8:30 PM
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedAssignmentId('asg-today-02');
                setSelectedPatientId('pat-002');
                navigateTo('assignment_details');
              }}
              className="text-xs font-semibold text-[#168C83] hover:underline"
            >
              Details
            </button>
          </div>
        </section>

        {/* EMERGENCY 112 PROMINENT BAR */}
        <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-[#E5484D] shrink-0" />
            <span className="text-xs font-medium text-rose-900">
              Life-threatening emergency? Call 112
            </span>
          </div>
          <button
            onClick={() => navigateTo('emergency')}
            className="px-2.5 py-1 bg-[#E5484D] hover:bg-rose-700 text-white text-xs font-semibold rounded-md shadow-xs"
          >
            Emergency 112
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};
