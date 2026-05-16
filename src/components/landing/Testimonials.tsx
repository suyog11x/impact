import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '../../data/dummy';

export default function Testimonials() {
  return (
    <section className="relative py-32">
      <div className="max-w-[1600px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime mb-4">TESTIMONIALS</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-text-primary">
            Trusted by Placed Students
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass rounded-[2rem] p-8"
            >
              <Quote size={24} className="text-lime mb-4" />
              <p className="text-sm font-body text-text-secondary leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full bg-white/10" />
                <div>
                  <p className="text-sm font-heading font-medium text-text-primary">{t.name}</p>
                  <p className="text-xs font-mono text-lime uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
