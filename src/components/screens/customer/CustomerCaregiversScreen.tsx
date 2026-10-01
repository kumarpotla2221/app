import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';
import { CustomerBottomNav } from '../../common/CustomerBottomNav';
import { Avatar } from '../../common/Avatar';
import { 
  Search, 
  Star, 
  ShieldCheck, 
  MapPin, 
  ChevronRight, 
  Filter, 
  Check, 
  UserCheck 
} from 'lucide-react';
import { HirableCaregiver } from '../../../types';

export const CustomerCaregiversScreen: React.FC = () => {
  const { hirableCaregivers, setSelectedCaregiverId, updateHireDraft, navigateTo, setCustomerTab } = useApp();

  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState<'All' | 'Female' | 'Male'>('All');
  const [specializationFilter, setSpecializationFilter] = useState<string>('All');

  const filteredCaregivers = hirableCaregivers.filter((cg) => {
    const matchesSearch =
      cg.name.toLowerCase().includes(search.toLowerCase()) ||
      cg.locality.toLowerCase().includes(search.toLowerCase()) ||
      cg.specializations.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchesGender = genderFilter === 'All' || cg.gender === genderFilter;
    const matchesSpec =
      specializationFilter === 'All' ||
      cg.specializations.some((s) => s.toLowerCase().includes(specializationFilter.toLowerCase()));
    return matchesSearch && matchesGender && matchesSpec;
  });

  const handleOpenProfile = (cg: HirableCaregiver) => {
    setSelectedCaregiverId(cg.id);
    updateHireDraft({ selectedCaregiverId: cg.id });
    navigateTo('customer_caregiver_profile');
  };

  const handleHireDirect = (cg: HirableCaregiver, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCaregiverId(cg.id);
    updateHireDraft({ selectedCaregiverId: cg.id });
    setCustomerTab('hire');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header title="Verified Caregivers Directory" />

      {/* Search and Filters Header */}
      <div className="bg-white px-4 pt-3 pb-2.5 border-b border-slate-200 space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search caregiver name, locality, or skill..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#168C83]"
          />
        </div>

        {/* Gender Filter Chips */}
        <div className="flex items-center justify-between gap-1 text-xs">
          <div className="flex gap-1.5">
            {(['All', 'Female', 'Male'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGenderFilter(g)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  genderFilter === g
                    ? 'bg-[#168C83] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {g === 'All' ? 'All Genders' : `${g} Caregivers`}
              </button>
            ))}
          </div>

          <span className="text-[11px] text-slate-400 font-medium">
            {filteredCaregivers.length} Available
          </span>
        </div>
      </div>

      {/* Caregiver List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredCaregivers.map((cg) => {
          const avatarType = cg.gender === 'Female' ? 'caregiver' : 'contact';

          return (
            <div
              key={cg.id}
              onClick={() => handleOpenProfile(cg)}
              className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors shadow-2xs cursor-pointer space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Avatar type={avatarType} name={cg.name} size="md" isVerified />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-[#17324D]">{cg.name}</h3>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active in Rajahmundry" />
                    </div>
                    <p className="text-xs text-[#168C83] font-medium mt-0.5">{cg.role}</p>
                    <p className="text-[11px] text-slate-500">{cg.experienceYears} Years Exp · {cg.languages.join(' · ')}</p>

                    <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{cg.rating}</span>
                      <span className="text-slate-400 font-normal">({cg.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-bold font-mono text-slate-900">
                    ₹{cg.ratePerDay8h}
                  </span>
                  <span className="text-[10px] text-slate-400 block">/ 8h shift</span>
                </div>
              </div>

              {/* Specialization Tags */}
              <div className="flex flex-wrap gap-1">
                {cg.specializations.map((spec, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Action and Verification Footnote */}
              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-emerald-800 font-medium text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#168C83]" />
                  <span>Police Verified · Rajahmundry</span>
                </div>

                <button
                  onClick={(e) => handleHireDirect(cg, e)}
                  className="px-3.5 py-1.5 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
                >
                  Hire Caregiver
                </button>
              </div>
            </div>
          );
        })}

        {filteredCaregivers.length === 0 && (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
            <p className="text-xs text-slate-500">No caregivers found matching your filters.</p>
          </div>
        )}
      </div>

      <CustomerBottomNav />
    </div>
  );
};
