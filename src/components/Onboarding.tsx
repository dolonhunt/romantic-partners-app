import { useState, type FormEvent } from 'react';
import { Heart, ShieldCheck } from 'lucide-react';

interface OnboardingProps {
  initialA: string;
  initialB: string;
  onComplete: (data: { nameA: string; nameB: string; anniversary: string; boundaries: string }) => void;
}

export default function Onboarding({ initialA, initialB, onComplete }: OnboardingProps) {
  const [nameA, setNameA] = useState(initialA);
  const [nameB, setNameB] = useState(initialB);
  const [anniversary, setAnniversary] = useState('');
  const [boundaries, setBoundaries] = useState('');

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!nameA.trim() || !nameB.trim()) return;
    onComplete({ nameA: nameA.trim(), nameB: nameB.trim(), anniversary, boundaries: boundaries.trim() });
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#120d15] text-champagne">
      <form onSubmit={submit} className="noir-card w-full max-w-2xl p-7 md:p-10 space-y-7" aria-labelledby="onboarding-title">
        <div className="flex items-start gap-4"><div className="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center bg-wine-900/40 text-rose-gold"><Heart aria-hidden="true" /></div><div><p className="text-[10px] uppercase tracking-[0.2em] text-rose-gold/70">A private beginning</p><h1 id="onboarding-title" className="font-display text-3xl md:text-4xl mt-1">Make this course yours</h1><p className="text-sm text-champagne/55 mt-3 leading-relaxed">Set the shared details once. Everything stays on this device unless you choose to export it.</p></div></div>
        <div className="grid md:grid-cols-2 gap-4"><label className="text-xs uppercase tracking-[0.15em] text-champagne/55">Partner one<input required value={nameA} onChange={e => setNameA(e.target.value)} className="mt-2 w-full rounded-xl bg-black/20 border border-rose-gold/20 px-4 py-3 text-base normal-case tracking-normal text-champagne" /></label><label className="text-xs uppercase tracking-[0.15em] text-champagne/55">Partner two<input required value={nameB} onChange={e => setNameB(e.target.value)} className="mt-2 w-full rounded-xl bg-black/20 border border-rose-gold/20 px-4 py-3 text-base normal-case tracking-normal text-champagne" /></label></div>
        <label className="block text-xs uppercase tracking-[0.15em] text-champagne/55">Anniversary date <span className="normal-case tracking-normal text-champagne/30">(optional)</span><input type="date" value={anniversary} onChange={e => setAnniversary(e.target.value)} className="mt-2 w-full rounded-xl bg-black/20 border border-rose-gold/20 px-4 py-3 text-base text-champagne" /></label>
        <label className="block text-xs uppercase tracking-[0.15em] text-champagne/55">Our boundaries <span className="normal-case tracking-normal text-champagne/30">(optional, private)</span><textarea value={boundaries} onChange={e => setBoundaries(e.target.value)} rows={3} placeholder="What helps us feel safe, connected, and unhurried?" className="mt-2 w-full rounded-xl bg-black/20 border border-rose-gold/20 px-4 py-3 text-sm normal-case tracking-normal text-champagne placeholder:text-champagne/25" /></label>
        <div className="flex items-center gap-2 text-xs text-champagne/40"><ShieldCheck className="w-4 h-4 text-rose-gold/70" aria-hidden="true" />No account or server sync is required.</div>
        <button type="submit" className="btn-primary w-full rounded-xl py-4 uppercase tracking-[0.12em] text-xs">Enter our course</button>
      </form>
    </main>
  );
}
