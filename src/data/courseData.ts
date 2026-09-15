export interface DayActivity {
  day: number;
  title: string;
  subtitle: string;
  type: 'game' | 'survey' | 'prompt' | 'learning' | 'media' | 'reflection';
  icon: string;
  description: string;
  content: string[];
  tips?: string[];
}

export interface GameCard {
  id: number;
  title: string;
  category: string;
  intensity: 1 | 2 | 3 | 4 | 5;
  description: string;
  instructions: string[];
  duration: string;
}

export interface SurveyQuestion {
  id: number;
  category: string;
  question: string;
  type: 'scale' | 'open' | 'multiple' | 'yesno';
  options?: string[];
  followUp?: string;
}

export interface WritingPrompt {
  id: number;
  title: string;
  prompt: string;
  duration: string;
  category: string;
  forWhom: 'both' | 'edwin' | 'mindy';
  followUp: string;
}

export interface LearningModule {
  id: number;
  title: string;
  category: string;
  description: string;
  chapters: { title: string; content: string }[];
  duration: string;
}

export interface MediaItem {
  id: number;
  title: string;
  type: 'guided-meditation' | 'audio-lesson' | 'video-lesson' | 'audio-practice';
  duration: string;
  description: string;
  category: string;
}

export const courseDays: DayActivity[] = [
  {
    day: 1,
    title: "Intention Setting & Sacred Space",
    subtitle: "Begin your 14-day journey with clarity and purpose",
    type: 'reflection',
    icon: '🕯️',
    description: "Create a sacred container for your exploration. Together, you'll define what this anniversary course means to each of you and set shared intentions for the two weeks ahead.",
    content: [
      "Create a comfortable, private space where you both feel completely safe",
      "Light candles or set ambient lighting that feels intimate and warm",
      "Each partner writes a private letter: 'What I want from these next 14 days'",
      "Share your letters aloud — no interruptions, only listening",
      "Create a shared intention statement for the course",
      "Choose a special object to represent your commitment to this journey"
    ],
    tips: [
      "This is about EXPANSION, not fixing anything broken",
      "Leave judgment at the door — curiosity is your only compass",
      "There are no wrong answers, only discoveries"
    ]
  },
  {
    day: 2,
    title: "Desire Mapping Deep Dive",
    subtitle: "Map the landscape of your deepest desires",
    type: 'survey',
    icon: '🗺️',
    description: "Complete the comprehensive Desire Mapping Questionnaire separately, then come together to explore and share your maps. You'll discover new territories of wanting.",
    content: [
      "Complete the Desire Mapping Survey individually (1 hour each)",
      "Use the 'Traffic Light' system: Green (yes!), Yellow (curious), Red (not now)",
      "Mark your answers privately — don't peek at each other's yet",
      "Come together and share your GREEN items first",
      "Notice overlaps — these are your shared frontiers",
      "Discuss YELLOW items with genuine curiosity, no pressure"
    ],
    tips: [
      "Be radically honest — this is your safest space",
      "A 'Red' today might be 'Green' tomorrow — nothing is permanent",
      "Celebrate the courage it takes to share desires"
    ]
  },
  {
    day: 3,
    title: "Sensory Awakening Ritual",
    subtitle: "Rediscover touch, taste, sound, scent, and sight",
    type: 'game',
    icon: '✨',
    description: "A multi-sensory exploration that strips away the familiar and invites you to experience each other as if for the first time. Blindfolded, vulnerable, and exquisitely present.",
    content: [
      "Prepare: silk blindfold, feather, ice cubes, warm oil, favorite foods, playlist",
      "Partner A is blindfolded. Partner B becomes the sensory guide",
      "Phase 1 — Touch: Explore with different textures (silk, fur, feather, hands)",
      "Phase 2 — Temperature: Alternate warm oil and cool ice along the spine",
      "Phase 3 — Taste: Feed small bites of favorite foods, guess the flavor",
      "Phase 4 — Sound: Whisper memories, play songs from your 18 years",
      "Phase 5 — Sight: Remove blindfold, gaze into each other's eyes for 3 minutes",
      "Switch roles and repeat"
    ],
    tips: [
      "Move SLOWLY — anticipation is the most powerful aphrodisiac",
      "Focus on the JOURNEY, not the destination",
      "Verbal feedback is encouraged: 'more,' 'softer,' 'there'"
    ]
  },
  {
    day: 4,
    title: "Letters Across Time",
    subtitle: "Write your way into each other's hearts",
    type: 'prompt',
    icon: '💌',
    description: "A series of guided writing exercises that bridge past, present, and future. These prompts will unlock emotions and desires you didn't know you were carrying.",
    content: [
      "Prompt 1: 'The moment I knew it was you...' — Write about the exact instant",
      "Prompt 2: 'What my body remembers about you that my mind forgets'",
      "Prompt 3: 'A fantasy I've never spoken aloud until now...'",
      "Prompt 4: 'In our next 18 years, I want us to...'",
      "Read each letter aloud over a candlelit dinner",
      "After each reading, the listener responds with one word that captures their feeling"
    ]
  },
  {
    day: 5,
    title: "Guided Meditation: 18 Years of Us",
    subtitle: "A meditative journey through your shared history",
    type: 'media',
    icon: '🧘',
    description: "A 30-minute guided meditation that walks you through 18 years of memories, milestones, and intimate moments, building gratitude and desire for what's ahead.",
    content: [
      "Begin with synchronized breathing — match each other's rhythm",
      "The meditation guides you year by year through your relationship",
      "At each milestone, silently express gratitude",
      "The meditation transitions into a body-based awareness practice",
      "End with a partner breathing exercise: inhale as they exhale",
      "Journal your experience immediately after"
    ]
  },
  {
    day: 6,
    title: "The Exploration Card Game",
    subtitle: "Draw a card, discover a new world",
    type: 'game',
    icon: '🃏',
    description: "A beautifully designed card game with escalating levels of intimacy and adventure. Each card reveals a challenge, question, or scenario to explore together.",
    content: [
      "The deck has 5 levels — complete each before advancing",
      "Level 1: Connection Cards — deep questions and emotional bonding",
      "Level 2: Sensation Cards — touch-based challenges and body exploration",
      "Level 3: Fantasy Cards — share and roleplay intimate scenarios",
      "Level 4: Adventure Cards — boundary-pushing activities and new experiences",
      "Level 5: Wild Cards — designed specifically for your unique interests",
      "Each partner draws one card per round — honor every card drawn"
    ]
  },
  {
    day: 7,
    title: "Week 1 Sacred Check-In",
    subtitle: "Pause, reflect, and recalibrate",
    type: 'reflection',
    icon: '🔍',
    description: "The midpoint ritual. A structured check-in where you share discoveries, express gratitude, recalibrate boundaries, and prepare for the deeper exploration of Week 2.",
    content: [
      "Share your 'Rose' (favorite moment), 'Thorn' (challenge), and 'Bud' (anticipation)",
      "Review your Desire Maps — any colors shifting?",
      "Explicitly reaffirm boundaries and discuss any Yellow→Green transitions",
      "Rate your intimacy connection 1-10 and discuss what would make it higher",
      "Set 3 shared intentions for Week 2",
      "Close with a 5-minute silent embrace"
    ]
  },
  {
    day: 8,
    title: "Fantasy Architecture Workshop",
    subtitle: "Design your deepest scenarios with care and intention",
    type: 'learning',
    icon: '🏗️',
    description: "Learn the art of building shared fantasies — from first whisper to full realization. This workshop teaches you how to construct, communicate, and safely explore complex scenarios.",
    content: [
      "Module 1: The Anatomy of a Shared Fantasy — breaking down components",
      "Module 2: Communication Frameworks — how to share without shame",
      "Module 3: Building Consent Architecture — layered, enthusiastic, ongoing",
      "Module 4: The Fantasy Worksheet — design a scenario together",
      "Module 5: Dress Rehearsal — talking through before walking through",
      "Module 6: Aftercare Planning — emotional decompression is essential"
    ]
  },
  {
    day: 9,
    title: "The Trust Ladder Challenge",
    subtitle: "Progressive exercises in vulnerability and surrender",
    type: 'game',
    icon: '🪜',
    description: "Five escalating challenges designed to deepen trust through guided vulnerability. Each level requires more surrender, more communication, and more connection.",
    content: [
      "Level 1 — The Mirror: Match each other's movements in slow motion",
      "Level 2 — The Guide: Lead your blindfolded partner through a space by voice alone",
      "Level 3 — The Confession: Share one thing you've been afraid to ask for",
      "Level 4 — The Surrender: 10 minutes of receiving without giving — pure reception",
      "Level 5 — The Invitation: Ask for exactly what you want, in full detail, out loud",
      "After each level, embrace and share: 'What I felt was...'"
    ]
  },
  {
    day: 10,
    title: "Body Worship Masterclass",
    subtitle: "A guided practice in reverence, pleasure, and presence",
    type: 'media',
    icon: '🪷',
    description: "An audio-guided session teaching the art of body worship — exploring your partner's body as a temple of sensation. Includes techniques for prostate stimulation and full-body pleasure mapping.",
    content: [
      "Introduction: The philosophy of worship — gratitude, presence, devotion",
      "Setting the altar: prepare the space with intention",
      "Part 1: Hands-only exploration — no erogenous zones for the first 20 minutes",
      "Part 2: Expanding the map — discover unexpected pleasure points",
      "Part 3: Focused pleasure — prostate stimulation techniques and positions",
      "Part 4: Full-body integration — connecting all sensations",
      "Part 5: The exchange — switch roles with new awareness",
      "Closing: Share three words about what your body experienced"
    ]
  },
  {
    day: 11,
    title: "Exhibitionism & Voyeurism Exploration Guide",
    subtitle: "Explore the thrill of being seen and seeing",
    type: 'learning',
    icon: '🎭',
    description: "A thoughtful, progressive guide to consensual exhibitionism and voyeurism. From private mirror play to controlled social scenarios, learn how to explore these desires safely.",
    content: [
      "Chapter 1: Understanding the Psychology — why being seen excites us",
      "Chapter 2: The Exhibitionism Spectrum — levels from private to public",
      "Chapter 3: Mirror Work — exploring self and partner observation",
      "Chapter 4: Photography & Video — creating private visual art together",
      "Chapter 5: Controlled Social Scenarios — selecting environments and partners",
      "Chapter 6: Digital Exhibitionism — exploring online platforms with boundaries",
      "Chapter 7: Safety, Consent & Aftercare for social-physical encounters",
      "Worksheet: Your Exhibitionism Comfort Map"
    ]
  },
  {
    day: 12,
    title: "Ethical Non-Monogamy Design Lab",
    subtitle: "Map your ideal multi-partner landscapes",
    type: 'survey',
    icon: '🌐',
    description: "A facilitated exploration of ethically non-monogamous scenarios — from threesomes to group dynamics. Map desires, boundaries, and practical logistics together.",
    content: [
      "Complete the ENM Desire Map individually",
      "Scenarios to consider: MFM, FMF, group gatherings, social-physical events",
      "Boundary Setting Worksheet: hard limits vs. soft limits vs. growth edges",
      "Partner Selection Framework: what qualities matter in additional partners",
      "Safety Protocols: physical health, emotional check-ins, veto rules",
      "The 'Debrief Design': planning your aftercare for multi-partner experiences",
      "Create your first 'Encounter Blueprint' — a detailed plan for a hypothetical scenario"
    ]
  },
  {
    day: 13,
    title: "The Grand Celebration Preview",
    subtitle: "Design your anniversary night masterpiece",
    type: 'prompt',
    icon: '🎪',
    description: "Tomorrow is your 18th anniversary. Tonight, you plan the celebration. Use every discovery from the past 12 days to design an unforgettable experience.",
    content: [
      "Review all journal entries, Desire Maps, and letters from the course",
      "Write your 'Anniversary Night Script' — a detailed vision for tomorrow",
      "Include: setting, music, wardrobe, sequence of activities, surprises",
      "Each partner writes a 'Declaration' — what the next 18 years will hold",
      "Prepare any props, outfits, toys, or surprises you'll need",
      "End tonight with a 'preview' — a taste of what tomorrow brings"
    ]
  },
  {
    day: 14,
    title: "The 18th Anniversary Celebration",
    subtitle: "Your love, amplified — tonight and always",
    type: 'reflection',
    icon: '💎',
    description: "The culmination. Live your designed experience, exchange declarations, and cross into your next 18 years with expanded hearts, bodies, and souls.",
    content: [
      "Prepare the space according to your Anniversary Night Script",
      "Begin with your guided meditation from Day 5 — a centering practice",
      "Exchange 'Declarations for the Next 18 Years' letters",
      "Explore the activities from your script — honor the journey you've taken",
      "Midpoint check-in: share one word about how you're feeling",
      "After the celebration: gentle aftercare, hydration, cuddling",
      "Final journal entry: 'What I learned about us...'",
      "Seal your course journals — to be reopened on your 19th anniversary"
    ]
  }
];

export const gameCards: GameCard[] = [
  {
    id: 1,
    title: "The Temperature Game",
    category: "Sensory",
    intensity: 2,
    description: "Explore hot and cold sensations across your partner's body while blindfolded. The contrast creates exquisite nerve responses.",
    instructions: [
      "Blindfold your partner and have them lie comfortably",
      "Gather ice cubes and a warm massage candle (test temperature first!)",
      "Alternate between ice and warm oil on different body parts",
      "Let them guess: hot or cold? Reward correct guesses.",
      "The final reward: 5 minutes of focused pleasure using their favorite temperature"
    ],
    duration: "30-45 min"
  },
  {
    id: 2,
    title: "Truth & Touch",
    category: "Communication",
    intensity: 2,
    description: "Answer intimate questions truthfully. For each honest answer, your partner rewards you with touch in a place of their choosing.",
    instructions: [
      "Take turns asking intimate questions from the provided deck",
      "Each truthful answer earns 30 seconds of touch from your partner",
      "The touch location escalates with each round",
      "Round 1: Hands and arms | Round 2: Neck and shoulders",
      "Round 3: Chest and back | Round 4: Everywhere",
      "You may pass on one question per round — but only one"
    ],
    duration: "45-60 min"
  },
  {
    id: 3,
    title: "The Fantasy Auction",
    category: "Fantasy",
    intensity: 3,
    description: "Each partner writes 5 fantasies on cards. Take turns 'bidding' on which fantasy to enact tonight, using intimate currency.",
    instructions: [
      "Write 5 fantasies each on separate cards — be specific!",
      "Review all 10 cards together — no judgment, only curiosity",
      "Each partner gets 100 'desire dollars' to bid",
      "Auction each card — the highest bidder wins enactment tonight",
      "Any unbought cards go into the 'Future Vault' for later",
      "Enact the winning fantasies throughout the evening"
    ],
    duration: "60-90 min"
  },
  {
    id: 4,
    title: "The Mirror Game",
    category: "Exhibitionism",
    intensity: 3,
    description: "Explore self-observation and partner-observation using mirrors. See yourselves as others see you — beautiful, vulnerable, and desired.",
    instructions: [
      "Position a full-length mirror where both of you can see",
      "Begin with clothed slow dancing, watching your reflections",
      "Progressively remove clothing while maintaining eye contact via mirror",
      "Describe what you see — narrate each other's beauty out loud",
      "Guide your partner through self-touch while watching in the mirror",
      "End by facing each other directly — no mirror — just raw connection"
    ],
    duration: "45-60 min"
  },
  {
    id: 5,
    title: "Role Reversal Night",
    category: "Exploration",
    intensity: 4,
    description: "Step into each other's typical roles — initiator, director, receiver. Experience intimacy from your partner's perspective.",
    instructions: [
      "Discuss your typical intimate roles and patterns",
      "For one full evening, completely swap your usual roles",
      "The usual initiator becomes the receiver, and vice versa",
      "Explore different approaches to giving and receiving",
      "Debrief: What surprised you? What did you discover about your partner's experience?",
      "Integrate: choose one new thing from the swapped experience to keep"
    ],
    duration: "Full evening"
  },
  {
    id: 6,
    title: "The Submission Station",
    category: "Power Exchange",
    intensity: 4,
    description: "A structured introduction to consensual power dynamics. One partner directs, one follows — with full aftercare built in.",
    instructions: [
      "Agree on a safe word and a slow-down signal before starting",
      "The Director plans a sequence of 5 activities (use the course materials for ideas)",
      "The Receiver commits to following each instruction within agreed boundaries",
      "Activities progress: verbal → physical → intimate → intense → transcendent",
      "After each activity, check in with your signal (green/yellow/red)",
      "Aftercare: 20 minutes minimum of gentle touch, hydration, and verbal affirmation"
    ],
    duration: "90-120 min"
  },
  {
    id: 7,
    title: "The Guest Scenario",
    category: "Multi-Partner",
    intensity: 5,
    description: "A fantasy-only exercise where you design an ideal multi-partner scenario in complete detail — without enacting it. Pure imagination and communication.",
    instructions: [
      "Each partner independently writes a detailed multi-partner fantasy scenario",
      "Include: setting, guest descriptions, sequence of events, your role, your partner's role",
      "Read your scenarios aloud to each other",
      "Discuss overlaps: what elements appeared in BOTH scenarios?",
      "Identify the elements that most excite each of you",
      "Create a 'Shared Vision Board' — a combined scenario you'd both be curious about",
      "File this in your 'Future Possibilities' folder — no pressure to enact"
    ],
    duration: "60-90 min"
  },
  {
    id: 8,
    title: "The 18-Minute Challenge",
    category: "Mindfulness",
    intensity: 1,
    description: "18 minutes of continuous, intentional intimacy — one minute for each year together. No rushing, no goal, only presence.",
    instructions: [
      "Set a timer for exactly 18 minutes",
      "Begin face-to-face, breathing together for the first 3 minutes",
      "Minutes 4-8: Slow, exploratory touch — no erogenous zones yet",
      "Minutes 9-13: Expand to full-body connection with increasing intimacy",
      "Minutes 14-17: Whatever feels most natural and connected",
      "Minute 18: Stop. Hold each other. Breathe. Whisper '18 more years'",
      "Journal immediately: what did 18 minutes of pure presence feel like?"
    ],
    duration: "18 min + journaling"
  }
];

export const surveyQuestions: SurveyQuestion[] = [
  // Desire Mapping
  { id: 1, category: "Desire Mapping", question: "On a scale of 1-10, how satisfied are you with the frequency of physical intimacy?", type: "scale", followUp: "What would your ideal frequency look like?" },
  { id: 2, category: "Desire Mapping", question: "Which of these activities are you most curious about exploring?", type: "multiple", options: ["Sensory deprivation play", "Temperature play", "Role-playing scenarios", "Power exchange dynamics", "Exhibitionism", "Group experiences", "Prostate/pegging exploration", "Tantric practices"], followUp: "What draws you to this?" },
  { id: 3, category: "Desire Mapping", question: "Describe a fantasy you've thought about but haven't shared.", type: "open" },
  { id: 4, category: "Desire Mapping", question: "How do you feel about involving additional partners in your intimate life?", type: "multiple", options: ["Very interested — let's explore", "Curious but nervous", "Open to discussing", "Not for me right now", "I need more information"], followUp: "What conditions would need to be met?" },
  { id: 5, category: "Desire Mapping", question: "What is your comfort level with prostate stimulation (giving or receiving)?", type: "multiple", options: ["Love it — more please", "Enjoy it occasionally", "Curious to explore more", "Neutral", "Not my preference"], followUp: "Any specific techniques or scenarios you'd like to try?" },

  // Boundary Checking
  { id: 6, category: "Boundary Checking", question: "What is your HARD boundary — something that is a firm 'no' for you?", type: "open" },
  { id: 7, category: "Boundary Checking", question: "What is a 'soft boundary' — something you might explore with the right conditions?", type: "open", followUp: "What would make it feel safe to explore?" },
  { id: 8, category: "Boundary Checking", question: "How important is aftercare to you following intense experiences?", type: "scale", followUp: "What does ideal aftercare look like for you?" },
  { id: 9, category: "Boundary Checking", question: "Are you comfortable with your partner discussing boundaries with potential additional partners?", type: "yesno", followUp: "What level of involvement do you want in these conversations?" },
  { id: 10, category: "Boundary Checking", question: "What is your preferred method for communicating during intimate moments?", type: "multiple", options: ["Verbal words", "Safe signals/colors", "Written notes beforehand", "Eye contact and body language", "A mix depending on the activity"], followUp: "How can your partner best check in with you?" },

  // Connection Assessment
  { id: 11, category: "Connection", question: "What makes you feel most emotionally connected to your partner?", type: "open" },
  { id: 12, category: "Connection", question: "How do you prefer to be approached for physical intimacy?", type: "multiple", options: ["Direct verbal communication", "Subtle physical touch", "Flirtatious buildup throughout the day", "A shared activity leading naturally to intimacy", "Surprise me"], followUp: "How often does this happen currently?" },
  { id: 13, category: "Connection", question: "Rate your comfort with being fully vulnerable during intimacy (1-10)", type: "scale", followUp: "What would help you feel more vulnerable and open?" },
  { id: 14, category: "Connection", question: "What is something new you'd like to try that feels outside your usual pattern?", type: "open" },
  { id: 15, category: "Connection", question: "How do you feel about being observed during intimate moments by a consenting third party?", type: "multiple", options: ["Exciting — I'd enjoy that", "Intriguing but would need discussion", "Only in specific contexts", "Not something I'm drawn to"], followUp: "What context would make it appealing?" },

  // Multi-Partner Exploration
  { id: 16, category: "Multi-Partner", question: "If you were to explore with an additional partner, what gender(s) would you prefer?", type: "multiple", options: ["Any gender", "Male presenting", "Female presenting", "Non-binary", "I have no preference — connection matters most"], followUp: "What qualities in a third person would be important to you?" },
  { id: 17, category: "Multi-Partner", question: "What role would you want to play in a multi-partner scenario?", type: "multiple", options: ["Primary focus / center of attention", "Equal participant with all partners", "Observer initially, then joining", "Director / organizer of the experience", "I'd want my partner to take the lead"], followUp: "How would you want attention distributed?" },
  { id: 18, category: "Multi-Partner", question: "What safety and health protocols are non-negotiable for you?", type: "open", followUp: "Have you discussed STI testing expectations?" },
  { id: 19, category: "Multi-Partner", question: "How would you want to debrief after a multi-partner experience?", type: "multiple", options: ["Immediately after, together", "The next morning with fresh perspective", "Both — initial check-in AND deeper debrief", "Written reflections first, then verbal discussion"], followUp: "What emotional support would you need?" },
  { id: 20, category: "Multi-Partner", question: "What is your biggest hope for exploring beyond traditional monogamy?", type: "open" }
];

export const writingPrompts: WritingPrompt[] = [
  {
    id: 1,
    title: "The Origin Story",
    prompt: "Write about the moment you first looked at Edwin/Mindy and thought: 'This person is going to change my life.' What did you see? What did you feel? What did your body know before your mind did?",
    duration: "15-20 min",
    category: "Nostalgia",
    forWhom: 'both',
    followUp: "Read aloud. After listening, share one detail you didn't remember about that moment."
  },
  {
    id: 2,
    title: "The Body's Memory",
    prompt: "Describe in vivid, sensory detail the most physically pleasurable moment you've shared with your partner. Not just what happened — but what your skin felt, what sounds filled the room, what the air tasted like.",
    duration: "20-25 min",
    category: "Physical",
    forWhom: 'both',
    followUp: "Share with your partner. Then discuss: what made THAT moment so extraordinary?"
  },
  {
    id: 3,
    title: "The Unspoken Request",
    prompt: "Write a letter to your partner about something you've been wanting to try or explore but haven't found the words for. Be specific, be brave, be kind to yourself for whatever hesitation you've felt.",
    duration: "20-30 min",
    category: "Desire",
    forWhom: 'both',
    followUp: "Exchange letters. Read silently first, then discuss with curiosity, not judgment."
  },
  {
    id: 4,
    title: "Edwin's Letter",
    prompt: "Edwin, write about what it means to you to be with a partner who celebrates your full sexuality — including your comfort with prostate stimulation and your openness to exploring beyond conventional boundaries. What freedom does that give you? What would you still like to explore together?",
    duration: "20-30 min",
    category: "Personal",
    forWhom: 'edwin',
    followUp: "Read to Mindy. Let her respond with only gratitude and a hug before any discussion."
  },
  {
    id: 5,
    title: "Mindy's Letter",
    prompt: "Mindy, write about the power and freedom you feel in your sexuality — your openness to exhibitionism, your curiosity about multi-partner experiences, and your comfort in pushing past conventional norms. What excites you most about exploring these with Edwin?",
    duration: "20-30 min",
    category: "Personal",
    forWhom: 'mindy',
    followUp: "Read to Edwin. Let him respond with only gratitude and a hug before any discussion."
  },
  {
    id: 6,
    title: "The Next 18 Years",
    prompt: "Imagine it's your 36th anniversary. You're both 54. Write a letter from that future version of yourself, describing the adventures you've had since this 18th anniversary course. What did you explore? How did you grow? What are you most grateful for?",
    duration: "25-30 min",
    category: "Vision",
    forWhom: 'both',
    followUp: "Read aloud. Then create one shared 'Future Vision' statement combining elements from both letters."
  },
  {
    id: 7,
    title: "The Appreciation Inventory",
    prompt: "Write a detailed inventory of everything you find physically, emotionally, and sexually attractive about your partner TODAY — not 18 years ago, but right now. Be specific. Be sensual. Be unapologetically admiring.",
    duration: "15-20 min",
    category: "Appreciation",
    forWhom: 'both',
    followUp: "Read to each other like poetry. Then physically show appreciation for 3 things from the list."
  },
  {
    id: 8,
    title: "The Permission Letter",
    prompt: "Write a 'Permission Letter' to your partner giving them explicit, enthusiastic permission to ask for anything they want — without fear of judgment. Describe what safe space looks like to you, and affirm your commitment to their pleasure and exploration.",
    duration: "20-25 min",
    category: "Permission",
    forWhom: 'both',
    followUp: "Exchange letters. These become your 'blank check' for the rest of the course."
  }
];

export const learningModules: LearningModule[] = [
  {
    id: 1,
    title: "The Art of Prostate Pleasure",
    category: "Physical Techniques",
    description: "A comprehensive guide to prostate stimulation — anatomy, techniques, positions, and emotional considerations for both partners.",
    chapters: [
      { title: "Understanding Prostate Anatomy", content: "The prostate (P-spot) is located 2-3 inches inside the rectum, toward the front of the body. It's roughly the size of a walnut and becomes more sensitive with arousal. Understanding the anatomy helps both partners approach stimulation with confidence and care." },
      { title: "Preparation & Hygiene", content: "Cleanliness is essential for comfort and confidence. Shower beforehand, trim nails, use high-quality water-based lubricant. Consider latex or nitrile gloves for smooth sensations. Create a relaxed environment — prostate play requires trust and relaxation." },
      { title: "Techniques: External Massage", content: "Begin with external perineum massage. The perineum (between scrotum and anus) provides indirect prostate stimulation. Use firm, circular motions with the pad of your finger. This is an excellent warm-up before internal exploration." },
      { title: "Techniques: Internal Stimulation", content: "When internally stimulating, start with a well-lubricated finger. Insert slowly, curling upward in a 'come hither' motion. The prostate feels like a firm, smooth bump. Use gentle pressure — never force. Communicate constantly about pressure, speed, and sensation." },
      { title: "Positions for Access", content: "Best positions: Partner on back with knees to chest (allows face-to-face connection), partner on all fours (allows deeper access), spooning position (intimate and relaxed). Experiment with what provides the best angle and comfort." },
      { title: "Combining with Other Stimulation", content: "Prostate stimulation pairs beautifully with oral sex, manual stimulation, and vibrator use. The 'blended orgasm' — combining prostate stimulation with penile stimulation — can be extraordinarily intense. Build slowly and let the sensations stack." },
      { title: "Emotional Aftercare", content: "Prostate play can bring up unexpected emotions due to vulnerability. After any session, provide gentle physical aftercare (cuddling, water, warmth) and emotional check-ins. 'How was that for you?' is always a good place to start." }
    ],
    duration: "45 min reading + practice time"
  },
  {
    id: 2,
    title: "Consensual Exhibitionism: A Complete Guide",
    category: "Exploration",
    description: "Understanding the psychology, practice, and safety of exhibitionism — from private exploration to consensual social-physical encounters.",
    chapters: [
      { title: "The Psychology of Being Seen", content: "Exhibitionism isn't just about showing — it's about being witnessed in your pleasure and beauty. The desire to be seen is deeply human. Understanding your specific exhibitionist desires (validation, thrill, power, aesthetic appreciation) helps you explore them safely." },
      { title: "Level 1: Private Exhibitionism", content: "Begin with mirrors, photographs, and video for personal use. Create intimate visual art together. Explore how it feels to watch yourselves — many couples discover new appreciation for their own beauty and chemistry when they see themselves from a new perspective." },
      { title: "Level 2: Controlled Sharing", content: "If you choose to share content or experiences, establish clear rules: what gets shared, with whom, and how. Consent is paramount — from all parties. Consider private, verified platforms designed for consensual adult sharing." },
      { title: "Level 3: Social-Physical Encounters", content: "Clubs, parties, and social gatherings for open-minded adults provide structured environments for exhibitionism. Research venues thoroughly. Go as observers first. Set clear boundaries before entering any space. Always have a 'signal' for 'I'm ready to leave.'" },
      { title: "Safety & Consent Framework", content: "Every exhibitionist scenario requires layered consent: between primary partners, between participants and observers, and with venue hosts. Never involve non-consenting bystanders. Carry your boundaries like armor — they protect the play." },
      { title: "Debrief Protocol", content: "After any exhibitionist experience, schedule a debrief within 24 hours. Discuss: What felt amazing? What surprised you? Was there any discomfort? Would you do it again? What would you change? Emotional aftercare is non-negotiable." }
    ],
    duration: "40 min reading + discussion"
  },
  {
    id: 3,
    title: "Designing Ethical Multi-Partner Experiences",
    category: "Relationship Design",
    description: "A practical framework for couples exploring multi-partner intimacy — from first conversations to first experiences.",
    chapters: [
      { title: "The Foundation: Your Relationship First", content: "Multi-partner exploration should ENHANCE your relationship, not replace missing elements. The strongest foundation is a couple who is already deeply connected, communicating well, and exploring from a place of abundance, not lack. Edwin and Mindy — you are already here." },
      { title: "The Conversation Framework", content: "Use the DESIRE framework: Describe what you want, Explain why it appeals to you, Set boundaries, Identify potential concerns, Review logistics, Establish aftercare. Each partner completes this separately before discussing together." },
      { title: "Selecting Partners", content: "What qualities matter in a third (or fourth) partner? Consider: personality compatibility, physical attraction, experience level, communication skills, respect for your primary bond, and shared health/safety values. Chemistry matters — and it includes emotional connection, not just physical." },
      { title: "The Encounter Blueprint", content: "Before any multi-partner experience, create a detailed 'Encounter Blueprint': setting, participants, planned activities, hard boundaries, safe words, health protocols, and aftercare plans. Share this blueprint with all participants BEFORE the encounter." },
      { title: "During the Experience", content: "Check in with your partner regularly — make eye contact, squeeze hands, use your signal system. There is no 'expected' way to feel during a multi-partner experience. Excitement, jealousy, arousal, tenderness, and even momentary discomfort are all normal. Communicate in real-time." },
      { title: "Aftercare: The Multi-Partner Edition", content: "Aftercare after a multi-partner experience has two phases: immediate (physical safety, hydration, basic emotional check-in) and extended (48-hour debrief, processing emotions, reaffirming your primary bond, planning your next 'just the two of us' date)." }
    ],
    duration: "50 min reading + exercises"
  },
  {
    id: 4,
    title: "Tantric Connection for Experienced Couples",
    category: "Mindfulness",
    description: "Advanced intimacy practices that blend ancient wisdom with modern relationship science — designed for couples already comfortable with each other's bodies.",
    chapters: [
      { title: "What Tantra Really Means for Couples", content: "Tantra isn't about exotic positions or marathon sessions — it's about PRESENCE. For couples who have been together 18 years, tantra offers a way to make the familiar feel extraordinary again by bringing full attention to every touch, breath, and glance." },
      { title: "Synchronized Breathing Practice", content: "Sit facing each other, close enough to feel each other's breath. Begin breathing in sync — partner A inhales as partner B exhales. Maintain eye contact. Start with 5 minutes, build to 20. This practice alone can create profound states of connection." },
      { title: "The Heart-Body Scan", content: "With your partner lying down, slowly trace your hand from their heart downward, pausing at each energy center. This isn't foreplay — it's energetic mapping. Notice where you feel heat, tension, or vibration. Share what you sense." },
      { title: "Extended Arousal Techniques", content: "Rather than building toward climax, practice sustaining arousal at a 7/10 intensity for extended periods. This builds sexual energy throughout the body and can lead to full-body sensations that transcend typical orgasm. Breathe deeply and slowly." },
      { title: "The Merging Meditation", content: "A 30-minute practice where you physically connect and attempt to merge your breathing, heart rates, and mental focus. The goal isn't physical pleasure — it's the experience of becoming, briefly, one organism with two hearts." },
      { title: "Integration into Daily Life", content: "Tantric principles don't stay in the bedroom. Practice: conscious touch when passing each other, eye contact during meals, breathing together before sleep. These micro-practices build the foundation for expanded intimacy." }
    ],
    duration: "60 min reading + practices"
  }
];

export const mediaContent: MediaItem[] = [
  {
    id: 1,
    title: "18 Years of Us — Guided Meditation",
    type: "guided-meditation",
    duration: "32 min",
    description: "A meditative journey through 18 years of relationship memories, building to a powerful intention-setting for the future. Walk through each year, honor each milestone, and arrive at this moment ready for what's next.",
    category: "Meditation"
  },
  {
    id: 2,
    title: "The Art of Prostate Massage — Audio Instruction",
    type: "audio-practice",
    duration: "25 min",
    description: "A gentle, narrated guide to prostate stimulation techniques. Accompanied by ambient music, this audio walks you through preparation, technique, and communication in real-time.",
    category: "Technique"
  },
  {
    id: 3,
    title: "Communicating Desires Without Shame",
    type: "audio-lesson",
    duration: "18 min",
    description: "A coaching session on the art of sharing your deepest desires with your partner. Learn the three-step 'Name It, Claim It, Frame It' method for introducing new ideas into your intimate life.",
    category: "Communication"
  },
  {
    id: 4,
    title: "Breathwork for Extended Intimacy",
    type: "audio-practice",
    duration: "22 min",
    description: "A guided breathwork session designed to be practiced together. Learn to synchronize your breathing, build sexual energy, and extend arousal through specific breathing patterns.",
    category: "Practice"
  },
  {
    id: 5,
    title: "Designing Your Multi-Partner Experience",
    type: "video-lesson",
    duration: "35 min",
    description: "A comprehensive video lesson covering everything from initial conversations to aftercare. Includes interviews with experienced couples and a practical planning framework.",
    category: "Exploration"
  },
  {
    id: 6,
    title: "Sensate Focus — Guided Body Mapping",
    type: "guided-meditation",
    duration: "40 min",
    description: "A narrated sensate focus exercise where you're guided to explore your partner's body methodically, discovering new zones of pleasure and connection. Includes structured pauses for communication.",
    category: "Practice"
  },
  {
    id: 7,
    title: "The Psychology of Exhibitionism",
    type: "audio-lesson",
    duration: "20 min",
    description: "An educational exploration of why being seen excites us, the neuroscience of exhibitionist desire, and how to channel this energy into healthy, consensual experiences.",
    category: "Education"
  },
  {
    id: 8,
    title: "Partners in Pleasure — Couples Coaching Session",
    type: "video-lesson",
    duration: "45 min",
    description: "A recorded coaching session addressing common challenges for couples exploring new dimensions: jealousy management, desire mismatches, and maintaining connection during expansion.",
    category: "Coaching"
  },
  {
    id: 9,
    title: "Deep Connection — Evening Meditation",
    type: "guided-meditation",
    duration: "15 min",
    description: "A short, powerful meditation to practice before any intimate session. Centers both partners, establishes presence, and opens the heart and body to deeper connection.",
    category: "Meditation"
  },
  {
    id: 10,
    title: "Aftercare Masterclass",
    type: "audio-lesson",
    duration: "22 min",
    description: "The most overlooked aspect of intimate exploration. Learn why aftercare matters, specific techniques for physical and emotional aftercare, and how to create personalized aftercare rituals.",
    category: "Education"
  }
];

export const conversationStarters = [
  "What's a physical sensation you've never experienced but want to try?",
  "If we had a completely judgment-free evening, what would you want to happen?",
  "What part of my body do you find most mesmerizing and why?",
  "Describe your perfect intimate evening in three sentences or less.",
  "What's something you've seen in a film or read about that you'd like to explore?",
  "If we could invite one person into our bedroom for one night, who would they be?",
  "What's the bravest thing I've ever done in our intimate life?",
  "How do you feel when you know someone is watching us?",
  "What's a word you'd use to describe our physical connection?",
  "If you could give me one superpower in bed, what would it be?",
  "What location have we never been intimate in that you'd love to try?",
  "What's the most memorable thing I've whispered to you?",
  "How has your relationship with your own body changed over 18 years with me?",
  "What's one thing you'd like to teach me about your pleasure?",
  "What does 'sacred intimacy' mean to you?",
  "If our intimacy was a piece of music, what would it sound like?"
];
