import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { BottomNav } from '../common/BottomNav';
import { Avatar } from '../common/Avatar';
import { StatusBadge } from '../common/StatusBadge';
import { Search, MapPin, ChevronRight, Clock, UserCheck } from 'lucide-react';
import { Patient } from '../../types';

export const PatientsScreen: React.FC = () => {
  const { patients, setSelectedPatientId, navigateTo, t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'upcoming' | 'completed'>('all');

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.careType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSelectPatient = (p: Patient) => {
    setSelectedPatientId(p.id);
    navigateTo('patient_profile');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header title={t('patients')} />

      {/* Search Bar & Filter Tabs */}
      <div className="bg-white px-4 pt-3 pb-2 border-b border-slate-200 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patient, care type, or locality..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#168C83]"
          />
        </div>

        <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={`flex-1 py-1 font-medium rounded-md transition-colors ${
              statusFilter === 'all' ? 'bg-white text-[#17324D] shadow-xs' : 'text-slate-600'
            }`}
          >
            All ({patients.length})
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`flex-1 py-1 font-medium rounded-md transition-colors ${
              statusFilter === 'active' ? 'bg-white text-[#17324D] shadow-xs' : 'text-slate-600'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setStatusFilter('upcoming')}
            className={`flex-1 py-1 font-medium rounded-md transition-colors ${
              statusFilter === 'upcoming' ? 'bg-white text-[#17324D] shadow-xs' : 'text-slate-600'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`flex-1 py-1 font-medium rounded-md transition-colors ${
              statusFilter === 'completed' ? 'bg-white text-[#17324D] shadow-xs' : 'text-slate-600'
            }`}
          >
            Past
          </button>
        </div>
      </div>

      {/* Patient Cards List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredPatients.map((p) => {
          const avatarType = p.gender === 'Female' ? 'elderly_female' : 'elderly_male';

          return (
            <div
              key={p.id}
              onClick={() => handleSelectPatient(p)}
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar type={avatarType} name={p.name} size="md" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-bold text-[#17324D]">
                        {p.name}
                      </h3>
                      <span className="text-xs text-slate-500 font-normal">
                        · {p.age} yrs
                      </span>
                    </div>
                    <p className="text-xs font-medium text-[#168C83] mt-0.5">
                      {p.careType}
                    </p>
                  </div>
                </div>

                <StatusBadge
                  status={p.status === 'active' ? 'active' : p.status === 'upcoming' ? 'upcoming' : 'completed'}
                />
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{p.locality} ({p.distanceKm} km)</span>
                </div>

                <div className="flex items-center gap-0.5 font-semibold text-[#168C83]">
                  <span>Care Profile</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}

        {filteredPatients.length === 0 && (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
            <p className="text-xs text-slate-500">No patients matching your search criteria.</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};
