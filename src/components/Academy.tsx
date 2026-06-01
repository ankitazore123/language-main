import { motion } from "motion/react";
import { GraduationCap, Play, Trophy, Users, BookOpen } from "lucide-react";

export default function Academy() {
  const modules = [
    { title: "Sanskrit Inflection", users: "1.2k", level: "Beginner", icon: BookOpen },
    { title: "Old English Runes", users: "850", level: "Intermediate", icon: GraduationCap },
    { title: "Pali Canon Script", users: "430", level: "Scholar", icon: Users },
  ];

  return (
    <section id="academy" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 text-copper font-bold uppercase tracking-widest text-xs">
            <GraduationCap size={16} />
            Ancient Academy
          </div>
          <h2 className="text-5xl font-serif font-bold text-parchment leading-tight">
            Learn the Languages of <br />
            <span className="italic text-copper">Lost Civilizations</span>
          </h2>
          <p className="text-lg text-parchment/60 font-serif italic leading-relaxed">
            Don't just translate—internalize. Our AI-driven curriculum adapts to your research needs, 
            helping you master everything from Vedic phonetics to Mediaeval syntax.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
             <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="text-2xl font-serif text-parchment mb-1">120+</div>
                <div className="text-[10px] text-copper font-bold uppercase tracking-widest">Lessons</div>
             </div>
             <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="text-2xl font-serif text-parchment mb-1">85%</div>
                <div className="text-[10px] text-copper font-bold uppercase tracking-widest">Mastery Rate</div>
             </div>
             <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="text-2xl font-serif text-parchment mb-1">24k</div>
                <div className="text-[10px] text-copper font-bold uppercase tracking-widest">Scholars</div>
             </div>
          </div>

          <button className="px-10 py-4 bg-parchment text-onyx font-bold rounded-xl hover:bg-copper transition-all shadow-xl shadow-white/5">
            BROWSE CURRICULUM
          </button>
        </div>

        <div className="space-y-6">
          {modules.map((module, idx) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="group bg-white/5 hover:bg-white/10 border border-white/5 p-6 rounded-3xl flex items-center justify-between transition-all cursor-pointer"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-onyx rounded-2xl flex items-center justify-center text-copper group-hover:scale-110 transition-transform shadow-lg">
                  <module.icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-parchment mb-1">{module.title}</h3>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-parchment/40 uppercase tracking-widest">
                    <span>{module.users} Learning</span>
                    <span className="w-1 h-1 bg-copper rounded-full" />
                    <span className="text-copper">{module.level}</span>
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-copper group-hover:text-onyx transition-all">
                <Play size={16} fill="currentColor" />
              </div>
            </motion.div>
          ))}

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-4 p-6 bg-copper/5 rounded-3xl border border-copper/10"
          >
             <Trophy className="text-copper" size={32} />
             <div>
               <div className="text-sm font-bold text-parchment">Join the elite linguistic fellowship</div>
               <div className="text-xs text-parchment/40">Complete 5 modules to earn the Scholar Badge.</div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
