import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Camera, Check } from 'lucide-react';

export const ProfileSetupScreen: React.FC = () => {
  const { caregiver, updateCaregiverProfile, navigateTo } = useApp();

  const [formData, setFormData] = useState({
    name: caregiver.name,
    dob: '1998-06-14',
    gender: 'Female',
    phone: caregiver.phone,
    address: caregiver.address,
    city: caregiver.city,
    languages: caregiver.languages.join(', '),
    experienceYears: caregiver.experienceYears,
    caregiverType: caregiver.caregiverType,
    qualification: caregiver.qualification,
    emergencyName: caregiver.emergencyContact.name,
    emergencyRelation: caregiver.emergencyContact.relationship,
    emergencyPhone: caregiver.emergencyContact.phone,
    bankName: caregiver.bankDetails.bankName,
    accountEnding: caregiver.bankDetails.accountEnding,
    ifsc: caregiver.bankDetails.ifsc,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCaregiverProfile({
      name: formData.name,
      city: formData.city,
      address: formData.address,
      languages: formData.languages.split(',').map((l) => l.trim()),
      experienceYears: Number(formData.experienceYears),
      caregiverType: formData.caregiverType,
      qualification: formData.qualification,
    });
    navigateTo('documents');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title="Complete Your Profile" />

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Photo avatar upload */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-[#E7F5F1] text-[#168C83] border border-[#168C83]/30 flex items-center justify-center font-bold text-lg">
              AK
            </div>
            <button
              type="button"
              onClick={() => navigateTo('camera_permission')}
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#168C83] text-white flex items-center justify-center ring-2 ring-white"
              title="Upload photo"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Caregiver Identification Photo</h3>
            <p className="text-xs text-slate-500 mt-0.5">Formal uniform portrait required for badge & family trust.</p>
          </div>
        </div>

        {/* Personal Details */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Personal Information</h3>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Date of Birth</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83] bg-white"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Languages</label>
              <input
                type="text"
                value={formData.languages}
                onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
              />
            </div>
          </div>
        </div>

        {/* Professional Details */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Professional Qualifications</h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Experience (Years)</label>
              <input
                type="number"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Caregiver Role</label>
              <input
                type="text"
                value={formData.caregiverType}
                onChange={(e) => setFormData({ ...formData, caregiverType: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Primary Qualification</label>
            <input
              type="text"
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
            />
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Emergency Contact</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Contact Name</label>
              <input
                type="text"
                value={formData.emergencyName}
                onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Relationship</label>
              <input
                type="text"
                value={formData.emergencyRelation}
                onChange={(e) => setFormData({ ...formData, emergencyRelation: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Emergency Phone</label>
            <input
              type="tel"
              value={formData.emergencyPhone}
              onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
            />
          </div>
        </div>

        <div className="pb-6">
          <button
            type="submit"
            className="w-full h-12 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <span>Save & Proceed to Document Verification</span>
            <Check className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
