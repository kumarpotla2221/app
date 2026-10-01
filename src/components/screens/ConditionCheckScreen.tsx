import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Heart, Smile, Activity, Utensils, CheckCircle2 } from 'lucide-react';
import { PatientObservation } from '../../types';

export const ConditionCheckScreen: React.FC = () => {
  const { currentPatient, addObservation, goBack, t } = useApp();

  const [feeling, setFeeling] = useState<PatientObservation['feeling']>('Good');
  const [mobility, setMobility] = useState<PatientObservation['mobility']>('Normal');
  const [appetite, setAppetite] = useState<PatientObservation['appetite']>('Good');
  const [comfort, setComfort] = useState<PatientObservation['comfort']>('Comfortable');
  const [notes, setNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addObservation({
      feeling,
      mobility,
      appetite,
      comfort,
      notes: notes || 'Routine condition assessment completed without negative findings.',
    });
    setIsSaved(true);
    setTimeout(() => {
      goBack();
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title={t('patientCheckIn')} />

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Question 1: Feeling */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
          <label className="block text-xs font-semibold text-slate-800">
            {t('howFeeling')}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['Good', 'Okay', 'Needs Attention'] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setFeeling(opt)}
                className={`py-2 px-1 text-xs font-medium rounded-lg border text-center transition-colors ${
                  feeling === opt
                    ? 'bg-[#168C83] text-white border-[#168C83]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Question 2: Mobility */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
          <label className="block text-xs font-semibold text-slate-800">
            {t('howMobility')}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['Normal', 'Limited', 'Needs Assistance'] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setMobility(opt)}
                className={`py-2 px-1 text-xs font-medium rounded-lg border text-center transition-colors ${
                  mobility === opt
                    ? 'bg-[#168C83] text-white border-[#168C83]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Question 3: Appetite */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
          <label className="block text-xs font-semibold text-slate-800">
            {t('appetite')}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['Good', 'Reduced', 'Poor'] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setAppetite(opt)}
                className={`py-2 px-1 text-xs font-medium rounded-lg border text-center transition-colors ${
                  appetite === opt
                    ? 'bg-[#168C83] text-white border-[#168C83]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Question 4: Comfort */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
          <label className="block text-xs font-semibold text-slate-800">
            {t('comfort')}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['Comfortable', 'Mild discomfort', 'Significant discomfort'] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setComfort(opt)}
                className={`py-2 px-1 text-[11px] font-medium rounded-lg border text-center transition-colors ${
                  comfort === opt
                    ? 'bg-[#168C83] text-white border-[#168C83]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Observations text area */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <label className="block text-xs font-semibold text-slate-800">
            {t('additionalObs')}
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Record any verbal complaints, sleep quality, skin integrity, or emotional state..."
            rows={3}
            className="w-full p-3 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83] text-slate-800"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSaved}
            className={`w-full h-12 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs ${
              isSaved
                ? 'bg-emerald-600 text-white'
                : 'bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white'
            }`}
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Observation Saved Successfully</span>
              </>
            ) : (
              <span>{t('saveObservation')}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
