import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Avatar } from '../common/Avatar';
import { 
  Phone, 
  MapPin, 
  FileText, 
  AlertTriangle, 
  Heart, 
  Calendar, 
  ShieldCheck,
  ChevronRight,
  Clock
} from 'lucide-react';

export const PatientProfileScreen: React.FC = () => {
  const { currentPatient, navigateTo } = useApp();

  const patient = currentPatient || {
    name: 'Lakshmi Devi',
    age: 72,
    gender: 'Female',
    careType: 'Elderly Care',
    locality: 'Tilak Road, Rajahmundry',
    address: 'Door 14-8-3, Tilak Road, Near Venkateswara Temple, Rajahmundry, Andhra Pradesh',
    allergies: ['Penicillin (Moderate rash)'],
    prescribedScheduleNote: 'Oral tablets kept in marked morning/afternoon organizer tray by daughter Priya.',
    familyContact: {
      name: 'Priya Kumar',
      relationship: 'Daughter',
      phone: '+91 98492 11029',
    },
    emergencyContact: {
      name: 'Dr. Venkat Rao (Family Physician)',
      relationship: 'Consultant Geriatrician',
      phone: '+91 94402 33441',
    },
    careRequirements: [
      'Personal hygiene & bath assistance',
      'Diabetic soft diet meal support',
      'Prescribed oral medication reminders',
      'Gentle indoor mobility support with walker',
      'Daily vital signs check'
    ]
  };

  const avatarType = patient.gender === 'Female' ? 'elderly_female' : 'elderly_male';

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title="Patient Care Profile" />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Profile Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <div className="flex items-start gap-3.5">
            <Avatar type={avatarType} name={patient.name} size="lg" />
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-[#17324D] truncate">
                {patient.name}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {patient.age} years · {patient.careType}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{patient.locality}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button
              onClick={() => navigateTo('care_plan')}
              className="h-10 bg-[#168C83] hover:bg-[#12726b] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Care Plan</span>
            </button>

            <button
              onClick={() => navigateTo('family_comm')}
              className="h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-600" />
              <span>Contact Family</span>
            </button>
          </div>
        </div>

        {/* Clinical Safety & Allergies Card */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Clinical Safety & Allergies
          </h3>

          <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2 text-xs">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-rose-900 block font-semibold">Known Allergies:</strong>
              <span className="text-rose-800">
                {patient.allergies?.join(', ') || 'No known drug allergies reported'}
              </span>
            </div>
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 space-y-1">
            <strong className="text-slate-800 block">Medication Organization:</strong>
            <p className="text-slate-600 leading-relaxed">{patient.prescribedScheduleNote}</p>
          </div>
        </div>

        {/* Care Requirements List */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Assigned Care Requirements
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {patient.careRequirements?.map((r, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#168C83] mt-1.5 shrink-0" />
                <span className="leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5 text-xs">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Emergency & Physician Contacts
          </h3>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex justify-between font-semibold text-slate-800">
              <span>{patient.emergencyContact.name}</span>
              <span className="text-[#168C83] font-mono">{patient.emergencyContact.phone}</span>
            </div>
            <p className="text-slate-500 text-[11px] mt-0.5">
              {patient.emergencyContact.relationship}
            </p>
          </div>
        </div>

        {/* Privacy Footnote */}
        <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Data protected under Indian Healthcare Privacy Guidelines. For care team access only.
          </p>
        </div>
      </div>
    </div>
  );
};
