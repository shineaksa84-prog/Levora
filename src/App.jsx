import { HashRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Layout from './components/layout/Layout';
import { LoadingScreen } from './components/ui/LoadingScreen';
import RoleBasedDashboard from './components/dashboard/RoleBasedDashboard';
import Candidates from './pages/Candidates';
import CandidateProfile from './features/candidates/CandidateProfile';
import Jobs from './pages/Jobs';
import Employees from './pages/Employees';
import EmployeeProfile from './features/employees/EmployeeProfile';
import Analytics from './pages/Analytics';
import AIHub from './pages/AIHub';
import Automation from './pages/Automation';
import Compliance from './pages/Compliance';
import Performance from './pages/Performance';
import Compensation from './pages/Compensation';
import Engagement from './pages/Engagement';
import Offboarding from './pages/Offboarding';
import Interviews from './pages/Interviews';
import Sourcing from './pages/Sourcing';
import TenantManagement from './features/admin/TenantManagement';
import Settings from './pages/Settings';
import Attendance from './pages/Attendance';
import EmployeeSelfService from './pages/EmployeeSelfService';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';

import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import ToastContainer from './components/ui/ToastContainer';

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <HashRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
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
              <Route path="sourcing" element={
                <ProtectedRoute allowedRoles={['admin', 'recruiter']}>
                  <Sourcing />
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
              <Route path="settings" element={
                <ProtectedRoute allowedRoles={['admin', 'hr_ops', 'payroll', 'recruiter', 'hiring_manager', 'employee']}>
                  <Settings />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </AuthProvider >
  );
}

export default App;
