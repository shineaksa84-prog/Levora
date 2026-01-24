import { HashRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Layout from './components/layout/Layout';
import { LoadingScreen } from './components/ui/LoadingScreen';
import ErrorBoundary from './components/ErrorBoundary';

const RoleBasedDashboard = lazy(() => import('./components/dashboard/RoleBasedDashboard'));
const Candidates = lazy(() => import('./pages/Candidates'));
const CandidateProfile = lazy(() => import('./features/candidates/CandidateProfile'));
const Jobs = lazy(() => import('./pages/Jobs'));
const Employees = lazy(() => import('./pages/Employees'));
const EmployeeProfile = lazy(() => import('./features/employees/EmployeeProfile'));

const Analytics = lazy(() => import('./pages/Analytics'));
const AIHub = lazy(() => import('./pages/AIHub'));
const Automation = lazy(() => import('./pages/Automation'));
const Compliance = lazy(() => import('./pages/Compliance'));
const Performance = lazy(() => import('./pages/Performance'));
const Compensation = lazy(() => import('./pages/Compensation'));
const Engagement = lazy(() => import('./pages/Engagement'));
const Offboarding = lazy(() => import('./pages/Offboarding'));
const Interviews = lazy(() => import('./pages/Interviews'));
const Approvals = lazy(() => import('./pages/Approvals'));
const Sourcing = lazy(() => import('./pages/Sourcing'));
const Attendance = lazy(() => import('./pages/Attendance'));
const EmployeeSelfService = lazy(() => import('./pages/EmployeeSelfService'));
const AttritionRisk = lazy(() => import('./pages/AttritionRisk'));
const AdminToolkit = lazy(() => import('./pages/AdminToolkit'));
const Settings = lazy(() => import('./pages/Settings'));
const RecruitmentExcellence = lazy(() => import('./pages/RecruitmentExcellence'));

const TenantManagement = lazy(() => import('./features/admin/TenantManagement'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const OnboardingWizard = lazy(() => import('./pages/OnboardingWizard'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// IT / Admin Features
const Assets = lazy(() => import('./pages/Assets'));
const Systems = lazy(() => import('./pages/Systems'));
const Security = lazy(() => import('./pages/Security'));
const TicketManager = lazy(() => import('./features/services/TicketManager'));
const UserRoleManager = lazy(() => import('./features/admin/UserRoleManager'));
const Careers = lazy(() => import('./pages/public/Careers'));
const JobDetail = lazy(() => import('./pages/public/JobDetail'));
const Intelligence = lazy(() => import('./pages/public/Intelligence'));
const Orchestration = lazy(() => import('./pages/public/Orchestration'));
const VendorLogin = lazy(() => import('./features/vendor/VendorLogin'));
const VendorDashboard = lazy(() => import('./features/vendor/VendorDashboard'));
const SuperAdminDashboard = lazy(() => import('./features/admin/SuperAdminDashboard'));
const CandidateChatbot = lazy(() => import('./features/recruitment/CandidateChatbot'));

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import ToastContainer from './components/ui/ToastContainer';
import NotificationToaster from './components/ui/NotificationToaster';
import { realtimeService } from './lib/services/realtimeService';

import useStore from './store/useStore';

/**
 * NeuralBridge handles the lifecycle of real-time listeners.
 * It connects the Firebase stream to the global Zustand store.
 */
function NeuralBridge() {
  const { user, loading } = useAuth();
  const setUserProfile = useStore(state => state.setUserProfile);

  useEffect(() => {
    if (user && !loading) {
      setUserProfile(user);
      realtimeService.initMetricsListeners();
    }
    return () => {
      realtimeService.cleanup();
    };
  }, [user, loading, setUserProfile]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <NeuralBridge />
      <ToastContainer />
      <NotificationToaster />
      <Suspense fallback={<LoadingScreen />}>
        <CandidateChatbot />
        <HashRouter>
          <ErrorBoundary>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/onboarding" element={<OnboardingWizard />} />
                {/* Public Career Pages */}
                <Route path="/careers" element={<Careers />} />
                <Route path="/careers/:id" element={<JobDetail />} />
                {/* Feature Pages */}
                <Route path="/intelligence" element={<Intelligence />} />
                <Route path="/orchestration" element={<Orchestration />} />
                {/* Agency Portal Routes */}
                <Route path="/agency/login" element={<VendorLogin />} />
                <Route path="/agency/app" element={<VendorDashboard />} />

                <Route path="/app" element={<Layout />}>
                  <Route index element={<RoleBasedDashboard />} />
                  <Route path="tenants" element={
                    <ProtectedRoute allowedRoles={['super_admin']}>
                      <TenantManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="candidates" element={
                    <ProtectedRoute allowedRoles={['admin', 'recruiter', 'hiring_manager']}>
                      <Candidates />
                    </ProtectedRoute>
                  } />
                  <Route path="candidates/:id" element={
                    <ProtectedRoute allowedRoles={['admin', 'recruiter', 'hiring_manager']}>
                      <CandidateProfile />
                    </ProtectedRoute>
                  } />
                  <Route path="jobs" element={
                    <ProtectedRoute allowedRoles={['admin', 'recruiter', 'hiring_manager']}>
                      <Jobs />
                    </ProtectedRoute>
                  } />
                  <Route path="employees" element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_ops', 'hiring_manager', 'payroll']}>
                      <Employees />
                    </ProtectedRoute>
                  } />
                  <Route path="employees/:id" element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_ops', 'hiring_manager', 'payroll']}>
                      <EmployeeProfile />
                    </ProtectedRoute>
                  } />
                  <Route path="analytics" element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_ops', 'recruiter', 'hiring_manager', 'payroll']}>
                      <Analytics />
                    </ProtectedRoute>
                  } />
                  <Route path="attrition-risk" element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_ops']}>
                      <AttritionRisk />
                    </ProtectedRoute>
                  } />
                  <Route path="ai-hub" element={
                    <ProtectedRoute allowedRoles={['admin', 'recruiter', 'hr_ops']}>
                      <AIHub />
                    </ProtectedRoute>
                  } />
                  <Route path="automation" element={
                    <ProtectedRoute allowedRoles={['admin', 'recruiter', 'hr_ops']}>
                      <Automation />
                    </ProtectedRoute>
                  } />
                  <Route path="compliance" element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_ops', 'payroll']}>
                      <Compliance />
                    </ProtectedRoute>
                  } />
                  <Route path="performance" element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_ops', 'hiring_manager', 'employee']}>
                      <Performance />
                    </ProtectedRoute>
                  } />
                  <Route path="compensation" element={
                    <ProtectedRoute allowedRoles={['admin', 'payroll', 'employee']}>
                      <Compensation />
                    </ProtectedRoute>
                  } />
                  <Route path="engagement" element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_ops', 'employee']}>
                      <Engagement />
                    </ProtectedRoute>
                  } />
                  <Route path="offboarding" element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_ops', 'hiring_manager']}>
                      <Offboarding />
                    </ProtectedRoute>
                  } />
                  <Route path="interviews" element={
                    <ProtectedRoute allowedRoles={['admin', 'recruiter', 'hiring_manager']}>
                      <Interviews />
                    </ProtectedRoute>
                  } />
                  <Route path="approvals" element={
                    <ProtectedRoute allowedRoles={['hiring_manager', 'admin']}>
                      <Approvals />
                    </ProtectedRoute>
                  } />
                  <Route path="sourcing" element={
                    <ProtectedRoute allowedRoles={['admin', 'recruiter']}>
                      <Sourcing />
                    </ProtectedRoute>
                  } />
                  <Route path="recruitment-excellence" element={
                    <ProtectedRoute allowedRoles={['admin', 'recruiter', 'hiring_manager']}>
                      <RecruitmentExcellence />
                    </ProtectedRoute>
                  } />
                  <Route path="attendance" element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_ops', 'hiring_manager', 'employee']}>
                      <Attendance />
                    </ProtectedRoute>
                  } />
                  <Route path="self-service" element={
                    <ProtectedRoute allowedRoles={['employee', 'admin', 'hr_ops']}>
                      <EmployeeSelfService />
                    </ProtectedRoute>
                  } />
                  <Route path="toolkit" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminToolkit />
                    </ProtectedRoute>
                  } />
                  <Route path="settings" element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_ops', 'recruiter', 'hiring_manager', 'employee', 'it_admin']}>
                      <Settings />
                    </ProtectedRoute>
                  } />
                  {/* IT Admin Routes */}
                  <Route path="assets" element={
                    <ProtectedRoute allowedRoles={['it_admin', 'super_admin']}>
                      <Assets />
                    </ProtectedRoute>
                  } />
                  <Route path="systems" element={
                    <ProtectedRoute allowedRoles={['it_admin', 'super_admin']}>
                      <Systems />
                    </ProtectedRoute>
                  } />
                  <Route path="security" element={
                    <ProtectedRoute allowedRoles={['it_admin', 'super_admin']}>
                      <Security />
                    </ProtectedRoute>
                  } />
                  <Route path="tickets" element={
                    <ProtectedRoute allowedRoles={['it_admin', 'admin', 'hr_ops']}>
                      <TicketManager />
                    </ProtectedRoute>
                  } />
                  <Route path="admin-users" element={
                    <ProtectedRoute allowedRoles={['it_admin', 'super_admin', 'admin']}>
                      <UserRoleManager />
                    </ProtectedRoute>
                  } />
                  <Route path="super-admin" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <SuperAdminDashboard />
                    </ProtectedRoute>
                  } />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </HashRouter>
      </Suspense>
    </AuthProvider >
  );
}

export default App;
