import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ScreenId,
  BottomTabId,
  CustomerTabId,
  AppMode,
  Language,
  CaregiverProfile,
  Patient,
  Assignment,
  CareTask,
  VitalRecord,
  PatientObservation,
  FamilyUpdate,
  IncidentReport,
  DocumentVerification,
  TrainingCertificate,
  PaymentRecord,
  AppNotification,
  TaskStatus,
  CareService,
  HirableCaregiver,
  HireBooking,
} from '../types';
import {
  INITIAL_CAREGIVER,
  INITIAL_PATIENTS,
  INITIAL_ASSIGNMENTS,
  INITIAL_CARE_TASKS,
  INITIAL_VITALS,
  INITIAL_OBSERVATIONS,
  INITIAL_DOCUMENTS,
  INITIAL_TRAININGS,
  INITIAL_PAYMENTS,
  INITIAL_NOTIFICATIONS,
  CARE_SERVICES,
  HIRABLE_CAREGIVERS,
  INITIAL_HIRE_BOOKINGS,
  TRANSLATIONS,
} from '../data/mockData';

interface ActiveShiftState {
  isActive: boolean;
  assignmentId: string;
  patientId: string;
  startedAt: string;
  startedTimestamp: number;
  elapsedSeconds: number;
}

export interface HireWizardDraft {
  serviceId: string;
  patientName: string;
  patientAge: string;
  patientGender: 'Female' | 'Male';
  conditionSummary: string;
  address: string;
  locality: string;
  city: string;
  shiftType: '8h_day' | '12h_day' | '12h_night' | '24h_livein' | 'single_visit';
  startDate: string;
  durationDays: number;
  selectedCaregiverId: string;
  tasksRequired: string[];
  specialInstructions: string;
  contactName: string;
  contactPhone: string;
}

interface AppContextType {
  // Mode & Navigation
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  currentScreen: ScreenId;
  activeTab: BottomTabId;
  customerTab: CustomerTabId;
  setCustomerTab: (tab: CustomerTabId) => void;
  screenStack: ScreenId[];
  language: Language;
  isLoggedIn: boolean;
  toastMessage: string | null;
  deviceViewMode: 'device' | 'full';

  // Customer / Hiring state
  services: CareService[];
  selectedServiceId: string;
  setSelectedServiceId: (id: string) => void;
  hirableCaregivers: HirableCaregiver[];
  selectedCaregiverId: string;
  setSelectedCaregiverId: (id: string) => void;
  hireBookings: HireBooking[];
  activeBookingId: string;
  setActiveBookingId: (id: string) => void;
  hireDraft: HireWizardDraft;
  updateHireDraft: (updates: Partial<HireWizardDraft>) => void;
  submitHireBooking: () => HireBooking;

  // Caregiver Field state
  caregiver: CaregiverProfile;
  isAvailable: boolean;
  activeShift: ActiveShiftState | null;
  assignments: Assignment[];
  selectedAssignmentId: string;
  patients: Patient[];
  selectedPatientId: string;
  tasks: CareTask[];
  selectedTaskId: string | null;
  vitals: VitalRecord[];
  observations: PatientObservation[];
  familyUpdates: FamilyUpdate[];
  incidentReports: IncidentReport[];
  documents: DocumentVerification[];
  trainings: TrainingCertificate[];
  payments: PaymentRecord[];
  notifications: AppNotification[];
  availabilitySchedule: Record<string, { morning: boolean; afternoon: boolean; night: boolean }>;

  // Navigation handlers
  navigateTo: (screen: ScreenId, addToStack?: boolean) => void;
  goBack: () => void;
  setActiveTab: (tab: BottomTabId) => void;
  setLanguage: (lang: Language) => void;
  setDeviceViewMode: (mode: 'device' | 'full') => void;
  setSelectedAssignmentId: (id: string) => void;
  setSelectedPatientId: (id: string) => void;
  setSelectedTaskId: (id: string | null) => void;
  showToast: (msg: string) => void;

  // Caregiver Field Actions
  toggleAvailability: () => void;
  startCareShift: (assignmentId: string) => void;
  endCareShift: () => void;
  acceptAssignment: (assignmentId: string) => void;
  declineAssignment: (assignmentId: string, reason?: string) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus, note?: string) => void;
  addVitalRecord: (record: {
    bloodPressureSys: number;
    bloodPressureDia: number;
    pulseBpm: number;
    temperatureF: number;
    bloodSugarMgDl?: number;
    oxygenSaturationSpO2?: number;
    notes?: string;
  }) => void;
  addObservation: (obs: {
    feeling: PatientObservation['feeling'];
    mobility: PatientObservation['mobility'];
    appetite: PatientObservation['appetite'];
    comfort: PatientObservation['comfort'];
    notes: string;
  }) => void;
  sendFamilyUpdate: (category: FamilyUpdate['category'], message: string) => void;
  submitIncidentReport: (incident: {
    incidentType: IncidentReport['incidentType'];
    description: string;
    actionTaken: string;
    familyNotified: boolean;
    supportContacted: boolean;
  }) => void;
  submitDailyReport: (caregiverNotes: string) => void;
  requestReplacement: (reason: string, details: string) => void;
  uploadDocument: (docId: string, documentNumber: string) => void;
  saveAvailability: (schedule: Record<string, { morning: boolean; afternoon: boolean; night: boolean }>) => void;
  updateCaregiverProfile: (updates: Partial<CaregiverProfile>) => void;
  loginUser: (mobile: string) => void;
  logoutUser: () => void;

  // Helpers
  t: (key: keyof typeof TRANSLATIONS['en']) => string;
  currentPatient: Patient | undefined;
  currentAssignment: Assignment | undefined;
  selectedService: CareService | undefined;
  selectedCaregiver: HirableCaregiver | undefined;
  activeBooking: HireBooking | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_AVAILABILITY = {
  Monday: { morning: true, afternoon: true, night: false },
  Tuesday: { morning: true, afternoon: true, night: false },
  Wednesday: { morning: true, afternoon: true, night: false },
  Thursday: { morning: true, afternoon: true, night: false },
  Friday: { morning: true, afternoon: true, night: false },
  Saturday: { morning: true, afternoon: false, night: false },
  Sunday: { morning: false, afternoon: false, night: false },
};

const INITIAL_DRAFT: HireWizardDraft = {
  serviceId: 'srv-elderly',
  patientName: 'Lakshmi Devi',
  patientAge: '72',
  patientGender: 'Female',
  conditionSummary: 'Requires gentle walker support, diabetic meal prep, and daily oral medicine reminders.',
  address: 'Door 14-8-3, Tilak Road, Near Venkateswara Temple',
  locality: 'Tilak Road, Rajahmundry',
  city: 'Rajahmundry',
  shiftType: '8h_day',
  startDate: '2026-10-02',
  durationDays: 15,
  selectedCaregiverId: 'cg-anjali',
  tasksRequired: [
    'Morning hygiene & gentle warm bath',
    'Breakfast & diabetic soft diet assistance',
    'Prescribed morning oral tablets reminder',
    'Supervised 10-minute hallway walk with walker',
    'Daily blood pressure & pulse recording',
  ],
  specialInstructions: 'Patient uses a four-legged walker. Please keep lukewarm water nearby.',
  contactName: 'Priya Kumar',
  contactPhone: '+91 98492 11029',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to customer hiring app mode as requested by user!
  const [appMode, setAppModeState] = useState<AppMode>('customer');
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('customer_home');
  const [customerTab, setCustomerTabState] = useState<CustomerTabId>('explore');
  const [activeTab, setActiveTabState] = useState<BottomTabId>('home');
  const [screenStack, setScreenStack] = useState<ScreenId[]>([]);
  const [language, setLanguageState] = useState<Language>('en');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deviceViewMode, setDeviceViewMode] = useState<'device' | 'full'>('device');

  // Customer / Hiring data
  const [services] = useState<CareService[]>(CARE_SERVICES);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('srv-elderly');
  const [hirableCaregivers] = useState<HirableCaregiver[]>(HIRABLE_CAREGIVERS);
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<string>('cg-anjali');
  const [hireBookings, setHireBookings] = useState<HireBooking[]>(INITIAL_HIRE_BOOKINGS);
  const [activeBookingId, setActiveBookingId] = useState<string>('book-001');
  const [hireDraft, setHireDraft] = useState<HireWizardDraft>(INITIAL_DRAFT);

  // Caregiver Field data
  const [caregiver, setCaregiver] = useState<CaregiverProfile>(INITIAL_CAREGIVER);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>('asg-today-01');
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('pat-001');
  const [tasks, setTasks] = useState<CareTask[]>(INITIAL_CARE_TASKS);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [vitals, setVitals] = useState<VitalRecord[]>(INITIAL_VITALS);
  const [observations, setObservations] = useState<PatientObservation[]>(INITIAL_OBSERVATIONS);
  const [familyUpdates, setFamilyUpdates] = useState<FamilyUpdate[]>([]);
  const [incidentReports, setIncidentReports] = useState<IncidentReport[]>([]);
  const [documents, setDocuments] = useState<DocumentVerification[]>(INITIAL_DOCUMENTS);
  const [trainings, setTrainings] = useState<TrainingCertificate[]>(INITIAL_TRAININGS);
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [availabilitySchedule, setAvailabilitySchedule] = useState<Record<string, { morning: boolean; afternoon: boolean; night: boolean }>>(INITIAL_AVAILABILITY);

  // Pre-seed an active shift simulation
  const [activeShift, setActiveShift] = useState<ActiveShiftState | null>({
    isActive: true,
    assignmentId: 'asg-today-01',
    patientId: 'pat-001',
    startedAt: '8:03 AM',
    startedTimestamp: Date.now() - (2 * 3600 + 35 * 60) * 1000,
    elapsedSeconds: 2 * 3600 + 35 * 60,
  });

  useEffect(() => {
    if (!activeShift?.isActive) return;
    const interval = setInterval(() => {
      setActiveShift(prev => {
        if (!prev) return null;
        return {
          ...prev,
          elapsedSeconds: prev.elapsedSeconds + 1,
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeShift?.isActive]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3200);
  };

  const setAppMode = (mode: AppMode) => {
    setAppModeState(mode);
    if (mode === 'customer') {
      setCurrentScreen('customer_home');
      setCustomerTabState('explore');
      showToast('Switched to Customer / Family Home Care Hiring');
    } else {
      setCurrentScreen('home');
      setActiveTabState('home');
      showToast('Switched to Caregiver Staff Field Operations');
    }
  };

  const setCustomerTab = (tab: CustomerTabId) => {
    setCustomerTabState(tab);
    switch (tab) {
      case 'explore':
        setCurrentScreen('customer_home');
        break;
      case 'caregivers':
        setCurrentScreen('customer_caregivers');
        break;
      case 'hire':
        setCurrentScreen('customer_hire_wizard');
        break;
      case 'active_care':
        setCurrentScreen('customer_active_care');
        break;
      case 'bookings':
        setCurrentScreen('customer_bookings_list');
        break;
      default:
        setCurrentScreen('customer_home');
    }
  };

  const navigateTo = (screen: ScreenId, addToStack = true) => {
    if (addToStack && screen !== currentScreen) {
      setScreenStack(prev => [...prev, currentScreen]);
    }
    setCurrentScreen(screen);

    // Sync tabs
    if (screen === 'customer_home') setCustomerTabState('explore');
    if (screen === 'customer_caregivers') setCustomerTabState('caregivers');
    if (screen === 'customer_hire_wizard') setCustomerTabState('hire');
    if (screen === 'customer_active_care') setCustomerTabState('active_care');
    if (screen === 'customer_bookings_list') setCustomerTabState('bookings');

    if (screen === 'home') setActiveTabState('home');
    if (screen === 'schedule') setActiveTabState('schedule');
    if (screen === 'patients') setActiveTabState('patients');
    if (screen === 'earnings') setActiveTabState('earnings');
    if (screen === 'profile') setActiveTabState('profile');
  };

  const goBack = () => {
    if (screenStack.length > 0) {
      const prev = screenStack[screenStack.length - 1];
      setScreenStack(s => s.slice(0, -1));
      setCurrentScreen(prev);
    } else {
      if (appMode === 'customer') {
        setCurrentScreen('customer_home');
        setCustomerTabState('explore');
      } else {
        setCurrentScreen('home');
        setActiveTabState('home');
      }
    }
  };

  const setActiveTab = (tab: BottomTabId) => {
    setActiveTabState(tab);
    setScreenStack(prev => [...prev, currentScreen]);
    setCurrentScreen(tab as ScreenId);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    showToast(lang === 'te' ? 'భాష తెలుగుకు మార్చబడింది' : 'Language set to English');
  };

  const updateHireDraft = (updates: Partial<HireWizardDraft>) => {
    setHireDraft(prev => ({ ...prev, ...updates }));
  };

  const submitHireBooking = (): HireBooking => {
    const srv = services.find(s => s.id === hireDraft.serviceId) || services[0];
    const cg = hirableCaregivers.find(c => c.id === hireDraft.selectedCaregiverId) || hirableCaregivers[0];
    const dailyRate = hireDraft.shiftType === '12h_day' || hireDraft.shiftType === '12h_night' ? srv.rates.shift12h : srv.rates.shift8h;
    const totalAmount = dailyRate * hireDraft.durationDays;

    const newBooking: HireBooking = {
      id: `book-${Date.now()}`,
      bookingRef: `CC-BK-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceId: srv.id,
      serviceTitle: srv.title,
      caregiverId: cg.id,
      caregiverName: cg.name,
      caregiverRole: cg.role,
      caregiverPhone: '+91 98480 22341',
      patientName: hireDraft.patientName,
      patientAge: Number(hireDraft.patientAge) || 72,
      patientGender: hireDraft.patientGender,
      conditionSummary: hireDraft.conditionSummary,
      address: hireDraft.address,
      locality: hireDraft.locality,
      city: hireDraft.city,
      shiftType: hireDraft.shiftType,
      startDate: hireDraft.startDate,
      durationDays: hireDraft.durationDays,
      status: 'confirmed',
      dailyRate,
      totalAmount,
      tasksRequired: hireDraft.tasksRequired,
      specialInstructions: hireDraft.specialInstructions,
      bookedAt: 'Today',
      liveUpdates: [
        { time: 'Just now', text: `Caregiver ${cg.name} booked and assigned by CareConnect Coordinator.`, category: 'Confirmed', isCompleted: true },
      ],
    };

    setHireBookings(prev => [newBooking, ...prev]);
    setActiveBookingId(newBooking.id);
    showToast(`Home care booked successfully for ${hireDraft.patientName}!`);
    navigateTo('customer_booking_confirmation');
    return newBooking;
  };

  const toggleAvailability = () => {
    setIsAvailable(prev => {
      const next = !prev;
      showToast(next ? 'Status: Available for Assignments' : 'Status: Unavailable');
      return next;
    });
  };

  const startCareShift = (assignmentId: string) => {
    const asg = assignments.find(a => a.id === assignmentId) || assignments[0];
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setAssignments(prev =>
      prev.map(a => (a.id === assignmentId ? { ...a, status: 'in_progress' } : a))
    );

    setActiveShift({
      isActive: true,
      assignmentId: asg.id,
      patientId: asg.patientId,
      startedAt: timeStr,
      startedTimestamp: Date.now(),
      elapsedSeconds: 0,
    });

    showToast(`Care shift started for ${asg.patientName}`);
    navigateTo('active_shift');
  };

  const endCareShift = () => {
    if (!activeShift) return;
    const asgId = activeShift.assignmentId;
    setAssignments(prev =>
      prev.map(a => (a.id === asgId ? { ...a, status: 'completed' } : a))
    );
    setActiveShift(null);
    showToast('Shift completed successfully. Daily summary generated.');
    navigateTo('home');
  };

  const acceptAssignment = (assignmentId: string) => {
    setAssignments(prev =>
      prev.map(a => (a.id === assignmentId ? { ...a, status: 'upcoming' } : a))
    );
    showToast('Assignment accepted successfully.');
    navigateTo('schedule');
  };

  const declineAssignment = (assignmentId: string, reason?: string) => {
    setAssignments(prev =>
      prev.map(a => (a.id === assignmentId ? { ...a, status: 'declined' } : a))
    );
    showToast(reason ? `Assignment declined (${reason})` : 'Assignment declined');
    goBack();
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus, note?: string) => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          return {
            ...t,
            status,
            note: note !== undefined ? note : t.note,
            completedAt: status === 'completed' ? nowStr : undefined,
          };
        }
        return t;
      })
    );

    showToast(`Task status updated: ${status.replace('_', ' ')}`);
  };

  const addVitalRecord = (record: {
    bloodPressureSys: number;
    bloodPressureDia: number;
    pulseBpm: number;
    temperatureF: number;
    bloodSugarMgDl?: number;
    oxygenSaturationSpO2?: number;
    notes?: string;
  }) => {
    const now = new Date();
    const timeStr = `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · Today`;
    const newRecord: VitalRecord = {
      id: `vit-${Date.now()}`,
      patientId: selectedPatientId,
      timestamp: timeStr,
      ...record,
      recordedBy: `${caregiver.name} (PCA)`,
    };
    setVitals(prev => [newRecord, ...prev]);

    // Also sync to active hire booking if exists
    setHireBookings(prev =>
      prev.map(b =>
        b.id === activeBookingId
          ? {
              ...b,
              latestVitals: {
                bp: `${record.bloodPressureSys}/${record.bloodPressureDia} mmHg`,
                pulse: record.pulseBpm,
                temp: record.temperatureF,
                time: timeStr,
              },
            }
          : b
      )
    );

    showToast('Vital reading saved and shared with family');
  };

  const addObservation = (obs: {
    feeling: PatientObservation['feeling'];
    mobility: PatientObservation['mobility'];
    appetite: PatientObservation['appetite'];
    comfort: PatientObservation['comfort'];
    notes: string;
  }) => {
    const now = new Date();
    const timeStr = `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · Today`;
    const newObs: PatientObservation = {
      id: `obs-${Date.now()}`,
      patientId: selectedPatientId,
      timestamp: timeStr,
      ...obs,
    };
    setObservations(prev => [newObs, ...prev]);
    showToast('Patient condition observation saved');
  };

  const sendFamilyUpdate = (category: FamilyUpdate['category'], message: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const update: FamilyUpdate = {
      id: `upd-${Date.now()}`,
      patientId: selectedPatientId,
      timestamp: `${timeStr} · Today`,
      category,
      message,
      sender: caregiver.name,
    };
    setFamilyUpdates(prev => [update, ...prev]);

    // Also push to active customer booking
    setHireBookings(prev =>
      prev.map(b =>
        b.id === activeBookingId
          ? {
              ...b,
              liveUpdates: [
                { time: timeStr, text: message, category, isCompleted: true },
                ...b.liveUpdates,
              ],
            }
          : b
      )
    );

    showToast('Family update sent to Priya Kumar');
  };

  const submitIncidentReport = (incident: {
    incidentType: IncidentReport['incidentType'];
    description: string;
    actionTaken: string;
    familyNotified: boolean;
    supportContacted: boolean;
  }) => {
    const now = new Date();
    const newReport: IncidentReport = {
      id: `inc-${Date.now()}`,
      patientId: selectedPatientId,
      patientName: currentPatient?.name || 'Lakshmi Devi',
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      location: currentPatient?.locality || 'Rajahmundry',
      ...incident,
      reportedAt: now.toISOString(),
    };
    setIncidentReports(prev => [newReport, ...prev]);
    showToast('Incident report submitted to CareConnect Clinical Desk');
  };

  const submitDailyReport = (caregiverNotes: string) => {
    showToast('Daily care report submitted successfully');
    navigateTo('home');
  };

  const requestReplacement = (reason: string, details: string) => {
    showToast(`Shift replacement requested (${reason}). Support notified.`);
    goBack();
  };

  const uploadDocument = (docId: string, documentNumber: string) => {
    setDocuments(prev =>
      prev.map(d =>
        d.id === docId
          ? { ...d, status: 'submitted', documentNumber, uploadedAt: 'Just now' }
          : d
      )
    );
    showToast('Document uploaded for verification');
  };

  const saveAvailability = (schedule: Record<string, { morning: boolean; afternoon: boolean; night: boolean }>) => {
    setAvailabilitySchedule(schedule);
    showToast('Weekly availability saved successfully');
    goBack();
  };

  const updateCaregiverProfile = (updates: Partial<CaregiverProfile>) => {
    setCaregiver(prev => ({ ...prev, ...updates }));
    showToast('Profile information updated');
    goBack();
  };

  const loginUser = (mobile: string) => {
    setIsLoggedIn(true);
    showToast('Signed in successfully');
    if (appMode === 'customer') {
      navigateTo('customer_home');
    } else {
      navigateTo('home');
    }
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    showToast('Logged out');
    navigateTo('login');
  };

  const t = (key: keyof typeof TRANSLATIONS['en']): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return (dict as any)[key] || TRANSLATIONS.en[key] || (key as string);
  };

  const currentPatient = patients.find(p => p.id === selectedPatientId) || patients[0];
  const currentAssignment = assignments.find(a => a.id === selectedAssignmentId) || assignments[0];
  const selectedService = services.find(s => s.id === selectedServiceId) || services[0];
  const selectedCaregiver = hirableCaregivers.find(c => c.id === selectedCaregiverId) || hirableCaregivers[0];
  const activeBooking = hireBookings.find(b => b.id === activeBookingId) || hireBookings[0];

  return (
    <AppContext.Provider
      value={{
        appMode,
        setAppMode,
        currentScreen,
        activeTab,
        customerTab,
        setCustomerTab,
        screenStack,
        language,
        isLoggedIn,
        toastMessage,
        deviceViewMode,
        services,
        selectedServiceId,
        setSelectedServiceId,
        hirableCaregivers,
        selectedCaregiverId,
        setSelectedCaregiverId,
        hireBookings,
        activeBookingId,
        setActiveBookingId,
        hireDraft,
        updateHireDraft,
        submitHireBooking,
        caregiver,
        isAvailable,
        activeShift,
        assignments,
        selectedAssignmentId,
        patients,
        selectedPatientId,
        tasks,
        selectedTaskId,
        vitals,
        observations,
        familyUpdates,
        incidentReports,
        documents,
        trainings,
        payments,
        notifications,
        availabilitySchedule,
        navigateTo,
        goBack,
        setActiveTab,
        setLanguage,
        setDeviceViewMode,
        setSelectedAssignmentId,
        setSelectedPatientId,
        setSelectedTaskId,
        showToast,
        toggleAvailability,
        startCareShift,
        endCareShift,
        acceptAssignment,
        declineAssignment,
        updateTaskStatus,
        addVitalRecord,
        addObservation,
        sendFamilyUpdate,
        submitIncidentReport,
        submitDailyReport,
        requestReplacement,
        uploadDocument,
        saveAvailability,
        updateCaregiverProfile,
        loginUser,
        logoutUser,
        t,
        currentPatient,
        currentAssignment,
        selectedService,
        selectedCaregiver,
        activeBooking,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
