import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { 
  Headphones, 
  Phone, 
  MessageSquare, 
  AlertCircle, 
  FileQuestion, 
  IndianRupee, 
  Smartphone, 
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

export const SupportScreen: React.FC = () => {
  const { navigateTo, showToast, t } = useApp();

  const handleCallSupport = () => {
    showToast('Connecting to CareConnect Operations Helpline: 1800 200 4880');
  };

  const handleWhatsApp = () => {
    showToast('Opening CareConnect WhatsApp Operations Assistant: +91 98480 99111');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title={t('support')} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Support Availability Banner */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#E7F5F1] text-[#168C83] flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#17324D]">
                CareConnect Staff Operations Desk
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Dedicated support for active shifts, navigation and emergency triage. Available 24/7.
              </p>
            </div>
          </div>
        </div>

        {/* Primary Contact Channels */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={handleCallSupport}
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 text-left transition-colors space-y-1.5"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#168C83] flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-800">Toll-Free Phone</h3>
            <p className="text-[11px] text-slate-500 font-mono">1800 200 4880</p>
          </button>

          <button
            onClick={handleWhatsApp}
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 text-left transition-colors space-y-1.5"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-800">WhatsApp Help</h3>
            <p className="text-[11px] text-slate-500 font-mono">+91 98480 99111</p>
          </button>
        </div>

        {/* Structured Topic Help */}
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
          <button
            onClick={() => navigateTo('replacement_request')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileQuestion className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-xs font-semibold text-slate-800">Shift Replacement or Backup</p>
                <p className="text-[11px] text-slate-500">Request leave or shift coverage</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => showToast('Connecting to assignment coordinator...')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileQuestion className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-xs font-semibold text-slate-800">Assignment / Patient Clarification</p>
                <p className="text-[11px] text-slate-500">Care requirements or address issues</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => navigateTo('earnings')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <IndianRupee className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-xs font-semibold text-slate-800">Payment & Payout Inquiries</p>
                <p className="text-[11px] text-slate-500">Bank transfers and allowances</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => showToast('Submitting app diagnostics report...')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Smartphone className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-xs font-semibold text-slate-800">App Technical Support</p>
                <p className="text-[11px] text-slate-500">GPS, sync, or login issues</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* EMERGENCY SEPARATE PROTOCOL */}
        <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#E5484D]" />
            <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wide">
              Emergency Escalation
            </h4>
          </div>
          <p className="text-xs text-rose-900 leading-relaxed">
            For medical collapse, acute chest pain, or life-threatening situations, dial 112 immediately.
          </p>
          <button
            onClick={() => navigateTo('emergency')}
            className="w-full h-10 bg-[#E5484D] hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
          >
            Open Emergency 112 Protocol
          </button>
        </div>
      </div>
    </div>
  );
};
