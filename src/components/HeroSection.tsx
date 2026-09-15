import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface HeroSectionProps { onStart: () => void }

export default function HeroSection({ onStart }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Cursor aura + parallax on mouse
  useEffect(() => {
    const aura = document.getElementById('cursor-aura');
    const onMove = (e: MouseEvent) => {
      if (aura) {
        aura.style.left = e.clientX + 'px';
        aura.style.top = e.clientY + 'px';
      }
      // Parallax on orbs
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      const orbs = document.querySelectorAll('.parallax-orb');
      orbs.forEach((orb, i) => {
        const depth = (i + 1) * 12;
        (orb as HTMLElement).style.transform = `translate(${cx * depth}px, ${cy * depth}px)`;
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Kinetic text — word by word
  const titleWords = ['The', 'Next', '18'];
  const subtitleText = 'An Intimacy Course for Edwin & Mindy';
  const descText = '14 days of play, discovery, and deepening connection — celebrating 18 years of love and designing the next 18 with intention and pleasure.';

  return (
    <div ref={containerRef} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">

      {/* ═══ LIVING BACKGROUND — 3 parallax depths ═══ */}
      <div className="absolute inset-0">
        {/* Depth 0: gradient mesh */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 70% 50% at 15% 25%, rgba(74,14,31,0.4), transparent 70%),
            radial-gradient(ellipse 60% 60% at 85% 65%, rgba(43,27,46,0.35), transparent 70%),
            radial-gradient(ellipse 80% 50% at 50% 90%, rgba(155,35,53,0.15), transparent 60%),
            linear-gradient(180deg, #121212, #1a0f1d, #121212)
          `
        }} />

        {/* Depth 1: Orb — slow, large */}
        <div className="parallax-orb absolute animate-drift-1" style={{ transition:'transform 0.4s ease-out' }}>
          <div className="w-[500px] h-[500px] rounded-full opacity-[0.06]"
            style={{ background:'radial-gradient(circle, #B76E79, transparent)', marginTop:'-10%', marginLeft:'-10%' }} />
        </div>

        {/* Depth 2: Orb — medium */}
        <div className="parallax-orb absolute animate-drift-2" style={{ transition:'transform 0.3s ease-out' }}>
          <div className="w-[400px] h-[400px] rounded-full opacity-[0.05]"
            style={{ background:'radial-gradient(circle, #9B2335, transparent)', bottom:'-5%', right:'0' }} />
        </div>

        {/* Depth 3: Orb — near */}
        <div className="parallax-orb absolute animate-drift-3" style={{ transition:'transform 0.2s ease-out' }}>
          <div className="w-[350px] h-[350px] rounded-full opacity-[0.04]"
            style={{ background:'radial-gradient(circle, #E8C9A0, transparent)', top:'40%', left:'45%' }} />
        </div>

        {/* Rose-gold dust particles */}
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div key={i}
            className="absolute rounded-full bg-champagne/40"
            style={{
              width: `${1.5 + Math.random() * 2}px`,
              height: `${1.5 + Math.random() * 2}px`,
              left: `${8 + Math.random() * 84}%`,
              top: `${8 + Math.random() * 84}%`,
            }}
            animate={{ opacity:[0,0.5,0], scale:[0,1.2,0], y:[0,-80] }}
            transition={{ duration:4+Math.random()*6, repeat:Infinity, delay:Math.random()*10, ease:'easeInOut' }}
          />
        ))}
      </div>

      {/* ═══ CURSOR AURA ═══ */}
      <div id="cursor-aura" className="cursor-aura" />

      {/* ═══ CONTENT ═══ */}
      <div className="relative z-10 text-center px-8 md:px-16 max-w-3xl mx-auto py-16">

        {/* Anniversary ring */}
        <motion.div initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:1 }}
          transition={{ duration:1.6, type:'spring', bounce:0.2 }} className="mb-10 md:mb-16 inline-block">
          <div className="relative">
            {/* Pulse rings */}
            <div className="absolute inset-0 rounded-full border border-rose-gold/10 animate-pulse-ring" />
            <div className="absolute inset-0 rounded-full border border-rose-gold/5 animate-pulse-ring" style={{ animationDelay:'1s' }} />

            <div className="w-28 h-28 md:w-40 md:h-40 mx-auto rounded-full animate-breathe-glow relative flex items-center justify-center"
              style={{ background:'linear-gradient(145deg, #4A0E1F, #9B2335, #4A0E1F)' }}>
              <span className="text-4xl md:text-6xl font-light font-display text-champagne tracking-tight">18</span>
              <motion.div className="absolute -top-1 -right-1 md:-top-2 md:-right-2"
                animate={{ rotate:360 }} transition={{ duration:30, repeat:Infinity, ease:'linear' }}>
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-champagne/50" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Title — kinetic word-by-word */}
        <div className="mb-6 md:mb-8">
          {titleWords.map((word, i) => (
            <motion.span key={i}
              initial={{ opacity:0, y:40 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.9, delay:0.4+i*0.15, ease:[0.23,1,0.32,1] }}
              className="inline-block"
            >
              <span className={`font-display font-light tracking-[0.04em] ${
                word === '18' ? 'text-6xl md:text-[96px] text-gradient-hero' : 'text-5xl md:text-7xl text-champagne/80'
              }`}>
                {word}
              </span>
              {i < titleWords.length - 1 && <span className="inline-block w-3 md:w-4" />}
            </motion.span>
          ))}
        </div>

        {/* Subtitle — italic serif accent */}
        <motion.p initial={{ opacity:0, y:25 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:1, delay:1 }}
          className="text-base md:text-2xl text-champagne/40 mb-2 font-light tracking-[0.15em] uppercase font-display italic">
          {subtitleText}
        </motion.p>

        {/* Description — breathable body */}
        <motion.p initial={{ opacity:0, y:25 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:1, delay:1.2 }}
          className="text-champagne/25 text-sm md:text-base max-w-md mx-auto mb-12 md:mb-16 leading-[1.8]">
          {descText}
        </motion.p>

        {/* Divider */}
        <motion.div initial={{ scaleX:0, opacity:0 }} animate={{ scaleX:1, opacity:1 }}
          transition={{ duration:1.4, delay:1.4 }}
          className="divider-velvet mb-12 md:mb-16" />

        {/* CTA — magnetic, cinematic */}
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:1, delay:1.6 }} className="max-w-xs mx-auto">
          <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
            onClick={onStart}
            className="btn-magnetic btn-primary w-full py-5 md:py-6 rounded-2xl text-base md:text-lg font-medium tracking-[0.08em] uppercase text-sm md:text-base relative overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-3">
              <Heart className="w-4 h-4 md:w-5 md:h-5" />
              <span>Begin Your Journey</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-champagne/8 to-transparent animate-shimmer" />
          </motion.button>

          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.2 }}
            className="text-[10px] text-champagne/10 mt-5 tracking-[0.2em] uppercase">
            Private · Secure · Offline
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
