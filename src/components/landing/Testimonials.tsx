import { motion } from 'framer-motion';
import { testimonials } from '../../data/dummy';

interface TestimonialsProps {
  isDark: boolean;
}

export default function Testimonials({ isDark }: TestimonialsProps) {
  return (
    <section className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className={`font-landing text-sm font-medium tracking-widest uppercase mb-4 ${
            isDark ? 'text-gold' : 'text-landing-muted'
          }`}>
            Testimonials
          </p>
          <h2 className={`font-landing font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight ${
            isDark ? 'text-text-primary' : 'text-landing-text'
          }`}>
            Trusted by placed students
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.slice(0, 4).map((t, idx) => {
            const rotation = idx % 2 === 0 ? 'rotate(1deg)' : 'rotate(-1deg)';
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`p-8 rounded-3xl ${
                  isDark ? 'bg-bg-card border border-border' : 'bg-white border border-landing-stone-100'
                }`}
                style={{ transform: rotation }}
              >
                <p className={`font-landing text-base leading-relaxed mb-6 ${
                  isDark ? 'text-text-secondary' : 'text-landing-muted'
                }`}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className={`w-10 h-10 rounded-full ${
                    isDark ? 'bg-white/10' : 'bg-landing-stone-100'
                  }`} />
                  <div>
                    <p className={`font-landing font-medium text-sm ${
                      isDark ? 'text-text-primary' : 'text-landing-text'
                    }`}>
                      {t.name}
                    </p>
                    <p className={`font-landing text-xs ${
                      isDark ? 'text-text-muted' : 'text-landing-stone-400'
                    }`}>
                      {t.role}
                    </p>
                  </div>
                </div>
                {/* Signature style */}
                <div className={`mt-4 pt-4 border-t ${isDark ? 'border-border' : 'border-landing-stone-100'}`}>
                  <div className={`w-8 h-px mb-1 ${isDark ? 'bg-border' : 'bg-landing-stone-200'}`} />
                  <p className={`font-cursive text-2xl ${
                    isDark ? 'text-text-muted' : 'text-landing-stone-400'
                  }`}>
                    {t.name.split(' ')[0]}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
