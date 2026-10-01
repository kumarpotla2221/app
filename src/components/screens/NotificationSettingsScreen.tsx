import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';

export const NotificationSettingsScreen: React.FC = () => {
  const { showToast } = useApp();

  const [settings, setSettings] = useState({
    assignmentAlerts: true,
    shiftReminders: true,
    patientUpdates: true,
    familyMessages: true,
    paymentUpdates: true,
    trainingReminders: true,
    supportNotifications: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      showToast('Notification preferences updated');
      return next;
    });
  };

  const items = [
    { key: 'assignmentAlerts', title: 'Assignment Alerts', desc: 'Instant alerts when new assignments are offered in Rajahmundry' },
    { key: 'shiftReminders', title: 'Shift Reminders', desc: 'Advance 45-minute notification before shift start' },
    { key: 'patientUpdates', title: 'Patient Care Plan Updates', desc: 'Notifications if family modifies instructions or routine' },
    { key: 'familyMessages', title: 'Family Messages', desc: 'Direct messages from verified family representatives' },
    { key: 'paymentUpdates', title: 'Payment & Payout Updates', desc: 'Notifications on shift approval and bank transfers' },
    { key: 'trainingReminders', title: 'Training & Certificate Reminders', desc: 'Notice 30 days before CPR or police clearance expiry' },
    { key: 'supportNotifications', title: 'Support & Operations Desk', desc: 'Broadcasts from field coordinators' },
  ] as const;

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title="Notification Preferences" />

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
          {items.map((item) => {
            const isChecked = settings[item.key];
            return (
              <div key={item.key} className="p-3.5 flex items-center justify-between">
                <div className="pr-3 flex-1">
                  <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                </div>

                <button
                  type="button"
                  onClick={() => toggle(item.key)}
                  className={`w-11 h-6 rounded-full transition-colors relative shrink-0 focus:outline-none ${
                    isChecked ? 'bg-[#168C83]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 bg-white rounded-full transition-transform absolute top-1 ${
                      isChecked ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
