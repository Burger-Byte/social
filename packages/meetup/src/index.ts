/**
 * Meetup Module
 * 
 * The CORE FEATURE of the dating app.
 * Handles venue suggestions and meetup scheduling.
 * 
 * Key Features:
 * - Calculate midpoint between two users
 * - Find venues equidistant from both users
 * - Rank venues by fairness and quality
 * - Schedule and confirm meetups
 * - Check-in functionality
 * - Post-meetup feedback
 */

export * from './services/meetup.service';

// Re-export relevant types for convenience
export type {
  MeetupRequest,
  MeetupSuggestion,
  ConfirmedMeetup,
  VenueWithDistance,
  MeetupFeedback
} from '@dating-app/shared-types';
