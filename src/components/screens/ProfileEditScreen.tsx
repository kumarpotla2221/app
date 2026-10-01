import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Avatar } from '../common/Avatar';
import { Lock, Check, AlertCircle, Camera } from 'lucide-react';

export const ProfileEditScreen: React.FC = () => {
  const { caregiver, updateCaregiverProfile, navigateTo } = useApp();

  const [address, setAddress] = useState(caregiver.address);
  const [city, setCity] = useState(caregiver.city);
  const [languages, setLanguages] = useState(caregiver.languages.join(', '));
  const [emergencyName, setEmergencyName] = useState(caregiver.emergencyContact.name);
  const [emergencyPhone, setEmergencyPhone] = useState(caregiver.emergencyContact.phone);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCaregiverProfile({
      address,
      city,
      languages: languages.split(',').map((l) => l.trim()),
      emergencyContact: {
        ...caregiver.emergencyContact,
        name: emergencyName,
        phone: emergencyPhone,
      },
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title="Edit Profile Details" />

      <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Verification Lock Notice */}
        <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 flex items-start gap-2.5 text-xs text-amber-950">
          <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Fields marked with a lock <Lock className="w-3 h-3 inline mx-0.5 text-slate-500" /> are officially verified. Changes require re-submission to CareConnect Compliance.
          </p>
        </div>

        {/* Photo & Locked Identity */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-3">
            <Avatar type="caregiver" name={caregiver.name} size="md" isVerified />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-slate-800">{caregiver.name}</h3>
                <span title="Verified Name (Locked)">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                </span>
              </div>
              <p className="text-xs text-slate-500">{caregiver.role}</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Registered Phone Number (Locked)
            </label>
            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-xs font-mono text-slate-600">
              <span>{caregiver.phone}</span>
              <Lock className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Clinical Qualification (Locked)
            </label>
            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600">
              <span>{caregiver.qualification}</span>
              <Lock className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Editable Contact & Address Information */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Residential & Spoken Languages
          </h3>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Current Street Address</label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Languages Spoken</label>
              <input
                type="text"
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
              />
            </div>
          </div>
        </div>

        {/* Editable Emergency Contact */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Personal Emergency Contact
          </h3>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Contact Name</label>
            <input
              type="text"
              value={emergencyName}
              onChange={(e) => setEmergencyName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Contact Phone</label>
            <input
              type="tel"
              value={emergencyPhone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
            />
          </div>
        </div>

        <div className="pt-2 pb-6">
          <button
            type="submit"
            className="w-full h-12 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Check className="w-4 h-4" />
            <span>Save Profile Updates</span>
          </button>
        </div>
      </form>
    </div>
  );
};
