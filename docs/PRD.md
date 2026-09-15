# 📋 Product Requirements Document (PRD)
## "The Next 18" — 18th Anniversary Intimacy Course

**Document Version:** 1.0  
**Created:** January 2026  
**Product:** Web-based interactive intimacy course  
**Client:** Edwin & Mindy (both age 36, celebrating 18 years together)

---

## 1. Executive Summary

### Product Vision
"The Next 18" is a private, beautifully designed, 14-day interactive intimacy course delivered as a single-page web application. It combines games, surveys, writing prompts, learning materials, and guided media sessions into a cohesive experience that helps a long-term couple celebrate 18 years together while deepening their physical, emotional, and relational connection.

### Product Goals
| Goal | Description |
|---|---|
| **Celebrate** | Honor 18 years of Edwin & Mindy's relationship |
| **Deepen** | Create new avenues for emotional and physical intimacy |
| **Explore** | Provide safe, structured frameworks for boundary-pushing experiences |
| **Prepare** | Equip them with tools, language, and confidence for their next 18 years |
| **Delight** | Make the experience feel luxurious, personal, and radically intimate |

### Success Metrics
- Edwin & Mindy complete all 14 days of the course
- They report discovering at least 3 new things about each other
- They create a shared "Future Vision" document
- They rate the overall experience 9+/10 for emotional impact

---

## 2. Target Users

### Primary Users
| Attribute | Edwin | Mindy |
|---|---|---|
| Age | 36 | 36 |
| Relationship Status | Together 18 years | Together 18 years |
| Intimacy Level | Strong, healthy, active | Strong, healthy, active |
| Openness | Very open-minded | Very open-minded |
| Gender Norms | Actively challenges conventions | Actively challenges conventions |

### Comfort Zones (Pre-Course)
- Male prostate stimulation
- Consensual exhibitionism
- Ethically non-monogamous experiences
- Multi-partner scenarios (any gender)
- Social-physical encounters

### User Needs
- Structured progression (not random exploration)
- Privacy and discretion (judgment-free space)
- Balance of emotional depth and physical adventure
- Practical frameworks, not just theory
- Flexibility to go at their own pace

---

## 3. Product Architecture

### 3.1 Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| Frontend | React 19 + TypeScript | Component-based UI, type safety |
| Styling | Tailwind CSS 4 | Utility-first, custom design system |
| Animation | Framer Motion | Production-grade React animations |
| Icons | Lucide React | Clean, consistent icon set |
| Build | Vite 7 | Fast builds, single-file output |
| Hosting | Vercel/Netlify (static) | Zero-cost, global CDN, HTTPS |
| Persistence | localStorage (v1) | Client-side progress saving |

### 3.2 Architecture Decisions

| Decision | Choice | Reason |
|---|---|---|
| Single-file build | vite-plugin-singlefile | Easy sharing, offline-capable |
| No backend (v1) | Static site | Privacy — no data leaves the device |
| Client-side only | No API calls | Complete privacy for sensitive content |
| No authentication (v1) | Open access | Single-user couple app |
| Inline all assets | Single HTML file | Portability, offline use |

---

## 4. Feature Specification

### 4.1 Hero Landing Section
| Feature | Specification |
|---|---|
| Animated entrance | Scale, fade, spring physics |
| Floating particles | 20 animated gold particles |
| Ambient orbs | 3 gradient orbs with slow movement |
| Anniversary badge | Pulsing glow animation, "18" number |
| CTA button | Gradient flow animation, shimmer effect |
| Responsive | Adapts to all screen sizes |

### 4.2 14-Day Course Timeline
| Feature | Specification |
|---|---|
| Day cards | 14 expandable cards with icons and descriptions |
| Week toggle | Week 1 (Reconnection) / Week 2 (Expansion) |
| Progress bar | Visual completion tracker |
| Timeline visual | Vertical line with alternating left/right cards |
| Expandable content | Click to reveal full activities, tips, and actions |
| Completion tracking | Mark days as complete, persists in state |
| Content types | Game, Survey, Prompt, Learning, Media, Reflection |

### 4.3 Games & Challenges
| Feature | Specification |
|---|---|
| Game count | 8 games across multiple categories |
| Intensity scale | 1-5 flame rating system with color coding |
| Categories | Sensory, Communication, Fantasy, Exhibitionism, Exploration, Power Exchange, Multi-Partner, Mindfulness |
| Expandable instructions | Step-by-step numbered instructions |
| Duration display | Estimated time per game |
| Hover animations | Card lift effect on hover |

### 4.4 Surveys & Questionnaires
| Feature | Specification |
|---|---|
| Question count | 20 questions |
| Categories | Desire Mapping, Boundary Checking, Connection, Multi-Partner |
| Question types | Scale (1-10), Open text, Multiple choice, Yes/No |
| Interactive responses | Users can select/type answers |
| Follow-up prompts | Deeper reflection questions after each answer |
| Category tabs | Filter by survey category |

### 4.5 Writing Prompts & Conversation Starters
| Feature | Specification |
|---|---|
| Writing prompts | 8 guided exercises |
| Recipient targeting | Both, Edwin-specific, Mindy-specific |
| Per-prompt duration | Time estimate for each exercise |
| Writing space | Inline textarea for composing responses |
| Follow-up activities | Sharing instructions after each prompt |
| Conversation starters | 16 quick-fire intimate questions |
| Interactive roulette | Random prompt selector with animation |

### 4.6 Learning Materials
| Feature | Specification |
|---|---|
| Module count | 4 comprehensive multi-chapter guides |
| Chapters per module | 6-7 chapters each |
| Topics | Prostate Pleasure, Consensual Exhibitionism, Ethical Non-Monogamy, Tantric Connection |
| Chapter navigation | Sidebar with chapter list + content area |
| Reading progress | Chapter X of Y indicator |
| Expandable modules | Accordion-style open/close |

### 4.7 Audio & Video Content
| Feature | Specification |
|---|---|
| Media count | 10 sessions |
| Types | Guided Meditation, Audio Lesson, Video Lesson, Audio Practice |
| Categories | Meditation, Technique, Communication, Practice, Exploration, Education, Coaching |
| Duration | 15-45 minutes per session |
| Simulated playback | Progress bar with animated indicator |
| Color-coded types | Visual distinction between media types |

### 4.8 Navigation & UX
| Feature | Specification |
|---|---|
| Sticky navigation | Fixed top nav with section links |
| Active section indicator | Highlights current section in nav |
| Mobile responsive | Hamburger menu with slide-down nav |
| Scroll-to-top | Floating button appears on scroll |
| Progress counter | X/14 days completed in nav |
| Section dividers | Gradient line separators between sections |
| Welcome banner | Stats overview and quick-nav cards |

### 4.9 Design System
| Element | Specification |
|---|---|
| Color palette | Wine (#7c1d3e), Gold (#d4a574), Cream (#fdf6ec), Deep (#0f0a0e) |
| Typography | System font stack, 5 size tiers |
| Glass morphism | Frosted glass card effect |
| Custom scrollbar | Wine-to-gold gradient |
| Noise overlay | Subtle texture over background |
| Animations | Float, pulse-glow, shimmer, gradient-flow, breathe |
| Spacing | 8px grid system |
| Border radius | 8px (small), 12px (medium), 16px (large), 9999px (pills) |

---

## 5. Content Structure

### 5.1 14-Day Journey Overview

| Day | Title | Type | Purpose |
|---|---|---|---|
| 1 | Intention Setting & Sacred Space | Reflection | Create container |
| 2 | Desire Mapping Deep Dive | Survey | Map desires & boundaries |
| 3 | Sensory Awakening Ritual | Game | Heighten physical awareness |
| 4 | Letters Across Time | Writing | Bridge past/present/future |
| 5 | 18 Years of Us Meditation | Media | Guided gratitude journey |
| 6 | The Exploration Card Game | Game | Progressive exploration |
| 7 | Week 1 Sacred Check-In | Reflection | Midpoint recalibration |
| 8 | Fantasy Architecture Workshop | Learning | Build shared fantasies |
| 9 | The Trust Ladder Challenge | Game | Progressive vulnerability |
| 10 | Body Worship Masterclass | Media | Reverence & technique |
| 11 | Exhibitionism & Voyeurism Guide | Learning | Structured exploration |
| 12 | Ethical Non-Monogamy Design Lab | Survey | Multi-partner planning |
| 13 | Grand Celebration Preview | Writing | Design anniversary night |
| 14 | The 18th Anniversary Celebration | Reflection | Culmination & crossing |

### 5.2 Content Philosophy
- **Escalating intensity** — starts gentle, builds progressively
- **Balanced modalities** — emotional, physical, intellectual, spiritual
- **Couple-centric** — every activity involves both partners
- **Shame-free language** — affirming, curious, non-judgmental
- **Practical + reflective** — each day has both action and introspection

---

## 6. Non-Functional Requirements

| Requirement | Target |
|---|---|
| Page load time | < 2 seconds |
| Lighthouse performance | > 90 |
| Accessibility | WCAG 2.1 AA target |
| Browser support | Chrome, Firefox, Safari, Edge (last 2 versions) |
| Mobile support | iOS Safari, Chrome Android |
| Security | HTTPS only, no external data transmission |
| Privacy | Zero analytics, zero tracking, client-only |
| Availability | 99.9% uptime (CDN-based) |
| Bundle size | < 500KB gzipped |

---

## 7. Privacy & Security

### Data Handling
| Data Type | Storage | Transmission |
|---|---|---|
| Course progress | In-memory state (v1) | None — never leaves device |
| Survey responses | In-memory state (v1) | None — never leaves device |
| Writing prompts | In-memory state (v1) | None — never leaves device |
| User credentials | N/A (no auth in v1) | N/A |

### Privacy Principles
1. **No external API calls** — everything is self-contained
2. **No cookies or tracking** — zero analytics
3. **No database** — nothing is stored server-side
4. **No third-party scripts** — all code is first-party
5. **Single-file build** — can be saved and used offline

---

## 8. Release Roadmap

### Version 1.0 (Current)
- [x] Hero landing with animations
- [x] 14-day course timeline
- [x] 8 games & challenges
- [x] 20 survey questions
- [x] 8 writing prompts + 16 conversation starters
- [x] 4 learning modules
- [x] 10 media content items
- [x] Responsive design
- [x] Glass morphism design system

### Version 1.1 (Next Sprint)
- [ ] localStorage persistence for progress
- [ ] PDF export of completed surveys and writings
- [ ] "Panic button" — instant hide to innocent page
- [ ] Dark/light mode toggle
- [ ] Print-optimized stylesheet

### Version 2.0 (Future)
- [ ] Simple password protection
- [ ] Backend with encrypted storage (Supabase/Firebase)
- [ ] Real audio/video content integration
- [ ] Couple's shared dashboard
- [ ] Customizable course content
- [ ] Anniversary date countdown timer
- [ ] Daily email/SMS reminders (optional)
- [ ] Multi-language support

### Version 3.0 (Scale)
- [ ] Template system for other couples
- [ ] Coach admin panel
- [ ] Content management system
- [ ] Subscription/payment integration
- [ ] Community features (anonymous sharing)
- [ ] Mobile app (React Native)

---

## 9. Risks & Mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| Content accessed by unintended viewer | High | Add password protection in v1.1 |
| User loses progress (browser refresh) | Medium | Add localStorage in v1.1 |
| Content feels too intense | Medium | Clear content warnings, escalates gradually |
| App feels impersonal | Low | Edwin/Mindy-specific content, personal touches |
| Browser compatibility issues | Low | Test on all major browsers before delivery |
| Bundle size too large | Low | Current build is ~135KB gzipped — acceptable |

---

## 10. Acceptance Criteria

The product is "done" for v1.0 when:
- [x] All 6 sections render correctly
- [x] All animations are smooth (60fps)
- [x] Mobile responsive on all screen sizes
- [x] Build produces a single HTML file
- [x] No console errors
- [x] All interactive elements function (expand, tabs, text inputs)
- [x] Deployed to a live URL accessible via HTTPS

---

## Appendix A: File Map

```
src/
├── App.tsx                          # Main app shell, navigation, layout
├── main.tsx                         # React entry point
├── index.css                        # Global styles, animations, design tokens
├── components/
│   ├── HeroSection.tsx              # Animated hero/landing
│   ├── CourseTimeline.tsx           # 14-day timeline with progress
│   └── Sections.tsx                 # Games, Surveys, Prompts, Learning, Media
├── data/
│   └── courseData.ts                # All content data (separated from UI)
└── utils/
    └── cn.ts                        # Class name utility
```

## Appendix B: Dependency Map

```
the-next-18
├── react@19.2.3            # UI framework
├── react-dom@19.2.3        # DOM rendering
├── framer-motion@^11       # Animations
├── lucide-react@^0.x       # Icons
├── clsx@2.1.1              # Conditional classes
├── tailwind-merge@3.4.0    # Tailwind class merging
├── tailwindcss@4.1.17      # CSS framework
├── vite@7.2.4              # Build tool
├── typescript@5.9.3        # Type system
└── vite-plugin-singlefile  # Single-file output
```

---

*Document maintained alongside the codebase. Update with each version release.*
