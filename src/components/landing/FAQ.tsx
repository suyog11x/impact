import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '../../data/dummy';

interface FAQProps {
  isDark: boolean;
}

export default function FAQ({ isDark }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="relative py-20 md:py-32">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className={`font-landing text-sm font-medium tracking-widest uppercase mb-4 ${
            isDark ? 'text-gold' : 'text-landing-muted'
          }`}>
            FAQ
          </p>
          <h2 className={`font-landing font-bold text-4xl md:text-5xl tracking-tight ${
            isDark ? 'text-text-primary' : 'text-landing-text'
          }`}>
            Got questions?
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`rounded-2xl overflow-hidden ${
                isDark 
                  ? 'bg-bg-card border border-border' 
                  : 'bg-white border border-landing-stone-100'
              }`}
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className={`font-landing font-medium text-base ${
                  isDark ? 'text-text-primary' : 'text-landing-text'
                }`}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={isDark ? 'text-text-muted' : 'text-landing-stone-400'}
                >
                  <Plus size={20} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className={`px-6 pb-6 font-landing text-sm leading-relaxed ${
                      isDark ? 'text-text-secondary' : 'text-landing-muted'
                    }`}>
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
