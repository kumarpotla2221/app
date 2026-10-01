import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { StatusBadge } from '../common/StatusBadge';
import { Upload, FileText, CheckCircle2, Shield, AlertCircle, X } from 'lucide-react';
import { DocumentVerification } from '../../types';

export const DocumentsScreen: React.FC = () => {
  const { documents, uploadDocument, navigateTo } = useApp();
  const [selectedDoc, setSelectedDoc] = useState<DocumentVerification | null>(null);
  const [docNumber, setDocNumber] = useState('');

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoc) return;
    uploadDocument(selectedDoc.id, docNumber || 'UPLOADED-DOC-2026');
    setSelectedDoc(null);
    setDocNumber('');
  };

  const verifiedCount = documents.filter((d) => d.status === 'verified').length;

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title="Verify Your Caregiver Profile" />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Compliance Overview Banner */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#E7F5F1] text-[#168C83] flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#17324D]">
                Caregiver Verification Status
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Mandatory background and clinical qualification checks required by CareConnect healthcare standards.
              </p>
              <div className="mt-2.5 flex items-center gap-2 text-xs font-medium text-slate-700">
                <span className="text-[#168C83] font-semibold">{verifiedCount} of {documents.length} verified</span>
                <span className="text-slate-300">·</span>
                <span>Active Field Clearance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Items List */}
        <div className="space-y-2.5">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-slate-800 leading-snug">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {doc.description}
                    </p>
                    {doc.documentNumber && (
                      <div className="text-[11px] font-mono text-slate-600 mt-1.5">
                        Ref: {doc.documentNumber}
                      </div>
                    )}
                    {doc.expiryDate && (
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Valid until: {doc.expiryDate}
                      </div>
                    )}
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-end gap-2">
                  <StatusBadge status={doc.status} />
                  {doc.status !== 'verified' && (
                    <button
                      onClick={() => {
                        setSelectedDoc(doc);
                        setDocNumber(doc.documentNumber || '');
                      }}
                      className="text-xs text-[#168C83] font-medium hover:underline flex items-center gap-1"
                    >
                      <Upload className="w-3 h-3" />
                      <span>{doc.status === 'submitted' ? 'Re-upload' : 'Upload'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security Notice */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            All documents are encrypted and audited per Clinical Establishment & Home Care Guidelines. Never share copies outside official CareConnect channels.
          </p>
        </div>
      </div>

      {/* Upload Document Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-white rounded-t-2xl sm:rounded-2xl p-5 border border-slate-200 shadow-xl animate-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-sm font-semibold text-[#17324D]">
                Upload {selectedDoc.title}
              </h3>
              <button
                onClick={() => setSelectedDoc(null)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="pt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Document ID / Certificate Reference
                </label>
                <input
                  type="text"
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  placeholder="e.g. AP-NURS-88319"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83]"
                  required
                />
              </div>

              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-[#168C83] transition-colors cursor-pointer bg-slate-50">
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                <p className="text-xs font-medium text-slate-700">Tap to browse or take photo</p>
                <p className="text-[11px] text-slate-400 mt-0.5">JPEG, PNG or PDF (Max 5MB)</p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="flex-1 h-10 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-10 bg-[#168C83] hover:bg-[#12726b] text-white rounded-lg text-xs font-medium"
                >
                  Submit for Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
