import { motion } from 'framer-motion';
import { Bell, AlertTriangle, Clock, Lightbulb, CheckCheck } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import { notifications } from '../data/dummy';

const typeConfig = {
  recommendation: { icon: Lightbulb, color: 'text-gold', badge: 'Recommendation' },
  alert: { icon: AlertTriangle, color: 'text-warning', badge: 'Alert' },
  deadline: { icon: Clock, color: 'text-danger', badge: 'Deadline' },
};

export default function Notifications() {
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <div className="flex items-center justify-between">
          <div>
            <p className="premium-label mb-4">Updates</p>
            <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight text-text-primary">Notifications</h1>
            <p className="text-text-secondary font-body mt-3 text-lg">Stay updated with recommendations, alerts, and deadlines</p>
          </div>
          <div className="relative">
            <Bell size={24} className="text-gold" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-black text-xs font-body font-bold rounded-full flex items-center justify-center">
                {unread}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <div className="flex gap-3 mb-6">
        <button className="px-4 py-2 bg-gold text-black text-sm font-body font-semibold rounded-full">All</button>
        <button className="px-4 py-2 bg-bg-card text-sm font-body text-text-secondary rounded-full hover:text-text-primary transition-colors">Unread</button>
        <button className="px-4 py-2 bg-bg-card text-sm font-body text-text-secondary rounded-full hover:text-text-primary transition-colors">Archive</button>
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
              <GlassCard className={`p-6 flex items-start gap-4 ${!notification.read ? 'border-t-2 border-t-gold' : ''}`}>
                <div className={`w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center ${config.color} shrink-0`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading text-text-primary">{notification.title}</h3>
                    <Badge variant={notification.type === 'recommendation' ? 'gold' : notification.type === 'alert' ? 'warning' : 'danger'}>{config.badge}</Badge>
                    {!notification.read && <span className="w-2 h-2 rounded-full bg-gold" />}
                  </div>
                  <p className="text-sm font-body text-text-secondary">{notification.message}</p>
                  <p className="text-xs font-body text-text-secondary mt-1">{notification.date}</p>
                </div>
                <CheckCheck size={16} className={`shrink-0 mt-1 ${notification.read ? 'text-gold' : 'text-text-muted'}`} />
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
