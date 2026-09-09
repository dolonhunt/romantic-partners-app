import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Compass, Gamepad2, ClipboardList, PenTool, BookOpen,
  Play, Menu, X, ArrowUp, Sparkles, Home, Headphones, Shield, EyeOff, Eye
} from 'lucide-react';
import HeroSection from './components/HeroSection';
import CourseTimeline from './components/CourseTimeline';
import { GamesSection, SurveysSection, WritingPromptsSection, LearningMaterialsSection, MediaSection } from './components/Sections';
import { PartnerSwitcher, MoodCheckIn, StreakBadge, NotificationSetup, AmbientSoundPlayer } from './components/PartnerReveal';
import { usePartnerStore } from './hooks/usePartnerStore';
import type { Partner } from './hooks/usePartnerStore';

// ─── LOCALSTORAGE HELPERS ──────────────────────────────────
function loadState<T>(key: string, fallback: T): T {
  try { const s = localStorage.getItem(`next18_${key}`); return s ? JSON.parse(s) : fallback; } catch { return fallback; }
}
function saveState(key: string, value: unknown) {
  try { localStorage.setItem(`next18_${key}`, JSON.stringify(value)); } catch {}
}

// ─── TAB DEFINITIONS ──────────────────────────────────────
type TabId = 'home' | 'games' | 'explore' | 'learn' | 'media';

const tabs: { id: TabId; label: string; shortLabel: string; icon: React.ReactNode }[] = [
  { id: 'home', label: 'Home', shortLabel: 'Home', icon: <Home className="w-5 h-5" /> },
  { id: 'games', label: 'Games & Challenges', shortLabel: 'Play', icon: <Gamepad2 className="w-5 h-5" /> },
  { id: 'explore', label: 'Explore & Reflect', shortLabel: 'Explore', icon: <Compass className="w-5 h-5" /> },
  { id: 'learn', label: 'Learning Materials', shortLabel: 'Learn', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'media', label: 'Guided Sessions', shortLabel: 'Sessions', icon: <Headphones className="w-5 h-5" /> },
];

const desktopNavItems = [
  { id: 'timeline', label: 'Course Journey', icon: <Compass className="w-4 h-4" /> },
  { id: 'games', label: 'Games & Challenges', icon: <Gamepad2 className="w-4 h-4" /> },
  { id: 'surveys', label: 'Desire Mapping', icon: <ClipboardList className="w-4 h-4" /> },
  { id: 'prompts', label: 'Writing Prompts', icon: <PenTool className="w-4 h-4" /> },
  { id: 'learning', label: 'Learning', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'media', label: 'Sessions', icon: <Play className="w-4 h-4" /> },
];

// ─── CELEBRATION OVERLAY ──────────────────────────────────
function CelebrationOverlay({ day, onClose }: { day: number; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80" onClick={onClose}>
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div key={i} className="absolute w-2 h-2 rounded-full"
          style={{ left: `${Math.random() * 100}%`, top: '-10px',
            backgroundColor: ['#E8C9A0', '#B76E79', '#9B2335', '#f4dfb8', '#4A0E1F', '#B76E79'][i % 6] }}
          animate={{ y: [0, window.innerHeight + 20], x: [(Math.random() - 0.5) * 200], rotate: [0, 720], opacity: [1, 0] }}
          transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 0.5, ease: 'easeIn' }} />
      ))}
      <div className="text-center relative z-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
          className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 shadow-2xl" style={{background:'linear-gradient(135deg, #9B2335, #B76E79, #E8C9A0)'}}>
          <span className="text-3xl">✨</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="font-display text-2xl md:text-3xl font-bold text-gradient mb-2">Day {day} Complete</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="text-gold-300/60 text-sm">Your connection deepened tonight</motion.p>
      </div>
    </motion.div>
  );
}

// ─── DISGUISE PAGE (PANIC BUTTON) ────────────────────────
function DisguisePage({ onReveal }: { onReveal: () => void }) {
  return (
    <div className="panic-overlay" onClick={onReveal}>
      <div className="text-center">
        <h1>🍳 Quick Pasta Recipe</h1>
        <div className="recipe-card text-left">
          <p className="mb-2"><strong>Ingredients:</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
            <li>400g spaghetti</li><li>2 cloves garlic, minced</li><li>3 tbsp olive oil</li>
            <li>Salt & pepper to taste</li><li>Fresh basil leaves</li><li>Parmesan cheese</li>
          </ul>
          <p className="mt-3 text-sm text-gray-500 italic">Boil pasta. Sauté garlic in oil. Toss together. Top with basil and parmesan.</p>
        </div>
        <p className="mt-4 text-xs text-gray-400">Tap anywhere to return to your recipe collection</p>
      </div>
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────
export default function App() {
  const [started, setStarted] = useState(() => loadState('started', false));
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [activeDesktopSection, setActiveDesktopSection] = useState('timeline');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [completedDays, setCompletedDays] = useState<Set<number>>(() => new Set(loadState<number[]>('completedDays', [])));
  const [isMobile, setIsMobile] = useState(false);
  const [panicMode, setPanicMode] = useState(false);
  const [celebrationDay, setCelebrationDay] = useState<number | null>(null);

  // Partner system
  const partnerStore = usePartnerStore();

  useEffect(() => { const c = () => setIsMobile(window.innerWidth < 768); c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c); }, []);
  useEffect(() => { saveState('started', started); }, [started]);
  useEffect(() => { saveState('completedDays', [...completedDays]); }, [completedDays]);

  // Panic: double-press Escape
  useEffect(() => {
    let taps = 0, timer: ReturnType<typeof setTimeout>;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { taps++; clearTimeout(timer); if (taps >= 2) { setPanicMode(true); taps = 0; } else timer = setTimeout(() => { taps = 0; }, 500); }
    };
    window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleStart = useCallback(() => { setStarted(true); }, []);
  const handleSelectDay = useCallback((day: number) => {
    setCompletedDays(prev => { const next = new Set(prev); if (!next.has(day)) { next.add(day); setCelebrationDay(day); } return next; });
  }, []);

  // Desktop scroll detection
  useEffect(() => {
    if (isMobile) return;
    const h = () => {
      setShowScrollTop(window.scrollY > 600);
      const s = desktopNavItems.map(i => ({ id: i.id, el: document.getElementById(i.id) }));
      for (let idx = s.length - 1; idx >= 0; idx--) { const el = s[idx].el; if (el && el.getBoundingClientRect().top <= 200) { setActiveDesktopSection(s[idx].id); break; } }
    };
    window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h);
  }, [isMobile]);

  const scrollToSection = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMobileNavOpen(false); };

  if (panicMode) return <DisguisePage onReveal={() => setPanicMode(false)} />;

  return (
    <div className="min-h-screen film-grain" style={{background:'#121212'}}>
      <AnimatePresence>{celebrationDay !== null && <CelebrationOverlay key={`c-${celebrationDay}`} day={celebrationDay} onClose={() => setCelebrationDay(null)} />}</AnimatePresence>

      {/* ═══ HERO ═══ */}
      <AnimatePresence>{!started && <motion.div exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.6 }}><HeroSection onStart={handleStart} /></motion.div>}</AnimatePresence>

      {/* ═══ LOADED ═══ */}
      <AnimatePresence>{started && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

          {/* ─── DESKTOP NAV ─────────── */}
          <motion.nav initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 glass-nav hidden md:block">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-wine-600 to-gold-600 flex items-center justify-center"><Heart className="w-4 h-4 text-cream-100" /></div>
                  <span className="text-sm font-bold font-display text-gradient">The Next 18</span>
                </div>
                <div className="flex items-center gap-1">
                  {desktopNavItems.map(item => (
                    <button key={item.id} onClick={() => scrollToSection(item.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${activeDesktopSection === item.id ? 'bg-wine-700/30 text-gold-300' : 'text-gold-400/40 hover:text-gold-300'}`}>
                      {item.icon}<span className="hidden lg:inline">{item.label}</span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <StreakBadge count={partnerStore.streak.count} />
                  <div className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-gold-400" /><span className="text-xs text-gold-400/60">{completedDays.size}/14</span></div>
                  <button onClick={() => setPanicMode(true)} className="p-1.5 rounded-lg text-gold-400/20 hover:text-gold-400/50" title="Hide"><EyeOff className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </motion.nav>

          {/* ─── MOBILE TOP BAR ─────────── */}
          <div className="fixed top-0 left-0 right-0 z-50 glass-nav md:hidden">
            <div className="flex items-center justify-between px-4 h-14">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-wine-600 to-gold-600 flex items-center justify-center"><Heart className="w-3.5 h-3.5 text-cream-100" /></div>
                <span className="text-sm font-bold font-display text-gradient">The Next 18</span>
              </div>
              <div className="flex items-center gap-2">
                <StreakBadge count={partnerStore.streak.count} />
                <button onClick={() => setPanicMode(true)} className="p-1.5 rounded-lg text-gold-400/20"><EyeOff className="w-4 h-4" /></button>
                <button className="p-2 -mr-2 text-gold-300" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
                  {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <AnimatePresence>{mobileNavOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-gold-500/10 overflow-hidden">
                <div className="px-4 py-3 space-y-1">
                  {desktopNavItems.map(item => (
                    <button key={item.id} onClick={() => { scrollToSection(item.id); setMobileNavOpen(false); }}
                      className="flex items-center gap-2 w-full px-3 py-3 rounded-lg text-sm text-gold-300/60">{item.icon}{item.label}</button>
                  ))}
                </div>
              </motion.div>
            )}</AnimatePresence>
          </div>

          {/* ═══ MOBILE TAB LAYOUT ═══ */}
          <div className="md:hidden pt-14 pb-bottom-nav">
            <AnimatePresence mode="wait">
              {activeTab === 'home' && (<MobileTabContent key="home">
                <WelcomeBanner completedDays={completedDays} partnerStore={partnerStore} />
                <CourseTimeline onSelectDay={handleSelectDay} completedDays={completedDays} />
              </MobileTabContent>)}
              {activeTab === 'games' && (<MobileTabContent key="games"><GamesSection /></MobileTabContent>)}
              {activeTab === 'explore' && (<MobileTabContent key="explore">
                <SurveysSection partnerStore={partnerStore} />
                <div className="max-w-6xl mx-auto px-4"><div className="h-px bg-gradient-to-r from-transparent via-wine-500/20 to-transparent my-2" /></div>
                <WritingPromptsSection partnerStore={partnerStore} />
              </MobileTabContent>)}
              {activeTab === 'learn' && (<MobileTabContent key="learn"><LearningMaterialsSection /></MobileTabContent>)}
              {activeTab === 'media' && (<MobileTabContent key="media"><MediaSection /></MobileTabContent>)}
            </AnimatePresence>

            {/* Bottom nav */}
            <div className="fixed bottom-0 left-0 right-0 z-50 glass-bottom md:hidden">
              <div className="flex items-center justify-around px-2 pt-2 pb-2" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
                {tabs.map(tab => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                      className="flex flex-col items-center justify-center py-1 px-3 min-w-[56px] relative">
                      <div className={`transition-all duration-200 ${isActive ? 'text-gold-400 scale-110' : 'text-gold-400/30'}`}>{tab.icon}</div>
                      <span className={`text-[10px] mt-1 font-medium transition-colors ${isActive ? 'text-gold-300' : 'text-gold-400/30'}`}>{tab.shortLabel}</span>
                      {isActive && <motion.div layoutId="mobTab" className="absolute -top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-gradient-to-r from-gold-500 to-wine-500" transition={{ type: 'spring', bounce: 0.2 }} />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ═══ DESKTOP LAYOUT ═══ */}
          <div className="hidden md:block pt-20">
            <div className="max-w-6xl mx-auto px-8 py-8">
              <WelcomeBanner completedDays={completedDays} partnerStore={partnerStore} />
              <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                {desktopNavItems.map((item, i) => (
                  <motion.button key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.05 }}
                    onClick={() => scrollToSection(item.id)} className="glass rounded-xl p-4 text-center group hover:bg-wine-700/10 transition-all">
                    <div className="w-10 h-10 mx-auto rounded-lg bg-deep-800/50 flex items-center justify-center text-gold-400 mb-2 group-hover:bg-wine-700/30">{item.icon}</div>
                    <p className="text-xs text-gold-300/60 group-hover:text-gold-300">{item.label}</p>
                  </motion.button>
                ))}
              </div>
            </div>
            <CourseTimeline onSelectDay={handleSelectDay} completedDays={completedDays} />
            <SectionDivider />
            <GamesSection />
            <SectionDivider />
            <SurveysSection partnerStore={partnerStore} />
            <SectionDivider />
            <WritingPromptsSection partnerStore={partnerStore} />
            <SectionDivider />
            <LearningMaterialsSection />
            <SectionDivider />
            <MediaSection />
            <footer className="py-20 px-4 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 animate-breathe-glow" style={{background:'linear-gradient(135deg, #4A0E1F, #9B2335)'}}><Heart className="w-8 h-8 text-champagne/80" /></div>
                <h3 className="text-2xl md:text-3xl font-light font-display text-gradient-champagne mb-3 tracking-[0.04em]">Here's to the Next 18</h3>
                <p className="text-champagne/20 text-sm mb-6 font-light leading-[1.8]">Edwin & Mindy — 18 years behind you. Infinity ahead.</p>
                <div className="flex items-center justify-center gap-2 text-[9px] text-champagne/10 mb-6 tracking-[0.15em] uppercase"><Shield className="w-3 h-3" /> Private · Secure · ESC ESC to hide</div>
              </div>
            </footer>
          </div>

          <AnimatePresence>{showScrollTop && !isMobile && (
            <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-wine-700 to-gold-700 flex items-center justify-center shadow-lg shadow-wine-900/50">
              <ArrowUp className="w-5 h-5 text-cream-100" />
            </motion.button>
          )}</AnimatePresence>

          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl animate-drift-1" style={{background:'radial-gradient(circle, rgba(74,14,31,0.15), transparent)'}} />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl animate-drift-2" style={{background:'radial-gradient(circle, rgba(155,35,53,0.1), transparent)'}} />
            <div className="absolute top-3/4 left-1/3 w-72 h-72 rounded-full blur-3xl animate-drift-3" style={{background:'radial-gradient(circle, rgba(183,110,121,0.08), transparent)'}} />
          </div>
        </motion.div>
      )}</AnimatePresence>
    </div>
  );
}

// ─── WELCOME BANNER ────────────────────────────────────────
function WelcomeBanner({ completedDays, partnerStore }: { completedDays: Set<number>; partnerStore: ReturnType<typeof usePartnerStore> }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="p-4 md:p-0 md:mb-6">
      <div className="glass rounded-2xl p-5 md:p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-48 md:w-64 h-48 md:h-64 rounded-full blur-3xl" style={{background:'rgba(74,14,31,0.3)'}} />
          <div className="absolute bottom-0 right-1/4 w-48 md:w-64 h-48 md:h-64 rounded-full blur-3xl" style={{background:'rgba(155,35,53,0.15)'}} />
        </div>
        <div className="relative z-10">
          {/* Partner Switcher */}
          <PartnerSwitcher activePartner={partnerStore.activePartner} profiles={{
            A: { name: partnerStore.profiles.A.name, avatar: partnerStore.profiles.A.avatar },
            B: { name: partnerStore.profiles.B.name, avatar: partnerStore.profiles.B.avatar },
          }} onSwitch={(p: Partner) => partnerStore.setActivePartner(p)} label="Who's using the app right now?" />

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mt-4 mb-4">
            {[
              { num: `${completedDays.size}/14`, label: 'Days Done' },
              { num: `${partnerStore.streak.count}`, label: 'Day Streak' },
              { num: '8', label: 'Games' },
              { num: '20', label: 'Questions' },
              { num: '8', label: 'Prompts' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-lg md:text-2xl font-bold font-display text-gradient">{s.num}</div>
                <div className="text-[10px] md:text-xs text-gold-400/40">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Mood + Ambient + Notifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            <MoodCheckIn partnerName={partnerStore.profiles[partnerStore.activePartner].name} onSave={partnerStore.saveMood} />
            <AmbientSoundPlayer />
            <NotificationSetup />
          </div>

          <div className="flex items-center justify-center gap-2 mt-3 text-[10px] text-gold-400/20">
            <Eye className="w-3 h-3" /> Double-press ESC or tap the eye icon to hide instantly
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SectionDivider() { return <div className="divider-velvet my-2 md:my-4" />; }

function MobileTabContent({ children }: { children: React.ReactNode }) {
  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }} className="min-h-screen">{children}</motion.div>;
}
