import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../../data/dummy';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="relative py-32">
      <div className="max-w-[900px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime mb-4">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-text-primary">
            Got Questions?
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-heading font-medium text-text-primary tracking-tight">{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`text-muted transition-transform duration-300 ${openId === faq.id ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm font-body text-text-secondary leading-relaxed">{faq.answer}</p>
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
