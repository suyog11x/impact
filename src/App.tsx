import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';

import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';

import StudentDashboard from './pages/student/Dashboard';
import Profile from './pages/student/Profile';
import ResumeAnalyzer from './pages/student/ResumeAnalyzer';
import ResumeBuilder from './pages/student/ResumeBuilder';
import SkillGapAnalysis from './pages/student/SkillGapAnalysis';
import LearningRoadmap from './pages/student/LearningRoadmap';
import CodingProfiles from './pages/student/CodingProfiles';
import PlacementPrediction from './pages/student/PlacementPrediction';
import CompanyTracker from './pages/student/CompanyTracker';
import MockInterviews from './pages/student/MockInterviews';
import JobBoard from './pages/student/JobBoard';

import RecruiterDashboard from './pages/recruiter/Dashboard';
import CandidateSearch from './pages/recruiter/CandidateSearch';
import JDMatcher from './pages/recruiter/JDMatcher';
import Shortlisted from './pages/recruiter/Shortlisted';
import PostJob from './pages/recruiter/PostJob';

import AdminDashboard from './pages/admin/Dashboard';

import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/student" element={<DashboardLayout role="student"><StudentDashboard /></DashboardLayout>} />
        <Route path="/student/dashboard" element={<DashboardLayout role="student"><StudentDashboard /></DashboardLayout>} />
        <Route path="/student/profile" element={<DashboardLayout role="student"><Profile /></DashboardLayout>} />
        <Route path="/student/resume-analyzer" element={<DashboardLayout role="student"><ResumeAnalyzer /></DashboardLayout>} />
        <Route path="/student/resume-builder" element={<DashboardLayout role="student"><ResumeBuilder /></DashboardLayout>} />
        <Route path="/student/skill-gap" element={<DashboardLayout role="student"><SkillGapAnalysis /></DashboardLayout>} />
        <Route path="/student/roadmap" element={<DashboardLayout role="student"><LearningRoadmap /></DashboardLayout>} />
        <Route path="/student/coding-profiles" element={<DashboardLayout role="student"><CodingProfiles /></DashboardLayout>} />
        <Route path="/student/placement-prediction" element={<DashboardLayout role="student"><PlacementPrediction /></DashboardLayout>} />
        <Route path="/student/company-tracker" element={<DashboardLayout role="student"><CompanyTracker /></DashboardLayout>} />
        <Route path="/student/mock-interviews" element={<DashboardLayout role="student"><MockInterviews /></DashboardLayout>} />
        <Route path="/student/jobs" element={<DashboardLayout role="student"><JobBoard /></DashboardLayout>} />

        <Route path="/recruiter/dashboard" element={<DashboardLayout role="recruiter"><RecruiterDashboard /></DashboardLayout>} />
        <Route path="/recruiter/search" element={<DashboardLayout role="recruiter"><CandidateSearch /></DashboardLayout>} />
        <Route path="/recruiter/job-matching" element={<DashboardLayout role="recruiter"><JDMatcher /></DashboardLayout>} />
        <Route path="/recruiter/shortlisted" element={<DashboardLayout role="recruiter"><Shortlisted /></DashboardLayout>} />
        <Route path="/recruiter/post-job" element={<DashboardLayout role="recruiter"><PostJob /></DashboardLayout>} />

        <Route path="/admin/dashboard" element={<DashboardLayout role="admin"><AdminDashboard /></DashboardLayout>} />

        <Route path="/notifications" element={<DashboardLayout><Notifications /></DashboardLayout>} />
        <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
