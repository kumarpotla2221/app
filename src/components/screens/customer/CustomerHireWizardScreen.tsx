import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';
import { Avatar } from '../../common/Avatar';
import { 
  Check, 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  IndianRupee, 
  ArrowRight,
  User,
  Heart,
  FileText
} from 'lucide-react';
import { HireWizardDraft } from '../../../context/AppContext';

export const CustomerHireWizardScreen: React.FC = () => {
  const { 
    services, 
    hirableCaregivers, 
    hireDraft, 
    updateHireDraft, 
    submitHireBooking, 
    navigateTo 
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const selectedService = services.find((s) => s.id === hireDraft.serviceId) || services[0];
  const selectedCaregiver = hirableCaregivers.find((c) => c.id === hireDraft.selectedCaregiverId) || hirableCaregivers[0];

  const dailyRate =
    hireDraft.shiftType === '12h_day' || hireDraft.shiftType === '12h_night'
      ? selectedService.rates.shift12h
      : selectedService.rates.shift8h;

  const totalCost = dailyRate * hireDraft.durationDays;

  const toggleTask = (taskName: string) => {
    const current = hireDraft.tasksRequired;
    if (current.includes(taskName)) {
      updateHireDraft({ tasksRequired: current.filter((t) => t !== taskName) });
    } else {
      updateHireDraft({ tasksRequired: [...current, taskName] });
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((s) => (s + 1) as any);
    } else {
      submitHireBooking();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header
        showBack
        title="Hire a Caregiver"
        subtitle={`Step ${step} of 3 · ${step === 1 ? 'Patient Details' : step === 2 ? 'Schedule & Shift' : 'Caregiver & Review'}`}
      />

      {/* Progress Bar */}
      <div className="bg-white px-4 py-2 border-b border-slate-200">
        <div className="flex gap-1.5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              step >= 1 ? 'w-1/3 bg-[#168C83]' : 'w-0'
            }`}
          />
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              step >= 2 ? 'w-1/3 bg-[#168C83]' : 'w-0'
            }`}
          />
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              step >= 3 ? 'w-1/3 bg-[#168C83]' : 'w-0'
            }`}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* STEP 1: PATIENT & CARE NEEDS */}
        {step === 1 && (
          <div className="space-y-4">
            {/* Service Selection */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Selected Care Service
              </label>
              <select
                value={hireDraft.serviceId}
                onChange={(e) => updateHireDraft({ serviceId: e.target.value })}
                className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83] bg-white text-slate-800"
              >
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} (From ₹{s.startingPrice}/shift)
                  </option>
                ))}
              </select>
            </div>

            {/* Patient Personal Information */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Who Needs Care?
              </h3>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Patient Full Name
                </label>
                <input
                  type="text"
                  value={hireDraft.patientName}
                  onChange={(e) => updateHireDraft({ patientName: e.target.value })}
                  placeholder="e.g. Lakshmi Devi"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Age</label>
                  <input
                    type="number"
                    value={hireDraft.patientAge}
                    onChange={(e) => updateHireDraft({ patientAge: e.target.value })}
                    placeholder="72"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Gender</label>
                  <select
                    value={hireDraft.patientGender}
                    onChange={(e) => updateHireDraft({ patientGender: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83] bg-white"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Health Condition & Mobility Details
                </label>
                <textarea
                  rows={2}
                  value={hireDraft.conditionSummary}
                  onChange={(e) => updateHireDraft({ conditionSummary: e.target.value })}
                  placeholder="e.g. Diabetic, mild arthritis, walks with four-legged walker, needs help in washroom..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
                />
              </div>
            </div>

            {/* Location in Rajahmundry */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Home Address in Rajahmundry
              </h3>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Locality / Landmark</label>
                <input
                  type="text"
                  value={hireDraft.locality}
                  onChange={(e) => updateHireDraft({ locality: e.target.value })}
                  placeholder="e.g. Tilak Road, Near Venkateswara Temple"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Door & House Address</label>
                <input
                  type="text"
                  value={hireDraft.address}
                  onChange={(e) => updateHireDraft({ address: e.target.value })}
                  placeholder="e.g. Door 14-8-3, Tilak Road, Rajahmundry"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: SHIFT & SCHEDULE */}
        {step === 2 && (
          <div className="space-y-4">
            {/* Shift Type */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Choose Daily Shift Timing
              </label>

              <div className="space-y-2">
                {[
                  { id: '8h_day', title: '8-Hour Day Shift', timing: '8:00 AM – 4:00 PM', rate: selectedService.rates.shift8h },
                  { id: '12h_day', title: '12-Hour Day Shift', timing: '8:00 AM – 8:00 PM', rate: selectedService.rates.shift12h },
                  { id: '12h_night', title: '12-Hour Night Shift', timing: '8:00 PM – 8:00 AM', rate: selectedService.rates.shift12h },
                  { id: '24h_livein', title: '24-Hour Live-In Attendant', timing: 'Full Day & Night Bedside Care', rate: selectedService.rates.shift12h * 1.5 },
                ].map((s) => (
                  <div
                    key={s.id}
                    onClick={() => updateHireDraft({ shiftType: s.id as any })}
                    className={`p-3 rounded-xl border cursor-pointer transition-colors flex items-center justify-between ${
                      hireDraft.shiftType === s.id
                        ? 'border-[#168C83] bg-teal-50/50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          hireDraft.shiftType === s.id ? 'border-[#168C83] bg-[#168C83]' : 'border-slate-300'
                        }`}>
                          {hireDraft.shiftType === s.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                        <h4 className="text-xs font-bold text-slate-800">{s.title}</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 ml-5 mt-0.5">{s.timing}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold font-mono text-slate-900">₹{s.rate.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-400 block">/ day</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Duration Selector */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Booking Duration
              </label>

              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                {[
                  { days: 1, label: '1 Day', sub: 'Trial Shift' },
                  { days: 7, label: '7 Days', sub: '1 Week' },
                  { days: 15, label: '15 Days', sub: 'Fortnight' },
                  { days: 30, label: '30 Days', sub: 'Monthly' },
                ].map((d) => (
                  <button
                    key={d.days}
                    type="button"
                    onClick={() => updateHireDraft({ durationDays: d.days })}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      hireDraft.durationDays === d.days
                        ? 'bg-[#168C83] text-white border-[#168C83] shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <strong className="block text-sm font-bold">{d.label}</strong>
                    <span className={`text-[10px] ${hireDraft.durationDays === d.days ? 'text-teal-100' : 'text-slate-400'}`}>
                      {d.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Start Date */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                When Should Care Begin?
              </label>
              <input
                type="date"
                value={hireDraft.startDate}
                onChange={(e) => updateHireDraft({ startDate: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
              />
            </div>
          </div>
        )}

        {/* STEP 3: CAREGIVER SELECTION & FINAL REVIEW */}
        {step === 3 && (
          <div className="space-y-4">
            {/* Preferred Caregiver Selector */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Caregiver
              </label>

              <div className="space-y-2">
                {hirableCaregivers.map((cg) => (
                  <div
                    key={cg.id}
                    onClick={() => updateHireDraft({ selectedCaregiverId: cg.id })}
                    className={`p-3 rounded-xl border cursor-pointer transition-colors flex items-center justify-between ${
                      hireDraft.selectedCaregiverId === cg.id
                        ? 'border-[#168C83] bg-teal-50/40 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar
                        type={cg.gender === 'Female' ? 'caregiver' : 'contact'}
                        name={cg.name}
                        size="sm"
                        isVerified
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{cg.name}</h4>
                        <p className="text-[11px] text-slate-500">{cg.role} · {cg.rating}★</p>
                      </div>
                    </div>

                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      hireDraft.selectedCaregiverId === cg.id ? 'bg-[#168C83] text-white' : 'text-slate-500'
                    }`}>
                      {hireDraft.selectedCaregiverId === cg.id ? 'Selected' : 'Select'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Family Contact Information */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Family Representative Contact
              </h3>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={hireDraft.contactName}
                  onChange={(e) => updateHireDraft({ contactName: e.target.value })}
                  placeholder="e.g. Priya Kumar"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Mobile Phone (For Daily Updates)</label>
                <input
                  type="tel"
                  value={hireDraft.contactPhone}
                  onChange={(e) => updateHireDraft({ contactPhone: e.target.value })}
                  placeholder="+91 98492 11029"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
                />
              </div>
            </div>

            {/* Transparent Bill Calculation */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Transparent Pricing Breakdown
              </h3>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Shift Rate ({hireDraft.shiftType.replace('_', ' ')}):</span>
                  <span className="font-mono">₹{dailyRate.toLocaleString()} / day</span>
                </div>
                <div className="flex justify-between">
                  <span>Booking Duration:</span>
                  <span className="font-mono">{hireDraft.durationDays} Days</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Clinical Lead Supervision & Replacement:</span>
                  <span>Included Free</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                  <span>Estimated Total Payout:</span>
                  <span className="text-[#168C83] font-mono text-base">₹{totalCost.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Action Footer */}
      <div className="p-4 bg-white border-t border-slate-200 shadow-md flex gap-2">
        {step > 1 && (
          <button
            onClick={() => setStep((s) => (s - 1) as any)}
            className="h-12 px-4 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Back
          </button>
        )}

        <button
          onClick={handleNext}
          className="flex-1 h-12 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          <span>{step === 3 ? 'Confirm & Hire Caregiver' : 'Continue to Next Step'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
