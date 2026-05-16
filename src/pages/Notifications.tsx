import { motion } from 'framer-motion';
import { Bell, AlertTriangle, Clock, Lightbulb, CheckCheck } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import { notifications } from '../data/dummy';

const typeConfig = {
  recommendation: { icon: Lightbulb, color: 'text-lime', badge: 'RECOMMENDATION' },
  alert: { icon: AlertTriangle, color: 'text-amber-400', badge: 'ALERT' },
  deadline: { icon: Clock, color: 'text-red-400', badge: 'DEADLINE' },
};

export default function Notifications() {
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold tracking-tight text-text-primary">Notifications</h1>
            <p className="text-text-secondary font-body mt-1">Stay updated with recommendations, alerts, and deadlines</p>
          </div>
          <div className="relative">
            <Bell size={24} className="text-lime" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-lime text-black text-xs font-mono font-bold rounded-full flex items-center justify-center">
                {unread}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <div className="flex gap-3 mb-6">
        <button className="px-4 py-2 bg-lime text-black text-sm font-body font-medium rounded-full">All</button>
        <button className="px-4 py-2 glass text-sm font-body text-text-secondary rounded-full hover:text-text-primary transition-colors">Unread</button>
        <button className="px-4 py-2 glass text-sm font-body text-text-secondary rounded-full hover:text-text-primary transition-colors">Archive</button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification, idx) => {
          const config = typeConfig[notification.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <GlassCard className={`flex items-start gap-4 ${!notification.read ? 'border-lime/20' : ''}`}>
                <div className={`w-10 h-10 rounded-xl glass flex items-center justify-center ${config.color} shrink-0`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading font-medium text-text-primary text-sm">{notification.title}</h3>
                    <Badge>{config.badge}</Badge>
                    {!notification.read && <span className="w-2 h-2 rounded-full bg-lime pulse-dot" />}
                  </div>
                  <p className="text-sm font-body text-text-secondary">{notification.message}</p>
                  <p className="text-xs font-mono text-muted mt-1">{notification.date}</p>
                </div>
                <CheckCheck size={16} className={`shrink-0 mt-1 ${notification.read ? 'text-lime' : 'text-muted'}`} />
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
