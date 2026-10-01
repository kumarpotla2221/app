import React from 'react';
import { Header } from '../common/Header';
import { StatusBadge } from '../common/StatusBadge';
import { Avatar } from '../common/Avatar';
import { 
  Check, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ChevronRight, 
  HeartPulse,
  Phone
} from 'lucide-react';

export const DesignSystemScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title="CareConnect Design System" />

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Brand Architecture */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-[#168C83]" />
            <h2 className="text-sm font-bold text-[#17324D]">
              CareConnect Mobile Foundations
            </h2>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Specification: 390×844px mobile viewport, 8px spacing grid, Inter typography, 44px minimum touch hitboxes, and anti-AI-slop professional healthcare workforce aesthetics.
          </p>
        </div>

        {/* Color Palette Tokens */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Brand Color Tokens (60-30-10 Rule)
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2.5 p-2 bg-slate-50 rounded-lg">
              <span className="w-6 h-6 rounded bg-[#168C83] shrink-0" />
              <div>
                <p className="font-bold text-slate-800">#168C83</p>
                <p className="text-[11px] text-slate-500">CareConnect Teal (10% Accent)</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 bg-slate-50 rounded-lg">
              <span className="w-6 h-6 rounded bg-[#17324D] shrink-0" />
              <div>
                <p className="font-bold text-slate-800">#17324D</p>
                <p className="text-[11px] text-slate-500">Deep Navy (Headings/Brand)</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 bg-slate-50 rounded-lg">
              <span className="w-6 h-6 rounded bg-[#F8FAFC] border border-slate-300 shrink-0" />
              <div>
                <p className="font-bold text-slate-800">#F8FAFC</p>
                <p className="text-[11px] text-slate-500">Neutral Canvas (60% Canvas)</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 bg-slate-50 rounded-lg">
              <span className="w-6 h-6 rounded bg-[#E7F5F1] shrink-0" />
              <div>
                <p className="font-bold text-slate-800">#E7F5F1</p>
                <p className="text-[11px] text-slate-500">Light Mint Backgrounds</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 bg-slate-50 rounded-lg">
              <span className="w-6 h-6 rounded bg-[#2E8B57] shrink-0" />
              <div>
                <p className="font-bold text-slate-800">#2E8B57</p>
                <p className="text-[11px] text-slate-500">Success / Completed</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 bg-slate-50 rounded-lg">
              <span className="w-6 h-6 rounded bg-[#E5484D] shrink-0" />
              <div>
                <p className="font-bold text-slate-800">#E5484D</p>
                <p className="text-[11px] text-slate-500">Emergency 112</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Badges */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Status & Verification Badges
          </h3>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="verified" text="Verified Caregiver" />
            <StatusBadge status="in_progress" text="Shift Active" />
            <StatusBadge status="completed" text="Care Completed" />
            <StatusBadge status="upcoming" text="Upcoming" />
            <StatusBadge status="pending" text="Document Pending" />
            <StatusBadge status="rejected" text="Rejected" />
          </div>
        </div>

        {/* Buttons System */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Interactive Button System (Min 44px Touch Targets)
          </h3>
          <div className="space-y-2">
            <button className="w-full h-11 bg-[#168C83] hover:bg-[#12726b] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs">
              <Check className="w-4 h-4" />
              <span>Primary Workforce Action</span>
            </button>

            <button className="w-full h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors">
              <span>Secondary Operational Action</span>
            </button>

            <button className="w-full h-11 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors">
              <AlertTriangle className="w-4 h-4 text-[#E5484D]" />
              <span>Emergency / Critical Action</span>
            </button>
          </div>
        </div>

        {/* Typography Demonstration */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Inter Typography Hierarchy
          </h3>
          <div className="space-y-1 pt-1">
            <div className="text-xl font-bold text-[#17324D]">Header Large 20px Bold</div>
            <div className="text-base font-bold text-[#17324D]">Section Title 16px Bold</div>
            <div className="text-sm font-semibold text-slate-800">Card Header 14px Semibold</div>
            <div className="text-xs text-slate-700">Body Copy 12px Regular with comfortable line height</div>
            <div className="text-[11px] font-mono text-slate-500">Tabular Metadata 11px Monospace</div>
          </div>
        </div>
      </div>
    </div>
  );
};
