import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AvatarProps {
  source?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  style?: ViewStyle;
  showOnlineIndicator?: boolean;
  gradient?: boolean;
}

export function Avatar({
  source,
  name,
  size = 'medium',
  style,
  showOnlineIndicator = false,
  gradient = false,
}: AvatarProps) {
  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeStyles = {
    small: { width: 32, height: 32, borderRadius: 16 },
    medium: { width: 48, height: 48, borderRadius: 24 },
    large: { width: 64, height: 64, borderRadius: 32 },
    xlarge: { width: 96, height: 96, borderRadius: 48 },
  };

  const textSizes = {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 28,
  };

  const containerStyle = [sizeStyles[size], style];

  if (source) {
    return (
      <View style={[styles.container, containerStyle]}>
        <Image source={{ uri: source }} style={[styles.image, sizeStyles[size]]} />
        {showOnlineIndicator && <View style={[styles.onlineIndicator, styles[`${size}Indicator`]]} />}
      </View>
    );
  }

  if (gradient) {
    return (
      <View style={[styles.container, containerStyle]}>
        <LinearGradient
          colors={['#8B5CF6', '#EC4899', '#F59E0B']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, sizeStyles[size]]}
        >
          <Text style={[styles.initials, { fontSize: textSizes[size], color: '#FFFFFF' }]}>
            {getInitials(name)}
          </Text>
        </LinearGradient>
        {showOnlineIndicator && <View style={[styles.onlineIndicator, styles[`${size}Indicator`]]} />}
      </View>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.placeholder, sizeStyles[size]]}>
        <Text style={[styles.initials, { fontSize: textSizes[size] }]}>
          {getInitials(name)}
        </Text>
      </View>
      {showOnlineIndicator && <View style={[styles.onlineIndicator, styles[`${size}Indicator`]]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    resizeMode: 'cover',
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontWeight: '600',
    color: '#6B7280',
  },
  onlineIndicator: {
    position: 'absolute',
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  smallIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    bottom: -1,
    right: -1,
  },
  mediumIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    bottom: -2,
    right: -2,
  },
  largeIndicator: {
    width: 18,
    height: 18,
    borderRadius: 9,
    bottom: -2,
    right: -2,
  },
  xlargeIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    bottom: -3,
    right: -3,
  },
});