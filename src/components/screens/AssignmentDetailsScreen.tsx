import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Avatar } from '../common/Avatar';
import { 
  Navigation, 
  Phone, 
  Headphones, 
  Play, 
  Clock, 
  MapPin, 
  AlertCircle, 
  ShieldCheck, 
  FileText,
  UserCheck
} from 'lucide-react';

export const AssignmentDetailsScreen: React.FC = () => {
  const { 
    currentAssignment, 
    currentPatient, 
    navigateTo, 
    startCareShift, 
    activeShift, 
    t 
  } = useApp();

  const patient = currentPatient || {
    name: 'Lakshmi Devi',
    age: 72,
    careType: 'Elderly Care',
    locality: 'Tilak Road, Rajahmundry',
    address: 'Door 14-8-3, Tilak Road, Near Venkateswara Temple, Rajahmundry, Andhra Pradesh',
    familyContact: {
      name: 'Priya Kumar',
      relationship: 'Daughter',
      phone: '+91 98492 11029',
    },
    careRequirements: [
      'Personal hygiene & bath assistance',
      'Meal assistance (diabetic soft diet)',
      'Medication reminder (oral tablets only)',
      'Mobility support (walker walking)',
      'Companionship & hydration monitoring',
      'Vitals monitoring'
    ],
    specialInstructions: [
      'Patient uses four-legged walker for transfers',
      'Lukewarm water to be kept within arm reach',
      'Call daughter Priya immediately if blood pressure exceeds 145/95'
    ]
  };

  const assignment = currentAssignment || {
    id: 'asg-today-01',
    timeRange: '8:00 AM – 4:00 PM',
    distanceKm: 4.2,
  };

  const isShiftActiveForThis = activeShift?.isActive && activeShift.assignmentId === assignment.id;

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title={t('assignmentDetails')} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Patient Hero Summary */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <div className="flex items-start gap-3.5">
            <Avatar type="elderly_female" name={patient.name} size="lg" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#17324D] truncate">
                  {patient.name}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded bg-teal-50 text-[#168C83] font-semibold border border-teal-200">
                  {patient.careType}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Age: {patient.age} years · Female
              </p>
              <div className="mt-2 text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{assignment.timeRange} (8 Hours Shift)</span>
              </div>
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-600">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-slate-800">{patient.locality}</p>
              <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">{patient.address}</p>
            </div>
          </div>
        </div>

        {/* Authorized Family Contact Card */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  {patient.familyContact.name}
                </p>
                <p className="text-[11px] text-slate-500">
                  {patient.familyContact.relationship} (Authorized Representative)
                </p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('family_comm')}
              className="text-xs font-semibold text-[#168C83] hover:underline"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Care Requirements List */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            {t('careRequirements')}
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {patient.careRequirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#168C83] mt-1.5 shrink-0" />
                <span className="leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Special Instructions & Safety Notice */}
        <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/80 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{t('specialInstructions')}</span>
          </div>
          <ul className="space-y-1 text-xs text-amber-950">
            {patient.specialInstructions.map((ins, i) => (
              <li key={i} className="leading-relaxed">
                • {ins}
              </li>
            ))}
          </ul>
        </div>

        {/* Clinical Scope Governance Notice */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            CareConnect attendants assist with non-clinical daily living & reminders only. Never administer unauthorized intravenous medication or alter physician prescription.
          </p>
        </div>
      </div>

      {/* Sticky Bottom Actions Bar */}
      <div className="sticky bottom-0 bg-white border-t border-slate-200 p-3.5 space-y-2 shadow-lg">
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => navigateTo('navigation')}
            className="h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5 text-[#168C83]" />
            <span>{t('navigate')}</span>
          </button>

          <button
            onClick={() => navigateTo('family_comm')}
            className="h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-slate-600" />
            <span>{t('callFamily')}</span>
          </button>

          <button
            onClick={() => navigateTo('support')}
            className="h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <Headphones className="w-3.5 h-3.5 text-slate-600" />
            <span>Support</span>
          </button>
        </div>

        {isShiftActiveForThis ? (
          <button
            onClick={() => navigateTo('care_plan')}
            className="w-full h-12 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <FileText className="w-4 h-4" />
            <span>Open Active Care Plan</span>
          </button>
        ) : (
          <button
            onClick={() => navigateTo('start_care')}
            className="w-full h-12 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{t('startCare')}</span>
          </button>
        )}
      </div>
    </div>
  );
};
