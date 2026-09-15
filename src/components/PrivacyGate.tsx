import { FormEvent, ReactNode, useState } from 'react';
import { Lock } from 'lucide-react';

const PIN_KEY = 'next18_privacy_pin';

async function digest(pin: string) {
  const bytes = new TextEncoder().encode(pin);
  const hash = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, '0')).join('');
}

export default function PrivacyGate({ children }: { children: ReactNode }) {
  const [savedPin, setSavedPin] = useState(() => localStorage.getItem(PIN_KEY) || '');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!/^\d{4,6}$/.test(pin)) {
      setError('Choose a 4–6 digit PIN.');
      return;
    }
    const hashed = await digest(pin);
    if (!savedPin) {
      localStorage.setItem(PIN_KEY, hashed);
      setSavedPin(hashed);
      setPin('');
      return;
    }
    if (hashed !== savedPin) {
      setError('That PIN did not match.');
      setPin('');
      return;
    }
    sessionStorage.setItem('next18_unlocked', 'true');
    window.location.reload();
  }

  if (savedPin && sessionStorage.getItem('next18_unlocked') === 'true') return <>{children}</>;

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#120d15] text-champagne">
      <form onSubmit={submit} className="noir-card w-full max-w-md p-8 md:p-10 text-center space-y-6" aria-labelledby="privacy-title">
        <div className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center bg-wine-900/40 text-rose-gold"><Lock aria-hidden="true" /></div>
        <div><h1 id="privacy-title" className="font-display text-3xl mb-3">Private by design</h1><p className="text-champagne/55 text-sm leading-relaxed">{savedPin ? 'Enter your PIN to open your private course.' : 'Create a local PIN before saving private answers and journal entries.'}</p></div>
        <label className="block text-left text-xs uppercase tracking-[0.16em] text-champagne/50">{savedPin ? 'Your PIN' : 'Create PIN'}<input autoFocus inputMode="numeric" pattern="[0-9]*" maxLength={6} type="password" value={pin} onChange={event => { setPin(event.target.value.replace(/\D/g, '')); setError(''); }} className="mt-2 w-full rounded-xl bg-black/20 border border-rose-gold/20 px-4 py-3 text-lg tracking-[0.35em] text-center focus:outline-none focus:ring-2 focus:ring-rose-gold/60" aria-describedby={error ? 'pin-error' : undefined} /></label>
        {error && <p id="pin-error" role="alert" className="text-sm text-rose-300">{error}</p>}
        <button className="btn-primary w-full rounded-xl py-3.5 uppercase tracking-[0.12em] text-xs" type="submit">{savedPin ? 'Unlock course' : 'Save PIN'}</button>
      </form>
    </main>
  );
}
