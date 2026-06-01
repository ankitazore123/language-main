import { motion } from "motion/react";
import { Sparkles, ArrowRight, BookMarked } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-40 pb-20 px-6 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-copper/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-etruscan/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-copper/10 border border-copper/20 text-copper text-xs font-bold uppercase tracking-widest mb-8"
        >
          <Sparkles size={14} />
          The World's Most Advanced Historical AI
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl md:text-8xl font-serif font-bold text-parchment leading-[1.1] mb-8"
        >
          Resurrecting <br />
          <span className="italic text-copper">Ancient Wisdom</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-2xl text-parchment/60 font-serif italic max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Step through the digital archives of history. Translate modern language into the classical forms 
          of the Vedas, the Roman Senate, and the Old Courts of England with research-grade accuracy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <button className="group px-8 py-4 bg-copper text-onyx font-bold rounded-xl flex items-center gap-3 hover:bg-parchment transition-all text-lg shadow-xl shadow-copper/20">
            START TRANSLATING
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 border border-parchment/20 text-parchment font-bold rounded-xl flex items-center gap-3 hover:bg-parchment/5 transition-all text-lg">
            <BookMarked size={20} />
            BROWSE ARCHIVE
          </button>
        </motion.div>
      </div>

      {/* Floating Statistics */}
      <div className="max-w-7xl mx-auto w-full mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {[
          { label: "Eras Covered", val: "12,000+ Years" },
          { label: "Corpus Size", val: "500M+ Words" },
          { label: "Historical Forms", val: "45+ Dialects" },
          { label: "Scholar Network", val: "3.2k Verified" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            className="text-center md:text-left border-l border-copper/20 pl-6"
          >
            <div className="text-xs uppercase tracking-widest text-copper font-bold mb-1">{stat.label}</div>
            <div className="text-2xl font-serif text-parchment">{stat.val}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
