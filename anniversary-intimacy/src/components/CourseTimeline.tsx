import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { courseDays } from '../data/courseData';

interface CourseTimelineProps { onSelectDay: (day: number) => void; completedDays: Set<number> }

const typeColors: Record<string,string> = {
  game:'from-amber-500/80 to-orange-400/80', survey:'from-blue-500/80 to-cyan-400/80',
  prompt:'from-purple-500/80 to-pink-400/80', learning:'from-emerald-500/80 to-teal-400/80',
  media:'from-rose-500/80 to-red-400/80', reflection:'from-indigo-500/80 to-violet-400/80',
};
const typeLabels: Record<string,string> = { game:'Game', survey:'Survey', prompt:'Writing', learning:'Learning', media:'Media', reflection:'Reflection' };

export default function CourseTimeline({ onSelectDay, completedDays }: CourseTimelineProps) {
  const [expandedDay, setExpandedDay] = useState<number|null>(null);
  const [week, setWeek] = useState<1|2>(1);
  const days = courseDays.filter(d => week===1 ? d.day<=7 : d.day>7);

  return (
    <section id="timeline" className="section-breathe px-4 md:px-8 max-w-5xl mx-auto">

      {/* Header */}
      <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}}
        className="text-center mb-12 md:mb-20">
        <h2 className="text-3xl md:text-6xl font-light font-display text-gradient-champagne mb-4 md:mb-6 tracking-[0.03em]">Your 14-Day Journey</h2>
        <p className="text-champagne/20 text-sm md:text-base max-w-md mx-auto font-light leading-relaxed tracking-wide">
          Two weeks of escalating exploration — from reconnection to celebration
        </p>
      </motion.div>

      {/* Week toggle */}
      <div className="flex justify-center mb-10 md:mb-14">
        <div className="glass rounded-full p-1 flex gap-1">
          {([1,2] as const).map(w => (
            <button key={w} onClick={()=>{setWeek(w);setExpandedDay(null)}}
              className={`px-5 md:px-8 py-3 md:py-4 rounded-full text-xs md:text-sm font-medium tracking-[0.1em] uppercase transition-all duration-500 min-w-[110px] md:min-w-[140px] ${
                week===w ? 'btn-primary rounded-full shadow-lg shadow-ember/20' : 'text-champagne/25 hover:text-champagne/40'
              }`}>
              Week {w}
            </button>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-10 md:mb-14">
        <div className="flex justify-between text-[10px] text-champagne/15 mb-3 tracking-[0.15em] uppercase">
          <span>{completedDays.size} of 14 completed</span>
          <span>{Math.round((completedDays.size/14)*100)}%</span>
        </div>
        <div className="h-1 rounded-full overflow-hidden" style={{background:'rgba(43,27,46,0.3)'}}>
          <motion.div className="h-full rounded-full" style={{background:'linear-gradient(90deg, #9B2335, #B76E79, #E8C9A0)'}}
            initial={{width:0}} animate={{width:`${(completedDays.size/14)*100}%`}} transition={{duration:1.2, ease:[0.23,1,0.32,1]}} />
        </div>
      </div>

      {/* Days */}
      <div className="space-y-4 md:space-y-5">
        <AnimatePresence mode="wait">
          {days.map((day, i) => {
            const open = expandedDay===day.day;
            const done = completedDays.has(day.day);
            return (
              <motion.div key={day.day} initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                transition={{duration:0.4, delay:i*0.05}} className="noir-card overflow-hidden">

                <button className="w-full p-5 md:p-7 text-left flex items-center gap-4 md:gap-5"
                  onClick={()=>setExpandedDay(open?null:day.day)}>
                  {/* Icon */}
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shrink-0 transition-all duration-500 ${
                    done ? 'shadow-lg' : ''
                  }`} style={done ? {background:'linear-gradient(135deg, #B76E79, #E8C9A0)'} : {background:'rgba(43,27,46,0.3)', border:'1px solid rgba(183,110,121,0.06)'}}>
                    {done ? <CheckCircle2 className="w-7 h-7 md:w-8 md:h-8" style={{color:'#2B1B2E'}} /> : day.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[9px] md:text-[10px] font-semibold text-champagne/15 uppercase tracking-[0.18em]">Day {day.day}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] md:text-[9px] font-semibold bg-gradient-to-r ${typeColors[day.type]} text-white/80`}>
                        {typeLabels[day.type]}
                      </span>
                    </div>
                    <h3 className="text-base md:text-xl font-display font-normal text-champagne/70 mb-0.5">{day.title}</h3>
                    <p className="text-[11px] md:text-xs text-champagne/15 font-light">{day.subtitle}</p>
                  </div>

                  <div className="shrink-0 text-champagne/10 p-1">
                    {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>{open && (
                  <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}
                    transition={{duration:0.4}} className="overflow-hidden">
                    <div className="px-5 md:px-7 pb-6 md:pb-8 pt-3 border-t" style={{borderColor:'rgba(183,110,121,0.04)'}}>
                      <p className="text-xs md:text-sm text-champagne/25 mb-6 leading-[1.8] font-light">{day.description}</p>
                      <div className="space-y-3 mb-6">
                        {day.content.map((item,j) => (
                          <motion.div key={j} initial={{opacity:0,x:-6}} animate={{opacity:1,x:0}} transition={{delay:j*0.04}}
                            className="flex items-start gap-3 text-xs md:text-sm">
                            <span className="text-rose-gold/20 mt-1 shrink-0 text-[8px]">◆</span>
                            <span className="text-champagne/30 font-light">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                      {day.tips && (
                        <div className="rounded-2xl p-4 md:p-5 mb-5" style={{background:'rgba(74,14,31,0.12)', border:'1px solid rgba(155,35,53,0.06)'}}>
                          <p className="text-[9px] font-semibold text-rose-gold/30 uppercase tracking-[0.18em] mb-2">Tips</p>
                          {day.tips.map((t,j)=> <p key={j} className="text-[11px] text-champagne/20 mb-1.5 font-light">💡 {t}</p>)}
                        </div>
                      )}
                      <button onClick={()=>onSelectDay(day.day)}
                        className="btn-magnetic btn-primary w-full py-3.5 md:py-4 rounded-xl text-xs md:text-sm tracking-[0.08em] uppercase">
                        {done ? '✓ Complete — Review' : `Begin Day ${day.day}`}
                      </button>
                    </div>
                  </motion.div>
                )}</AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
