import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Settings, CreditCard as Edit, Calendar, Users, Gift, Bell, Shield, CircleHelp as HelpCircle, LogOut, Crown, Star, Award, Camera, Phone, Mail, MapPin, Cake, Heart } from 'lucide-react-native';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);

  const userProfile = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    birthday: 'March 15, 1995',
    location: 'San Francisco, CA',
    joinDate: 'January 2023',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
    isPremium: true,
    bio: 'Love celebrating life\'s special moments with friends and family! 🎉',
    interests: ['Photography', 'Travel', 'Cooking', 'Music'],
  };

  const stats = [
    { label: 'Friends', value: '127', icon: Users, color: '#8B5CF6', trend: '+5 this month' },
    { label: 'Events Hosted', value: '23', icon: Calendar, color: '#10B981', trend: '+3 this month' },
    { label: 'Gifts Given', value: '45', icon: Gift, color: '#F59E0B', trend: '+2 this week' },
    { label: 'Celebrations', value: '89', icon: Cake, color: '#EC4899', trend: '+7 this year' },
  ];

  const achievements = [
    { id: 1, title: 'Party Planner', description: 'Organized 10+ events', icon: '🎉', unlocked: true },
    { id: 2, title: 'Gift Giver', description: 'Sent 25+ gifts', icon: '🎁', unlocked: true },
    { id: 3, title: 'Social Butterfly', description: '100+ friends', icon: '🦋', unlocked: true },
    { id: 4, title: 'Memory Maker', description: 'Shared 50+ photos', icon: '📸', unlocked: false },
  ];

  const menuSections = [
    {
      title: 'Account',
      items: [
        { id: 1, title: 'Edit Profile', icon: Edit, color: '#8B5CF6', badge: null },
        { id: 2, title: 'Privacy Settings', icon: Shield, color: '#10B981', badge: null },
        { id: 3, title: 'Notification Preferences', icon: Bell, color: '#F59E0B', badge: '3' },
      ],
    },
    {
      title: 'Premium',
      items: [
        { id: 4, title: 'Premium Features', icon: Crown, color: '#EC4899', badge: 'PRO' },
        { id: 5, title: 'Billing & Subscription', icon: Star, color: '#8B5CF6', badge: null },
      ],
    },
    {
      title: 'Support',
      items: [
        { id: 6, title: 'Help Center', icon: HelpCircle, color: '#6366F1', badge: null },
        { id: 7, title: 'Contact Support', icon: Phone, color: '#06B6D4', badge: null },
        { id: 8, title: 'App Settings', icon: Settings, color: '#6B7280', badge: null },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#8B5CF6', '#7C3AED', '#EC4899']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <BlurView intensity={20} style={styles.headerBlur}>
            <View style={styles.header}>
              <Text style={styles.title}>Profile</Text>
              <TouchableOpacity style={styles.settingsButton}>
                <Settings size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </BlurView>
        </LinearGradient>

        {/* Profile Section */}
        <Card variant="elevated" style={styles.profileCard}>
          <LinearGradient
            colors={['#FFFFFF', '#FAFBFC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileGradient}
          >
            <View style={styles.profileHeader}>
              <View style={styles.avatarSection}>
                <Avatar
                  source={userProfile.avatar}
                  name={userProfile.name}
                  size="xlarge"
                  gradient={true}
                />
                <TouchableOpacity style={styles.editAvatarButton}>
                  <Camera size={16} color="#FFFFFF" />
                </TouchableOpacity>
                {userProfile.isPremium && (
                  <View style={styles.premiumBadge}>
                    <Crown size={12} color="#FFFFFF" />
                  </View>
                )}
              </View>
              
              <View style={styles.profileInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.userName}>{userProfile.name}</Text>
                  {userProfile.isPremium && (
                    <Badge variant="warning" size="small">Premium</Badge>
                  )}
                </View>
                
                <Text style={styles.userBio}>{userProfile.bio}</Text>
                
                <View style={styles.contactInfo}>
                  <View style={styles.contactItem}>
                    <Mail size={14} color="#6B7280" />
                    <Text style={styles.contactText}>{userProfile.email}</Text>
                  </View>
                  <View style={styles.contactItem}>
                    <Phone size={14} color="#6B7280" />
                    <Text style={styles.contactText}>{userProfile.phone}</Text>
                  </View>
                  <View style={styles.contactItem}>
                    <MapPin size={14} color="#6B7280" />
                    <Text style={styles.contactText}>{userProfile.location}</Text>
                  </View>
                  <View style={styles.contactItem}>
                    <Calendar size={14} color="#6B7280" />
                    <Text style={styles.contactText}>{userProfile.birthday}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Interests */}
            <View style={styles.interests}>
              <Text style={styles.interestsTitle}>Interests</Text>
              <View style={styles.interestsTags}>
                {userProfile.interests.map((interest, index) => (
                  <Badge key={index} variant="info" size="small">
                    {interest}
                  </Badge>
                ))}
              </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <Button
                title="Edit Profile"
                variant="outline"
                size="small"
                icon={<Edit size={16} color="#8B5CF6" />}
                onPress={() => {}}
                style={styles.quickActionButton}
              />
              <Button
                title="Share Profile"
                size="small"
                icon={<Heart size={16} color="#FFFFFF" />}
                onPress={() => {}}
                style={styles.quickActionButton}
              />
            </View>
          </LinearGradient>
        </Card>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <Card key={index} variant="elevated" style={styles.statCard}>
              <LinearGradient
                colors={['#FFFFFF', '#F8FAFC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statGradient}
              >
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                  <stat.icon size={20} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statTrend}>{stat.trend}</Text>
              </LinearGradient>
            </Card>
          ))}
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.achievementsScroll}>
            {achievements.map((achievement) => (
              <Card key={achievement.id} variant="outlined" style={[
                styles.achievementCard,
                !achievement.unlocked && styles.achievementCardLocked,
              ]}>
                <Text style={[
                  styles.achievementIcon,
                  !achievement.unlocked && styles.achievementIconLocked,
                ]}>
                  {achievement.icon}
                </Text>
                <Text style={[
                  styles.achievementTitle,
                  !achievement.unlocked && styles.achievementTitleLocked,
                ]}>
                  {achievement.title}
                </Text>
                <Text style={[
                  styles.achievementDescription,
                  !achievement.unlocked && styles.achievementDescriptionLocked,
                ]}>
                  {achievement.description}
                </Text>
                {achievement.unlocked && (
                  <View style={styles.unlockedBadge}>
                    <Award size={12} color="#10B981" />
                  </View>
                )}
              </Card>
            ))}
          </ScrollView>
        </View>

        {/* Premium Banner */}
        {!userProfile.isPremium && (
          <Card variant="elevated" style={styles.premiumBannerCard}>
            <LinearGradient
              colors={['#8B5CF6', '#7C3AED']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.premiumBannerGradient}
            >
              <View style={styles.premiumContent}>
                <Crown size={32} color="#FFFFFF" />
                <View style={styles.premiumText}>
                  <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
                  <Text style={styles.premiumDescription}>
                    Unlock unlimited friends, advanced planning tools, and exclusive features!
                  </Text>
                </View>
              </View>
              <Button
                title="Upgrade Now"
                variant="secondary"
                size="small"
                onPress={() => {}}
                style={styles.upgradeButton}
              />
            </LinearGradient>
          </Card>
        )}

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>{section.title}</Text>
            <Card variant="elevated" style={styles.menuCard}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    itemIndex < section.items.length - 1 && styles.menuItemBorder,
                  ]}
                >
                  <View style={[styles.menuIconContainer, { backgroundColor: `${item.color}20` }]}>
                    <item.icon size={20} color={item.color} />
                  </View>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  {item.badge && (
                    <Badge
                      variant={item.badge === 'PRO' ? 'warning' : 'error'}
                      size="small"
                    >
                      {item.badge}
                    </Badge>
                  )}
                  <Text style={styles.menuArrow}>›</Text>
                </TouchableOpacity>
              ))}
            </Card>
          </View>
        ))}

        {/* Privacy Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <Card variant="elevated" style={styles.privacyCard}>
            <View style={styles.privacyItem}>
              <View style={styles.privacyInfo}>
                <Text style={styles.privacyTitle}>Push Notifications</Text>
                <Text style={styles.privacyDescription}>Receive birthday reminders and updates</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#E5E7EB', true: '#8B5CF6' }}
                thumbColor={notificationsEnabled ? '#FFFFFF' : '#F3F4F6'}
              />
            </View>
            
            <View style={[styles.privacyItem, styles.privacyItemBorder]}>
              <View style={styles.privacyInfo}>
                <Text style={styles.privacyTitle}>Private Profile</Text>
                <Text style={styles.privacyDescription}>Only friends can see your profile</Text>
              </View>
              <Switch
                value={privateProfile}
                onValueChange={setPrivateProfile}
                trackColor={{ false: '#E5E7EB', true: '#8B5CF6' }}
                thumbColor={privateProfile ? '#FFFFFF' : '#F3F4F6'}
              />
            </View>
          </Card>
        </View>

        {/* Logout */}
        <View style={styles.logoutSection}>
          <Button
            title="Sign Out"
            variant="outline"
            icon={<LogOut size={20} color="#EF4444" />}
            onPress={() => {}}
            style={styles.logoutButton}
            textStyle={styles.logoutText}
          />
        </View>

        {/* App Version */}
        <Text style={styles.versionText}>
          birthd.ai v1.0.0 • Member since {userProfile.joinDate}
        </Text>

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
  settingsButton: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  profileCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    overflow: 'hidden',
  },
  profileGradient: {
    padding: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarSection: {
    position: 'relative',
    marginBottom: 16,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  premiumBadge: {
    position: 'absolute',
    top: -4,
    left: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    alignItems: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  userBio: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  contactInfo: {
    alignItems: 'center',
    gap: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#6B7280',
  },
  interests: {
    marginBottom: 20,
  },
  interestsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  interestsTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 20,
  },
  quickActionButton: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    width: '48%',
    overflow: 'hidden',
  },
  statGradient: {
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  statTrend: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  achievementsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  achievementCard: {
    width: 140,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    position: 'relative',
  },
  achievementCardLocked: {
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementIconLocked: {
    opacity: 0.5,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementTitleLocked: {
    color: '#9CA3AF',
  },
  achievementDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  achievementDescriptionLocked: {
    color: '#D1D5DB',
  },
  unlockedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumBannerCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    overflow: 'hidden',
  },
  premiumBannerGradient: {
    padding: 20,
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  premiumText: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  premiumDescription: {
    fontSize: 14,
    color: '#E0E7FF',
    lineHeight: 20,
  },
  upgradeButton: {
    backgroundColor: '#FFFFFF',
  },
  menuSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  menuSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuCard: {
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  menuArrow: {
    fontSize: 20,
    color: '#9CA3AF',
    fontWeight: '300',
    marginLeft: 8,
  },
  privacyCard: {
    overflow: 'hidden',
  },
  privacyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  privacyItemBorder: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  privacyInfo: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  privacyDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  logoutSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  logoutButton: {
    borderColor: '#FEE2E2',
    backgroundColor: '#FFFFFF',
  },
  logoutText: {
    color: '#EF4444',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  bottomSpacing: {
    height: 32,
  },
});