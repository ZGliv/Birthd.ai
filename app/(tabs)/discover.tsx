import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MapPin, Filter, Star, Clock, DollarSign, Users, Calendar, Navigation, Heart, Share } from 'lucide-react-native';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';

export default function DiscoverScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('recommended');

  const categories = [
    { id: 'all', name: 'All', icon: '🎯', color: '#8B5CF6' },
    { id: 'restaurants', name: 'Restaurants', icon: '🍽️', color: '#EF4444' },
    { id: 'events', name: 'Events', icon: '🎉', color: '#F59E0B' },
    { id: 'activities', name: 'Activities', icon: '🎮', color: '#10B981' },
    { id: 'venues', name: 'Venues', icon: '🏢', color: '#06B6D4' },
    { id: 'entertainment', name: 'Shows', icon: '🎭', color: '#EC4899' },
  ];

  const filters = [
    { id: 'recommended', label: 'Recommended' },
    { id: 'nearby', label: 'Nearby' },
    { id: 'popular', label: 'Popular' },
    { id: 'budget', label: 'Budget-Friendly' },
    { id: 'premium', label: 'Premium' },
  ];

  const recommendations = [
    {
      id: 1,
      name: 'The Rooftop Lounge',
      category: 'Restaurant',
      rating: 4.8,
      reviews: 324,
      price: '$$$',
      distance: '0.5 miles',
      image: '🏙️',
      description: 'Stunning city views with craft cocktails and modern cuisine',
      tags: ['Romantic', 'City Views', 'Cocktails'],
      openNow: true,
      estimatedWait: '15-20 min',
      priceRange: '$40-80 per person',
      features: ['Outdoor Seating', 'Live Music', 'Valet Parking'],
      photos: ['https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg'],
    },
    {
      id: 2,
      name: 'Escape Room Adventure',
      category: 'Activity',
      rating: 4.6,
      reviews: 156,
      price: '$$',
      distance: '1.2 miles',
      image: '🔍',
      description: 'Immersive escape room experiences for groups',
      tags: ['Team Building', 'Puzzle', 'Group Activity'],
      openNow: true,
      estimatedWait: 'Book ahead',
      priceRange: '$25-35 per person',
      features: ['Group Discounts', 'Multiple Themes', 'Photo Ops'],
      photos: ['https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'],
    },
    {
      id: 3,
      name: 'Jazz & Blues Night',
      category: 'Event',
      rating: 4.9,
      reviews: 89,
      price: '$',
      distance: '2.1 miles',
      image: '🎵',
      description: 'Live jazz performances every Friday night',
      tags: ['Live Music', 'Jazz', 'Intimate Setting'],
      openNow: false,
      estimatedWait: 'Starts 8 PM',
      priceRange: '$15-25 cover charge',
      features: ['Live Band', 'Full Bar', 'Reserved Seating'],
      photos: ['https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'],
    },
    {
      id: 4,
      name: 'Bowling Alley & Bar',
      category: 'Venue',
      rating: 4.4,
      reviews: 267,
      price: '$$',
      distance: '0.8 miles',
      image: '🎳',
      description: 'Modern bowling with craft beer and arcade games',
      tags: ['Bowling', 'Arcade', 'Sports Bar'],
      openNow: true,
      estimatedWait: '10-15 min',
      priceRange: '$20-40 per person',
      features: ['Arcade Games', 'Food Menu', 'Group Packages'],
      photos: ['https://images.pexels.com/photos/4792382/pexels-photo-4792382.jpeg'],
    },
    {
      id: 5,
      name: 'Artisan Coffee & Gallery',
      category: 'Restaurant',
      rating: 4.7,
      reviews: 198,
      price: '$',
      distance: '0.3 miles',
      image: '☕',
      description: 'Specialty coffee with rotating local art exhibitions',
      tags: ['Coffee', 'Art', 'Quiet', 'WiFi'],
      openNow: true,
      estimatedWait: 'No wait',
      priceRange: '$5-15 per person',
      features: ['Art Gallery', 'WiFi', 'Outdoor Seating'],
      photos: ['https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg'],
    },
    {
      id: 6,
      name: 'Comedy Club Downtown',
      category: 'Entertainment',
      rating: 4.5,
      reviews: 142,
      price: '$$',
      distance: '1.8 miles',
      image: '😂',
      description: 'Stand-up comedy shows with local and touring comedians',
      tags: ['Comedy', 'Entertainment', 'Date Night'],
      openNow: false,
      estimatedWait: 'Show at 9 PM',
      priceRange: '$20-35 per person',
      features: ['Two-Drink Minimum', 'Reserved Seating', 'Food Menu'],
      photos: ['https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg'],
    },
  ];

  const filteredRecommendations = recommendations.filter(place => {
    if (selectedCategory === 'all') return true;
    return place.category.toLowerCase() === selectedCategory;
  });

  const renderRecommendationCard = ({ item: place }: { item: typeof recommendations[0] }) => (
    <Card variant="elevated" style={styles.placeCard}>
      <TouchableOpacity activeOpacity={0.95}>
        <LinearGradient
          colors={['#FFFFFF', '#FAFBFC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.placeGradient}
        >
          {/* Header */}
          <View style={styles.placeHeader}>
            <View style={styles.placeImageContainer}>
              <Text style={styles.placeImage}>{place.image}</Text>
              {place.openNow && (
                <View style={styles.openBadge}>
                  <Text style={styles.openText}>OPEN</Text>
                </View>
              )}
            </View>
            
            <View style={styles.placeInfo}>
              <View style={styles.placeTitleRow}>
                <Text style={styles.placeName} numberOfLines={1}>{place.name}</Text>
                <View style={styles.placeActions}>
                  <TouchableOpacity style={styles.actionIcon}>
                    <Heart size={16} color="#6B7280" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionIcon}>
                    <Share size={16} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.ratingRow}>
                <View style={styles.ratingContainer}>
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.rating}>{place.rating}</Text>
                  <Text style={styles.reviews}>({place.reviews})</Text>
                </View>
                <Badge variant="info" size="small">{place.category}</Badge>
              </View>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.placeDescription}>{place.description}</Text>

          {/* Tags */}
          <View style={styles.tags}>
            {place.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="default" size="small">
                {tag}
              </Badge>
            ))}
          </View>

          {/* Details */}
          <View style={styles.placeDetails}>
            <View style={styles.detailItem}>
              <DollarSign size={14} color="#6B7280" />
              <Text style={styles.detailText}>{place.priceRange}</Text>
            </View>
            <View style={styles.detailItem}>
              <MapPin size={14} color="#6B7280" />
              <Text style={styles.detailText}>{place.distance}</Text>
            </View>
            <View style={styles.detailItem}>
              <Clock size={14} color="#6B7280" />
              <Text style={styles.detailText}>{place.estimatedWait}</Text>
            </View>
          </View>

          {/* Features */}
          <View style={styles.features}>
            {place.features.slice(0, 3).map((feature, index) => (
              <Text key={index} style={styles.feature}>• {feature}</Text>
            ))}
          </View>

          {/* Actions */}
          <View style={styles.cardActions}>
            <Button
              title="Get Directions"
              variant="outline"
              size="small"
              icon={<Navigation size={16} color="#8B5CF6" />}
              onPress={() => {}}
              style={styles.directionsButton}
            />
            <Button
              title="Book Now"
              size="small"
              icon={<Calendar size={16} color="#FFFFFF" />}
              onPress={() => {}}
              style={styles.bookButton}
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
        colors={['#8B5CF6', '#7C3AED', '#6366F1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <BlurView intensity={20} style={styles.headerBlur}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Discover</Text>
              <Text style={styles.subtitle}>Perfect places to celebrate</Text>
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Location */}
          <View style={styles.locationContainer}>
            <MapPin size={16} color="#E0E7FF" />
            <Text style={styles.locationText}>San Francisco, CA</Text>
            <TouchableOpacity>
              <Text style={styles.changeLocation}>Change</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.categoryCardActive,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <View style={[
                  styles.categoryIcon,
                  { backgroundColor: selectedCategory === category.id ? category.color : `${category.color}20` }
                ]}>
                  <Text style={styles.categoryEmoji}>{category.icon}</Text>
                </View>
                <Text style={[
                  styles.categoryName,
                  selectedCategory === category.id && styles.categoryNameActive,
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Filters */}
        <View style={styles.filtersSection}>
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
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recommendations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'all' ? 'All Recommendations' : `${categories.find(c => c.id === selectedCategory)?.name} Recommendations`}
            </Text>
            <Text style={styles.resultCount}>{filteredRecommendations.length} places</Text>
          </View>
          
          <FlatList
            data={filteredRecommendations}
            renderItem={renderRecommendationCard}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            contentContainerStyle={styles.recommendationsContent}
          />
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
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E7FF',
    marginTop: 4,
  },
  filterButton: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    flex: 1,
  },
  changeLocation: {
    fontSize: 14,
    color: '#C7D2FE',
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  resultCount: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  categoriesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
    paddingVertical: 8,
  },
  categoryCardActive: {
    transform: [{ scale: 1.05 }],
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textAlign: 'center',
  },
  categoryNameActive: {
    color: '#8B5CF6',
  },
  filtersSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
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
  recommendationsContent: {
    gap: 16,
  },
  placeCard: {
    overflow: 'hidden',
  },
  placeGradient: {
    padding: 20,
  },
  placeHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  placeImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    position: 'relative',
  },
  placeImage: {
    fontSize: 32,
  },
  openBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#10B981',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  openText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  placeInfo: {
    flex: 1,
  },
  placeTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  placeName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  placeActions: {
    flexDirection: 'row',
    gap: 4,
  },
  actionIcon: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#F8FAFC',
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  reviews: {
    fontSize: 12,
    color: '#6B7280',
  },
  placeDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  placeDetails: {
    marginBottom: 12,
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  features: {
    marginBottom: 20,
  },
  feature: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 16,
  },
  directionsButton: {
    flex: 1,
  },
  bookButton: {
    flex: 2,
  },
  bottomSpacing: {
    height: 32,
  },
});