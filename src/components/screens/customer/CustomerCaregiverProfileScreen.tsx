import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';
import { Avatar } from '../../common/Avatar';
import { 
  Star, 
  ShieldCheck, 
  Award, 
  MapPin, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  ArrowRight,
  Phone,
  MessageSquare
} from 'lucide-react';

export const CustomerCaregiverProfileScreen: React.FC = () => {
  const { selectedCaregiver, updateHireDraft, setCustomerTab } = useApp();

  const cg = selectedCaregiver || {
    id: 'cg-anjali',
    name: 'Anjali Kumar',
    role: 'Verified Patient Care Assistant',
    qualification: 'Diploma in General Nursing & Midwifery (GNM)',
    experienceYears: 3,
    rating: 4.9,
    reviewsCount: 38,
    gender: 'Female',
    city: 'Rajahmundry',
    locality: 'Danavaipeta & Tilak Road',
    languages: ['Telugu', 'English'],
    specializations: ['Elderly Care', 'Diabetic Diet', 'Walker Mobility', 'Medication Reminders'],
    ratePerDay8h: 1800,
    ratePerDay12h: 2400,
    policeVerified: true,
    bio: 'Dedicated patient care assistant with hospital training at Government General Hospital Rajahmundry. Known for calm patience, attentive elderly hygiene assistance, and transparent communication with families.',
    reviews: [
      {
        id: 'rev-1',
        familyMember: 'Priya Kumar',
        patientRelation: 'Daughter of Lakshmi Devi (72 yrs)',
        rating: 5,
        comment: 'Anjali has been an absolute blessing for my mother. She handles morning walks with the walker very gently and keeps us updated on every meal and blood pressure reading.',
        date: '28 Sep 2026',
      }
    ]
  };

  const handleHireThis = () => {
    updateHireDraft({ selectedCaregiverId: cg.id });
    setCustomerTab('hire');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title="Caregiver Profile" />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Profile Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <div className="flex items-start gap-3.5">
            <Avatar
              type={cg.gender === 'Female' ? 'caregiver' : 'contact'}
              name={cg.name}
              size="lg"
              isVerified
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-bold text-[#17324D] truncate">{cg.name}</h2>
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active in Rajahmundry" />
              </div>
              <p className="text-xs font-semibold text-[#168C83] mt-0.5">{cg.role}</p>
              <p className="text-xs text-slate-500 mt-0.5">{cg.qualification}</p>

              <div className="mt-2 flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1 font-bold text-slate-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{cg.rating}</span>
                </div>
                <span className="text-slate-300">·</span>
                <span className="text-slate-600">{cg.experienceYears} Years Exp</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-600">{cg.languages.join(' · ')}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-600">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Serving: {cg.locality}, {cg.city}</span>
          </div>
        </div>

        {/* Verification Checkmarks */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Verified Background & Clinical Standards
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
            <div className="flex items-center gap-2 p-2 bg-emerald-50/60 rounded-lg text-emerald-900 border border-emerald-200/60">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium text-[11px]">Police Verified</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-emerald-50/60 rounded-lg text-emerald-900 border border-emerald-200/60">
              <Award className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium text-[11px]">Certified GNM / PCA</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-emerald-50/60 rounded-lg text-emerald-900 border border-emerald-200/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium text-[11px]">Medical Fitness Clear</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-emerald-50/60 rounded-lg text-emerald-900 border border-emerald-200/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium text-[11px]">Elder Safety Trained</span>
            </div>
          </div>
        </div>

        {/* Shift Rates */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Shift Rates
          </h3>
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block text-[11px]">8-Hour Day Shift</span>
              <strong className="text-base font-bold font-mono text-slate-900 mt-0.5 block">
                ₹{cg.ratePerDay8h.toLocaleString()}
              </strong>
              <span className="text-[10px] text-slate-400">8:00 AM – 4:00 PM</span>
            </div>
            <div className="p-3 bg-teal-50 rounded-xl border border-teal-200">
              <span className="text-[#168C83] block text-[11px] font-semibold">12-Hour Shift</span>
              <strong className="text-base font-bold font-mono text-[#168C83] mt-0.5 block">
                ₹{cg.ratePerDay12h.toLocaleString()}
              </strong>
              <span className="text-[10px] text-teal-700">Day or Night</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            About Caregiver
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            {cg.bio}
          </p>
        </div>

        {/* Verified Family Reviews */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Family Reviews ({cg.reviewsCount})
            </h3>
            <span className="text-xs font-semibold text-amber-600 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-current" />
              {cg.rating} Overall
            </span>
          </div>

          <div className="space-y-2.5">
            {cg.reviews?.map((r) => (
              <div key={r.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <div>
                    <strong className="text-slate-800 block">{r.familyMember}</strong>
                    <span className="text-[10px] text-slate-500">{r.patientRelation}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed">{r.comment}</p>
                <span className="text-[10px] text-slate-400 font-mono block">{r.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="p-4 bg-white border-t border-slate-200 shadow-md">
        <button
          onClick={handleHireThis}
          className="w-full h-12 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          <span>Hire {cg.name.split(' ')[0]} for Home Care</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
