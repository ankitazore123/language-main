import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Languages, History, GraduationCap, Shield, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { loginWithGoogle, logout } from "../lib/firebase";
import { useState } from "react";

export default function Navbar() {
  const { user, profile } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const navItems = [
    { name: "Translator", icon: Languages, href: "#translator" },
    { name: "Timeline", icon: History, href: "#timeline" },
    { name: "Academy", icon: GraduationCap, href: "#academy" },
    { name: "Research", icon: BookOpen, href: "#research" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-onyx/80 backdrop-blur-md border-b border-copper/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-copper rounded-full flex items-center justify-center text-onyx shadow-lg shadow-copper/20">
            <Shield size={24} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-serif font-bold tracking-tighter text-parchment">
            Ancient<span className="text-copper">Lingua</span> AI
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 text-sm font-medium text-parchment/70 hover:text-copper transition-colors uppercase tracking-widest"
            >
              <item.icon size={16} />
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <button 
              onClick={async () => {
                try {
                  await loginWithGoogle();
                } catch (err) {
                  // Error handled in service or reported here
                }
              }}
              className="px-6 py-2 bg-copper text-onyx font-bold rounded-full hover:bg-parchment transition-all hover:scale-105 active:scale-95 shadow-lg shadow-copper/20"
            >
              SCHOLAR LOGIN
            </button>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 p-1 pr-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all"
              >
                <img src={user.photoURL || ''} alt="" className="w-8 h-8 rounded-full border border-copper/20" />
                <div className="text-left hidden sm:block">
                  <div className="text-[10px] font-bold text-copper uppercase tracking-widest leading-none mb-1">
                    {profile?.scholarLevel || 'Novice'}
                  </div>
                  <div className="text-xs font-bold text-parchment truncate max-w-[100px]">
                    {user.displayName?.split(' ')[0]}
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-onyx border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 py-2"
                  >
                    <div className="px-4 py-2 border-b border-white/5 mb-2">
                       <div className="text-[10px] text-parchment/40 font-bold uppercase tracking-widest">XP: {profile?.xp || 0}</div>
                    </div>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-parchment/70 hover:bg-white/5 hover:text-copper transition-colors">
                      <UserIcon size={16} /> Profile
                    </button>
                    <button 
                      onClick={() => logout()}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-white/5 hover:text-red-300 transition-colors"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
