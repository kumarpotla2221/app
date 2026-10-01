/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MobileContainer } from './components/common/MobileContainer';
import { Toast } from './components/common/Toast';

// Customer / Family Hiring Screens
import { CustomerHomeScreen } from './components/screens/customer/CustomerHomeScreen';
import { CustomerServicesScreen } from './components/screens/customer/CustomerServicesScreen';
import { CustomerCaregiversScreen } from './components/screens/customer/CustomerCaregiversScreen';
import { CustomerCaregiverProfileScreen } from './components/screens/customer/CustomerCaregiverProfileScreen';
import { CustomerHireWizardScreen } from './components/screens/customer/CustomerHireWizardScreen';
import { CustomerBookingConfirmationScreen } from './components/screens/customer/CustomerBookingConfirmationScreen';
import { CustomerActiveCareScreen } from './components/screens/customer/CustomerActiveCareScreen';
import { CustomerBookingsListScreen } from './components/screens/customer/CustomerBookingsListScreen';

// Caregiver Field Screens
import { SplashScreen } from './components/screens/SplashScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { OtpScreen } from './components/screens/OtpScreen';
import { ProfileSetupScreen } from './components/screens/ProfileSetupScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { ScheduleScreen } from './components/screens/ScheduleScreen';
import { AssignmentDetailsScreen } from './components/screens/AssignmentDetailsScreen';
import { NavigationScreen } from './components/screens/NavigationScreen';
import { ArrivalScreen } from './components/screens/ArrivalScreen';
import { StartCareScreen } from './components/screens/StartCareScreen';
import { CarePlanScreen } from './components/screens/CarePlanScreen';
import { TaskDetailsScreen } from './components/screens/TaskDetailsScreen';
import { VitalsScreen } from './components/screens/VitalsScreen';
import { ConditionCheckScreen } from './components/screens/ConditionCheckScreen';
import { DailyReportScreen } from './components/screens/DailyReportScreen';
import { FamilyCommScreen } from './components/screens/FamilyCommScreen';
import { CareUpdateScreen } from './components/screens/CareUpdateScreen';
import { EmergencyScreen } from './components/screens/EmergencyScreen';
import { IncidentReportScreen } from './components/screens/IncidentReportScreen';
import { PatientsScreen } from './components/screens/PatientsScreen';
import { PatientProfileScreen } from './components/screens/PatientProfileScreen';
import { AvailabilityScreen } from './components/screens/AvailabilityScreen';
import { AssignmentRequestScreen } from './components/screens/AssignmentRequestScreen';
import { ActiveShiftScreen } from './components/screens/ActiveShiftScreen';
import { EndShiftScreen } from './components/screens/EndShiftScreen';
import { EarningsScreen } from './components/screens/EarningsScreen';
import { PaymentDetailsScreen } from './components/screens/PaymentDetailsScreen';
import { NotificationsScreen } from './components/screens/NotificationsScreen';
import { SupportScreen } from './components/screens/SupportScreen';
import { ReplacementRequestScreen } from './components/screens/ReplacementRequestScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { TrainingScreen } from './components/screens/TrainingScreen';
import { DocumentsScreen } from './components/screens/DocumentsScreen';
import { ProfileEditScreen } from './components/screens/ProfileEditScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { NotificationSettingsScreen } from './components/screens/NotificationSettingsScreen';
import { EmptyStatesScreen } from './components/screens/EmptyStatesScreen';
import { ErrorStatesScreen } from './components/screens/ErrorStatesScreen';
import { LocationPermissionScreen } from './components/screens/LocationPermissionScreen';
import { CameraPermissionScreen } from './components/screens/CameraPermissionScreen';
import { ShiftReminderScreen } from './components/screens/ShiftReminderScreen';
import { DesignSystemScreen } from './components/screens/DesignSystemScreen';

const ScreenRouter: React.FC = () => {
  const { currentScreen, isLoggedIn, appMode } = useApp();

  // If logged out and on auth screen, show login
  if (!isLoggedIn && !['splash', 'login', 'otp', 'profile_setup'].includes(currentScreen)) {
    return <LoginScreen />;
  }

  switch (currentScreen) {
    // Customer / Family Hiring Screens
    case 'customer_home':
      return <CustomerHomeScreen />;
    case 'customer_services':
    case 'customer_pricing_plans':
      return <CustomerServicesScreen />;
    case 'customer_caregivers':
      return <CustomerCaregiversScreen />;
    case 'customer_caregiver_profile':
      return <CustomerCaregiverProfileScreen />;
    case 'customer_hire_wizard':
      return <CustomerHireWizardScreen />;
    case 'customer_booking_confirmation':
      return <CustomerBookingConfirmationScreen />;
    case 'customer_active_care':
      return <CustomerActiveCareScreen />;
    case 'customer_bookings_list':
      return <CustomerBookingsListScreen />;
    case 'customer_support':
      return <SupportScreen />;

    // Caregiver Field Screens
    case 'splash':
      return <SplashScreen />;
    case 'login':
      return <LoginScreen />;
    case 'otp':
      return <OtpScreen />;
    case 'profile_setup':
      return <ProfileSetupScreen />;
    case 'home':
      return <HomeScreen />;
    case 'schedule':
      return <ScheduleScreen />;
    case 'assignment_details':
      return <AssignmentDetailsScreen />;
    case 'navigation':
      return <NavigationScreen />;
    case 'arrival':
      return <ArrivalScreen />;
    case 'start_care':
      return <StartCareScreen />;
    case 'care_plan':
      return <CarePlanScreen />;
    case 'task_details':
      return <TaskDetailsScreen />;
    case 'vitals':
      return <VitalsScreen />;
    case 'condition_check':
      return <ConditionCheckScreen />;
    case 'daily_report':
      return <DailyReportScreen />;
    case 'family_comm':
      return <FamilyCommScreen />;
    case 'care_update':
      return <CareUpdateScreen />;
    case 'emergency':
      return <EmergencyScreen />;
    case 'incident_report':
      return <IncidentReportScreen />;
    case 'patients':
      return <PatientsScreen />;
    case 'patient_profile':
      return <PatientProfileScreen />;
    case 'availability':
      return <AvailabilityScreen />;
    case 'assignment_request':
      return <AssignmentRequestScreen />;
    case 'active_shift':
      return <ActiveShiftScreen />;
    case 'end_shift':
      return <EndShiftScreen />;
    case 'earnings':
      return <EarningsScreen />;
    case 'payment_details':
      return <PaymentDetailsScreen />;
    case 'notifications':
      return <NotificationsScreen />;
    case 'support':
      return <SupportScreen />;
    case 'replacement_request':
      return <ReplacementRequestScreen />;
    case 'profile':
      return <ProfileScreen />;
    case 'training':
      return <TrainingScreen />;
    case 'documents':
      return <DocumentsScreen />;
    case 'profile_edit':
      return <ProfileEditScreen />;
    case 'settings':
      return <SettingsScreen />;
    case 'notification_settings':
      return <NotificationSettingsScreen />;
    case 'empty_states':
      return <EmptyStatesScreen />;
    case 'error_states':
      return <ErrorStatesScreen />;
    case 'location_permission':
      return <LocationPermissionScreen />;
    case 'camera_permission':
      return <CameraPermissionScreen />;
    case 'shift_reminder':
      return <ShiftReminderScreen />;
    case 'design_system':
      return <DesignSystemScreen />;

    default:
      return appMode === 'customer' ? <CustomerHomeScreen /> : <HomeScreen />;
  }
};

export default function App() {
  return (
    <AppProvider>
      <MobileContainer>
        <ScreenRouter />
        <Toast />
      </MobileContainer>
    </AppProvider>
  );
}
