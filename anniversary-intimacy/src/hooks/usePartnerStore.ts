import { useState, useCallback, useEffect } from 'react';

// ─── TYPES ─────────────────────────────────────────────────
export type Partner = 'A' | 'B';

export interface PartnerProfile {
  name: string;
  comfortLevel: number; // 1-5
  avatar: string; // emoji
}

export interface RevealData {
  partnerA: Record<string, string>; // questionId -> answer
  partnerB: Record<string, string>;
  revealed: Record<string, boolean>; // questionId -> has been revealed
  partnerAReady: boolean;
  partnerBReady: boolean;
}

export interface AppNotification {
  id: string;
  day: number;
  scheduledTime: string;
  sent: boolean;
}

// ─── STORAGE KEYS ──────────────────────────────────────────
const KEYS = {
  profiles: 'next18_profiles',
  activePartner: 'next18_activePartner',
  surveyReveal: 'next18_surveyReveal',
  promptReveal: 'next18_promptReveal',
  writingResponses: 'next18_writing',
  gamePlayed: 'next18_gamesPlayed',
  setupComplete: 'next18_setupComplete',
  notifications: 'next18_notifications',
  moodHistory: 'next18_moodHistory',
  streak: 'next18_streak',
  lastActive: 'next18_lastActive',
};

// ─── LOCAL STORAGE HELPERS ─────────────────────────────────
function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}

function save(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* noop */ }
}

// ─── DEFAULT PROFILES ──────────────────────────────────────
const defaultProfiles: Record<Partner, PartnerProfile> = {
  A: { name: 'Edwin', comfortLevel: 4, avatar: '🔷' },
  B: { name: 'Mindy', comfortLevel: 4, avatar: '🔶' },
};

// ─── HOOK: usePartnerStore ─────────────────────────────────
export function usePartnerStore() {
  const [activePartner, setActivePartnerRaw] = useState<Partner>(
    () => load(KEYS.activePartner, 'A' as Partner)
  );
  const [profiles, setProfiles] = useState<Record<Partner, PartnerProfile>>(
    () => load(KEYS.profiles, defaultProfiles)
  );
  const [surveyReveal, setSurveyReveal] = useState<RevealData>(
    () => load(KEYS.surveyReveal, {
      partnerA: {}, partnerB: {}, revealed: {},
      partnerAReady: false, partnerBReady: false,
    })
  );
  const [promptReveal, setPromptReveal] = useState<RevealData>(
    () => load(KEYS.promptReveal, {
      partnerA: {}, partnerB: {}, revealed: {},
      partnerAReady: false, partnerBReady: false,
    })
  );
  const [writingResponses, setWritingResponses] = useState<Record<string, Record<Partner, string>>>(
    () => load(KEYS.writingResponses, {})
  );
  const [gamesPlayed, setGamesPlayed] = useState<Record<number, { partnerA: boolean; partnerB: boolean; rating: number }>>(
    () => load(KEYS.gamePlayed, {})
  );
  const [streak, setStreak] = useState<{ count: number; lastDate: string }>(
    () => load(KEYS.streak, { count: 0, lastDate: '' })
  );
  const [moodHistory, setMoodHistory] = useState<Array<{ date: string; partner: Partner; mood: number; note: string }>>(
    () => load(KEYS.moodHistory, [])
  );

  // Persist on change
  useEffect(() => { save(KEYS.activePartner, activePartner); }, [activePartner]);
  useEffect(() => { save(KEYS.profiles, profiles); }, [profiles]);
  useEffect(() => { save(KEYS.surveyReveal, surveyReveal); }, [surveyReveal]);
  useEffect(() => { save(KEYS.promptReveal, promptReveal); }, [promptReveal]);
  useEffect(() => { save(KEYS.writingResponses, writingResponses); }, [writingResponses]);
  useEffect(() => { save(KEYS.gamePlayed, gamesPlayed); }, [gamesPlayed]);
  useEffect(() => { save(KEYS.streak, streak); }, [streak]);
  useEffect(() => { save(KEYS.moodHistory, moodHistory); }, [moodHistory]);

  // Update streak on activity
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (streak.lastDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (streak.lastDate === yesterday) {
        setStreak({ count: streak.count + 1, lastDate: today });
      } else if (streak.lastDate === '') {
        setStreak({ count: 1, lastDate: today });
      } else {
        setStreak({ count: 1, lastDate: today });
      }
      save(KEYS.lastActive, today);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── ACTIONS ──────────────────────────────────

  const setActivePartner = useCallback((p: Partner) => { setActivePartnerRaw(p); }, []);

  const updateProfile = useCallback((partner: Partner, updates: Partial<PartnerProfile>) => {
    setProfiles(prev => ({ ...prev, [partner]: { ...prev[partner], ...updates } }));
  }, []);

  // Survey answers
  const saveSurveyAnswer = useCallback((questionId: string, answer: string) => {
    setSurveyReveal(prev => ({
      ...prev,
      [`partner${activePartner}`]: {
        ...prev[`partner${activePartner}` as 'partnerA' | 'partnerB'],
        [questionId]: answer,
      },
    }));
  }, [activePartner]);

  const markSurveyReady = useCallback((partner: Partner) => {
    setSurveyReveal(prev => ({
      ...prev,
      [`partner${partner}Ready` as 'partnerAReady' | 'partnerBReady']: true,
    }));
  }, []);

  const revealSurveyAnswer = useCallback((questionId: string) => {
    setSurveyReveal(prev => ({
      ...prev,
      revealed: { ...prev.revealed, [questionId]: true },
    }));
  }, []);

  // Writing prompt responses
  const saveWritingResponse = useCallback((promptId: number, response: string) => {
    setWritingResponses(prev => ({
      ...prev,
      [String(promptId)]: {
        ...prev[String(promptId)],
        [activePartner]: response,
      },
    }));
  }, [activePartner]);

  const markPromptReady = useCallback((partner: Partner) => {
    setPromptReveal(prev => ({
      ...prev,
      [`partner${partner}Ready` as 'partnerAReady' | 'partnerBReady']: true,
    }));
  }, []);

  const revealPromptAnswer = useCallback((promptId: string) => {
    setPromptReveal(prev => ({
      ...prev,
      revealed: { ...prev.revealed, [promptId]: true },
    }));
  }, []);

  // Game tracking
  const markGamePlayed = useCallback((gameId: number, rating: number = 0) => {
    setGamesPlayed(prev => ({
      ...prev,
      [gameId]: {
        ...prev[gameId],
        [`partner${activePartner}`]: true,
        rating: rating || prev[gameId]?.rating || 0,
      },
    }));
  }, [activePartner]);

  // Mood check-in
  const saveMood = useCallback((mood: number, note: string = '') => {
    setMoodHistory(prev => [...prev, {
      date: new Date().toISOString(),
      partner: activePartner,
      mood,
      note,
    }]);
  }, [activePartner]);

  // Check if both partners answered a specific question
  const bothAnswered = useCallback((type: 'survey' | 'prompt', id: string): boolean => {
    const data = type === 'survey' ? surveyReveal : promptReveal;
    return !!(data.partnerA[id] && data.partnerB[id]);
  }, [surveyReveal, promptReveal]);

  // Get answer for a partner
  const getAnswer = useCallback((type: 'survey' | 'prompt', id: string, partner: Partner): string => {
    const data = type === 'survey' ? surveyReveal : promptReveal;
    return data[`partner${partner}` as 'partnerA' | 'partnerB'][id] || '';
  }, [surveyReveal, promptReveal]);

  // Reset all data
  const resetAll = useCallback(() => {
    Object.values(KEYS).forEach(key => localStorage.removeItem(key));
    window.location.reload();
  }, []);

  return {
    // State
    activePartner,
    profiles,
    surveyReveal,
    promptReveal,
    writingResponses,
    gamesPlayed,
    streak,
    moodHistory,
    // Partner actions
    setActivePartner,
    updateProfile,
    // Survey actions
    saveSurveyAnswer,
    markSurveyReady,
    revealSurveyAnswer,
    // Writing actions
    saveWritingResponse,
    markPromptReady,
    revealPromptAnswer,
    // Game actions
    markGamePlayed,
    // Mood
    saveMood,
    // Helpers
    bothAnswered,
    getAnswer,
    resetAll,
  };
}
