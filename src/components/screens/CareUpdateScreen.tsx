import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Send, Camera, CheckCircle2 } from 'lucide-react';
import { FamilyUpdate } from '../../types';

export const CareUpdateScreen: React.FC = () => {
  const { currentPatient, sendFamilyUpdate, goBack, t } = useApp();

  const [category, setCategory] = useState<FamilyUpdate['category']>('Meal');
  const [message, setMessage] = useState('Lakshmi Devi had her morning soft diet and water comfortably. Resting calmly.');
  const [isSent, setIsSent] = useState(false);

  const categories: FamilyUpdate['category'][] = [
    'Meal',
    'Medication Reminder',
    'Mobility',
    'Mood',
    'General Care',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendFamilyUpdate(category, message);
    setIsSent(true);
    setTimeout(() => {
      goBack();
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title={t('sendUpdate')} />

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Patient Recipient */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500">Recipient:</span>
            <p className="font-semibold text-slate-800">
              Priya Kumar (Daughter of {currentPatient?.name || 'Lakshmi Devi'})
            </p>
          </div>
          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-200 text-[11px]">
            Authorized
          </span>
        </div>

        {/* Update Category Chips */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Update Category
          </label>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`py-2 px-2.5 text-xs font-medium rounded-lg border text-left transition-colors truncate ${
                  category === cat
                    ? 'bg-[#168C83] text-white border-[#168C83]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Update Message */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Care Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full p-3 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83] text-slate-800 leading-relaxed"
            placeholder="Write clear, respectful, factual care notes for family reassurance..."
            required
          />
        </div>

        {/* Optional Permitted Attachment Notice */}
        <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Camera className="w-4 h-4 text-slate-500" />
            <span>Permitted care photo attachment</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Optional</span>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSent}
            className={`w-full h-12 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs ${
              isSent
                ? 'bg-emerald-600 text-white'
                : 'bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white'
            }`}
          >
            {isSent ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Update Sent to Family</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Update</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
