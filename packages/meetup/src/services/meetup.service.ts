import {
  MeetupRequest,
  MeetupSuggestion,
  ConfirmedMeetup,
  Venue,
  VenueWithDistance,
  Coordinates,
  VenueType,
  TimeWindow,
  MeetupRequestStatus
} from '@dating-app/shared-types';

/**
 * Meetup Service
 * 
 * This is the CORE feature of the app - handles the entire meetup flow:
 * 1. Create meetup request
 * 2. Calculate midpoint between users
 * 3. Find suitable venues near midpoint
 * 4. Present suggestions to users
 * 5. Confirm and schedule meetup
 * 6. Handle check-ins and feedback
 */

export class MeetupService {
  
  /**
   * Create a new meetup request
   */
  async createMeetupRequest(params: {
    matchId: string;
    requestedBy: string;
    proposedTimeWindows: TimeWindow[];
    venueType: VenueType;
  }): Promise<MeetupRequest> {
    // TODO: Implement database logic
    // 1. Validate match exists and is active
    // 2. Create meetup request in database
    // 3. Send notification to other user
    // 4. Emit event: MeetupRequestedEvent
    
    const request: MeetupRequest = {
      id: this.generateId(),
      matchId: params.matchId,
      requestedBy: params.requestedBy,
      status: 'pending',
      proposedTimeWindows: params.proposedTimeWindows,
      venueType: params.venueType,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return request;
  }

  /**
   * Accept a meetup request and generate venue suggestions
   * This is where the magic happens!
   */
  async acceptMeetupRequest(requestId: string): Promise<MeetupSuggestion> {
    // TODO: Implement full logic
    // 1. Update request status to 'accepted'
    // 2. Get user locations from match
    // 3. Calculate midpoint
    // 4. Search for venues near midpoint
    // 5. Calculate distances for each user
    // 6. Rank and filter venues
    // 7. Return top suggestions
    // 8. Emit event: MeetupAcceptedEvent

    throw new Error('Method will be implemented with geolocation module');
  }

  /**
   * Generate venue suggestions for an accepted meetup request
   * THE CORE ALGORITHM
   */
  async generateVenueSuggestions(params: {
    user1Location: Coordinates;
    user2Location: Coordinates;
    venueType: VenueType;
    timeWindow?: TimeWindow;
  }): Promise<MeetupSuggestion> {
    
    // Step 1: Calculate midpoint between two users
    const midpoint = this.calculateMidpoint(
      params.user1Location,
      params.user2Location
    );

    // Step 2: Search for venues near midpoint
    // This will use the geolocation module
    const venues = await this.searchVenuesNearMidpoint(
      midpoint,
      params.venueType,
      params.timeWindow
    );

    // Step 3: Calculate distances from each user to each venue
    const venuesWithDistance = venues.map(venue => {
      const distanceFromUser1 = this.calculateDistance(
        params.user1Location,
        { lat: venue.location.latitude, lng: venue.location.longitude }
      );
      const distanceFromUser2 = this.calculateDistance(
        params.user2Location,
        { lat: venue.location.latitude, lng: venue.location.longitude }
      );

      return {
        venue,
        distanceFromUser1,
        distanceFromUser2,
        // Travel time estimation (simple: 3km = ~10 min by car/transit)
        travelTimeUser1: Math.round(distanceFromUser1 / 3 * 10),
        travelTimeUser2: Math.round(distanceFromUser2 / 3 * 10)
      } as VenueWithDistance;
    });

    // Step 4: Rank venues by fairness (similar distances for both users)
    const rankedVenues = this.rankVenuesByFairness(venuesWithDistance);

    // Step 5: Return top 5 suggestions
    const suggestion: MeetupSuggestion = {
      requestId: 'temp-id', // Will come from params
      venues: rankedVenues.slice(0, 5),
      midpoint,
      generatedAt: new Date()
    };

    return suggestion;
  }

  /**
   * Confirm a meetup with selected venue and time
   */
  async confirmMeetup(params: {
    requestId: string;
    venueId: string;
    scheduledTime: Date;
  }): Promise<ConfirmedMeetup> {
    // TODO: Implement database logic
    // 1. Validate request exists and is accepted
    // 2. Create confirmed meetup
    // 3. Add to both users' calendars
    // 4. Send notifications
    // 5. Emit event: MeetupConfirmedEvent

    throw new Error('Method will be implemented');
  }

  /**
   * User checks in when they arrive at venue
   */
  async checkinToMeetup(params: {
    meetupId: string;
    userId: string;
  }): Promise<ConfirmedMeetup> {
    // TODO: Implement database logic
    // 1. Update meetup with check-in timestamp
    // 2. If both checked in, update status to 'both_arrived'
    // 3. Send notification to other user
    // 4. Emit event: UserCheckedInEvent

    throw new Error('Method will be implemented');
  }

  // ========== UTILITY METHODS ==========

  /**
   * Calculate geographic midpoint between two coordinates
   * Uses simple averaging (good enough for most cases)
   * For more accuracy, could use spherical geometry
   */
  private calculateMidpoint(
    coord1: Coordinates,
    coord2: Coordinates
  ): Coordinates {
    return {
      lat: (coord1.lat + coord2.lat) / 2,
      lng: (coord1.lng + coord2.lng) / 2
    };
  }

  /**
   * Calculate distance between two points using Haversine formula
   * Returns distance in kilometers
   */
  private calculateDistance(
    coord1: Coordinates,
    coord2: Coordinates
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(coord2.lat - coord1.lat);
    const dLng = this.toRad(coord2.lng - coord1.lng);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(coord1.lat)) * 
      Math.cos(this.toRad(coord2.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return distance;
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Rank venues by fairness - prioritize venues where both users
   * travel similar distances (no one goes significantly further)
   */
  private rankVenuesByFairness(
    venues: VenueWithDistance[]
  ): VenueWithDistance[] {
    return venues.sort((a, b) => {
      // Calculate fairness score (lower is better)
      // Fairness = absolute difference in distances
      const fairnessA = Math.abs(
        a.distanceFromUser1 - a.distanceFromUser2
      );
      const fairnessB = Math.abs(
        b.distanceFromUser1 - b.distanceFromUser2
      );

      // Also consider total distance (shorter total is better)
      const totalA = a.distanceFromUser1 + a.distanceFromUser2;
      const totalB = b.distanceFromUser1 + b.distanceFromUser2;

      // Weighted score: 70% fairness, 30% total distance
      const scoreA = fairnessA * 0.7 + totalA * 0.3;
      const scoreB = fairnessB * 0.7 + totalB * 0.3;

      return scoreA - scoreB;
    });
  }

  /**
   * Search for venues near midpoint
   * This will delegate to geolocation module
   */
  private async searchVenuesNearMidpoint(
    midpoint: Coordinates,
    venueType: VenueType,
    timeWindow?: TimeWindow
  ): Promise<Venue[]> {
    // TODO: Implement with geolocation module
    // Will use Google Places API or similar
    // Filter by: type, open hours, rating, etc.
    
    throw new Error('Requires geolocation module implementation');
  }

  private generateId(): string {
    return `meetup_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Export singleton instance
export const meetupService = new MeetupService();
