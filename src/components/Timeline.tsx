import { motion } from "motion/react";
import { History, MoveRight, Clock } from "lucide-react";

export default function Timeline() {
  const evolutionSteps = [
    { era: "1500 BCE", form: "Vedic Sanskrit", source: "Rigveda", shift: "Original PIE roots preserved" },
    { era: "500 BCE", form: "Classical Sanskrit", source: "Panini Grammar", shift: "Syntactic standardization" },
    { era: "700 CE", form: "Old Marathi", source: "Inscriptions", shift: "Morphological simplification" },
    { era: "1200 CE", form: "Early Modern Marathi", source: "Jnaneshwari", shift: "Phonetic drift from Sanskrit" },
    { era: "2024 CE", form: "Modern Marathi", source: "Contemporary Usage", shift: "Standardized regional form" },
  ];

  return (
    <section id="timeline" className="py-24 px-6 bg-parchment/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-12 h-12 bg-copper/20 rounded-full flex items-center justify-center text-copper mb-6">
            <History size={24} />
          </div>
          <h2 className="text-5xl font-serif font-bold mb-4">Linguistic Chronos</h2>
          <p className="text-parchment/60 font-serif italic max-w-2xl">
            Watch how a single thought drifts across millenia through phonetic shifts and morphological evolution.
          </p>
        </div>

        <div className="relative">
          {/* Vertical/Horizontal Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-copper/20 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {evolutionSteps.map((step, idx) => (
              <motion.div
                key={step.era}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-6 bg-onyx border border-white/5 rounded-2xl hover:border-copper/40 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-copper uppercase tracking-tighter flex items-center gap-2">
                    <Clock size={12} />
                    {step.era}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoveRight size={14} className="text-copper" />
                  </span>
                </div>
                <h3 className="text-lg font-serif font-bold text-parchment mb-2">{step.form}</h3>
                <div className="text-[10px] text-parchment/40 uppercase font-mono mb-4">Source: {step.source}</div>
                <p className="text-sm text-parchment/60 font-serif italic border-t border-white/5 pt-4">
                  {step.shift}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline Visualization CTA */}
        <div className="mt-16 text-center">
           <button className="px-6 py-3 border border-copper/30 text-copper rounded-full hover:bg-copper hover:text-onyx transition-all font-bold text-sm tracking-widest uppercase">
              Open Full Interactive Timeline
           </button>
        </div>
      </div>
    </section>
  );
}
