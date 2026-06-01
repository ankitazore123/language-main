import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Search, ChevronDown, CheckCircle2, AlertCircle, Quote, Save } from "lucide-react";
import { translateToAncient } from "../services/geminiService";
import { TranslationResult } from "../types";
import { useAuth } from "../context/AuthContext";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Translator() {
  const { user } = useAuth();
  const [inputText, setInputText] = useState("");
  const [targetLang, setTargetLang] = useState("Classical Sanskrit");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [targetEra, setTargetEra] = useState("500 BCE");
  const [isTranslating, setIsTranslating] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);

  const handleTranslate = async () => {
    if (!inputText) return;
    setIsTranslating(true);
    try {
      const data = await translateToAncient(inputText, targetLang, targetEra);
      setResult(data);

      // Persistence if logged in
      if (user) {
        const translationId = crypto.randomUUID();
        try {
          await setDoc(doc(db, 'translations', translationId), {
            id: translationId,
            userId: user.uid,
            modernText: inputText,
            targetLanguage: targetLang,
            targetEra: targetEra,
            translatedText: data.translatedText,
            grammarExplainer: data.grammarExplainer,
            ipa: data.pronunciation.ipa,
            accuracyScore: data.accuracyScore,
            isPublic: true,
            createdAt: serverTimestamp()
          });
        } catch (e) {
          handleFirestoreError(e, OperationType.CREATE, `translations/${translationId}`);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsTranslating(false);
    }
  };

  const languages = [
    "Classical Sanskrit", "Old English", "Classical Latin", "Ancient Greek", 
    "Old Persian", "Pali", "Old Marathi", "Ancient Tamil", "Biblical Hebrew"
  ];

  return (
    <section id="translator" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Input Panel */}
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-4 text-parchment">The Scribe Engine</h2>
            <p className="text-parchment/60 font-serif italic">Input modern thoughts, retrieve ancient soul.</p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px] relative">
                <label className="text-[10px] uppercase tracking-widest text-copper font-bold mb-2 block">Target Language</label>
                <div className="relative">
                  <button 
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-left text-parchment focus:outline-none focus:border-copper transition-all flex items-center justify-between group"
                  >
                    <span>{targetLang}</span>
                    <ChevronDown className={`text-parchment/40 transition-transform duration-300 ${showLangMenu ? 'rotate-180 text-copper' : ''}`} size={16} />
                  </button>

                  <AnimatePresence>
                    {showLangMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute left-0 right-0 mt-2 bg-onyx border border-copper/30 rounded-xl shadow-2xl overflow-hidden z-[100] py-2 backdrop-blur-xl"
                      >
                        <div className="max-h-60 overflow-y-auto custom-scrollbar">
                          {languages.map((lang) => (
                            <button
                              key={lang}
                              onClick={() => {
                                setTargetLang(lang);
                                setShowLangMenu(false);
                              }}
                              className={`w-full px-4 py-2.5 text-left text-sm transition-all flex items-center justify-between ${
                                targetLang === lang 
                                  ? 'bg-copper/20 text-copper font-bold' 
                                  : 'text-parchment/70 hover:bg-white/5 hover:text-parchment'
                              }`}
                            >
                              <span>{lang}</span>
                              {targetLang === lang && <CheckCircle2 size={14} />}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="text-[10px] uppercase tracking-widest text-copper font-bold mb-2 block">Era/Period</label>
                <input 
                  type="text"
                  value={targetEra}
                  onChange={(e) => setTargetEra(e.target.value)}
                  placeholder="e.g. 500 BCE"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-parchment focus:outline-none focus:border-copper transition-colors"
                />
              </div>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to translate..."
              className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl p-6 text-xl text-parchment font-serif placeholder:text-parchment/20 focus:outline-none focus:border-copper transition-all resize-none shadow-inner"
            />

            <button
              onClick={handleTranslate}
              disabled={isTranslating}
              className="w-full py-4 bg-copper text-onyx font-bold rounded-xl hover:bg-parchment transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isTranslating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="w-5 h-5 border-2 border-onyx/30 border-t-onyx rounded-full"
                  />
                  RECONSTRUCTING...
                </>
              ) : (
                <>
                  <Quote size={20} />
                  GENERATE TRANSLATION
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Panel / Insights */}
        <div className="flex-1 lg:max-w-md">
          <div className="h-full bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 w-32 h-32 bg-copper/5 rounded-full blur-3xl" />
            
            {!result ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 opacity-30">
                <Search size={64} className="text-copper" strokeWidth={1} />
                <p className="font-serif italic text-lg">Awaiting your transcription query...</p>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar"
              >
                <div className="flex justify-between items-start">
                  <div className="px-3 py-1 bg-copper/20 text-copper rounded text-[10px] font-bold uppercase tracking-widest">
                    Confidence: {Math.round(result.accuracyScore * 100)}%
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span className="text-[10px] text-parchment/60 font-bold uppercase">Scholarly Verified</span>
                  </div>
                </div>

                <div>
                   <label className="text-[10px] uppercase tracking-widest text-copper font-bold mb-4 block">Reconstructed Text</label>
                   <div className="text-4xl font-serif font-bold text-copper leading-tight italic">
                     {result.translatedText}
                   </div>
                   <div className="mt-2 text-sm font-mono text-parchment/40">[{result.pronunciation.ipa}]</div>
                </div>

                <div>
                   <label className="text-[10px] uppercase tracking-widest text-copper font-bold mb-2 block">Grammar Breakdown</label>
                   <p className="text-sm text-parchment/70 leading-relaxed font-serif italic">
                     {result.grammarExplainer}
                   </p>
                </div>

                <div>
                   <label className="text-[10px] uppercase tracking-widest text-copper font-bold mb-3 block">Citations & Sources</label>
                   <div className="space-y-3">
                     {result.references.map((ref, idx) => (
                       <div key={idx} className="bg-white/5 p-3 rounded-lg border border-white/5">
                         <div className="text-xs font-bold text-parchment/90">{ref.sourceName}</div>
                         <div className="text-[10px] text-parchment/40 mt-1 italic">{ref.snippet}</div>
                       </div>
                     ))}
                   </div>
                </div>
              </motion.div>
            )}
            
            {result && (
              <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-4">
                 <div className="flex items-center gap-4 text-[10px] text-parchment/40 uppercase tracking-widest font-bold">
                    <AlertCircle size={14} className="text-copper" />
                    Linguistic analysis complete
                 </div>
                 {user && (
                   <motion.div 
                     initial={{ opacity: 0, y: 5 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="flex items-center gap-2 text-[10px] text-green-400 font-bold uppercase tracking-widest bg-green-500/10 px-3 py-2 rounded-lg border border-green-500/20"
                   >
                     <Save size={12} />
                     Saved to your personal scholar archive
                   </motion.div>
                 )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
