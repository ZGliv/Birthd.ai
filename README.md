# birthd.ai - Birthday Social Platform

A comprehensive social media application dedicated to birthday celebrations, featuring friend networks, event planning, local discovery, and wishlist management.

## 🎉 Features

### Core Features (MVP)
- **User Authentication**: Social login with Google, Apple, Facebook
- **Friend Network**: Connect with friends and track their birthdays
- **Birthday Notifications**: Smart reminders for upcoming celebrations
- **Event Planning**: Create and manage birthday parties with RSVP functionality
- **Profile Management**: Personal profiles with birthday information and preferences

### Advanced Features (Phase 2)
- **Local Discovery**: Interactive map showing venues, restaurants, and events
- **Enhanced Event Planning**: Collaborative planning with budget tracking
- **Basic Wishlist**: Manual item addition and sharing
- **Photo Sharing**: Event memories and celebration photos

### Premium Features (Phase 3)
- **AI Recommendations**: Personalized venue and gift suggestions
- **Advanced Wishlist**: Automated price tracking and group gifting
- **Premium Social Features**: Private groups and custom themes
- **Analytics**: Birthday celebration insights and trends

## 🛠 Technology Stack

### Frontend
- **Framework**: Expo SDK 52+ with React Native 0.79+
- **Navigation**: Expo Router with tab-based navigation
- **State Management**: Zustand + React Query
- **UI Components**: Custom design system with react-native-reanimated
- **Icons**: Lucide React Native

### Backend (Planned)
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Auth0/Firebase Auth with JWT
- **Storage**: AWS S3 for media files
- **Notifications**: Expo Push Notifications

### Third-Party Integrations
- **Maps**: Google Places API, Yelp Fusion API
- **Calendar**: Google Calendar API, Apple EventKit
- **Social**: OAuth providers (Google, Apple, Facebook)
- **E-commerce**: Product APIs for wishlist tracking

## 📱 App Structure

```
app/
├── _layout.tsx              # Root layout with navigation
├── +not-found.tsx          # 404 error page
└── (tabs)/                 # Tab-based navigation
    ├── _layout.tsx         # Tab layout configuration
    ├── index.tsx           # Home screen (birthday feed)
    ├── friends.tsx         # Friends management
    ├── discover.tsx        # Local venue/event discovery
    ├── wishlist.tsx        # Birthday wishlist
    └── profile.tsx         # User profile and settings
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd birthd-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

## 📋 Development Roadmap

### Phase 1: MVP (Months 1-4)
- [x] Project setup and basic navigation
- [x] UI design system and components
- [ ] User authentication system
- [ ] Friend network functionality
- [ ] Birthday tracking and notifications
- [ ] Basic event creation and RSVP

### Phase 2: Enhanced Features (Months 5-8)
- [ ] Maps integration and local discovery
- [ ] Advanced event planning tools
- [ ] Photo sharing and memories
- [ ] Basic wishlist functionality

### Phase 3: Premium Features (Months 9-12)
- [ ] AI-powered recommendations
- [ ] Advanced wishlist with price tracking
- [ ] Premium subscription features
- [ ] Analytics and insights

## 🎯 Target Users

1. **Social Sarah** (35%): Young professionals who value maintaining friendships
2. **Organized Oliver** (25%): Busy professionals seeking efficient planning tools
3. **Family-Focused Fiona** (25%): Parents coordinating family celebrations
4. **Gen-Z Gabriel** (15%): Young adults seeking authentic social experiences

## 💰 Monetization Strategy

- **Freemium Model**: Basic features free, premium features $4.99/month
- **Commission Partnerships**: Revenue sharing with restaurants and venues
- **Advertising**: Targeted birthday-relevant brand partnerships

## 🔒 Privacy & Security

- GDPR compliant data handling
- Privacy-by-design architecture
- Granular privacy controls for users
- Secure authentication with OAuth providers

## 📊 Success Metrics

- **User Engagement**: Daily/Monthly Active Users
- **Social Growth**: Friend connections and network effects
- **Feature Adoption**: Event creation and RSVP rates
- **Retention**: 1-day, 7-day, 30-day retention rates
- **Monetization**: Premium conversion and ARPU

## 🤝 Contributing

This project is currently in development. Contribution guidelines will be established as the project progresses.

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 📞 Contact

For questions about this project, please refer to the DOCUMENTATION.md file for comprehensive development plans and technical specifications.

---

**Note**: This is an MVP implementation. Full backend integration, external API connections, and advanced features are planned for future development phases as outlined in the comprehensive development plan.