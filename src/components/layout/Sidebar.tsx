import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
      className={`fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-bg-card border-r border-border transition-all duration-300 ${collapsed ? 'w-[68px]' : 'w-[260px]'}`}
    >
      <div className="px-6 py-6 border-b border-border">
        <Link to="/" className="flex flex-col">
          <span className="font-heading text-2xl text-text-primary">SkillSync</span>
          {!collapsed && <span className="premium-label mt-1">AI Platform</span>}
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
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
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 touch-manipulation ${
                  active 
                    ? 'bg-gold/10 text-gold font-medium' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                }`}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && <span className="font-body text-sm tracking-wide whitespace-nowrap">{item.label}</span>}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="border-t border-border mx-3" />

      <div className="py-3 px-3 space-y-1">
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
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 touch-manipulation ${
                  active 
                    ? 'bg-gold/10 text-gold font-medium' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                }`}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && <span className="font-body text-sm tracking-wide">{item.label}</span>}
              </div>
            </Link>
          );
        })}
        <button
          onClick={async () => { await signOut(); navigate('/login'); }}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-text-secondary hover:text-danger hover:bg-danger/10 w-full transition-colors touch-manipulation"
          onMouseEnter={(e) => handleMouseEnter('Logout', e)}
          onMouseLeave={handleMouseLeave}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span className="font-body text-sm tracking-wide">Logout</span>}
        </button>
      </div>

      <AnimatePresence>
        {collapsed && hoveredItem && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed z-50 px-3 py-1.5 text-sm font-medium text-text-primary bg-bg-elevated border border-border rounded-lg shadow-lg pointer-events-none whitespace-nowrap"
            style={{
              top: hoveredItem.rect.top + hoveredItem.rect.height / 2 - 15,
              left: hoveredItem.rect.right + 10,
            }}
          >
            {hoveredItem.label}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-24 w-6 h-6 bg-bg-card border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-gold transition-colors"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.aside>
  );
}
