# Romantic Partners App - Design Document

## Overview

A modern, clean mobile application designed for romantic partners to connect, communicate, and manage their relationship through shared features. The app emphasizes intimacy, trust, and shared experiences with a minimalist, elegant design.

---

## Design Philosophy

- **Clean & Minimal**: Ample whitespace, clear typography, and intuitive navigation
- **Intimate**: Warm color palette with soft gradients and subtle animations
- **One-Handed Usage**: All interactive elements positioned within thumb reach
- **iOS-First**: Follows Apple Human Interface Guidelines with native feel
- **Portrait Orientation**: Optimized for 9:16 aspect ratio

---

## Color Palette

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| **Primary** | #E91E63 | #F06292 | Romantic accent (pink/rose) |
| **Background** | #FFFFFF | #0F0F0F | Screen backgrounds |
| **Surface** | #F5F5F5 | #1A1A1A | Cards, elevated surfaces |
| **Foreground** | #1A1A1A | #F5F5F5 | Primary text |
| **Muted** | #808080 | #B0B0B0 | Secondary text |
| **Border** | #E0E0E0 | #2A2A2A | Dividers, borders |
| **Success** | #4CAF50 | #66BB6A | Completed tasks |
| **Warning** | #FF9800 | #FFB74D | Pending items |
| **Error** | #F44336 | #EF5350 | Errors, deletions |

---

## Screen List

### 1. **Home Screen** (Tab: Home)
Primary dashboard showing relationship overview and quick actions.

**Content:**
- Greeting with partner's name
- Upcoming milestones/anniversaries (card)
- Recent messages preview (1-2 latest)
- Quick action buttons: Message, View Calendar, Create Todo
- Relationship stats (days together, next milestone)

**Functionality:**
- Tap message preview → Open messaging screen
- Tap calendar → Open shared calendar
- Tap "Create Todo" → Modal to add new task

---

### 2. **Messaging Screen** (Tab: Messages)
Private messaging with mention support and real-time updates.

**Content:**
- Conversation list with partner
- Message bubbles (sent/received)
- Input field with mention (@) support
- Typing indicator
- Timestamp on messages

**Functionality:**
- Type message → Send button
- Tap @ symbol → Show mention suggestions
- Long-press message → Delete/Edit options
- Scroll to load earlier messages
- Real-time sync

---

### 3. **Shared Calendar Screen** (Tab: Calendar)
View and manage shared events, anniversaries, and important dates.

**Content:**
- Month/week view toggle
- Event list below calendar
- Color-coded event types (anniversary, date, milestone, todo)
- Event details card

**Functionality:**
- Tap date → Create event modal
- Tap event → View/edit event details
- Swipe to change month
- Filter by event type

---

### 4. **Todo List Screen** (Tab: Todo)
Categorized task management with priority and due dates.

**Content:**
- Filter tabs: All, Active, Completed
- Category badges (colors)
- Task cards with:
  - Title
  - Category badge
  - Due date
  - Priority indicator (high/medium/low)
  - Completion checkbox
- "Add Todo" button

**Functionality:**
- Tap checkbox → Mark complete/incomplete
- Tap task → Edit modal
- Swipe to delete
- Filter by status/category
- Sort by due date or priority

---

### 5. **Date Ideas Screen** (Tab: Ideas)
Curated and custom date suggestions with planning features.

**Content:**
- Category filter (Romantic, Adventure, Casual, Creative)
- Date idea cards with:
  - Title
  - Description
  - Category tag
  - Difficulty level
  - Estimated duration
  - "Plan This Date" button
- Recently saved ideas section

**Functionality:**
- Tap idea → View full details
- "Plan This Date" → Add to calendar and create related todos
- Save/favorite ideas
- Search ideas

---

### 6. **Quizzes Screen** (Tab: Quizzes)
Relationship quizzes and fun games for couples.

**Content:**
- Quiz list cards with:
  - Title
  - Description
  - Category (Love Language, Compatibility, Fun Facts)
  - "Start Quiz" button
- Quiz progress indicator
- Results summary

**Functionality:**
- Start quiz → Question screen
- Answer questions → Next/Previous buttons
- View results → Share with partner
- Save quiz results

---

### 7. **Milestones Screen** (Tab: Milestones)
Track relationship milestones and anniversaries.

**Content:**
- Timeline view of milestones
- Milestone cards with:
  - Date
  - Title (Anniversary, First Date, etc.)
  - Description
  - Photo (optional)
  - Days since/until
- "Add Milestone" button

**Functionality:**
- Tap milestone → View details
- Add new milestone → Modal form
- Edit/delete milestone
- Get notifications for upcoming milestones

---

### 8. **Profile Screen** (Tab: Profile)
User profile and relationship settings.

**Content:**
- Partner's profile card with:
  - Profile picture
  - Name
  - Relationship status
  - Bio/interests
- Settings section:
  - Notification preferences
  - Privacy settings
  - Theme (Light/Dark)
  - About app
  - Logout

**Functionality:**
- Edit profile → Modal form
- Upload profile picture
- Toggle notifications
- Change theme
- Logout

---

## Key User Flows

### Flow 1: Send a Message with Mention
1. User taps Messages tab
2. Types message in input field
3. Taps @ symbol
4. Selects partner from mention suggestions
5. Completes message and taps Send
6. Message appears in conversation with mention highlighted

### Flow 2: Create and Complete a Todo
1. User taps Todo tab
2. Taps "Add Todo" button
3. Fills form: Title, Category, Due Date, Priority
4. Taps Save
5. Todo appears in list
6. User taps checkbox to mark complete
7. Todo moves to Completed section

### Flow 3: Plan a Date
1. User taps Date Ideas tab
2. Browses and finds an interesting idea
3. Taps "Plan This Date"
4. Confirms date details
5. Event added to shared calendar
6. Related todos created automatically
7. Notification sent to partner

### Flow 4: Track Milestone
1. User taps Milestones tab
2. Taps "Add Milestone"
3. Enters date, title, and optional photo
4. Saves milestone
5. Milestone appears on timeline
6. Partner receives notification
7. Countdown/days since displayed

---

## Component Hierarchy

```
App Root
├── Navigation (Tab Router)
│   ├── Home Screen
│   ├── Messages Screen
│   ├── Calendar Screen
│   ├── Todo Screen
│   ├── Date Ideas Screen
│   ├── Quizzes Screen
│   ├── Milestones Screen
│   └── Profile Screen
├── Theme Provider
├── Auth Provider
└── Data Sync Provider
```

---

## Typography

- **Headings**: SF Pro Display (iOS) / Roboto (Android), Bold, 24-32px
- **Subheadings**: SF Pro Display, Semibold, 16-20px
- **Body**: SF Pro Text (iOS) / Roboto (Android), Regular, 14-16px
- **Captions**: SF Pro Text, Regular, 12-13px

---

## Spacing & Layout

- **Padding**: 16px standard, 12px compact, 24px generous
- **Gap**: 12px between elements, 16px between sections
- **Corner Radius**: 12px for cards, 8px for buttons, 24px for full-width buttons
- **Line Height**: 1.5x font size for body text

---

## Interactive Elements

| Element | Style | Feedback |
|---------|-------|----------|
| **Primary Button** | Pink background, white text | Scale 0.97 + haptic |
| **Secondary Button** | Border only, pink text | Opacity 0.7 |
| **Checkbox** | Circle outline → filled pink | Haptic feedback |
| **Card** | Subtle shadow, border | Opacity 0.7 on press |
| **Input Field** | Border bottom, focus color pink | Cursor + keyboard |

---

## Data Synchronization

- **Real-time Sync**: Messages, calendar events, milestones
- **Periodic Sync**: Todos, quizzes, date ideas (every 5 minutes)
- **Offline Support**: Local cache with sync on reconnect
- **Conflict Resolution**: Last-write-wins for todos, merge for messages

---

## Accessibility

- **Minimum Touch Target**: 44x44pt
- **Color Contrast**: WCAG AA compliant
- **Text Scaling**: Supports system font size changes
- **Screen Reader**: All interactive elements labeled
- **Haptic Feedback**: Available for all primary actions

---

## Future Enhancements

- Video calls integration
- Photo sharing in messages
- Relationship goals and progress tracking
- Couples therapy resources
- Integration with calendar apps
- Couple's journal/diary
- Budget tracking for dates
