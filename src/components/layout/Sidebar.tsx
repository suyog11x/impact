import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, User, FileText, Target, Route, Code, TrendingUp, Mic,
  Building2, Bell, Settings, LogOut, ChevronLeft, ChevronRight, PenLine,
  Search, FileSearch, ClipboardList, Briefcase
} from 'lucide-react';

const studentItems = [
  { path: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/student/profile', label: 'Profile', icon: User },
  { path: '/student/resume-analyzer', label: 'Resume Analyzer', icon: FileText },
  { path: '/student/resume-builder', label: 'Resume Builder', icon: PenLine },
  { path: '/student/skill-gap', label: 'Skill Gap Analysis', icon: Target },
  { path: '/student/roadmap', label: 'Learning Roadmap', icon: Route },
  { path: '/student/coding-profiles', label: 'Coding Profiles', icon: Code },
  { path: '/student/placement-prediction', label: 'Placement Prediction', icon: TrendingUp },
  { path: '/student/mock-interviews', label: 'Mock Interviews', icon: Mic },
  { path: '/student/company-tracker', label: 'Company Tracker', icon: Building2 },
  { path: '/student/jobs', label: 'Job Board', icon: Briefcase },
];

const recruiterItems = [
  { path: '/recruiter/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/recruiter/search', label: 'Search Candidates', icon: Search },
  { path: '/recruiter/job-matching', label: 'Job Matching', icon: FileSearch },
  { path: '/recruiter/shortlisted', label: 'Shortlisted', icon: ClipboardList },
];

const bottomItems = [
  { path: '/notifications', label: 'Notifications', icon: Bell },
  { path: '/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  role?: 'student' | 'recruiter' | 'admin';
}

export default function Sidebar({ role = 'student' }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<{ label: string; rect: DOMRect } | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const items = role === 'recruiter' ? recruiterItems : studentItems;
  const filteredBottomItems = role === 'recruiter' 
    ? bottomItems.filter(i => i.path === '/settings') 
    : bottomItems;

  const handleMouseEnter = (label: string, e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (collapsed) {
      const rect = e.currentTarget.getBoundingClientRect();
      setHoveredItem({ label, rect });
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed left-3 top-24 bottom-3 z-40 flex flex-col glass-strong transition-all duration-300 ${collapsed ? 'w-[68px]' : 'w-[220px]'}`}
    >
      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1 scrollbar-none">
        {items.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onMouseEnter={(e) => handleMouseEnter(item.label, e)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  active ? 'bg-lime/10 text-lime border border-lime/20' : 'text-text-secondary hover:text-text-primary hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && <span className="font-body text-sm tracking-tight whitespace-nowrap">{item.label}</span>}
              </div>
            </Link>
          );
        })}
      </div>

      <hr className="border-white/5 mx-3" />

      <div className="py-3 px-2 space-y-1">
        {filteredBottomItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onMouseEnter={(e) => handleMouseEnter(item.label, e)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  active ? 'bg-lime/10 text-lime' : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                }`}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && <span className="font-body text-sm tracking-tight">{item.label}</span>}
              </div>
            </Link>
          );
        })}
        <button
          onClick={async () => { await signOut(); navigate('/login'); }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-secondary hover:text-red-400 hover:bg-white/5 w-full transition-colors"
          onMouseEnter={(e) => handleMouseEnter('Logout', e)}
          onMouseLeave={handleMouseLeave}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span className="font-body text-sm tracking-tight">Logout</span>}
        </button>
      </div>

      {collapsed && hoveredItem && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.15 }}
          className="fixed z-50 px-3 py-1.5 text-sm font-medium text-white bg-gray-800 rounded-md shadow-lg pointer-events-none whitespace-nowrap"
          style={{
            top: hoveredItem.rect.top + hoveredItem.rect.height / 2 - 15, // Center vertically
            left: hoveredItem.rect.right + 10, // 10px to the right of the icon
          }}
        >
          {hoveredItem.label}
        </motion.div>
      )}

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 glass rounded-full flex items-center justify-center text-text-secondary hover:text-lime transition-colors"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.aside>
  );
}
