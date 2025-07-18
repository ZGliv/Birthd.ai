import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Plus, Search, Share, TrendingDown, TrendingUp, Filter, ShoppingBag, DollarSign, Users } from 'lucide-react-native';
import { WishlistItem } from '../../components/WishlistItem';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export default function WishlistScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const wishlistItems = [
    {
      id: 1,
      name: 'Sony WH-1000XM4 Wireless Headphones',
      price: '$199.99',
      originalPrice: '$249.99',
      image: '🎧',
      store: 'Amazon',
      priority: 'high' as const,
      addedBy: 'You',
      priceHistory: { trend: 'down' as const, percentage: 20 },
      inStock: true,
      category: 'Electronics',
      rating: 4.8,
      reviews: 1247,
    },
    {
      id: 2,
      name: 'Breville Bambino Plus Coffee Maker',
      price: '$89.99',
      originalPrice: '$89.99',
      image: '☕',
      store: 'Target',
      priority: 'medium' as const,
      addedBy: 'Sarah',
      priceHistory: { trend: 'stable' as const, percentage: 0 },
      inStock: true,
      category: 'Kitchen',
      rating: 4.6,
      reviews: 892,
    },
    {
      id: 3,
      name: 'Nike Air Max 270 Running Shoes',
      price: '$129.99',
      originalPrice: '$159.99',
      image: '👟',
      store: 'Nike',
      priority: 'low' as const,
      addedBy: 'You',
      priceHistory: { trend: 'down' as const, percentage: 19 },
      inStock: false,
      category: 'Fashion',
      rating: 4.5,
      reviews: 2156,
    },
    {
      id: 4,
      name: 'Apple Watch Series 9',
      price: '$299.99',
      originalPrice: '$299.99',
      image: '⌚',
      store: 'Apple',
      priority: 'high' as const,
      addedBy: 'Mike',
      priceHistory: { trend: 'up' as const, percentage: 5 },
      inStock: true,
      category: 'Electronics',
      rating: 4.9,
      reviews: 3421,
    },
    {
      id: 5,
      name: 'Instant Pot Duo 7-in-1 Pressure Cooker',
      price: '$79.99',
      originalPrice: '$99.99',
      image: '🍲',
      store: 'Williams Sonoma',
      priority: 'medium' as const,
      addedBy: 'Emma',
      priceHistory: { trend: 'down' as const, percentage: 20 },
      inStock: true,
      category: 'Kitchen',
      rating: 4.7,
      reviews: 1876,
    },
    {
      id: 6,
      name: 'Kindle Paperwhite E-reader',
      price: '$139.99',
      originalPrice: '$139.99',
      image: '📚',
      store: 'Amazon',
      priority: 'low' as const,
      addedBy: 'You',
      priceHistory: { trend: 'stable' as const, percentage: 0 },
      inStock: true,
      category: 'Books',
      rating: 4.6,
      reviews: 987,
    },
  ];

  const filters = [
    { id: 'all', label: 'All Items', count: wishlistItems.length },
    { id: 'high', label: 'High Priority', count: wishlistItems.filter(item => item.priority === 'high').length },
    { id: 'sale', label: 'On Sale', count: wishlistItems.filter(item => item.originalPrice !== item.price).length },
    { id: 'trending', label: 'Price Drops', count: wishlistItems.filter(item => item.priceHistory?.trend === 'down').length },
  ];

  const categories = [
    { id: 'electronics', name: 'Electronics', icon: '📱', count: 2 },
    { id: 'kitchen', name: 'Kitchen', icon: '🍳', count: 2 },
    { id: 'fashion', name: 'Fashion', icon: '👕', count: 1 },
    { id: 'books', name: 'Books', icon: '📚', count: 1 },
  ];

  const filteredItems = wishlistItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' ||
      (selectedFilter === 'high' && item.priority === 'high') ||
      (selectedFilter === 'sale' && item.originalPrice !== item.price) ||
      (selectedFilter === 'trending' && item.priceHistory?.trend === 'down');
    
    return matchesSearch && matchesFilter;
  });

  const totalValue = wishlistItems.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);
  const totalSavings = wishlistItems.reduce((sum, item) => {
    if (item.originalPrice && item.originalPrice !== item.price) {
      return sum + (parseFloat(item.originalPrice.replace('$', '')) - parseFloat(item.price.replace('$', '')));
    }
    return sum;
  }, 0);
  const priceDrops = wishlistItems.filter(item => item.priceHistory?.trend === 'down').length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#8B5CF6', '#7C3AED', '#EC4899']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <BlurView intensity={20} style={styles.headerBlur}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Wishlist</Text>
              <Text style={styles.subtitle}>Track your birthday wishes</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerButton}>
                <Share size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Plus size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <Card variant="elevated" style={styles.statCard}>
            <LinearGradient
              colors={['#FFFFFF', '#F8FAFC']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statGradient}
            >
              <ShoppingBag size={24} color="#8B5CF6" />
              <Text style={styles.statNumber}>{wishlistItems.length}</Text>
              <Text style={styles.statLabel}>Total Items</Text>
            </LinearGradient>
          </Card>
          
          <Card variant="elevated" style={styles.statCard}>
            <LinearGradient
              colors={['#FFFFFF', '#F8FAFC']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statGradient}
            >
              <TrendingDown size={24} color="#10B981" />
              <Text style={styles.statNumber}>{priceDrops}</Text>
              <Text style={styles.statLabel}>Price Drops</Text>
            </LinearGradient>
          </Card>
          
          <Card variant="elevated" style={styles.statCard}>
            <LinearGradient
              colors={['#FFFFFF', '#F8FAFC']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statGradient}
            >
              <DollarSign size={24} color="#F59E0B" />
              <Text style={styles.statNumber}>${totalValue.toFixed(0)}</Text>
              <Text style={styles.statLabel}>Total Value</Text>
            </LinearGradient>
          </Card>
        </View>

        {/* Savings Banner */}
        {totalSavings > 0 && (
          <Card variant="elevated" style={styles.savingsBanner}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.savingsGradient}
            >
              <View style={styles.savingsContent}>
                <TrendingDown size={24} color="#FFFFFF" />
                <View style={styles.savingsText}>
                  <Text style={styles.savingsTitle}>You're saving ${totalSavings.toFixed(2)}!</Text>
                  <Text style={styles.savingsSubtitle}>Great deals on your wishlist items</Text>
                </View>
              </View>
            </LinearGradient>
          </Card>
        )}

        {/* Search and Filters */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search wishlist items..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.filterIconButton}>
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

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map((category) => (
              <Card key={category.id} variant="outlined" style={styles.categoryCard}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Badge variant="info" size="small">{category.count}</Badge>
              </Card>
            ))}
          </ScrollView>
        </View>

        {/* Wishlist Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedFilter === 'all' ? 'All Items' : filters.find(f => f.id === selectedFilter)?.label}
            </Text>
            <Text style={styles.itemCount}>{filteredItems.length} items</Text>
          </View>
          
          <FlatList
            data={filteredItems}
            renderItem={({ item }) => (
              <WishlistItem
                item={item}
                onPress={() => console.log('View item', item.name)}
                onToggleFavorite={() => console.log('Toggle favorite', item.name)}
                onShare={() => console.log('Share item', item.name)}
                isFavorited={item.priority === 'high'}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            contentContainerStyle={styles.wishlistContent}
          />
        </View>

        {/* Add Item CTA */}
        <View style={styles.ctaSection}>
          <Card variant="elevated" style={styles.ctaCard}>
            <LinearGradient
              colors={['#8B5CF6', '#7C3AED']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.ctaGradient}
            >
              <Text style={styles.ctaTitle}>Add New Item</Text>
              <Text style={styles.ctaSubtitle}>
                Paste a link or add manually to track prices
              </Text>
              <Button
                title="Add Item"
                variant="secondary"
                icon={<Plus size={20} color="#8B5CF6" />}
                onPress={() => {}}
                style={styles.ctaButton}
              />
            </LinearGradient>
          </Card>
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
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  savingsBanner: {
    marginHorizontal: 20,
    marginBottom: 24,
    overflow: 'hidden',
  },
  savingsGradient: {
    padding: 20,
  },
  savingsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  savingsText: {
    flex: 1,
  },
  savingsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  savingsSubtitle: {
    fontSize: 14,
    color: '#D1FAE5',
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
  filterIconButton: {
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
  itemCount: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  categoriesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  categoryCard: {
    width: 100,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  wishlistContent: {
    gap: 0,
  },
  ctaSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  ctaCard: {
    overflow: 'hidden',
  },
  ctaGradient: {
    padding: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: '#E0E7FF',
    textAlign: 'center',
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#FFFFFF',
  },
  bottomSpacing: {
    height: 32,
  },
});