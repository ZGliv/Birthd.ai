import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ExternalLink, Heart, Share, TrendingDown, TrendingUp } from 'lucide-react-native';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

interface WishlistItemProps {
  item: {
    id: number;
    name: string;
    price: string;
    originalPrice?: string;
    image: string;
    store: string;
    priority: 'high' | 'medium' | 'low';
    addedBy: string;
    priceHistory?: {
      trend: 'up' | 'down' | 'stable';
      percentage: number;
    };
    inStock: boolean;
    category: string;
    rating?: number;
    reviews?: number;
  };
  onPress: () => void;
  onToggleFavorite: () => void;
  onShare: () => void;
  isFavorited?: boolean;
}

export function WishlistItem({
  item,
  onPress,
  onToggleFavorite,
  onShare,
  isFavorited = false,
}: WishlistItemProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getPriorityBg = (priority: string) => {
    switch (priority) {
      case 'high': return '#FEF2F2';
      case 'medium': return '#FFFBEB';
      case 'low': return '#F0FDF4';
      default: return '#F9FAFB';
    }
  };

  const hasDiscount = item.originalPrice && item.originalPrice !== item.price;
  const discountPercentage = hasDiscount
    ? Math.round(((parseFloat(item.originalPrice!.replace('$', '')) - parseFloat(item.price.replace('$', ''))) / parseFloat(item.originalPrice!.replace('$', ''))) * 100)
    : 0;

  return (
    <Card variant="elevated" style={styles.container}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.95}>
        <View style={styles.content}>
          {/* Image Section */}
          <View style={styles.imageContainer}>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imageEmoji}>{item.image}</Text>
            </View>
            
            {hasDiscount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
              </View>
            )}
            
            {!item.inStock && (
              <View style={styles.outOfStockBadge}>
                <Text style={styles.outOfStockText}>Out of Stock</Text>
              </View>
            )}
          </View>

          {/* Content Section */}
          <View style={styles.info}>
            <View style={styles.header}>
              <View style={styles.titleSection}>
                <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                <Badge variant="info" size="small">{item.category}</Badge>
              </View>
              
              <View style={styles.actions}>
                <TouchableOpacity onPress={onToggleFavorite} style={styles.actionButton}>
                  <Heart
                    size={16}
                    color={isFavorited ? '#EF4444' : '#6B7280'}
                    fill={isFavorited ? '#EF4444' : 'transparent'}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={onShare} style={styles.actionButton}>
                  <Share size={16} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Price Section */}
            <View style={styles.priceSection}>
              <View style={styles.priceContainer}>
                <Text style={styles.currentPrice}>{item.price}</Text>
                {hasDiscount && (
                  <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                )}
              </View>
              
              {item.priceHistory && (
                <View style={styles.priceHistory}>
                  {item.priceHistory.trend === 'down' ? (
                    <TrendingDown size={14} color="#10B981" />
                  ) : (
                    <TrendingUp size={14} color="#EF4444" />
                  )}
                  <Text
                    style={[
                      styles.priceHistoryText,
                      { color: item.priceHistory.trend === 'down' ? '#10B981' : '#EF4444' }
                    ]}
                  >
                    {item.priceHistory.percentage}%
                  </Text>
                </View>
              )}
            </View>

            {/* Details Section */}
            <View style={styles.details}>
              <View style={styles.detailRow}>
                <Text style={styles.store}>{item.store}</Text>
                <View style={[styles.priorityBadge, { backgroundColor: getPriorityBg(item.priority) }]}>
                  <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
                    {item.priority} priority
                  </Text>
                </View>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.addedBy}>Added by {item.addedBy}</Text>
                {item.rating && (
                  <View style={styles.rating}>
                    <Text style={styles.ratingText}>★ {item.rating}</Text>
                    {item.reviews && (
                      <Text style={styles.reviewsText}>({item.reviews})</Text>
                    )}
                  </View>
                )}
              </View>
            </View>

            {/* Action Button */}
            <TouchableOpacity style={styles.viewButton}>
              <LinearGradient
                colors={['#8B5CF6', '#7C3AED']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.viewButtonGradient}
              >
                <ExternalLink size={16} color="#FFFFFF" />
                <Text style={styles.viewButtonText}>View Item</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    padding: 16,
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginRight: 16,
    position: 'relative',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageEmoji: {
    fontSize: 40,
  },
  discountBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  discountText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  outOfStockBadge: {
    position: 'absolute',
    bottom: -4,
    left: -4,
    backgroundColor: '#6B7280',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  outOfStockText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  info: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleSection: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 4,
  },
  actionButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#F8FAFC',
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  originalPrice: {
    fontSize: 14,
    color: '#6B7280',
    textDecorationLine: 'line-through',
  },
  priceHistory: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  priceHistoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  details: {
    marginBottom: 16,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  store: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  addedBy: {
    fontSize: 12,
    color: '#6B7280',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
  },
  reviewsText: {
    fontSize: 12,
    color: '#6B7280',
  },
  viewButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  viewButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});