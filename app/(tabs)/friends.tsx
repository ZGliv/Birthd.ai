import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Search, UserPlus, Calendar, Gift, Filter, Users, Star, MapPin, Phone, Mail } from 'lucide-react-native';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';

export default function FriendsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const friends = [
    {
      id: 1,
      name: 'Sarah Johnson',
      birthday: 'March 12',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      daysUntil: 0,
      status: 'today',
      age: 28,
      location: 'San Francisco, CA',
      mutualFriends: 12,
      relationship: 'Close Friend',
      interests: ['Photography', 'Travel'],
      lastActive: '2 hours ago',
      phone: '+1 (555) 123-4567',
      email: 'sarah.j@email.com',
    },
    {
      id: 2,
      name: 'Mike Chen',
      birthday: 'March 15',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      daysUntil: 3,
      status: 'upcoming',
      age: 32,
      location: 'New York, NY',
      mutualFriends: 8,
      relationship: 'Colleague',
      interests: ['Tech', 'Gaming'],
      lastActive: '1 day ago',
      phone: '+1 (555) 987-6543',
      email: 'mike.chen@email.com',
    },
    {
      id: 3,
      name: 'Emma Davis',
      birthday: 'March 18',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      daysUntil: 6,
      status: 'upcoming',
      age: 25,
      location: 'Los Angeles, CA',
      mutualFriends: 15,
      relationship: 'Best Friend',
      interests: ['Art', 'Music'],
      lastActive: '5 minutes ago',
      phone: '+1 (555) 456-7890',
      email: 'emma.davis@email.com',
    },
    {
      id: 4,
      name: 'Alex Rodriguez',
      birthday: 'April 22',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
      daysUntil: 42,
      status: 'normal',
      age: 29,
      location: 'Chicago, IL',
      mutualFriends: 6,
      relationship: 'Friend',
      interests: ['Sports', 'Music'],
      lastActive: '3 hours ago',
      phone: '+1 (555) 321-0987',
      email: 'alex.r@email.com',
    },
    {
      id: 5,
      name: 'Lisa Wang',
      birthday: 'May 8',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg',
      daysUntil: 58,
      status: 'normal',
      age: 31,
      location: 'Seattle, WA',
      mutualFriends: 9,
      relationship: 'Close Friend',
      interests: ['Science', 'Hiking'],
      lastActive: '30 minutes ago',
      phone: '+1 (555) 654-3210',
      email: 'lisa.wang@email.com',
    },
  ];

  const pendingRequests = [
    {
      id: 1,
      name: 'John Smith',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
      mutualFriends: 3,
      location: 'Boston, MA',
      commonInterests: ['Photography', 'Travel'],
    },
    {
      id: 2,
      name: 'Maria Garcia',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
      mutualFriends: 5,
      location: 'Miami, FL',
      commonInterests: ['Art', 'Cooking'],
    },
  ];

  const filters = [
    { id: 'all', label: 'All Friends', count: friends.length },
    { id: 'today', label: 'Birthday Today', count: friends.filter(f => f.status === 'today').length },
    { id: 'upcoming', label: 'Upcoming', count: friends.filter(f => f.status === 'upcoming').length },
    { id: 'close', label: 'Close Friends', count: friends.filter(f => f.relationship === 'Close Friend' || f.relationship === 'Best Friend').length },
  ];

  const filteredFriends = friends.filter(friend => {
    const matchesSearch = friend.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' ||
      (selectedFilter === 'today' && friend.status === 'today') ||
      (selectedFilter === 'upcoming' && friend.status === 'upcoming') ||
      (selectedFilter === 'close' && (friend.relationship === 'Close Friend' || friend.relationship === 'Best Friend'));
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'today': return '#EF4444';
      case 'upcoming': return '#F59E0B';
      default: return '#10B981';
    }
  };

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'Best Friend': return '#EC4899';
      case 'Close Friend': return '#8B5CF6';
      case 'Colleague': return '#06B6D4';
      default: return '#6B7280';
    }
  };

  const renderFriendCard = ({ item: friend }: { item: typeof friends[0] }) => (
    <Card variant="elevated" style={styles.friendCard}>
      <TouchableOpacity activeOpacity={0.95}>
        <LinearGradient
          colors={['#FFFFFF', '#FAFBFC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.friendGradient}
        >
          <View style={styles.friendHeader}>
            <Avatar
              source={friend.avatar}
              name={friend.name}
              size="large"
              showOnlineIndicator={friend.lastActive.includes('minutes')}
            />
            <View style={styles.friendInfo}>
              <View style={styles.friendNameRow}>
                <Text style={styles.friendName}>{friend.name}</Text>
                <Badge
                  variant={friend.relationship === 'Best Friend' ? 'error' : friend.relationship === 'Close Friend' ? 'info' : 'default'}
                  size="small"
                >
                  {friend.relationship}
                </Badge>
              </View>
              
              <View style={styles.birthdayInfo}>
                <Calendar size={14} color="#6B7280" />
                <Text style={styles.birthdayText}>
                  {friend.birthday} • {friend.daysUntil === 0 ? 'Today!' : `${friend.daysUntil} days`}
                </Text>
                {friend.age && (
                  <Text style={styles.ageText}>({friend.age})</Text>
                )}
              </View>

              <View style={styles.locationInfo}>
                <MapPin size={12} color="#6B7280" />
                <Text style={styles.locationText}>{friend.location}</Text>
              </View>
            </View>
            
            <View style={styles.friendActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Phone size={16} color="#8B5CF6" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Mail size={16} color="#8B5CF6" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.friendDetails}>
            <View style={styles.detailRow}>
              <Users size={14} color="#6B7280" />
              <Text style={styles.detailText}>{friend.mutualFriends} mutual friends</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.lastActiveText}>Active {friend.lastActive}</Text>
            </View>
          </View>

          {friend.interests && friend.interests.length > 0 && (
            <View style={styles.interests}>
              {friend.interests.map((interest, index) => (
                <Badge key={index} variant="info" size="small">
                  {interest}
                </Badge>
              ))}
            </View>
          )}

          <View style={styles.friendCardActions}>
            <Button
              title="Send Gift"
              variant="outline"
              size="small"
              icon={<Gift size={16} color="#8B5CF6" />}
              onPress={() => {}}
              style={styles.giftButton}
            />
            <Button
              title="Plan Celebration"
              size="small"
              icon={<Calendar size={16} color="#FFFFFF" />}
              onPress={() => {}}
              style={styles.celebrateButton}
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#8B5CF6', '#7C3AED']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <BlurView intensity={20} style={styles.headerBlur}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Friends</Text>
              <Text style={styles.subtitle}>{friends.length} connections</Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <UserPlus size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </BlurView>
      </LinearGradient>

      {/* Search and Filters */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search friends..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#8B5CF6" />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                selectedFilter === filter.id && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === filter.id && styles.filterChipTextActive,
                ]}
              >
                {filter.label} ({filter.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Friend Requests */}
      {pendingRequests.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Friend Requests ({pendingRequests.length})</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {pendingRequests.map((request) => (
              <Card key={request.id} variant="outlined" style={styles.requestCard}>
                <Avatar source={request.avatar} name={request.name} size="medium" />
                <Text style={styles.requestName}>{request.name}</Text>
                <Text style={styles.requestLocation}>{request.location}</Text>
                <Text style={styles.mutualFriends}>{request.mutualFriends} mutual</Text>
                
                <View style={styles.commonInterests}>
                  {request.commonInterests.slice(0, 2).map((interest, index) => (
                    <Badge key={index} variant="info" size="small">
                      {interest}
                    </Badge>
                  ))}
                </View>

                <View style={styles.requestActions}>
                  <Button
                    title="Accept"
                    size="small"
                    onPress={() => {}}
                    style={styles.acceptButton}
                  />
                  <Button
                    title="Decline"
                    variant="outline"
                    size="small"
                    onPress={() => {}}
                    style={styles.declineButton}
                  />
                </View>
              </Card>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Friends List */}
      <View style={styles.friendsList}>
        <FlatList
          data={filteredFriends}
          renderItem={renderFriendCard}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.friendsListContent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerGradient: {
    marginBottom: 20,
  },
  headerBlur: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#E0E7FF',
    marginTop: 4,
  },
  addButton: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  filterButton: {
    padding: 4,
  },
  filtersScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 12,
  },
  filterChipActive: {
    backgroundColor: '#8B5CF6',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  requestCard: {
    width: 180,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
  },
  requestName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 12,
    textAlign: 'center',
  },
  requestLocation: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  mutualFriends: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '600',
    marginTop: 8,
  },
  commonInterests: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 8,
    marginBottom: 16,
  },
  requestActions: {
    width: '100%',
    gap: 8,
  },
  acceptButton: {
    width: '100%',
  },
  declineButton: {
    width: '100%',
  },
  friendsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  friendsListContent: {
    paddingBottom: 32,
  },
  friendCard: {
    marginBottom: 16,
    overflow: 'hidden',
  },
  friendGradient: {
    padding: 20,
  },
  friendHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  friendInfo: {
    flex: 1,
    marginLeft: 16,
  },
  friendNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  friendName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  birthdayInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  birthdayText: {
    fontSize: 14,
    color: '#6B7280',
  },
  ageText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#6B7280',
  },
  friendActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
  },
  friendDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
  },
  lastActiveText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  interests: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  friendCardActions: {
    flexDirection: 'row',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 16,
  },
  giftButton: {
    flex: 1,
  },
  celebrateButton: {
    flex: 2,
  },
});