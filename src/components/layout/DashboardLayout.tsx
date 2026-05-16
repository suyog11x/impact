import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: 'student' | 'recruiter' | 'admin';
}

export default function DashboardLayout({ children, role = 'student' }: DashboardLayoutProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-lime/30 border-t-lime rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-black">
      <Sidebar role={role} />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="pl-[244px] pr-6 pt-24 pb-8 transition-all duration-300"
      >
        <div className="max-w-[1400px] mx-auto">{children}</div>
      </motion.main>
    </div>
  );
}
