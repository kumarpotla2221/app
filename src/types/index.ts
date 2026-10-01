export type Language = 'en' | 'te';
export type AppMode = 'customer' | 'caregiver';

export type ScreenId =
  // Customer / Family Hiring Screens
  | 'customer_home'
  | 'customer_services'
  | 'customer_caregivers'
  | 'customer_caregiver_profile'
  | 'customer_hire_wizard'
  | 'customer_booking_confirmation'
  | 'customer_active_care'
  | 'customer_bookings_list'
  | 'customer_support'
  | 'customer_pricing_plans'
  // Caregiver Field Screens
  | 'splash'
  | 'login'
  | 'otp'
  | 'profile_setup'
  | 'home'
  | 'schedule'
  | 'patients'
  | 'earnings'
  | 'profile'
  | 'assignment_details'
  | 'navigation'
  | 'arrival'
  | 'start_care'
  | 'care_plan'
  | 'task_details'
  | 'vitals'
  | 'condition_check'
  | 'daily_report'
  | 'family_comm'
  | 'care_update'
  | 'emergency'
  | 'incident_report'
  | 'patient_profile'
  | 'availability'
  | 'assignment_request'
  | 'active_shift'
  | 'end_shift'
  | 'payment_details'
  | 'notifications'
  | 'support'
  | 'replacement_request'
  | 'training'
  | 'documents'
  | 'profile_edit'
  | 'settings'
  | 'notification_settings'
  | 'empty_states'
  | 'error_states'
  | 'location_permission'
  | 'camera_permission'
  | 'shift_reminder'
  | 'design_system';

export type CustomerTabId = 'explore' | 'caregivers' | 'hire' | 'active_care' | 'bookings';
export type BottomTabId = 'home' | 'schedule' | 'patients' | 'earnings' | 'profile';

export interface CareService {
  id: string;
  title: string;
  category: 'elderly' | 'patient_attendant' | 'post_operative' | 'bedridden' | 'dementia' | 'nursing' | 'physiotherapy';
  tagline: string;
  description: string;
  startingPrice: number;
  rateUnit: string;
  rates: {
    singleVisit: number;
    shift8h: number;
    shift12h: number;
    monthlyPlan: number;
  };
  recommendedFor: string[];
  includedTasks: string[];
  caregiverQualification: string;
  popular?: boolean;
}

export interface HirableCaregiver {
  id: string;
  name: string;
  role: string;
  qualification: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  gender: 'Female' | 'Male';
  city: string;
  locality: string;
  languages: string[];
  specializations: string[];
  availableToday: boolean;
  ratePerDay8h: number;
  ratePerDay12h: number;
  policeVerified: boolean;
  medicalFitnessVerified: boolean;
  careconnectCertified: boolean;
  bio: string;
  reviews: {
    id: string;
    familyMember: string;
    patientRelation: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export interface HireBooking {
  id: string;
  bookingRef: string;
  serviceId: string;
  serviceTitle: string;
  caregiverId: string;
  caregiverName: string;
  caregiverRole: string;
  caregiverPhone: string;
  patientName: string;
  patientAge: number;
  patientGender: 'Female' | 'Male';
  conditionSummary: string;
  address: string;
  locality: string;
  city: string;
  shiftType: '8h_day' | '12h_day' | '12h_night' | '24h_livein' | 'single_visit';
  startDate: string;
  durationDays: number;
  status: 'active_today' | 'confirmed' | 'completed' | 'requested';
  totalAmount: number;
  dailyRate: number;
  tasksRequired: string[];
  specialInstructions: string;
  bookedAt: string;
  liveUpdates: {
    time: string;
    text: string;
    category: string;
    isCompleted: boolean;
  }[];
  latestVitals?: {
    bp: string;
    pulse: number;
    temp: number;
    time: string;
  };
}

export type AssignmentStatus = 'upcoming' | 'in_progress' | 'completed' | 'offered' | 'declined';

export type TaskStatus = 'pending' | 'completed' | 'skipped' | 'not_required' | 'needs_support';

export interface CareTask {
  id: string;
  period: 'morning' | 'afternoon' | 'evening';
  title: string;
  category: 'hygiene' | 'meals' | 'medication' | 'mobility' | 'vitals' | 'comfort';
  scheduledTime: string;
  status: TaskStatus;
  instruction: string;
  note?: string;
  completedAt?: string;
}

export interface VitalRecord {
  id: string;
  patientId: string;
  timestamp: string;
  bloodPressureSys: number;
  bloodPressureDia: number;
  pulseBpm: number;
  temperatureF: number;
  bloodSugarMgDl?: number;
  oxygenSaturationSpO2?: number;
  recordedBy: string;
  notes?: string;
}

export interface PatientObservation {
  id: string;
  patientId: string;
  timestamp: string;
  feeling: 'Good' | 'Okay' | 'Needs Attention';
  mobility: 'Normal' | 'Limited' | 'Needs Assistance';
  appetite: 'Good' | 'Reduced' | 'Poor';
  comfort: 'Comfortable' | 'Mild discomfort' | 'Significant discomfort';
  notes: string;
}

export interface FamilyUpdate {
  id: string;
  patientId: string;
  timestamp: string;
  category: 'Meal' | 'Medication Reminder' | 'Mobility' | 'Mood' | 'General Care' | 'Other';
  message: string;
  sender: string;
}

export interface IncidentReport {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  location: string;
  incidentType: 'Fall' | 'Injury' | 'Change in Condition' | 'Medication Issue' | 'Patient Distress' | 'Other';
  description: string;
  actionTaken: string;
  familyNotified: boolean;
  supportContacted: boolean;
  reportedAt: string;
}

export interface DocumentVerification {
  id: string;
  title: string;
  description: string;
  status: 'verified' | 'pending' | 'submitted' | 'rejected';
  documentNumber?: string;
  expiryDate?: string;
  uploadedAt?: string;
}

export interface TrainingCertificate {
  id: string;
  title: string;
  issuer: string;
  completedDate: string;
  expiryDate: string;
  renewalRequired: boolean;
  status: 'completed' | 'in_progress' | 'renewal_due';
}

export interface PaymentRecord {
  id: string;
  assignmentId: string;
  patientName: string;
  date: string;
  hours: number;
  baseEarnings: number;
  additionalEarnings: number;
  adjustments: number;
  total: number;
  status: 'paid' | 'pending';
  serviceType: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  careType: string;
  address: string;
  locality: string;
  city: string;
  distanceKm: number;
  estimatedTravelMins: number;
  familyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  careRequirements: string[];
  specialInstructions: string[];
  allergies: string[];
  prescribedScheduleNote: string;
  status: 'active' | 'upcoming' | 'completed';
}

export interface Assignment {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  careType: string;
  date: string;
  timeRange: string;
  startTime: string;
  endTime: string;
  location: string;
  address: string;
  status: AssignmentStatus;
  estimatedEarnings: number;
  distanceKm: number;
  estimatedMinutes: number;
  tasksCount: number;
  completedTasksCount: number;
}

export interface CaregiverProfile {
  name: string;
  role: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  languages: string[];
  experienceYears: number;
  qualification: string;
  caregiverType: string;
  isVerified: boolean;
  verificationBadge: string;
  bankDetails: {
    bankName: string;
    accountEnding: string;
    ifsc: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface AppNotification {
  id: string;
  category: 'Assignments' | 'Schedule' | 'Patient Updates' | 'Payments' | 'Support' | 'Verification';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  actionScreen?: ScreenId;
}
