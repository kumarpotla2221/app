import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { 
  WifiOff, 
  AlertTriangle, 
  RefreshCw, 
  MapPinOff, 
  CameraOff, 
  FileX, 
  ArrowLeft 
} from 'lucide-react';

export const ErrorStatesScreen: React.FC = () => {
  const { showToast, goBack } = useApp();
  const [errorType, setErrorType] = useState<'network' | 'load_assignment' | 'submit_report' | 'location'>('load_assignment');

  const handleRetry = () => {
    showToast('Re-establishing connection to CareConnect server...');
    setTimeout(() => {
      showToast('Connection restored successfully.');
      goBack();
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title="Error Recovery Previews" />

      {/* Selector */}
      <div className="bg-white px-4 py-2 border-b border-slate-200">
        <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs overflow-x-auto">
          <button
            onClick={() => setErrorType('load_assignment')}
            className={`px-2.5 py-1 font-medium rounded-md transition-colors whitespace-nowrap ${
              errorType === 'load_assignment' ? 'bg-white text-[#17324D] shadow-xs' : 'text-slate-600'
            }`}
          >
            Load Assignment
          </button>
          <button
            onClick={() => setErrorType('network')}
            className={`px-2.5 py-1 font-medium rounded-md transition-colors whitespace-nowrap ${
              errorType === 'network' ? 'bg-white text-[#17324D] shadow-xs' : 'text-slate-600'
            }`}
          >
            Network Disconnected
          </button>
          <button
            onClick={() => setErrorType('submit_report')}
            className={`px-2.5 py-1 font-medium rounded-md transition-colors whitespace-nowrap ${
              errorType === 'submit_report' ? 'bg-white text-[#17324D] shadow-xs' : 'text-slate-600'
            }`}
          >
            Report Submit Error
          </button>
          <button
            onClick={() => setErrorType('location')}
            className={`px-2.5 py-1 font-medium rounded-md transition-colors whitespace-nowrap ${
              errorType === 'location' ? 'bg-white text-[#17324D] shadow-xs' : 'text-slate-600'
            }`}
          >
            Location Disabled
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
        {errorType === 'load_assignment' && (
          <div className="max-w-xs space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center border border-amber-200">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17324D]">
                Something went wrong
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                We couldn't load your assignment. Please check your cellular connection and try again.
              </p>
            </div>
            <button
              onClick={handleRetry}
              className="h-11 px-5 bg-[#168C83] hover:bg-[#12726b] text-white text-xs font-semibold rounded-xl inline-flex items-center gap-2 transition-colors shadow-xs"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          </div>
        )}

        {errorType === 'network' && (
          <div className="max-w-xs space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center border border-rose-200">
              <WifiOff className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17324D]">
                No Internet Connection
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                CareConnect field data is temporarily queued offline. Reconnect to sync completed vitals and care checklists.
              </p>
            </div>
            <button
              onClick={handleRetry}
              className="h-11 px-5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl inline-flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Sync</span>
            </button>
          </div>
        )}

        {errorType === 'submit_report' && (
          <div className="max-w-xs space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center border border-rose-200">
              <FileX className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17324D]">
                Unable to Submit Report
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Your report draft has been saved locally on this device. The clinical server was unreachable.
              </p>
            </div>
            <button
              onClick={handleRetry}
              className="h-11 px-5 bg-[#168C83] hover:bg-[#12726b] text-white text-xs font-semibold rounded-xl inline-flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Resend Saved Report</span>
            </button>
          </div>
        )}

        {errorType === 'location' && (
          <div className="max-w-xs space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center border border-amber-200">
              <MapPinOff className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17324D]">
                Location Services Disabled
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                CareConnect requires device GPS to verify arrival at patient residence in Rajahmundry.
              </p>
            </div>
            <button
              onClick={handleRetry}
              className="h-11 px-5 bg-[#168C83] hover:bg-[#12726b] text-white text-xs font-semibold rounded-xl inline-flex items-center gap-2 transition-colors"
            >
              <span>Enable GPS Access</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
