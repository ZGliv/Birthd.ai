import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Calendar, Bell, Plus, Cake, Gift, Users, TrendingUp, Sparkles } from 'lucide-react-native';
import { BirthdayCard } from '../../components/BirthdayCard';
import { EventCard } from '../../components/EventCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => setRefreshing(false), 1000);
  };

  const upcomingBirthdays = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      birthday: 'March 12',
      daysUntil: 0,
      age: 28,
      mutualFriends: 12,
      location: 'San Francisco, CA',
      interests: ['Photography', 'Travel', 'Coffee'],
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      birthday: 'March 15',
      daysUntil: 3,
      age: 32,
      mutualFriends: 8,
      location: 'New York, NY',
      interests: ['Tech', 'Gaming', 'Cooking'],
    },
    {
      id: 3,
      name: 'Emma Davis',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      birthday: 'March 18',
      daysUntil: 6,
      age: 25,
      mutualFriends: 15,
      location: 'Los Angeles, CA',
      interests: ['Art', 'Music', 'Yoga'],
    },
  ];

  const recentEvents = [
    {
      id: 1,
      title: "Sarah's Birthday Celebration",
      date: 'Today',
      time: '7:00 PM',
      location: 'The Rooftop Lounge',
      attendees: 12,
      maxAttendees: 20,
      organizer: { name: 'Alex Johnson', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg' },
      category: 'Birthday Party',
      rating: 4.8,
      rsvpStatus: 'going' as const,
    },
    {
      id: 2,
      title: "Mike's Surprise Party Planning",
      date: 'March 15',
      time: '6:30 PM',
      location: 'Downtown Bowling Alley',
      attendees: 8,
      maxAttendees: 15,
      organizer: { name: 'Lisa Wang', avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg' },
      category: 'Surprise Party',
      price: '$25 per person',
      rsvpStatus: 'maybe' as const,
    },
  ];

  const stats = [
    { label: 'Friends', value: '127', icon: Users, trend: '+5' },
    { label: 'Events', value: '23', icon: Calendar, trend: '+3' },
    { label: 'Gifts Given', value: '45', icon: Gift, trend: '+2' },
  ];

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header with Gradient */}
        <LinearGradient
          colors={['#8B5CF6', '#7C3AED', '#6366F1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <BlurView intensity={20} style={styles.headerBlur}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Text style={styles.greeting}>{getGreeting()}! ✨</Text>
                <Text style={styles.subtitle}>Let's make today special</Text>
                <Text style={styles.dateTime}>
                  {currentTime.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              </View>
              <TouchableOpacity style={styles.notificationButton}>
                <Bell size={24} color="#FFFFFF" />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationCount}>3</Text>
                </View>
              </TouchableOpacity>
            </View>
          </BlurView>
        </LinearGradient>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <Card key={index} variant="elevated" style={styles.statCard}>
              <LinearGradient
                colors={['#FFFFFF', '#F8FAFC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statGradient}
              >
                <stat.icon size={24} color="#8B5CF6" />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <View style={styles.statTrend}>
                  <TrendingUp size={12} color="#10B981" />
                  <Text style={styles.statTrendText}>{stat.trend}</Text>
                </View>
              </LinearGradient>
            </Card>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Button
            title="Create Event"
            onPress={() => {}}
            icon={<Plus size={20} color="#FFFFFF" />}
            style={styles.actionButton}
          />
          <Button
            title="Find Venues"
            onPress={() => {}}
            variant="outline"
            icon={<Calendar size={20} color="#8B5CF6" />}
            style={styles.actionButton}
          />
        </View>

        {/* Today's Highlights */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Sparkles size={20} color="#8B5CF6" />
              <Text style={styles.sectionTitle}>Today's Highlights</Text>
            </View>
            <Badge variant="warning" size="small">
              {upcomingBirthdays.filter(b => b.daysUntil <= 1).length} urgent
            </Badge>
          </View>

          {upcomingBirthdays
            .filter(birthday => birthday.daysUntil <= 1)
            .map((birthday) => (
              <BirthdayCard
                key={birthday.id}
                friend={birthday}
                onCelebrate={() => console.log('Celebrate', birthday.name)}
                onViewProfile={() => console.log('View profile', birthday.name)}
              />
            ))}
        </View>

        {/* Upcoming Birthdays */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Cake size={20} color="#8B5CF6" />
              <Text style={styles.sectionTitle}>Upcoming Birthdays</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          {upcomingBirthdays
            .filter(birthday => birthday.daysUntil > 1)
            .map((birthday) => (
              <BirthdayCard
                key={birthday.id}
                friend={birthday}
                onCelebrate={() => console.log('Celebrate', birthday.name)}
                onViewProfile={() => console.log('View profile', birthday.name)}
              />
            ))}
        </View>

        {/* Recent Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Calendar size={20} color="#8B5CF6" />
              <Text style={styles.sectionTitle}>Your Events</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          {recentEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => console.log('View event', event.title)}
              onRSVP={(status) => console.log('RSVP', status, event.title)}
            />
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerGradient: {
    marginBottom: 24,
  },
  headerBlur: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E7FF',
    marginBottom: 8,
  },
  dateTime: {
    fontSize: 14,
    color: '#C7D2FE',
    fontWeight: '500',
  },
  notificationButton: {
    position: 'relative',
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationCount: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  statTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statTrendText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#10B981',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  bottomSpacing: {
    height: 32,
  },
});