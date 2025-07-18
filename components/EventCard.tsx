import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, MapPin, Users, Clock, Star } from 'lucide-react-native';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Avatar } from './ui/Avatar';

interface EventCardProps {
  event: {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    attendees: number;
    maxAttendees?: number;
    organizer: {
      name: string;
      avatar?: string;
    };
    category: string;
    price?: string;
    rating?: number;
    image?: string;
    rsvpStatus?: 'going' | 'maybe' | 'not-going' | 'pending';
  };
  onPress: () => void;
  onRSVP: (status: 'going' | 'maybe' | 'not-going') => void;
}

export function EventCard({ event, onPress, onRSVP }: EventCardProps) {
  const getRSVPColor = (status?: string) => {
    switch (status) {
      case 'going': return '#10B981';
      case 'maybe': return '#F59E0B';
      case 'not-going': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getRSVPText = (status?: string) => {
    switch (status) {
      case 'going': return 'Going';
      case 'maybe': return 'Maybe';
      case 'not-going': return 'Not Going';
      default: return 'RSVP';
    }
  };

  return (
    <Card variant="elevated" style={styles.container}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.95}>
        <LinearGradient
          colors={['#FFFFFF', '#FAFBFC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.eventInfo}>
              <Badge variant="info" size="small">{event.category}</Badge>
              <Text style={styles.title}>{event.title}</Text>
            </View>
            {event.rating && (
              <View style={styles.rating}>
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.ratingText}>{event.rating}</Text>
              </View>
            )}
          </View>

          {/* Event Details */}
          <View style={styles.details}>
            <View style={styles.detailRow}>
              <Calendar size={16} color="#6B7280" />
              <Text style={styles.detailText}>{event.date} at {event.time}</Text>
            </View>
            <View style={styles.detailRow}>
              <MapPin size={16} color="#6B7280" />
              <Text style={styles.detailText}>{event.location}</Text>
            </View>
            <View style={styles.detailRow}>
              <Users size={16} color="#6B7280" />
              <Text style={styles.detailText}>
                {event.attendees} attending
                {event.maxAttendees && ` • ${event.maxAttendees} max`}
              </Text>
            </View>
            {event.price && (
              <View style={styles.detailRow}>
                <Clock size={16} color="#6B7280" />
                <Text style={styles.detailText}>{event.price}</Text>
              </View>
            )}
          </View>

          {/* Organizer */}
          <View style={styles.organizer}>
            <Avatar
              source={event.organizer.avatar}
              name={event.organizer.name}
              size="small"
            />
            <Text style={styles.organizerText}>Organized by {event.organizer.name}</Text>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <View style={styles.rsvpButtons}>
              <TouchableOpacity
                style={[
                  styles.rsvpButton,
                  event.rsvpStatus === 'going' && styles.rsvpButtonActive,
                ]}
                onPress={() => onRSVP('going')}
              >
                <Text
                  style={[
                    styles.rsvpButtonText,
                    event.rsvpStatus === 'going' && styles.rsvpButtonTextActive,
                  ]}
                >
                  Going
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.rsvpButton,
                  event.rsvpStatus === 'maybe' && styles.rsvpButtonActive,
                ]}
                onPress={() => onRSVP('maybe')}
              >
                <Text
                  style={[
                    styles.rsvpButtonText,
                    event.rsvpStatus === 'maybe' && styles.rsvpButtonTextActive,
                  ]}
                >
                  Maybe
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.rsvpButton,
                  event.rsvpStatus === 'not-going' && styles.rsvpButtonActive,
                ]}
                onPress={() => onRSVP('not-going')}
              >
                <Text
                  style={[
                    styles.rsvpButtonText,
                    event.rsvpStatus === 'not-going' && styles.rsvpButtonTextActive,
                  ]}
                >
                  Can't Go
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    overflow: 'hidden',
  },
  gradient: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  eventInfo: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
    lineHeight: 24,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  details: {
    marginBottom: 16,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  organizer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  organizerText: {
    fontSize: 12,
    color: '#6B7280',
  },
  actions: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 16,
  },
  rsvpButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  rsvpButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  rsvpButtonActive: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  rsvpButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  rsvpButtonTextActive: {
    color: '#FFFFFF',
  },
});