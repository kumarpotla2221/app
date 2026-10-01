import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Activity, ShieldCheck, Heart, Thermometer, Wind, Droplets, CheckCircle2 } from 'lucide-react';

export const VitalsScreen: React.FC = () => {
  const { currentPatient, addVitalRecord, vitals, goBack, t } = useApp();

  const [sys, setSys] = useState('124');
  const [dia, setDia] = useState('82');
  const [pulse, setPulse] = useState('76');
  const [temp, setTemp] = useState('98.4');
  const [sugar, setSugar] = useState('128');
  const [spo2, setSpo2] = useState('98');
  const [notes, setNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVitalRecord({
      bloodPressureSys: Number(sys),
      bloodPressureDia: Number(dia),
      pulseBpm: Number(pulse),
      temperatureF: Number(temp),
      bloodSugarMgDl: sugar ? Number(sugar) : undefined,
      oxygenSaturationSpO2: spo2 ? Number(spo2) : undefined,
      notes: notes || undefined,
    });
    setIsSaved(true);
    setTimeout(() => {
      goBack();
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title={t('recordVitals')} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Safety & Authorization Scope */}
        <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-[#168C83] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {t('vitalDisclaimer')}
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Blood Pressure */}
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 text-slate-800 font-semibold text-xs uppercase tracking-wider">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>{t('bloodPressure')} (mmHg)</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Systolic (Upper)</label>
                <input
                  type="number"
                  value={sys}
                  onChange={(e) => setSys(e.target.value)}
                  placeholder="120"
                  className="w-full px-3 py-2 text-base font-mono font-semibold rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Diastolic (Lower)</label>
                <input
                  type="number"
                  value={dia}
                  onChange={(e) => setDia(e.target.value)}
                  placeholder="80"
                  className="w-full px-3 py-2 text-base font-mono font-semibold rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
                  required
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">Standard reference: 120 / 80 mmHg</p>
          </div>

          {/* Pulse & Temperature */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 mb-2 text-slate-800 font-semibold text-xs uppercase tracking-wider">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>{t('pulse')} (bpm)</span>
              </div>
              <input
                type="number"
                value={pulse}
                onChange={(e) => setPulse(e.target.value)}
                placeholder="72"
                className="w-full px-3 py-2 text-base font-mono font-semibold rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
                required
              />
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 mb-2 text-slate-800 font-semibold text-xs uppercase tracking-wider">
                <Thermometer className="w-4 h-4 text-amber-500" />
                <span>{t('temperature')} (°F)</span>
              </div>
              <input
                type="number"
                step="0.1"
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                placeholder="98.6"
                className="w-full px-3 py-2 text-base font-mono font-semibold rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
                required
              />
            </div>
          </div>

          {/* Optional Readings: Sugar & SpO2 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 mb-2 text-slate-800 font-semibold text-xs uppercase tracking-wider">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span>Blood Sugar (mg/dL)</span>
              </div>
              <input
                type="number"
                value={sugar}
                onChange={(e) => setSugar(e.target.value)}
                placeholder="Optional"
                className="w-full px-3 py-2 text-base font-mono rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
              />
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 mb-2 text-slate-800 font-semibold text-xs uppercase tracking-wider">
                <Wind className="w-4 h-4 text-teal-600" />
                <span>SpO2 Oxygen (%)</span>
              </div>
              <input
                type="number"
                value={spo2}
                onChange={(e) => setSpo2(e.target.value)}
                placeholder="98"
                className="w-full px-3 py-2 text-base font-mono rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
              />
            </div>
          </div>

          {/* Clinical Notes */}
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Caregiver Observation / Kit Model
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Omron digital cuff, patient seated at rest"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
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
                  <span>Vital Reading Saved Successfully</span>
                </>
              ) : (
                <span>{t('saveReading')}</span>
              )}
            </button>
          </div>
        </form>

        {/* Recent Vital Readings History */}
        {vitals.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
            <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Recent Readings Log
            </h4>
            {vitals.slice(0, 3).map((v) => (
              <div key={v.id} className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span>{v.timestamp}</span>
                  <span className="font-medium text-slate-700">{v.recordedBy}</span>
                </div>
                <div className="flex items-center gap-3 font-mono font-semibold text-slate-800 mt-1">
                  <span>BP: {v.bloodPressureSys}/{v.bloodPressureDia}</span>
                  <span>·</span>
                  <span>Pulse: {v.pulseBpm}</span>
                  <span>·</span>
                  <span>Temp: {v.temperatureF}°F</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
