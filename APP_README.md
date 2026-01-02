# Couple - Romantic Partners App

A modern, beautifully designed mobile application built with React Native and Expo that helps romantic partners connect, communicate, and celebrate their relationship together.

## Features

### 🏠 Home Screen
- Personalized greeting with partner's name
- Relationship statistics (days together, upcoming milestones)
- Recent messages preview
- Quick action buttons for common tasks

### 💬 Messaging
- Real-time private messaging with your partner
- **@mention support** for highlighting important messages
- Message timestamps
- Clean, intuitive chat interface
- Message history

### 📅 Shared Calendar
- Month view calendar with event visualization
- Create and manage shared events
- Color-coded event types:
  - 💕 Anniversary
  - 💑 Date
  - 🎉 Milestone
  - ✓ Todo
  - ✨ Other
- Event details with location and description
- Navigate between months

### ✓ Todo List
- Create tasks with title and description
- Organize by categories
- Set priority levels (Low, Medium, High)
- Assign due dates
- Filter by status (All, Active, Completed)
- Mark tasks as complete
- Long-press to delete

### 💡 Date Ideas
- Browse curated date ideas
- Filter by category:
  - 💕 Romantic
  - 🎒 Adventure
  - 😊 Casual
  - 🎨 Creative
- View difficulty level and estimated duration
- Save/favorite your favorite ideas
- Filter to show only saved ideas

### 🎯 Quizzes
- Interactive relationship quizzes
- Multiple quiz categories:
  - Love Language
  - Compatibility
  - Fun Facts
- Question-based interface
- Instant scoring and results
- Retake quizzes anytime

### 🎉 Milestones
- Track important relationship moments
- Timeline view of all milestones
- Automatic date calculations (days until/since)
- Create custom milestones
- Add descriptions to milestones
- Visual timeline with markers

### 👤 Profile
- Manage your profile information
- Add name, bio, and interests
- View partner's profile
- App settings and preferences
- Theme and notification settings

## Technical Stack

- **Framework**: React Native 0.81
- **Platform**: Expo SDK 54
- **Styling**: NativeWind (Tailwind CSS)
- **Language**: TypeScript 5.9
- **State Management**: React Context + AsyncStorage
- **Navigation**: Expo Router 6
- **UI Components**: React Native, Reanimated 4

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm/pnpm
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run on iOS
pnpm ios

# Run on Android
pnpm android

# Run on Web
pnpm dev:metro
```

### Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
app/
  _layout.tsx              # Root layout with providers
  (tabs)/
    _layout.tsx            # Tab navigation configuration
    index.tsx              # Home screen
    messages.tsx           # Messaging screen
    calendar.tsx           # Calendar screen
    todos.tsx              # Todo list screen
    ideas.tsx              # Date ideas screen
    quizzes.tsx            # Quizzes screen
    milestones.tsx         # Milestones screen
    profile.tsx            # Profile screen

components/
  screen-container.tsx     # SafeArea wrapper
  empty-state.tsx          # Empty state UI
  loading-spinner.tsx      # Loading indicator
  toast.tsx                # Toast notifications
  divider.tsx              # Visual divider
  ui/
    icon-symbol.tsx        # Icon mapping

lib/
  data-context.tsx         # Global state management
  animations.ts            # Animation utilities
  utils.ts                 # Utility functions
  theme-provider.tsx       # Theme context

hooks/
  use-colors.ts            # Theme colors hook
  use-color-scheme.ts      # Dark/light mode detection
  use-auth.ts              # Authentication hook

constants/
  theme.ts                 # Theme configuration
```

## Data Storage

The app uses **AsyncStorage** for local data persistence. All data is stored locally on the device:

- User profiles
- Messages
- Todos
- Calendar events
- Milestones
- Quizzes
- Saved date ideas

## Color Scheme

The app uses a warm, romantic pink color palette:

| Color | Usage |
|-------|-------|
| Primary (#0a7ea4) | Buttons, accents, highlights |
| Background (#ffffff) | Screen backgrounds |
| Surface (#f5f5f5) | Cards, elevated surfaces |
| Foreground (#11181C) | Primary text |
| Muted (#687076) | Secondary text |
| Border (#E5E7EB) | Dividers, borders |
| Success (#22C55E) | Positive actions |
| Warning (#F59E0B) | Warnings |
| Error (#EF4444) | Errors, destructive actions |

## Customization

### Change App Name
Edit `app.config.ts`:
```typescript
appName: "Your App Name"
```

### Change Theme Colors
Edit `theme.config.js`:
```javascript
const themeColors = {
  primary: { light: '#your-color', dark: '#your-color' },
  // ... other colors
};
```

### Add New Screens
1. Create a new file in `app/(tabs)/`
2. Add the route to `app/(tabs)/_layout.tsx`
3. Add the icon mapping to `components/ui/icon-symbol.tsx`

## Performance Tips

- Use `FlatList` for large lists (never `ScrollView` with `.map()`)
- Memoize expensive computations with `useMemo`
- Use `useCallback` for event handlers
- Avoid inline style objects
- Use `StyleSheet.create()` for static styles

## Testing

The app includes TypeScript for type safety. Run type checking:

```bash
pnpm check
```

## Deployment

### iOS
```bash
eas build --platform ios
eas submit --platform ios
```

### Android
```bash
eas build --platform android
eas submit --platform android
```

## Browser Support

The app works on:
- iOS 13+
- Android 5+
- Web (modern browsers)

## Troubleshooting

### App crashes on startup
- Clear AsyncStorage: `AsyncStorage.clear()`
- Rebuild: `pnpm dev`

### Styling issues
- Clear Tailwind cache: `rm -rf .next`
- Restart dev server: `pnpm dev`

### Navigation not working
- Ensure all routes are defined in `app/(tabs)/_layout.tsx`
- Check icon mappings in `icon-symbol.tsx`

## Future Enhancements

- Backend database integration for cross-device sync
- Push notifications
- Photo sharing
- Voice messages
- Relationship goals tracking
- Memory gallery
- Couple's journal
- Expense splitting
- Travel planning

## License

MIT

## Support

For issues or feature requests, please contact support@couple.app

---

**Made with ❤️ for couples everywhere**
