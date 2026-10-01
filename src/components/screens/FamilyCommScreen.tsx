import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Avatar } from '../common/Avatar';
import { Phone, MessageSquare, Send, ShieldCheck, Clock, CheckCheck, UserCheck } from 'lucide-react';

export const FamilyCommScreen: React.FC = () => {
  const { currentPatient, familyUpdates, navigateTo, showToast, t } = useApp();

  const patient = currentPatient || {
    name: 'Lakshmi Devi',
    familyContact: {
      name: 'Priya Kumar',
      relationship: 'Daughter',
      phone: '+91 98492 11029',
    },
  };

  const handleCall = () => {
    showToast(`Calling authorized contact Priya Kumar: ${patient.familyContact.phone}`);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title={t('familyUpdates')} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Authorized Family Contact Card */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <Avatar type="contact" name={patient.familyContact.name} size="md" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-[#17324D] truncate">
                  {patient.familyContact.name}
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-medium border border-emerald-200">
                  Primary Contact
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {patient.familyContact.relationship} of {patient.name}
              </p>
              <p className="text-xs font-mono text-slate-700 mt-1">
                {patient.familyContact.phone}
              </p>
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button
              onClick={handleCall}
              className="h-10 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Contact</span>
            </button>

            <button
              onClick={() => navigateTo('care_update')}
              className="h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#168C83]" />
              <span>Send Update</span>
            </button>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-[#168C83] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {t('authorizedNotice')}
          </p>
        </div>

        {/* Sent Updates Log */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Today's Sent Communication
          </h4>

          {familyUpdates.length > 0 ? (
            familyUpdates.map((upd) => (
              <div key={upd.id} className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="font-semibold text-[#168C83]">{upd.category} Update</span>
                  <div className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>{upd.timestamp}</span>
                  </div>
                </div>
                <p className="text-slate-800 leading-relaxed">{upd.message}</p>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium pt-1">
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Delivered to family app</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 bg-white rounded-xl border border-slate-200 text-center space-y-2">
              <p className="text-xs text-slate-500">
                No family updates sent yet today. Keep family informed about meals, hydration, or medication intake.
              </p>
              <button
                onClick={() => navigateTo('care_update')}
                className="text-xs font-semibold text-[#168C83] hover:underline"
              >
                + Send first care update
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
