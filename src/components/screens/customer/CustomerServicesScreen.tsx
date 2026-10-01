import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';
import { CustomerBottomNav } from '../../common/CustomerBottomNav';
import { Check, ShieldCheck, Clock, ArrowRight, IndianRupee } from 'lucide-react';
import { CareService } from '../../../types';

export const CustomerServicesScreen: React.FC = () => {
  const { services, selectedServiceId, setSelectedServiceId, updateHireDraft, setCustomerTab } = useApp();
  const [activeTab, setActiveTab] = useState(selectedServiceId || services[0].id);

  const selectedService = services.find((s) => s.id === activeTab) || services[0];

  const handleHireThis = () => {
    setSelectedServiceId(selectedService.id);
    updateHireDraft({ serviceId: selectedService.id });
    setCustomerTab('hire');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title="Home Care Services & Pricing" />

      {/* Service Category Selector Tabs */}
      <div className="bg-white px-4 py-2 border-b border-slate-200 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                activeTab === s.id
                  ? 'bg-[#168C83] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s.title.split('&')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Service Hero Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div>
            <span className="text-[11px] font-mono font-semibold text-[#168C83] uppercase tracking-wider block">
              Accredited In-Home Healthcare
            </span>
            <h2 className="text-lg font-bold text-[#17324D] mt-0.5">
              {selectedService.title}
            </h2>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {selectedService.description}
            </p>
          </div>

          {/* Pricing Tier Grid */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">8-Hour Day</span>
              <strong className="text-sm font-bold font-mono text-slate-900 mt-0.5 block">
                ₹{selectedService.rates.shift8h.toLocaleString()}
              </strong>
              <span className="text-[10px] text-slate-400">per shift</span>
            </div>

            <div className="p-2.5 bg-teal-50 rounded-xl border border-teal-200">
              <span className="text-[10px] text-[#168C83] uppercase font-semibold block">12-Hour Shift</span>
              <strong className="text-sm font-bold font-mono text-[#168C83] mt-0.5 block">
                ₹{selectedService.rates.shift12h.toLocaleString()}
              </strong>
              <span className="text-[10px] text-teal-700">day or night</span>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Monthly Plan</span>
              <strong className="text-sm font-bold font-mono text-slate-900 mt-0.5 block">
                ₹{selectedService.rates.monthlyPlan.toLocaleString()}
              </strong>
              <span className="text-[10px] text-emerald-700">Save 15%</span>
            </div>
          </div>
        </div>

        {/* Recommended For */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Ideal For
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {selectedService.recommendedFor.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#168C83] mt-1.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Included Tasks & Care Protocol */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Included Daily Care Tasks
          </h3>
          <ul className="space-y-2 text-xs text-slate-700">
            {selectedService.includedTasks.map((task, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{task}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Qualification Standards */}
        <div className="p-3.5 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-[#168C83]" />
            <span>Staff Qualification Standard</span>
          </div>
          <p className="leading-relaxed">
            Staff assigned: <strong>{selectedService.caregiverQualification}</strong>. All personnel are police-verified with health clearances.
          </p>
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="p-4 bg-white border-t border-slate-200 shadow-md">
        <button
          onClick={handleHireThis}
          className="w-full h-12 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          <span>Hire Caregiver for {selectedService.title.split('&')[0]}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <CustomerBottomNav />
    </div>
  );
};
