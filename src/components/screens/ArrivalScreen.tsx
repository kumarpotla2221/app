import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Avatar } from '../common/Avatar';
import { CheckCircle2, MapPin, Clock, AlertTriangle, Headphones, ArrowRight } from 'lucide-react';

export const ArrivalScreen: React.FC = () => {
  const { currentPatient, navigateTo, t } = useApp();

  const patient = currentPatient || {
    name: 'Lakshmi Devi',
    age: 72,
    locality: 'Tilak Road, Rajahmundry',
    address: 'Door 14-8-3, Tilak Road, Rajahmundry',
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <Header showBack title={t('youveArrived')} />

      <div className="flex-1 flex flex-col justify-between p-6">
        <div className="my-auto max-w-sm w-full mx-auto text-center">
          {/* Verified Arrival Graphic */}
          <div className="w-16 h-16 rounded-2xl bg-[#E7F5F1] text-[#168C83] mx-auto flex items-center justify-center mb-5 border border-[#168C83]/20 shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="text-xl font-bold text-[#17324D] tracking-tight">
            {t('youveArrived')}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            GPS geofence confirmed arrival at patient premises
          </p>

          <div className="mt-6 bg-[#F8FAFC] p-4 rounded-xl border border-slate-200 text-left space-y-2.5">
            <div className="flex items-center gap-3">
              <Avatar type="elderly_female" name={patient.name} size="md" />
              <div>
                <h3 className="text-sm font-bold text-slate-800">{patient.name}</h3>
                <p className="text-xs text-slate-500">Elderly Care Assignment</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{patient.locality}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>8:02 AM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-6 border-t border-slate-100 max-w-sm w-full mx-auto">
          <button
            onClick={() => navigateTo('start_care')}
            className="w-full h-12 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <span>{t('startCare')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => navigateTo('support')}
              className="h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('unableToFind')}</span>
            </button>

            <button
              onClick={() => navigateTo('support')}
              className="h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <Headphones className="w-3.5 h-3.5 text-slate-600" />
              <span>{t('support')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
