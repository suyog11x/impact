import { motion } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Input from '../components/ui/Input';
import NeonButton from '../components/ui/NeonButton';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Contact() {
  return (
    <div className="min-h-screen bg-black noise-overlay">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime mb-4">CONTACT</p>
            <h1 className="text-5xl font-heading font-bold tracking-tight text-text-primary mb-4">Get In Touch</h1>
            <p className="text-text-secondary font-body max-w-xl mx-auto">Have questions about SkillSync AI? We&apos;d love to hear from you.</p>
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
                  <label className="block text-sm font-body text-text-secondary mb-2">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us more about your query..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary font-body placeholder:text-muted focus:outline-none focus:border-lime/50 focus:ring-1 focus:ring-lime/20 transition-all"
                  />
                </div>
                <NeonButton type="submit" className="w-full">
                  Send Message <Send size={16} />
                </NeonButton>
              </form>
            </GlassCard>

            <div className="space-y-6">
              <GlassCard className="flex items-start gap-4 p-6">
                <div className="w-12 h-12 rounded-xl bg-lime/10 flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-lime" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-text-primary">Email</h3>
                  <p className="text-sm text-text-secondary font-body mt-1">support@skillsync.ai</p>
                  <p className="text-sm text-text-secondary font-body">Response within 24 hours</p>
                </div>
              </GlassCard>

              <GlassCard className="flex items-start gap-4 p-6">
                <div className="w-12 h-12 rounded-xl bg-lime/10 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-lime" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-text-primary">Location</h3>
                  <p className="text-sm text-text-secondary font-body mt-1">SkillSync AI HQ</p>
                  <p className="text-sm text-text-secondary font-body">Mumbai, India</p>
                </div>
              </GlassCard>

              <GlassCard className="flex items-start gap-4 p-6">
                <div className="w-12 h-12 rounded-xl bg-lime/10 flex items-center justify-center shrink-0">
                  <MessageSquare size={20} className="text-lime" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-text-primary">Live Chat</h3>
                  <p className="text-sm text-text-secondary font-body mt-1">Chat with our team</p>
                  <p className="text-sm text-text-secondary font-body">Mon-Fri, 9AM-6PM IST</p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
