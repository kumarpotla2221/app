import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { CustomerBottomNav } from '../../common/CustomerBottomNav';
import { Avatar } from '../../common/Avatar';
import { 
  HeartHandshake, 
  MapPin, 
  Search, 
  ShieldCheck, 
  Star, 
  Clock, 
  ArrowRight, 
  CalendarPlus, 
  Phone, 
  ChevronRight,
  Activity,
  UserCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { CareService, HirableCaregiver } from '../../../types';

export const CustomerHomeScreen: React.FC = () => {
  const { 
    services, 
    hirableCaregivers, 
    hireBookings, 
    navigateTo, 
    setSelectedServiceId, 
    setSelectedCaregiverId,
    updateHireDraft,
    setCustomerTab,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const activeBooking = hireBookings.find((b) => b.status === 'active_today') || hireBookings[0];

  const handleSelectService = (service: CareService) => {
    setSelectedServiceId(service.id);
    updateHireDraft({ serviceId: service.id });
    navigateTo('customer_services');
  };

  const handleHireDirect = (service: CareService) => {
    setSelectedServiceId(service.id);
    updateHireDraft({ serviceId: service.id });
    setCustomerTab('hire');
  };

  const handleSelectCaregiver = (cg: HirableCaregiver) => {
    setSelectedCaregiverId(cg.id);
    updateHireDraft({ selectedCaregiverId: cg.id });
    navigateTo('customer_caregiver_profile');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      {/* Top Customer App Header */}
      <div className="bg-white px-4 pt-3.5 pb-3 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#E7F5F1] text-[#168C83] flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#17324D] tracking-tight block">
                CareConnect
              </span>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                <MapPin className="w-3 h-3 text-[#168C83]" />
                <span className="truncate">Rajahmundry & Godavari</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Connecting to 24/7 Home Care Advisor: 1800 200 4880')}
              className="h-8 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#168C83]" />
              <span>Call Advisor</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-3 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search elderly care, attendant, or nurse in Rajahmundry..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#168C83]"
          />
        </div>
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* ACTIVE FAMILY CARE TRACKER (If patient has active shift) */}
        {activeBooking && activeBooking.status === 'active_today' && (
          <div className="bg-[#17324D] text-white p-4 rounded-2xl shadow-sm border border-slate-700/60">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-700/60">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  Care in Progress Now
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-300">
                Tilak Road, Rajahmundry
              </span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Patient: <strong className="text-white">{activeBooking.patientName} (72 yrs)</strong></p>
                <p className="text-xs text-slate-200 mt-0.5">
                  Caregiver: <strong className="text-emerald-300">{activeBooking.caregiverName}</strong> ({activeBooking.caregiverRole})
                </p>
                {activeBooking.latestVitals && (
                  <p className="text-[11px] font-mono text-slate-300 mt-1">
                    Latest Vitals: BP {activeBooking.latestVitals.bp} · Pulse {activeBooking.latestVitals.pulse} bpm
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => setCustomerTab('active_care')}
              className="w-full h-10 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <Activity className="w-4 h-4" />
              <span>View Real-Time Care Log & Vitals</span>
            </button>
          </div>
        )}

        {/* HERO BOOKING BANNER */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-start justify-between">
            <div className="max-w-[240px]">
              <span className="text-[11px] font-semibold text-[#168C83] uppercase tracking-wider block">
                Professional In-Home Care
              </span>
              <h1 className="text-base font-bold text-[#17324D] mt-0.5 leading-snug">
                Hire Verified Caregivers & Attendants at Home
              </h1>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Trained for elderly assistance, post-surgery recovery, and bedridden patient support in Rajahmundry.
              </p>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#168C83] flex items-center justify-center shrink-0">
              <CalendarPlus className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              onClick={() => setCustomerTab('hire')}
              className="flex-1 h-11 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Book a Caregiver Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('customer_services')}
              className="h-11 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center transition-colors"
            >
              Plans & Rates
            </button>
          </div>
        </div>

        {/* POPULAR HOME CARE SERVICES */}
        <section>
          <div className="flex items-center justify-between mb-2.5 px-1">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Home Care Services
            </h2>
            <button
              onClick={() => navigateTo('customer_services')}
              className="text-xs font-semibold text-[#168C83] hover:underline"
            >
              View All Services
            </button>
          </div>

          <div className="space-y-2.5">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 pr-3" onClick={() => handleSelectService(srv)}>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-[#17324D] leading-tight">
                        {srv.title}
                      </h3>
                      {srv.popular && (
                        <span className="text-[10px] px-1.5 py-0.2 bg-teal-50 text-[#168C83] rounded font-semibold border border-teal-200">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {srv.description}
                    </p>
                    <div className="mt-2 text-xs font-mono font-bold text-[#168C83]">
                      From ₹{srv.startingPrice.toLocaleString()} <span className="text-[11px] font-sans font-normal text-slate-400">{srv.rateUnit}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleHireDirect(srv)}
                    className="h-9 px-3 bg-[#168C83] hover:bg-[#12726b] text-white text-xs font-semibold rounded-lg shrink-0 transition-colors"
                  >
                    Hire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* VERIFIED CAREGIVERS IN RAJAHMUNDRY */}
        <section>
          <div className="flex items-center justify-between mb-2.5 px-1">
            <div>
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Verified Caregivers Near You
              </h2>
              <p className="text-[11px] text-slate-500">Available for immediate home assignments</p>
            </div>
            <button
              onClick={() => setCustomerTab('caregivers')}
              className="text-xs font-semibold text-[#168C83] hover:underline"
            >
              See All ({hirableCaregivers.length})
            </button>
          </div>

          <div className="space-y-3">
            {hirableCaregivers.slice(0, 2).map((cg) => (
              <div
                key={cg.id}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer"
                onClick={() => handleSelectCaregiver(cg)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Avatar
                      type={cg.gender === 'Female' ? 'caregiver' : 'contact'}
                      name={cg.name}
                      size="md"
                      isVerified
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-slate-900">{cg.name}</h3>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                          {cg.role.split(' ')[0]}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{cg.experienceYears} Years Experience · {cg.languages.join(', ')}</p>
                      <div className="flex items-center gap-1 text-xs font-semibold text-slate-700 mt-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{cg.rating}</span>
                        <span className="text-slate-400 font-normal">({cg.reviewsCount} family reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold font-mono text-[#168C83]">
                      ₹{cg.ratePerDay8h}
                    </span>
                    <span className="text-[10px] text-slate-400 block">/ 8h shift</span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-emerald-800 font-medium text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#168C83]" />
                    <span>Police & Medical Verified</span>
                  </div>

                  <span className="text-xs font-semibold text-[#168C83] flex items-center gap-0.5">
                    <span>View Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CLINICAL TRUST & SAFETY PROTOCOL */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Why Families Trust CareConnect
          </h3>
          <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-700">
            <div className="p-2.5 bg-slate-50 rounded-lg space-y-1">
              <ShieldCheck className="w-4 h-4 text-[#168C83]" />
              <strong className="block text-slate-800">100% Police Verified</strong>
              <p className="text-[11px] text-slate-500">Official background check by local law enforcement.</p>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg space-y-1">
              <UserCheck className="w-4 h-4 text-[#168C83]" />
              <strong className="block text-slate-800">Doctor Supervised</strong>
              <p className="text-[11px] text-slate-500">Care plans reviewed by clinical geriatric coordinators.</p>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg space-y-1">
              <Activity className="w-4 h-4 text-[#168C83]" />
              <strong className="block text-slate-800">Daily Digital Reports</strong>
              <p className="text-[11px] text-slate-500">Live app updates on vitals, meals, and medication.</p>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg space-y-1">
              <Sparkles className="w-4 h-4 text-[#168C83]" />
              <strong className="block text-slate-800">Free Replacement</strong>
              <p className="text-[11px] text-slate-500">If staff is unwell or mismatched, prompt backup guaranteed.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Bottom Navigation */}
      <CustomerBottomNav />
    </div>
  );
};
