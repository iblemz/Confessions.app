# Confession App

A mobile application built with React Native and Expo that allows users to share their confessions anonymously or with their identity. Users can submit both text and audio confessions.

## Features

- User Authentication (Register, Login, Password Reset)
- Text Confessions
- Anonymous Posting Option
- Real-time Updates
- Dark Theme UI
- Pull-to-Refresh
- Profile Management

## Tech Stack

- React Native with Expo
- Firebase Authentication
- Cloud Firestore
- React Navigation
- Expo Vector Icons
- AsyncStorage for Persistence

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Expo CLI
- Firebase Account

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
```

2. Install dependencies:
```bash
npm install
```

3. Create a Firebase project and add your configuration to `src/config/firebase.ts`

4. Start the development server:
```bash
npx expo start
```

## Project Structure

```
confession-app/
├── src/
│   ├── config/          # Firebase and app configuration
│   ├── contexts/        # React Context providers
│   ├── screens/         # Screen components
│   └── utils/           # Utility functions and Firebase operations
├── App.tsx             # Root component
├── app.json           # Expo configuration
└── package.json       # Dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Firebase for backend services
- Expo team for the amazing development tools
- React Navigation team for the routing solution
