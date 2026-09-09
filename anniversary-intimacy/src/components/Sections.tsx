import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Flame, Gamepad2, ClipboardList, PenTool, BookOpen, Play, ChevronDown, ChevronRight, Clock, Sparkles, MessageCircle } from 'lucide-react';
import { gameCards, surveyQuestions, writingPrompts, learningModules, mediaContent, conversationStarters } from '../data/courseData';

const sv = { hidden:{opacity:0,y:50}, visible:{opacity:1,y:0,transition:{duration:0.8, staggerChildren:0.07}} };
const iv = { hidden:{opacity:0,y:25}, visible:{opacity:1,y:0} };

function SHead({icon,badge,title,sub}:{icon:React.ReactNode;badge:string;title:string;sub:string}) {
  return (
    <div className="text-center mb-12 md:mb-20">
      <motion.div variants={iv} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-gold/6 bg-plum-900/20 mb-5 md:mb-8">
        {icon}
        <span className="text-[9px] md:text-[10px] text-rose-gold/30 uppercase tracking-[0.2em] font-medium">{badge}</span>
      </motion.div>
      <motion.h2 variants={iv} className="text-3xl md:text-6xl font-light font-display text-gradient-champagne mb-3 md:mb-5 tracking-[0.03em]">{title}</motion.h2>
      <motion.p variants={iv} className="text-champagne/15 text-sm md:text-base max-w-md mx-auto font-light leading-[1.8] tracking-wide">{sub}</motion.p>
    </div>
  );
}

/* ═══ GAMES ═══ */
export function GamesSection() {
  const [sel,setSel] = useState<number|null>(null);
  const ic = ['bg-emerald-400/70','bg-lime-400/70','bg-amber-400/70','bg-orange-500/70','bg-red-500/70'];
  return (
    <section id="games" className="section-breathe px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={sv}>
        <SHead icon={<Gamepad2 className="w-3.5 h-3.5 text-rose-gold/40"/>} badge="Games & Challenges" title="Play & Explore" sub="Escalating activities to push boundaries and spark curiosity"/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {gameCards.map(g => (
            <motion.div key={g.id} variants={iv} className="noir-card overflow-hidden">
              <button className="w-full p-5 md:p-7 text-left" onClick={()=>setSel(sel===g.id?null:g.id)}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0 mr-4">
                    <span className="text-[9px] font-semibold text-rose-gold/20 uppercase tracking-[0.15em]">{g.category}</span>
                    <h3 className="text-base md:text-xl font-display font-normal text-champagne/60 mt-1">{g.title}</h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-champagne/12 shrink-0"><Clock className="w-3 h-3"/><span className="text-[10px]">{g.duration}</span></div>
                </div>
                <div className="flex items-center gap-2.5 mb-4">
                  <Flame className="w-3 h-3 text-ember/40 shrink-0"/>
                  <span className="text-[10px] text-champagne/15 shrink-0">Intensity</span>
                  <div className="flex gap-1">{[1,2,3,4,5].map(l=><div key={l} className={`w-5 h-1 rounded-full ${l<=g.intensity?ic[g.intensity-1]:'bg-plum-800/30'}`}/>)}</div>
                </div>
                <p className="text-[11px] md:text-xs text-champagne/20 line-clamp-2 mb-4 font-light leading-relaxed">{g.description}</p>
                <div className="flex items-center gap-1.5 text-[10px] text-champagne/10">
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${sel===g.id?'rotate-180':''}`}/>
                  {sel===g.id?'Hide':'Show'} instructions
                </div>
              </button>
              <AnimatePresence>{sel===g.id && (<motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.35}} className="overflow-hidden">
                <div className="px-5 md:px-7 pb-6 md:pb-8 pt-4 border-t" style={{borderColor:'rgba(183,110,121,0.04)'}}>
                  <div className="space-y-3">{g.instructions.map((s,i)=>(
                    <motion.div key={i} initial={{opacity:0,x:-6}} animate={{opacity:1,x:0}} transition={{delay:i*0.04}} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] text-champagne/25 shrink-0 mt-0.5" style={{background:'rgba(155,35,53,0.12)'}}>{i+1}</div>
                      <p className="text-[11px] md:text-xs text-champagne/30 font-light">{s}</p>
                    </motion.div>
                  ))}</div>
                </div>
              </motion.div>)}</AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ═══ SURVEYS ═══ */
export function SurveysSection({ partnerStore }: { partnerStore?: Record<string,unknown> } = {}) {
  void partnerStore;
  const [cat,setCat] = useState('Desire Mapping');
  const [expQ,setExpQ] = useState<number|null>(null);
  const [ans,setAns] = useState<Record<number,string>>({});
  const cats = [...new Set(surveyQuestions.map(q=>q.category))];
  const filt = surveyQuestions.filter(q=>q.category===cat);
  return (
    <section id="surveys" className="section-breathe px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={sv}>
        <SHead icon={<ClipboardList className="w-3.5 h-3.5 text-rose-gold/40"/>} badge="Surveys & Questionnaires" title="Desire Mapping" sub="Explore desires and boundaries through structured questionnaires"/>
        <div className="flex gap-2 mb-8 md:mb-12 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center scrollbar-hide">
          {cats.map(c=>(<button key={c} onClick={()=>{setCat(c);setExpQ(null)}} className={`px-4 md:px-5 py-2.5 rounded-full text-[10px] md:text-xs font-medium tracking-[0.08em] uppercase transition-all whitespace-nowrap shrink-0 ${
            cat===c?'btn-primary rounded-full shadow-lg shadow-ember/15':'btn-ghost rounded-full'
          }`}>{c}</button>))}
        </div>
        <div className="space-y-3 md:space-y-4 max-w-3xl mx-auto">
          {filt.map((q,i)=>(
            <motion.div key={q.id} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}} className="noir-card overflow-hidden">
              <button className="w-full p-4 md:p-6 text-left flex items-start gap-3 md:gap-4" onClick={()=>setExpQ(expQ===q.id?null:q.id)}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] text-champagne/20 shrink-0" style={{background:'rgba(155,35,53,0.1)'}}>{q.id}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm text-champagne/50 font-medium leading-relaxed">{q.question}</p>
                  <span className="text-[9px] text-champagne/10 capitalize mt-1.5 inline-block tracking-[0.12em]">{q.type==='scale'?'1-10':q.type}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 text-champagne/10 transition-transform shrink-0 mt-1 ${expQ===q.id?'rotate-90':''}`}/>
              </button>
              <AnimatePresence>{expQ===q.id && (<motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.3}} className="overflow-hidden">
                <div className="px-4 md:px-6 pb-5 md:pb-7">
                  <div className="rounded-xl p-4 md:p-5 space-y-4" style={{background:'rgba(43,27,46,0.15)', border:'1px solid rgba(183,110,121,0.03)'}}>
                    {q.type==='scale'&&(<div>
                      <p className="text-[9px] text-champagne/20 mb-3 tracking-[0.15em] uppercase">Your Rating</p>
                      <div className="flex gap-1.5 flex-wrap">{[1,2,3,4,5,6,7,8,9,10].map(n=>(
                        <button key={n} onClick={()=>setAns({...ans,[q.id]:String(n)})} className={`w-8 h-8 md:w-10 md:h-10 rounded-lg text-[10px] md:text-xs font-medium transition-all active:scale-90 ${
                          ans[q.id]===String(n)?'btn-primary rounded-lg shadow-lg shadow-ember/20':'bg-plum-900/20 text-champagne/20 border border-rose-gold/4'
                        }`}>{n}</button>
                      ))}</div>
                    </div>)}
                    {q.type==='multiple'&&q.options&&(<div>
                      <p className="text-[9px] text-champagne/20 mb-3 tracking-[0.15em] uppercase">Select all that apply</p>
                      <div className="flex flex-wrap gap-2">{q.options.map(o=>(
                        <button key={o} onClick={()=>setAns({...ans,[q.id]:o})} className={`px-3 py-2 rounded-lg text-[10px] md:text-xs transition-all active:scale-95 ${
                          ans[q.id]===o?'btn-primary rounded-lg':'btn-ghost rounded-lg'
                        }`}>{o}</button>
                      ))}</div>
                    </div>)}
                    {q.type==='open'&&(<div>
                      <p className="text-[9px] text-champagne/20 mb-3 tracking-[0.15em] uppercase">Your Response</p>
                      <textarea className="w-full rounded-xl p-3.5 text-champagne/60 text-xs md:text-sm focus:outline-none transition-colors" style={{background:'rgba(43,27,46,0.2)',border:'1px solid rgba(183,110,121,0.04)'}} rows={3} placeholder="Write your honest response..." value={ans[q.id]||''} onChange={e=>setAns({...ans,[q.id]:e.target.value})}/>
                    </div>)}
                    {q.type==='yesno'&&(<div>
                      <p className="text-[9px] text-champagne/20 mb-3 tracking-[0.15em] uppercase">Your Answer</p>
                      <div className="flex gap-3">{['Yes','No'].map(o=>(
                        <button key={o} onClick={()=>setAns({...ans,[q.id]:o})} className={`px-6 py-2.5 rounded-xl text-xs font-medium transition-all active:scale-95 tracking-[0.08em] uppercase ${
                          ans[q.id]===o?'btn-primary rounded-xl':'btn-ghost rounded-xl'
                        }`}>{o}</button>
                      ))}</div>
                    </div>)}
                    {q.followUp&&(<div className="pt-3" style={{borderTop:'1px solid rgba(183,110,121,0.03)'}}>
                      <p className="text-[9px] text-champagne/10 mb-1">Follow-up:</p>
                      <p className="text-[10px] text-champagne/15 italic font-light">{q.followUp}</p>
                    </div>)}
                  </div>
                </div>
              </motion.div>)}</AnimatePresence>
            </motion.div>
          ))}
        </div>
        <p className="text-center mt-10 text-[9px] text-champagne/10 font-light tracking-[0.15em] uppercase">Complete separately, then share with curiosity</p>
      </motion.div>
    </section>
  );
}

/* ═══ WRITING ═══ */
export function WritingPromptsSection({ partnerStore }: { partnerStore?: Record<string,unknown> } = {}) {
  void partnerStore;
  const [act,setAct] = useState<number|null>(null);
  const [res,setRes] = useState<Record<number,string>>({});
  const [showC,setShowC] = useState(false);
  const [cs,setCs] = useState(0);
  const wC: Record<string,string> = {both:'from-purple-500/70 to-pink-400/70',edwin:'from-blue-500/70 to-cyan-400/70',mindy:'from-rose-500/70 to-orange-400/70'};
  const wL: Record<string,string> = {both:'Both Partners',edwin:'For Edwin',mindy:'For Mindy'};
  return (
    <section id="prompts" className="section-breathe px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={sv}>
        <SHead icon={<PenTool className="w-3.5 h-3.5 text-rose-gold/40"/>} badge="Writing & Conversation" title="Words That Connect" sub="Guided writing exercises to unlock emotions and desires"/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-16 md:mb-24">
          {writingPrompts.map(p=>(
            <motion.div key={p.id} variants={iv} className="noir-card overflow-hidden">
              <div className="h-px" style={{background:`linear-gradient(90deg, transparent, ${p.forWhom==='both'?'#a855f7':p.forWhom==='edwin'?'#3b82f6':'#f43f5e'}33, transparent)`}}/>
              <div className="p-5 md:p-7">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-1 rounded-full text-[8px] md:text-[9px] font-semibold bg-gradient-to-r ${wC[p.forWhom]} text-white/80`}>{wL[p.forWhom]}</span>
                  <div className="flex items-center gap-1 text-champagne/10"><Clock className="w-2.5 h-2.5"/><span className="text-[9px]">{p.duration}</span></div>
                </div>
                <h3 className="text-sm md:text-lg font-display text-champagne/60 mb-3">{p.title}</h3>
                <p className="text-[11px] md:text-xs text-champagne/18 leading-[1.7] line-clamp-3 mb-5 font-light">{p.prompt}</p>
                {act===p.id ? (
                  <div className="space-y-3">
                    <textarea className="w-full rounded-xl p-4 text-champagne/50 text-xs md:text-sm focus:outline-none" style={{background:'rgba(43,27,46,0.2)',border:'1px solid rgba(183,110,121,0.04)'}} rows={4} placeholder="Let it flow..." value={res[p.id]||''} onChange={e=>setRes({...res,[p.id]:e.target.value})}/>
                    <div className="rounded-lg p-3" style={{background:'rgba(43,27,46,0.15)',border:'1px solid rgba(183,110,121,0.03)'}}>
                      <p className="text-[9px] text-champagne/10 mb-0.5">After writing:</p>
                      <p className="text-[10px] text-champagne/15 italic font-light">{p.followUp}</p>
                    </div>
                    <button onClick={()=>setAct(null)} className="text-[9px] text-champagne/10">Close</button>
                  </div>
                ) : (
                  <button onClick={()=>setAct(p.id)} className="btn-magnetic btn-ghost px-4 py-2.5 rounded-xl text-[10px] md:text-xs flex items-center gap-2">
                    <PenTool className="w-3 h-3"/> Begin Writing
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div variants={iv} className="noir-card p-5 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:'rgba(155,35,53,0.12)'}}>
                <MessageCircle className="w-4 h-4 text-rose-gold/40"/>
              </div>
              <div>
                <h3 className="text-sm md:text-base font-display text-champagne/50">Conversation Starters</h3>
                <p className="text-[9px] text-champagne/12 font-light">Quick prompts for deeper connection</p>
              </div>
            </div>
            <button onClick={()=>setShowC(!showC)} className="btn-ghost px-3 py-2 rounded-xl text-[10px]">{showC?'Hide':'Show All'}</button>
          </div>
          <AnimatePresence>{showC && (<motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.35}} className="overflow-hidden">
            <div className="mb-6 p-5 md:p-8 rounded-2xl text-center" style={{background:'rgba(43,27,46,0.15)',border:'1px solid rgba(183,110,121,0.03)'}}>
              <motion.p key={cs} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="text-sm md:text-lg text-champagne/50 font-display italic leading-relaxed font-light">"{conversationStarters[cs]}"</motion.p>
              <button onClick={()=>setCs((cs+1)%conversationStarters.length)}
                className="btn-magnetic btn-primary mt-5 px-5 py-2.5 rounded-full text-[10px] md:text-xs inline-flex items-center gap-2">
                <Sparkles className="w-3 h-3"/> Next
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">{conversationStarters.map((s,i)=>(
              <button key={i} onClick={()=>setCs(i)} className={`p-3 rounded-xl text-left text-[10px] md:text-xs transition-all active:scale-[0.98] ${
                cs===i?'bg-ember/8 text-champagne/40 border border-ember/6':'text-champagne/12 hover:text-champagne/25'
              }`}>{s}</button>
            ))}</div>
          </motion.div>)}</AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══ LEARNING ═══ */
export function LearningMaterialsSection() {
  const [am,setAm] = useState<number|null>(null);
  const [ch,setCh] = useState(0);
  const em = ['🎯','🎭','🌐','🧘'];
  return (
    <section id="learning" className="section-breathe px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={sv}>
        <SHead icon={<BookOpen className="w-3.5 h-3.5 text-rose-gold/40"/>} badge="Learning Materials" title="Knowledge & Workbooks" sub="Guides covering techniques, safety, and advanced practices"/>
        <div className="space-y-4 md:space-y-5 max-w-4xl mx-auto">
          {learningModules.map(m=>{const open=am===m.id; return (
            <motion.div key={m.id} variants={iv} className="noir-card overflow-hidden">
              <button className="w-full p-5 md:p-7 text-left flex items-center gap-4 md:gap-5" onClick={()=>{setAm(open?null:m.id);setCh(0)}}>
                <div className="w-11 h-11 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-xl md:text-3xl shrink-0" style={{background:'rgba(155,35,53,0.08)',border:'1px solid rgba(183,110,121,0.04)'}}>{em[m.id-1]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[9px] text-champagne/10 uppercase tracking-[0.12em]">{m.category}</span>
                    <span className="text-[9px] text-champagne/6">·</span>
                    <span className="text-[9px] text-champagne/10">{m.chapters.length} chapters</span>
                  </div>
                  <h3 className="text-xs md:text-lg font-display text-champagne/60">{m.title}</h3>
                </div>
                <ChevronDown className={`w-4 h-4 text-champagne/8 transition-transform shrink-0 ${open?'rotate-180':''}`}/>
              </button>
              <AnimatePresence>{open && (<motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.35}} className="overflow-hidden">
                <div className="px-5 md:px-7 pb-6 md:pb-8 pt-4 border-t" style={{borderColor:'rgba(183,110,121,0.03)'}}>
                  <p className="text-[11px] text-champagne/18 mb-5 font-light">{m.description}</p>
                  <div className="md:hidden flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-4">
                    {m.chapters.map((c,i)=>(<button key={i} onClick={()=>setCh(i)} className={`px-3 py-2 rounded-xl text-[9px] whitespace-nowrap shrink-0 transition-all ${
                      ch===i?'text-champagne/60 border-b-2 border-rose-gold/40':'text-champagne/15'
                    }`}>{i+1}. {c.title}</button>))}
                  </div>
                  <div className="hidden md:flex gap-6">
                    <div className="w-52 shrink-0 space-y-1">{m.chapters.map((c,i)=>(
                      <button key={i} onClick={()=>setCh(i)} className={`w-full text-left px-3 py-2 rounded-xl text-[10px] transition-all ${ch===i?'text-champagne/60 border-l-2 border-rose-gold/40':'text-champagne/12'}`}><span className="text-champagne/8 mr-1.5">{i+1}.</span>{c.title}</button>
                    ))}</div>
                    <div className="flex-1 rounded-2xl p-6" style={{background:'rgba(43,27,46,0.12)',border:'1px solid rgba(183,110,121,0.02)'}}>
                      <h4 className="text-xs font-display text-champagne/50 mb-3">{m.chapters[ch].title}</h4>
                      <p className="text-[11px] text-champagne/25 leading-[1.9]">{m.chapters[ch].content}</p>
                      <div className="flex justify-between mt-6 pt-3" style={{borderTop:'1px solid rgba(183,110,121,0.03)'}}>
                        <button onClick={()=>setCh(Math.max(0,ch-1))} disabled={ch===0} className="text-[9px] text-champagne/15 disabled:opacity-20">← Previous</button>
                        <span className="text-[9px] text-champagne/8">{ch+1}/{m.chapters.length}</span>
                        <button onClick={()=>setCh(Math.min(m.chapters.length-1,ch+1))} disabled={ch===m.chapters.length-1} className="text-[9px] text-champagne/15 disabled:opacity-20">Next →</button>
                      </div>
                    </div>
                  </div>
                  <div className="md:hidden rounded-2xl p-5" style={{background:'rgba(43,27,46,0.12)',border:'1px solid rgba(183,110,121,0.02)'}}>
                    <h4 className="text-xs font-display text-champagne/50 mb-3">{m.chapters[ch].title}</h4>
                    <p className="text-[11px] text-champagne/25 leading-[1.9]">{m.chapters[ch].content}</p>
                    <div className="flex justify-between mt-5 pt-3" style={{borderTop:'1px solid rgba(183,110,121,0.03)'}}>
                      <button onClick={()=>setCh(Math.max(0,ch-1))} disabled={ch===0} className="text-[9px] text-champagne/15 disabled:opacity-20">← Prev</button>
                      <span className="text-[9px] text-champagne/8">{ch+1}/{m.chapters.length}</span>
                      <button onClick={()=>setCh(Math.min(m.chapters.length-1,ch+1))} disabled={ch===m.chapters.length-1} className="text-[9px] text-champagne/15 disabled:opacity-20">Next →</button>
                    </div>
                  </div>
                </div>
              </motion.div>)}</AnimatePresence>
            </motion.div>
          );})}
        </div>
      </motion.div>
    </section>
  );
}

/* ═══ MEDIA ═══ */
export function MediaSection() {
  const [pl,setPl] = useState<number|null>(null);
  const tC: Record<string,string> = {'guided-meditation':'from-violet-500/70 to-purple-400/70','audio-lesson':'from-blue-500/70 to-cyan-400/70','video-lesson':'from-rose-500/70 to-pink-400/70','audio-practice':'from-emerald-500/70 to-teal-400/70'};
  const tL: Record<string,string> = {'guided-meditation':'Meditation','audio-lesson':'Audio','video-lesson':'Video','audio-practice':'Practice'};
  const tE: Record<string,string> = {'guided-meditation':'🧘','audio-lesson':'🎧','video-lesson':'🎬','audio-practice':'🎵'};
  return (
    <section id="media" className="section-breathe px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={sv}>
        <SHead icon={<Play className="w-3.5 h-3.5 text-rose-gold/40"/>} badge="Audio & Video" title="Guided Sessions" sub="Meditations, coaching, and practices to experience together"/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {mediaContent.map(item=>{const isP=pl===item.id; return (
            <motion.div key={item.id} variants={iv} className="noir-card overflow-hidden">
              <div className={`h-px bg-gradient-to-r ${tC[item.type]}`} style={{opacity:0.4}}/>
              <div className="p-4 md:p-5">
                <div className="flex items-start gap-3 md:gap-4">
                  <motion.button whileTap={{scale:0.9}} onClick={()=>setPl(isP?null:item.id)}
                    className={`w-11 h-11 md:w-13 md:h-13 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                      isP?`bg-gradient-to-br ${tC[item.type]} shadow-lg`:''}`}
                    style={!isP?{background:'rgba(43,27,46,0.2)',border:'1px solid rgba(183,110,121,0.04)'}:{}}>
                    <span className="text-lg md:text-xl">{isP?'⏸':tE[item.type]}</span>
                  </motion.button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                      <span className="text-[9px] text-champagne/12">{tL[item.type]}</span>
                      <span className="text-[9px] text-champagne/6">·</span>
                      <span className="text-[9px] text-champagne/12 flex items-center gap-0.5"><Clock className="w-2.5 h-2.5"/>{item.duration}</span>
                      <span className="text-[9px] text-champagne/6">·</span>
                      <span className="text-[9px] text-champagne/12">{item.category}</span>
                    </div>
                    <h3 className="text-xs md:text-sm font-display text-champagne/50">{item.title}</h3>
                    <p className="text-[10px] text-champagne/12 mt-1 line-clamp-2 font-light">{item.description}</p>
                  </div>
                </div>
                {isP && (<motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-champagne/8">0:00</span>
                    <div className="flex-1 h-0.5 rounded-full overflow-hidden" style={{background:'rgba(43,27,46,0.3)'}}>
                      <motion.div className={`h-full rounded-full bg-gradient-to-r ${tC[item.type]}`} initial={{width:'0%'}} animate={{width:'100%'}} transition={{duration:10,repeat:Infinity}}/>
                    </div>
                    <span className="text-[9px] text-champagne/8">{item.duration}</span>
                  </div>
                </motion.div>)}
              </div>
            </motion.div>
          );})}
        </div>
      </motion.div>
    </section>
  );
}
