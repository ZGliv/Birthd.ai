import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Gift, Users, MapPin } from 'lucide-react-native';
import { Avatar } from './ui/Avatar';
import { Badge } from './ui/Badge';
import { Card } from './ui/Card';

interface BirthdayCardProps {
  friend: {
    id: number;
    name: string;
    avatar?: string;
    birthday: string;
    daysUntil: number;
    age?: number;
    mutualFriends?: number;
    location?: string;
    interests?: string[];
  };
  onCelebrate: () => void;
  onViewProfile: () => void;
}

export function BirthdayCard({ friend, onCelebrate, onViewProfile }: BirthdayCardProps) {
  const getUrgencyColor = (days: number) => {
    if (days === 0) return ['#EF4444', '#DC2626'];
    if (days <= 3) return ['#F59E0B', '#D97706'];
    if (days <= 7) return ['#8B5CF6', '#7C3AED'];
    return ['#6B7280', '#4B5563'];
  };

  const getUrgencyText = (days: number) => {
    if (days === 0) return 'Today!';
    if (days === 1) return 'Tomorrow';
    return `${days} days`;
  };

  const urgencyColors = getUrgencyColor(friend.daysUntil);

  return (
    <Card variant="elevated" style={styles.container}>
      <LinearGradient
        colors={['#FFFFFF', '#F8FAFC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onViewProfile} style={styles.profileSection}>
            <Avatar
              source={friend.avatar}
              name={friend.name}
              size="large"
              gradient={true}
              showOnlineIndicator={friend.daysUntil <= 1}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{friend.name}</Text>
              {friend.age && (
                <Text style={styles.age}>Turning {friend.age}</Text>
              )}
              <View style={styles.details}>
                <Calendar size={14} color="#6B7280" />
                <Text style={styles.birthday}>{friend.birthday}</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <View style={styles.urgencyContainer}>
            <LinearGradient
              colors={urgencyColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.urgencyBadge}
            >
              <Text style={styles.urgencyText}>{getUrgencyText(friend.daysUntil)}</Text>
            </LinearGradient>
          </View>
        </View>

        {friend.interests && friend.interests.length > 0 && (
          <View style={styles.interests}>
            {friend.interests.slice(0, 3).map((interest, index) => (
              <Badge key={index} variant="info" size="small">
                {interest}
              </Badge>
            ))}
          </View>
        )}

        <View style={styles.metadata}>
          {friend.mutualFriends && (
            <View style={styles.metaItem}>
              <Users size={14} color="#6B7280" />
              <Text style={styles.metaText}>{friend.mutualFriends} mutual friends</Text>
            </View>
          )}
          {friend.location && (
            <View style={styles.metaItem}>
              <MapPin size={14} color="#6B7280" />
              <Text style={styles.metaText}>{friend.location}</Text>
            </View>
          )}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Gift size={16} color="#8B5CF6" />
            <Text style={styles.secondaryButtonText}>Send Gift</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={onCelebrate} style={styles.primaryButton}>
            <LinearGradient
              colors={['#8B5CF6', '#7C3AED']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.primaryButtonGradient}
            >
              <Text style={styles.primaryButtonText}>Plan Celebration</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
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
  profileSection: {
    flexDirection: 'row',
    flex: 1,
  },
  info: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  age: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  birthday: {
    fontSize: 14,
    color: '#6B7280',
  },
  urgencyContainer: {
    alignItems: 'flex-end',
  },
  urgencyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  urgencyText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  interests: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  metadata: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  primaryButton: {
    flex: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  primaryButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});