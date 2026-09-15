import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye, Users, Sparkles, RotateCcw, Check, Lock } from 'lucide-react';
import type { Partner } from '../hooks/usePartnerStore';

// Palette shortcuts
const t = {
  wh: 'text-champagne/80',
  pr: 'text-champagne/50',
  se: 'text-champagne/20',
  wh2: 'text-champagne/15',
  wh3: 'text-champagne/10',
};
const bg = {
  s: 'rgba(43,27,46,0.2)',
  sb: 'rgba(155,35,53,0.08)',
  bd: '1px solid rgba(183,110,121,0.04)',
};

// ─── PARTNER SWITCHER ──────────────────────────
export function PartnerSwitcher({ activePartner, profiles, onSwitch, label }: {
  activePartner: Partner; profiles: Record<Partner, { name: string; avatar: string }>; onSwitch: (p: Partner) => void; label?: string;
}) {
  return (
    <div className="glass rounded-2xl p-4 mb-4">
      {label && <p className="text-[9px] text-champagne/12 uppercase tracking-[0.2em] text-center mb-3">{label}</p>}
      <div className="flex items-center justify-center gap-3">
        {(['A','B'] as Partner[]).map(p => {
          const active = activePartner === p;
          const accent = p === 'A' ? 'rgba(59,130,246,0.2)' : 'rgba(244,63,94,0.2)';
          const border = p === 'A' ? 'rgba(59,130,246,0.15)' : 'rgba(244,63,94,0.15)';
          return (
            <button key={p} onClick={() => onSwitch(p)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all active:scale-95"
              style={active ? { background: accent, border: `1px solid ${border}`, boxShadow: `0 4px 20px ${p==='A'?'rgba(59,130,246,0.1)':'rgba(244,63,94,0.1)'}` } : { background: bg.s, border: bg.bd }}>
              <span className="text-lg">{profiles[p].avatar}</span>
              <span className={`text-xs font-medium ${active ? (p==='A'?'text-blue-200/80':'text-rose-200/80') : t.se}`}>{profiles[p].name}</span>
              {active && <motion.div initial={{scale:0}} animate={{scale:1}} className={`w-1.5 h-1.5 rounded-full ${p==='A'?'bg-blue-400':'bg-rose-400'}`}/>}
            </button>
          );
        })}
        <div className="flex flex-col items-center gap-0.5">
          <Heart className="w-3.5 h-3.5 text-ember/30"/>
          <span className="text-[7px] text-champagne/8">SWITCH</span>
        </div>
      </div>
      <p className="text-[9px] text-champagne/8 text-center mt-2.5">Answer privately, then reveal together 🔒</p>
    </div>
  );
}

// ─── PRIVATE INPUT CARD ────────────────────────
export function PrivateAnswerCard({ partner, partnerName, hasAnswered, children }: {
  partner: Partner; partnerName: string; hasAnswered: boolean; children: React.ReactNode;
}) {
  return (
    <div className="noir-card overflow-hidden">
      <div className="h-px" style={{background: partner==='A'?'rgba(59,130,246,0.15)':'rgba(244,63,94,0.15)', opacity:0.5}}/>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Lock className="w-3 h-3 text-champagne/12"/>
            <span className={`text-[10px] ${t.se}`}>{partnerName}'s private response</span>
          </div>
          {hasAnswered && <div className="flex items-center gap-1 text-green-400/50"><Check className="w-3 h-3"/><span className="text-[9px]">Saved</span></div>}
        </div>
        {hasAnswered ? (
          <div className="rounded-xl p-4 text-center" style={{background:'rgba(43,27,46,0.15)'}}>
            <p className={`text-xs ${t.wh2} italic`}>Your response has been saved securely.</p>
            <p className={`text-[9px] ${t.wh3} mt-1`}>It will be revealed when both partners are ready</p>
          </div>
        ) : children}
      </div>
    </div>
  );
}

// ─── REVEAL BUTTON ─────────────────────────────
export function RevealButton({ bothReady, onReveal, partnerAName, partnerBName }: {
  bothReady: boolean; onReveal: () => void; partnerAName: string; partnerBName: string;
}) {
  if (!bothReady) return null;
  return (
    <motion.div initial={{opacity:0,y:20,scale:0.9}} animate={{opacity:1,y:0,scale:1}} transition={{type:'spring',bounce:0.5}} className="text-center py-6">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.1)'}}>
        <Users className="w-3 h-3 text-green-400/60"/>
        <span className="text-[9px] text-green-300/60">Both partners have answered</span>
      </div>
      <div>
        <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick={onReveal}
          className="btn-magnetic btn-primary px-8 py-4 rounded-2xl text-sm tracking-[0.1em] uppercase relative overflow-hidden">
          <span className="relative z-10 flex items-center gap-2">
            <Eye className="w-4 h-4"/><Sparkles className="w-3.5 h-3.5"/>Reveal Answers Together<Sparkles className="w-3.5 h-3.5"/>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-champagne/6 to-transparent animate-shimmer"/>
        </motion.button>
      </div>
      <p className={`text-[9px] ${t.wh3} mt-3`}>{partnerAName} & {partnerBName} — hold the phone between you</p>
    </motion.div>
  );
}

// ─── REVEAL COMPARISON ─────────────────────────
export function RevealComparison({ partnerAName, partnerBName, partnerAAvatar, partnerBAvatar, answerA, answerB, questionLabel, isRevealed: _isRevealed, onReveal }: {
  partnerAName: string; partnerBName: string; partnerAAvatar: string; partnerBAvatar: string;
  answerA: string; answerB: string; questionLabel?: string; isRevealed: boolean; onReveal: () => void;
}) {
  const [flipped,setFlipped] = useState(false);
  const [particles,setParticles] = useState(false);
  const handleReveal = () => { setFlipped(true); setParticles(true); onReveal(); setTimeout(()=>setParticles(false),2000); };
  const match = answerA.trim().toLowerCase() === answerB.trim().toLowerCase();
  return (
    <div className="noir-card overflow-hidden relative">
      <AnimatePresence>{particles && Array.from({length:16}).map((_,i)=>(
        <motion.div key={i} className="absolute rounded-full z-20" style={{backgroundColor:['#E8C9A0','#B76E79','#9B2335','#f4dfb8'][i%4],width:'3px',height:'3px',left:`${20+Math.random()*60}%`,top:`${20+Math.random()*60}%`}}
          animate={{y:[0,-70-Math.random()*40],x:[(Math.random()-0.5)*80],opacity:[1,0],scale:[0,1.5,0]}} transition={{duration:1.5,delay:Math.random()*0.3}}/>
      ))}</AnimatePresence>
      {questionLabel && <div className="px-4 pt-4 pb-2"><p className={`text-[9px] ${t.wh3} uppercase tracking-[0.15em]`}>{questionLabel}</p></div>}
      {!flipped ? (
        <button onClick={handleReveal} className="w-full p-8 text-center active:scale-[0.98] transition-transform">
          <motion.div animate={{rotateY:[0,5,0,-5,0]}} transition={{duration:2.5,repeat:Infinity}}>
            <div className="w-20 h-28 mx-auto rounded-xl flex items-center justify-center mb-3" style={{background:'linear-gradient(135deg, rgba(74,14,31,0.4), rgba(155,35,53,0.3))',border:'1px solid rgba(183,110,121,0.08)'}}>
              <span className="text-3xl">🃏</span>
            </div>
            <p className={`text-xs ${t.se} font-medium`}>Tap to flip & reveal</p>
            <p className={`text-[9px] ${t.wh3} mt-1`}>{partnerAName} & {partnerBName}'s answers</p>
          </motion.div>
        </button>
      ) : (
        <motion.div initial={{rotateY:90,opacity:0}} animate={{rotateY:0,opacity:1}} transition={{duration:0.5,type:'spring',bounce:0.3}} className="p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-3" style={{background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.05)'}}>
              <div className="flex items-center gap-1.5 mb-2"><span>{partnerAAvatar}</span><span className="text-[9px] font-medium text-blue-300/60">{partnerAName}</span></div>
              <p className={`text-[10px] ${t.pr} leading-relaxed`}>{answerA||'—'}</p>
            </div>
            <div className="rounded-xl p-3" style={{background:'rgba(244,63,94,0.06)',border:'1px solid rgba(244,63,94,0.05)'}}>
              <div className="flex items-center gap-1.5 mb-2"><span>{partnerBAvatar}</span><span className="text-[9px] font-medium text-rose-300/60">{partnerBName}</span></div>
              <p className={`text-[10px] ${t.pr} leading-relaxed`}>{answerB||'—'}</p>
            </div>
          </div>
          {match && <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',delay:0.3}}
            className="mt-3 text-center py-2 px-4 rounded-xl" style={{background:'rgba(183,110,121,0.06)',border:'1px solid rgba(183,110,121,0.08)'}}>
            <p className={`text-[10px] ${t.pr} font-medium flex items-center justify-center gap-1`}><Sparkles className="w-3 h-3 text-champagne/50"/>Perfect Match<Sparkles className="w-3 h-3 text-champagne/50"/></p>
          </motion.div>}
          <button onClick={()=>setFlipped(false)} className={`mx-auto mt-3 flex items-center gap-1 text-[9px] ${t.wh3}`}><RotateCcw className="w-2.5 h-2.5"/>Hide again</button>
        </motion.div>
      )}
    </div>
  );
}

// ─── READINESS CHECKLIST ───────────────────────
export function ReadinessChecklist({ partnerAName, partnerBName, partnerAAvatar, partnerBAvatar, partnerAReady, partnerBReady, onMarkReady }: {
  partnerAName: string; partnerBName: string; partnerAAvatar: string; partnerBAvatar: string;
  partnerAReady: boolean; partnerBReady: boolean; onMarkReady: (partner: Partner) => void;
}) {
  void onMarkReady;
  return (
    <div className="noir-card p-3 space-y-2">
      <p className={`text-[9px] ${t.wh3} uppercase tracking-[0.15em] text-center`}>Answer Status</p>
      {(['A','B'] as Partner[]).map(p => {
        const ready = p==='A'?partnerAReady:partnerBReady;
        const name = p==='A'?partnerAName:partnerBName;
        const avatar = p==='A'?partnerAAvatar:partnerBAvatar;
        return (
          <div key={p} className="flex items-center justify-between">
            <div className="flex items-center gap-2"><span>{avatar}</span><span className={`text-[10px] ${ready?'text-green-300/60':t.se}`}>{name}</span></div>
            {ready ? <div className="flex items-center gap-1 text-green-400/50"><Check className="w-3 h-3"/><span className="text-[9px]">Done</span></div> : <span className={`text-[9px] ${t.wh3}`}>Waiting...</span>}
          </div>
        );
      })}
    </div>
  );
}

// ─── MOOD CHECK-IN ─────────────────────────────
export function MoodCheckIn({ partnerName, onSave }: { partnerName: string; onSave: (mood:number,note:string)=>void }) {
  const [mood,setMood] = useState(0);
  const [note,setNote] = useState('');
  const [saved,setSaved] = useState(false);
  const moods = [{emoji:'😔',label:'Low',value:1},{emoji:'😐',label:'Neutral',value:2},{emoji:'🙂',label:'Good',value:3},{emoji:'😊',label:'Great',value:4},{emoji:'🔥',label:'Amazing',value:5}];
  if (saved) return <motion.div initial={{scale:0.9}} animate={{scale:1}} className="noir-card p-4 text-center">
    <p className={`text-xs ${t.se}`}>✨ Noted, {partnerName}.</p></motion.div>;
  return (
    <div className="noir-card p-4">
      <p className={`text-[10px] ${t.se} text-center mb-3`}>How are you feeling, {partnerName}?</p>
      <div className="flex justify-center gap-2.5 mb-3">
        {moods.map(m=>(
          <button key={m.value} onClick={()=>setMood(m.value)} className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all active:scale-95"
            style={mood===m.value?{background:'rgba(155,35,53,0.15)',border:'1px solid rgba(183,110,121,0.08)'}:{background:'rgba(43,27,46,0.15)'}}>
            <span className="text-xl">{m.emoji}</span>
            <span className={`text-[8px] ${t.wh3}`}>{m.label}</span>
          </button>
        ))}
      </div>
      {mood>0 && <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}}>
        <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Any thoughts? (optional)"
          className="w-full rounded-lg p-2.5 text-champagne/50 text-[10px] focus:outline-none" style={{background:'rgba(43,27,46,0.2)',border:bg.bd}} rows={2}/>
        <button onClick={()=>{onSave(mood,note);setSaved(true)}} className="btn-magnetic btn-primary w-full mt-2 py-2 rounded-lg text-[9px]">Save Mood</button>
      </motion.div>}
    </div>
  );
}

// ─── STREAK BADGE ──────────────────────────────
export function StreakBadge({ count }: { count: number }) {
  if (count<1) return null;
  return <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',bounce:0.5}}
    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{background:'rgba(155,35,53,0.12)',border:'1px solid rgba(155,35,53,0.08)'}}>
    <span className="text-xs">🔥</span><span className="text-[10px] font-medium text-champagne/50">{count} days</span>
  </motion.div>;
}

// ─── NOTIFICATION SETUP ────────────────────────
export function NotificationSetup() {
  const [status,setStatus] = useState<'default'|'granted'|'denied'>('default');
  const requestPermission = async () => {
    if ('Notification' in window) {
      const r = await Notification.requestPermission();
      setStatus(r as 'granted'|'denied');
      if (r==='granted') new Notification('🔥 The Next 18',{body:'Your daily moment is ready.',icon:'/icon-512.png',tag:'next18-daily'});
    }
  };
  if (!('Notification' in window)) return null;
  return (
    <div className="noir-card p-3 flex items-center justify-between">
      <div>
        <p className={`text-[10px] ${t.se}`}>Daily Reminders</p>
        <p className={`text-[9px] ${t.wh3}`}>{status==='granted'?'✓ Notifications enabled':'Get reminded daily'}</p>
      </div>
      {status!=='granted' && <button onClick={requestPermission} className="btn-ghost px-2.5 py-1.5 rounded-lg text-[9px]">Enable</button>}
    </div>
  );
}

// ─── AMBIENT SOUND ─────────────────────────────
export function AmbientSoundPlayer() {
  const [playing,setPlaying] = useState<string|null>(null);
  const [volume,setVolume] = useState(0.3);
  const [nodes,setNodes] = useState<Map<string,{ctx:AudioContext;source:AudioBufferSourceNode;gain:GainNode}>>(new Map<string,{ctx:AudioContext;source:AudioBufferSourceNode;gain:GainNode}>());
  const gen = useCallback((type:string)=>{
    try {
      const ctx=new AudioContext(), bs=2*ctx.sampleRate, buf=ctx.createBuffer(1,bs,ctx.sampleRate), d=buf.getChannelData(0);
      if(type==='rain') for(let i=0;i<bs;i++){d[i]=(Math.random()*2-1)*0.3;if(Math.random()<0.001)d[i]*=3;}
      else if(type==='fire'){let a=0;for(let i=0;i<bs;i++){a+=(Math.random()*2-1)*0.1;a*=0.98;d[i]=a+Math.sin(i*0.01)*0.05;}
      }else if(type==='ocean') for(let i=0;i<bs;i++){const w=Math.sin(i/ctx.sampleRate*Math.PI*0.1)*0.5;d[i]=(Math.random()*2-1)*0.15*(0.5+w*0.5);}
      else{let p=0;for(let i=0;i<bs;i++){p=p*0.99+(Math.random()*2-1)*0.01;d[i]=p;}}
      const s=ctx.createBufferSource();s.buffer=buf;s.loop=true;const g=ctx.createGain();g.gain.value=volume;
      const f=ctx.createBiquadFilter();f.type='lowpass';f.frequency.value=type==='rain'?8000:type==='fire'?2000:type==='ocean'?4000:1500;
      s.connect(f);f.connect(g);g.connect(ctx.destination);s.start();return{ctx,source:s,gain:g};
    }catch{return null;}
  },[volume]);
  const toggle=(id:string)=>{
    if(playing){const n=nodes.get(playing);if(n){n.source.stop();n.ctx.close();}setNodes((p: Map<string,{ctx:AudioContext;source:AudioBufferSourceNode;gain:GainNode}>)=>{const m=new Map(p);m.delete(playing);return m;});}
    if(playing===id){setPlaying(null);}
    else{const n=gen(id);if(n){setNodes((p: Map<string,{ctx:AudioContext;source:AudioBufferSourceNode;gain:GainNode}>)=>new Map(p).set(id,n));setPlaying(id);}}
  };
  const sounds=[{id:'rain',label:'Rain',emoji:'🌧️'},{id:'fire',label:'Fire',emoji:'🔥'},{id:'ocean',label:'Ocean',emoji:'🌊'},{id:'wind',label:'Wind',emoji:'🍃'}];
  return (
    <div className="noir-card p-3">
      <p className={`text-[9px] ${t.wh3} uppercase tracking-[0.15em] text-center mb-2`}>Set the Mood</p>
      <div className="flex justify-center gap-2 mb-2">
        {sounds.map(s=>(<button key={s.id} onClick={()=>toggle(s.id)} className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all active:scale-95"
          style={playing===s.id?{background:'rgba(155,35,53,0.12)',border:'1px solid rgba(183,110,121,0.06)'}:{background:'rgba(43,27,46,0.15)'}}>
          <span className="text-base">{s.emoji}</span><span className={`text-[8px] ${t.wh3}`}>{s.label}</span>
        </button>))}
      </div>
      {playing && <div className="flex items-center gap-2 px-1">
        <span className={`text-[8px] ${t.wh3}`}>🔇</span>
        <input type="range" min={0} max={100} value={volume*100} onChange={e=>{const v=+e.target.value/100;setVolume(v);const n=nodes.get(playing);if(n)n.gain.gain.value=v;}}
          className="flex-1 h-0.5 rounded-full" style={{background:'rgba(43,27,46,0.3)',accentColor:'#B76E79'}}/>
        <span className={`text-[8px] ${t.wh3}`}>🔊</span>
      </div>}
    </div>
  );
}
