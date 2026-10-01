import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { AlertCircle, FileWarning, Camera, CheckCircle2 } from 'lucide-react';
import { IncidentReport } from '../../types';

export const IncidentReportScreen: React.FC = () => {
  const { currentPatient, submitIncidentReport, goBack, t } = useApp();

  const [incidentType, setIncidentType] = useState<IncidentReport['incidentType']>('Fall');
  const [description, setDescription] = useState('');
  const [actionTaken, setActionTaken] = useState('');
  const [familyNotified, setFamilyNotified] = useState(true);
  const [supportContacted, setSupportContacted] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const incidentTypes: IncidentReport['incidentType'][] = [
    'Fall',
    'Injury',
    'Change in Condition',
    'Medication Issue',
    'Patient Distress',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitIncidentReport({
      incidentType,
      description: description || 'Patient experienced loss of balance near chair. Guided gently to floor.',
      actionTaken: actionTaken || 'Assisted patient to sit calmly, checked vitals (BP 132/86, pulse 80), called family member Priya.',
      familyNotified,
      supportContacted,
    });
    setIsSubmitted(true);
    setTimeout(() => {
      goBack();
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title={t('reportIncidentTitle')} />

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Incident Type */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            {t('incidentType')}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {incidentTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setIncidentType(type)}
                className={`py-2 px-2.5 text-xs font-medium rounded-lg border text-left transition-colors truncate ${
                  incidentType === type
                    ? 'bg-rose-900 text-white border-rose-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Date, Time & Location Context */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-400">Patient:</span>
            <strong className="text-slate-800">{currentPatient?.name || 'Lakshmi Devi'}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Location:</span>
            <strong className="text-slate-800">{currentPatient?.locality || 'Rajahmundry'}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Date & Time:</span>
            <strong className="text-slate-800">Oct 1, 2026 · Current Time</strong>
          </div>
        </div>

        {/* Description Field */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            {t('description')}
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Describe what occurred, any visible signs, and environmental factors..."
            className="w-full p-3 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-rose-700 text-slate-800 leading-relaxed"
            required
          />
        </div>

        {/* Action Taken Field */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            {t('actionTaken')}
          </label>
          <textarea
            value={actionTaken}
            onChange={(e) => setActionTaken(e.target.value)}
            rows={2}
            placeholder="Immediate first aid, reassurance, vitals taken, or support called..."
            className="w-full p-3 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-rose-700 text-slate-800 leading-relaxed"
            required
          />
        </div>

        {/* Notification Checkboxes */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Required Escalations
          </h4>

          <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={familyNotified}
              onChange={(e) => setFamilyNotified(e.target.checked)}
              className="w-4 h-4 rounded text-[#168C83] focus:ring-[#168C83]"
            />
            <span>Authorized family member notified</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={supportContacted}
              onChange={(e) => setSupportContacted(e.target.checked)}
              className="w-4 h-4 rounded text-[#168C83] focus:ring-[#168C83]"
            />
            <span>CareConnect Support & Clinical Lead notified</span>
          </label>
        </div>

        <div className="pt-2 pb-6">
          <button
            type="submit"
            disabled={isSubmitted}
            className={`w-full h-12 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs ${
              isSubmitted
                ? 'bg-emerald-600 text-white'
                : 'bg-rose-900 hover:bg-rose-800 text-white'
            }`}
          >
            {isSubmitted ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Incident Report Filed Successfully</span>
              </>
            ) : (
              <>
                <FileWarning className="w-4 h-4" />
                <span>{t('submitIncident')}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
