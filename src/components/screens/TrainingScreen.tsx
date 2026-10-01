import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Award, CheckCircle2, Calendar, ShieldCheck, Download, AlertCircle } from 'lucide-react';

export const TrainingScreen: React.FC = () => {
  const { trainings, showToast, t } = useApp();

  const handleDownload = (title: string) => {
    showToast(`Downloaded verified credential: ${title}`);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title={t('trainingCertifications')} />

      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {/* Accreditation Overview */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E7F5F1] text-[#168C83] flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#17324D]">
                CareConnect Clinical Accreditation
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                All 5 core caregiver modules are certified and up-to-date.
              </p>
            </div>
          </div>
        </div>

        {/* Certificate Cards */}
        <div className="space-y-3">
          {trainings.map((trn) => (
            <div
              key={trn.id}
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    {trn.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Accredited by {trn.issuer}
                  </p>
                </div>

                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 flex items-center gap-1 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="space-y-0.5">
                  <div>Completed: {trn.completedDate}</div>
                  <div>Valid through: {trn.expiryDate}</div>
                </div>

                <button
                  onClick={() => handleDownload(trn.title)}
                  className="px-2.5 py-1 text-xs font-medium text-[#168C83] hover:bg-teal-50 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Certificate</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Continuing Education Notice */}
        <div className="p-3.5 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#168C83] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Annual recertification in CPR and Emergency First Aid is provided at no cost by the CareConnect Clinical Operations team in Rajahmundry.
          </p>
        </div>
      </div>
    </div>
  );
};
