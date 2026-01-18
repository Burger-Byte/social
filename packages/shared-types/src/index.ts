// Core User Types
export interface User {
  id: string;
  email: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  userId: string;
  firstName: string;
  age: number;
  gender: 'male' | 'female' | 'non-binary' | 'other';
  bio: string;
  photos: Photo[];
  interests: string[];
  preferences: UserPreferences;
  location: Location;
  createdAt: Date;
  updatedAt: Date;
}

export interface Photo {
  id: string;
  url: string;
  order: number;
  isVerified?: boolean;
}

export interface UserPreferences {
  ageRange: { min: number; max: number };
  maxDistance: number; // in kilometers
  genderPreference: ('male' | 'female' | 'non-binary' | 'other')[];
  firstDatePreferences: FirstDatePreference[];
}

export type FirstDatePreference = 'coffee' | 'drinks' | 'lunch' | 'dinner' | 'walk' | 'activity';

// Location Types
export interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
  approximateArea?: string; // e.g., "Downtown Manhattan" - for privacy
}

export interface Coordinates {
  lat: number;
  lng: number;
}

// Match Types
export interface Match {
  id: string;
  user1Id: string;
  user2Id: string;
  createdAt: Date;
  status: MatchStatus;
}

export type MatchStatus = 'active' | 'expired' | 'unmatched' | 'meetup_scheduled';

export interface Like {
  id: string;
  fromUserId: string;
  toUserId: string;
  createdAt: Date;
}

// Messaging Types
export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  type: MessageType;
  createdAt: Date;
  readAt?: Date;
}

export type MessageType = 'text' | 'image' | 'meetup_request' | 'system';

export interface Conversation {
  matchId: string;
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: Date;
}

// Meetup Types (CORE FEATURE)
export interface MeetupRequest {
  id: string;
  matchId: string;
  requestedBy: string;
  status: MeetupRequestStatus;
  proposedTimeWindows: TimeWindow[];
  venueType: VenueType;
  createdAt: Date;
  updatedAt: Date;
}

export type MeetupRequestStatus = 'pending' | 'accepted' | 'declined' | 'confirmed' | 'cancelled' | 'completed';

export interface TimeWindow {
  startTime: Date;
  endTime: Date;
}

export type VenueType = 'coffee_shop' | 'cafe' | 'bar' | 'restaurant' | 'park' | 'other';

export interface Venue {
  id: string;
  name: string;
  type: VenueType;
  location: Location;
  address: string;
  rating?: number;
  priceLevel?: number; // 1-4
  photos?: string[];
  ambiance?: string; // e.g., "Quiet, good for conversation"
  openingHours?: OpeningHours;
  placeId?: string; // Google Places ID
}

export interface OpeningHours {
  openNow: boolean;
  weekdayText?: string[];
}

export interface MeetupSuggestion {
  requestId: string;
  venues: VenueWithDistance[];
  midpoint: Coordinates;
  generatedAt: Date;
}

export interface VenueWithDistance {
  venue: Venue;
  distanceFromUser1: number; // in kilometers
  distanceFromUser2: number; // in kilometers
  travelTimeUser1?: number; // in minutes
  travelTimeUser2?: number; // in minutes
}

export interface ConfirmedMeetup {
  id: string;
  matchId: string;
  requestId: string;
  venue: Venue;
  scheduledTime: Date;
  status: ConfirmedMeetupStatus;
  user1CheckedIn?: Date;
  user2CheckedIn?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type ConfirmedMeetupStatus = 'scheduled' | 'user1_arrived' | 'user2_arrived' | 'both_arrived' | 'completed' | 'cancelled' | 'no_show';

// Safety & Feedback Types
export interface SafetyReport {
  id: string;
  reportedBy: string;
  reportedUser: string;
  matchId?: string;
  meetupId?: string;
  reason: string;
  description: string;
  createdAt: Date;
  status: 'pending' | 'reviewed' | 'resolved';
}

export interface MeetupFeedback {
  id: string;
  meetupId: string;
  userId: string;
  rating?: number; // 1-5
  showed_up: boolean;
  wouldMeetAgain: boolean;
  comments?: string;
  createdAt: Date;
}

// Auth Types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email?: string;
  phoneNumber?: string;
  password: string;
}

export interface RegisterData {
  email?: string;
  phoneNumber?: string;
  password: string;
  firstName: string;
  dateOfBirth: Date;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: any;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Event Types (for event-driven architecture)
export type DomainEvent = 
  | UserRegisteredEvent
  | MatchCreatedEvent
  | MessageSentEvent
  | MeetupRequestedEvent
  | MeetupConfirmedEvent
  | MeetupCompletedEvent;

export interface BaseEvent {
  eventId: string;
  eventType: string;
  occurredAt: Date;
  userId?: string;
}

export interface UserRegisteredEvent extends BaseEvent {
  eventType: 'user.registered';
  data: {
    userId: string;
    email: string;
  };
}

export interface MatchCreatedEvent extends BaseEvent {
  eventType: 'match.created';
  data: {
    matchId: string;
    user1Id: string;
    user2Id: string;
  };
}

export interface MessageSentEvent extends BaseEvent {
  eventType: 'message.sent';
  data: {
    messageId: string;
    matchId: string;
    senderId: string;
  };
}

export interface MeetupRequestedEvent extends BaseEvent {
  eventType: 'meetup.requested';
  data: {
    requestId: string;
    matchId: string;
    requestedBy: string;
  };
}

export interface MeetupConfirmedEvent extends BaseEvent {
  eventType: 'meetup.confirmed';
  data: {
    meetupId: string;
    matchId: string;
    venueId: string;
    scheduledTime: Date;
  };
}

export interface MeetupCompletedEvent extends BaseEvent {
  eventType: 'meetup.completed';
  data: {
    meetupId: string;
    matchId: string;
  };
}
