import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Translator from "./components/Translator";
import Timeline from "./components/Timeline";
import Academy from "./components/Academy";
import { motion, useScroll, useSpring } from "motion/react";
import { Github, Twitter, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="relative bg-onyx selection:bg-copper selection:text-onyx">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-copper z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <div className="space-y-0">
        <Hero />
        <Translator />
        <Timeline />
        <Academy />
        
        {/* Research Section Placeholder */}
        <section id="research" className="py-24 px-6 bg-onyx border-t border-white/5">
           <div className="max-w-7xl mx-auto text-center space-y-8">
              <h2 className="text-4xl font-serif font-bold italic text-parchment/40 uppercase tracking-[0.2em]">Scholarly Archive</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale hover:grayscale-0 transition-all">
                 <div className="font-serif text-xl p-8 border border-white/5 rounded-2xl flex items-center justify-center">UNIVERSITY LIBRARY</div>
                 <div className="font-serif text-xl p-8 border border-white/5 rounded-2xl flex items-center justify-center">UNESCO ARCHIVE</div>
                 <div className="font-serif text-xl p-8 border border-white/5 rounded-2xl flex items-center justify-center">OXFORD DICTIONARY</div>
                 <div className="font-serif text-xl p-8 border border-white/5 rounded-2xl flex items-center justify-center">DIGITAL MANUSCRIPTS</div>
              </div>
           </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-onyx border-t border-white/10 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="text-2xl font-serif font-bold text-parchment">
                Ancient<span className="text-copper">Lingua</span> AI
              </div>
              <p className="text-parchment/40 font-serif italic max-w-sm">
                Dedicated to the preservation and revival of historical languages through state-of-the-art computational linguistics and AI research.
              </p>
              <div className="flex gap-4">
                {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-parchment/40 hover:border-copper hover:text-copper transition-all">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="text-xs font-bold text-copper uppercase tracking-widest">Platform</div>
              <ul className="space-y-2 text-sm text-parchment/60 font-medium font-serif italic">
                <li><a href="#" className="hover:text-parchment transition-colors">Translator Engine</a></li>
                <li><a href="#" className="hover:text-parchment transition-colors">Digital Archive</a></li>
                <li><a href="#" className="hover:text-parchment transition-colors">Linguistics API</a></li>
                <li><a href="#" className="hover:text-parchment transition-colors">Mobile App</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="text-xs font-bold text-copper uppercase tracking-widest">Research</div>
              <ul className="space-y-2 text-sm text-parchment/60 font-medium font-serif italic">
                <li><a href="#" className="hover:text-parchment transition-colors">Scholarly Papers</a></li>
                <li><a href="#" className="hover:text-parchment transition-colors">Corpus Data</a></li>
                <li><a href="#" className="hover:text-parchment transition-colors">Collaborations</a></li>
                <li><a href="#" className="hover:text-parchment transition-colors">Revival Projects</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold text-parchment/20 uppercase tracking-widest">
            <div>© 2026 AncientLingua AI. All Rights Reserved.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-copper">Privacy Policy</a>
              <a href="#" className="hover:text-copper">Terms of Service</a>
              <button 
                onClick={scrollToTop}
                className="flex items-center gap-2 hover:text-copper transition-colors"
              >
                Back to top <ArrowUp size={12} />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
