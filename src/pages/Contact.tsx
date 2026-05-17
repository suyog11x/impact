import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Input from '../components/ui/Input';
import NeonButton from '../components/ui/NeonButton';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Contact() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('skillsync-theme');
    if (saved) {
      setIsDark(saved === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('skillsync-theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-bg-primary' : 'bg-landing-bg'}`}>
      {!isDark && <div className="grain-overlay" />}
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <div className="pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <p className={`font-landing text-sm font-medium tracking-widest uppercase mb-4 ${isDark ? 'text-gold' : 'text-landing-muted'}`}>Contact</p>
            <h1 className={`font-landing font-bold text-5xl tracking-tight mb-4 ${isDark ? 'text-text-primary' : 'text-landing-text'}`}>Get in touch</h1>
            <p className={`font-landing max-w-xl mx-auto ${isDark ? 'text-text-secondary' : 'text-landing-muted'}`}>Have questions about SkillSync AI? We&apos;d love to hear from you.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GlassCard className="p-10">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Name" placeholder="Your name" icon={<Mail size={16} />} />
                  <Input label="Email" type="email" placeholder="your@email.com" icon={<Mail size={16} />} />
                </div>
                <Input label="Subject" placeholder="How can we help?" icon={<MessageSquare size={16} />} />
                <div>
                  <label className={`block text-sm font-body mb-2 ${isDark ? 'text-text-secondary' : 'text-landing-muted'}`}>Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us more about your query..."
                    className={`w-full border rounded-xl px-4 py-3 font-body placeholder:text-text-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all ${isDark ? 'bg-bg-elevated border-border text-text-primary' : 'bg-white border-landing-stone-200 text-landing-text'}`}
                  />
                </div>
                <NeonButton type="submit" className="w-full">
                  Send Message <Send size={16} />
                </NeonButton>
              </form>
            </GlassCard>

            <div className="space-y-6">
              <GlassCard className="flex items-start gap-4 p-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isDark ? 'bg-gold/10' : 'bg-landing-coral/20'}`}>
                  <Mail size={20} className={isDark ? 'text-gold' : 'text-landing-text'} />
                </div>
                <div>
                  <h3 className={`font-heading font-semibold ${isDark ? 'text-text-primary' : 'text-landing-text'}`}>Email</h3>
                  <p className={`text-sm font-body mt-1 ${isDark ? 'text-text-secondary' : 'text-landing-muted'}`}>support@skillsync.ai</p>
                  <p className={`text-sm font-body ${isDark ? 'text-text-secondary' : 'text-landing-muted'}`}>Response within 24 hours</p>
                </div>
              </GlassCard>

              <GlassCard className="flex items-start gap-4 p-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isDark ? 'bg-gold/10' : 'bg-landing-coral/20'}`}>
                  <MapPin size={20} className={isDark ? 'text-gold' : 'text-landing-text'} />
                </div>
                <div>
                  <h3 className={`font-heading font-semibold ${isDark ? 'text-text-primary' : 'text-landing-text'}`}>Location</h3>
                  <p className={`text-sm font-body mt-1 ${isDark ? 'text-text-secondary' : 'text-landing-muted'}`}>SkillSync AI HQ</p>
                  <p className={`text-sm font-body ${isDark ? 'text-text-secondary' : 'text-landing-muted'}`}>Mumbai, India</p>
                </div>
              </GlassCard>

              <GlassCard className="flex items-start gap-4 p-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isDark ? 'bg-gold/10' : 'bg-landing-coral/20'}`}>
                  <MessageSquare size={20} className={isDark ? 'text-gold' : 'text-landing-text'} />
                </div>
                <div>
                  <h3 className={`font-heading font-semibold ${isDark ? 'text-text-primary' : 'text-landing-text'}`}>Live Chat</h3>
                  <p className={`text-sm font-body mt-1 ${isDark ? 'text-text-secondary' : 'text-landing-muted'}`}>Chat with our team</p>
                  <p className={`text-sm font-body ${isDark ? 'text-text-secondary' : 'text-landing-muted'}`}>Mon-Fri, 9AM-6PM IST</p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
      <Footer isDark={isDark} />
    </div>
  );
}
