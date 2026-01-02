import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
export interface Profile {
  id: string;
  name: string;
  bio: string;
  profilePictureUrl?: string;
  interests: string[];
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  mentions: string[];
  createdAt: Date;
  isEdited: boolean;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  eventType: 'anniversary' | 'date' | 'milestone' | 'todo' | 'other';
  startDate: Date;
  endDate?: Date;
  location?: string;
  color: string;
}

export interface DateIdea {
  id: string;
  title: string;
  description?: string;
  category: 'romantic' | 'adventure' | 'casual' | 'creative';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedDuration?: number;
  isSaved: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  category: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer?: number;
}

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  date: Date;
  photoUrl?: string;
}

export interface AppState {
  // Profile
  currentUser: Profile | null;
  partnerProfile: Profile | null;

  // Messaging
  messages: Message[];

  // Todos
  todos: Todo[];

  // Calendar
  calendarEvents: CalendarEvent[];

  // Date Ideas
  dateIdeas: DateIdea[];
  savedDateIdeas: DateIdea[];

  // Quizzes
  quizzes: Quiz[];

  // Milestones
  milestones: Milestone[];

  // Actions
  setCurrentUser: (user: Profile) => Promise<void>;
  setPartnerProfile: (profile: Profile) => Promise<void>;
  addMessage: (message: Omit<Message, 'id'>) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  editMessage: (id: string, content: string) => Promise<void>;
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => Promise<void>;
  updateCalendarEvent: (id: string, updates: Partial<CalendarEvent>) => Promise<void>;
  deleteCalendarEvent: (id: string) => Promise<void>;
  addDateIdea: (idea: Omit<DateIdea, 'id'>) => Promise<void>;
  saveDateIdea: (id: string) => Promise<void>;
  unsaveDateIdea: (id: string) => Promise<void>;
  addMilestone: (milestone: Omit<Milestone, 'id'>) => Promise<void>;
  updateMilestone: (id: string, updates: Partial<Milestone>) => Promise<void>;
  deleteMilestone: (id: string) => Promise<void>;
  loadAllData: () => Promise<void>;
}

const DataContext = createContext<AppState | undefined>(undefined);

const STORAGE_KEYS = {
  CURRENT_USER: 'romantic_app_current_user',
  PARTNER_PROFILE: 'romantic_app_partner_profile',
  MESSAGES: 'romantic_app_messages',
  TODOS: 'romantic_app_todos',
  CALENDAR_EVENTS: 'romantic_app_calendar_events',
  DATE_IDEAS: 'romantic_app_date_ideas',
  SAVED_DATE_IDEAS: 'romantic_app_saved_date_ideas',
  QUIZZES: 'romantic_app_quizzes',
  MILESTONES: 'romantic_app_milestones',
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUserState] = useState<Profile | null>(null);
  const [partnerProfile, setPartnerProfileState] = useState<Profile | null>(null);
  const [messages, setMessagesState] = useState<Message[]>([]);
  const [todos, setTodosState] = useState<Todo[]>([]);
  const [calendarEvents, setCalendarEventsState] = useState<CalendarEvent[]>([]);
  const [dateIdeas, setDateIdeasState] = useState<DateIdea[]>([]);
  const [savedDateIdeas, setSavedDateIdeasState] = useState<DateIdea[]>([]);
  const [quizzes, setQuizzesState] = useState<Quiz[]>([]);
  const [milestones, setMilestonesState] = useState<Milestone[]>([]);

  // Load all data from AsyncStorage on mount
  const loadAllData = async () => {
    try {
      const [
        userStr,
        partnerStr,
        messagesStr,
        todosStr,
        eventsStr,
        ideasStr,
        savedIdeasStr,
        quizzesStr,
        milestonesStr,
      ] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER),
        AsyncStorage.getItem(STORAGE_KEYS.PARTNER_PROFILE),
        AsyncStorage.getItem(STORAGE_KEYS.MESSAGES),
        AsyncStorage.getItem(STORAGE_KEYS.TODOS),
        AsyncStorage.getItem(STORAGE_KEYS.CALENDAR_EVENTS),
        AsyncStorage.getItem(STORAGE_KEYS.DATE_IDEAS),
        AsyncStorage.getItem(STORAGE_KEYS.SAVED_DATE_IDEAS),
        AsyncStorage.getItem(STORAGE_KEYS.QUIZZES),
        AsyncStorage.getItem(STORAGE_KEYS.MILESTONES),
      ]);

      if (userStr) setCurrentUserState(JSON.parse(userStr));
      if (partnerStr) setPartnerProfileState(JSON.parse(partnerStr));
      if (messagesStr) setMessagesState(JSON.parse(messagesStr).map((m: any) => ({
        ...m,
        createdAt: new Date(m.createdAt),
      })));
      if (todosStr) setTodosState(JSON.parse(todosStr).map((t: any) => ({
        ...t,
        dueDate: t.dueDate ? new Date(t.dueDate) : undefined,
        completedAt: t.completedAt ? new Date(t.completedAt) : undefined,
        createdAt: new Date(t.createdAt),
      })));
      if (eventsStr) setCalendarEventsState(JSON.parse(eventsStr).map((e: any) => ({
        ...e,
        startDate: new Date(e.startDate),
        endDate: e.endDate ? new Date(e.endDate) : undefined,
      })));
      if (ideasStr) setDateIdeasState(JSON.parse(ideasStr));
      if (savedIdeasStr) setSavedDateIdeasState(JSON.parse(savedIdeasStr));
      if (quizzesStr) setQuizzesState(JSON.parse(quizzesStr));
      if (milestonesStr) setMilestonesState(JSON.parse(milestonesStr).map((m: any) => ({
        ...m,
        date: new Date(m.date),
      })));
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // User profile actions
  const setCurrentUser = async (user: Profile) => {
    setCurrentUserState(user);
    await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  };

  const setPartnerProfile = async (profile: Profile) => {
    setPartnerProfileState(profile);
    await AsyncStorage.setItem(STORAGE_KEYS.PARTNER_PROFILE, JSON.stringify(profile));
  };

  // Message actions
  const addMessage = async (message: Omit<Message, 'id'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
    };
    const updated = [...messages, newMessage];
    setMessagesState(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
  };

  const deleteMessage = async (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessagesState(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
  };

  const editMessage = async (id: string, content: string) => {
    const updated = messages.map(m =>
      m.id === id ? { ...m, content, isEdited: true } : m
    );
    setMessagesState(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
  };

  // Todo actions
  const addTodo = async (todo: Omit<Todo, 'id' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...todo,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    const updated = [...todos, newTodo];
    setTodosState(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(updated));
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    const updated = todos.map(t =>
      t.id === id ? { ...t, ...updates } : t
    );
    setTodosState(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(updated));
  };

  const deleteTodo = async (id: string) => {
    const updated = todos.filter(t => t.id !== id);
    setTodosState(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(updated));
  };

  // Calendar event actions
  const addCalendarEvent = async (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: Date.now().toString(),
    };
    const updated = [...calendarEvents, newEvent];
    setCalendarEventsState(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.CALENDAR_EVENTS, JSON.stringify(updated));
  };

  const updateCalendarEvent = async (id: string, updates: Partial<CalendarEvent>) => {
    const updated = calendarEvents.map(e =>
      e.id === id ? { ...e, ...updates } : e
    );
    setCalendarEventsState(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.CALENDAR_EVENTS, JSON.stringify(updated));
  };

  const deleteCalendarEvent = async (id: string) => {
    const updated = calendarEvents.filter(e => e.id !== id);
    setCalendarEventsState(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.CALENDAR_EVENTS, JSON.stringify(updated));
  };

  // Date idea actions
  const addDateIdea = async (idea: Omit<DateIdea, 'id'>) => {
    const newIdea: DateIdea = {
      ...idea,
      id: Date.now().toString(),
    };
    const updated = [...dateIdeas, newIdea];
    setDateIdeasState(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.DATE_IDEAS, JSON.stringify(updated));
  };

  const saveDateIdea = async (id: string) => {
    const idea = dateIdeas.find(d => d.id === id);
    if (idea) {
      const updated = [...savedDateIdeas, { ...idea, isSaved: true }];
      setSavedDateIdeasState(updated);
      await AsyncStorage.setItem(STORAGE_KEYS.SAVED_DATE_IDEAS, JSON.stringify(updated));
    }
  };

  const unsaveDateIdea = async (id: string) => {
    const updated = savedDateIdeas.filter(d => d.id !== id);
    setSavedDateIdeasState(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.SAVED_DATE_IDEAS, JSON.stringify(updated));
  };

  // Milestone actions
  const addMilestone = async (milestone: Omit<Milestone, 'id'>) => {
    const newMilestone: Milestone = {
      ...milestone,
      id: Date.now().toString(),
    };
    const updated = [...milestones, newMilestone];
    setMilestonesState(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(updated));
  };

  const updateMilestone = async (id: string, updates: Partial<Milestone>) => {
    const updated = milestones.map(m =>
      m.id === id ? { ...m, ...updates } : m
    );
    setMilestonesState(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(updated));
  };

  const deleteMilestone = async (id: string) => {
    const updated = milestones.filter(m => m.id !== id);
    setMilestonesState(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(updated));
  };

  const value: AppState = {
    currentUser,
    partnerProfile,
    messages,
    todos,
    calendarEvents,
    dateIdeas,
    savedDateIdeas,
    quizzes,
    milestones,
    setCurrentUser,
    setPartnerProfile,
    addMessage,
    deleteMessage,
    editMessage,
    addTodo,
    updateTodo,
    deleteTodo,
    addCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent,
    addDateIdea,
    saveDateIdea,
    unsaveDateIdea,
    addMilestone,
    updateMilestone,
    deleteMilestone,
    loadAllData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
