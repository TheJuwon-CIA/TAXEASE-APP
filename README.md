# Taxease - React Native App

A Nigerian finance and tax management app built with Expo.

---

## Project Structure

TaxEase now follows the same feature-sliced layout style used by the AXIX Teacher app: shared app infrastructure sits in `src/lib`, `src/providers`, `src/theme`, and reusable UI; user-facing screens are grouped by product domain under `src/features/{domain}/screens`.

```text
taxease/
|-- App.js                          # Root app entry point
|-- app.json                        # Expo app config
|-- babel.config.js                 # Babel config
|-- index.js                        # Native entry file
|-- metro.config.js                 # Metro bundler config
|-- package.json                    # Scripts and dependencies
|-- package-lock.json               # Locked dependency versions
|-- assets/                         # App images and static assets
`-- src/
    |-- components/
    |   |-- ui/                     # Reusable UI primitives
    |   |   |-- Button.js
    |   |   |-- InputField.js
    |   |   |-- OTPInput.js
    |   |   `-- TaxeaseLogo.js
    |   `-- layout/                 # Shared layout components go here
    |-- features/
    |   |-- auth/screens/           # Onboarding, login, register, reset, setup
    |   |-- calculator/screens/     # Calculator and calculator flow screens
    |   |-- dashboard/screens/      # Home dashboard
    |   |-- education/screens/      # Resources, guides, FAQs, videos
    |   |-- notifications/screens/  # Notifications
    |   |-- payments/screens/       # Payment portal and payment flow
    |   |-- profile/screens/        # Profile tab
    |   `-- receipts/screens/       # Payment history tab
    |-- lib/
    |   `-- api-client.js           # Axios API client and API helper groups
    |-- mocks/
    |   `-- fixtures/               # Mock/static fixtures go here
    |-- navigation/
    |   |-- MainTabNavigator.js     # Dashboard, calculator, history, profile tabs
    |   `-- RootNavigator.js        # Auth, calculator, payment, education routes
    |-- providers/
    |   `-- AuthProvider.js         # Auth state and AsyncStorage persistence
    `-- theme/
        `-- tokens.js               # Colors, fonts, spacing, radius, shadows
```

---

## Adding A Screen

1. Pick or create the feature domain under `src/features/{domain}/`.
2. Add the screen in `src/features/{domain}/screens/YourScreen.js`.
3. Put reusable UI in `src/components/ui`, not inside a screen file.
4. Put shared app logic in `src/lib` or `src/providers`.
5. Register the screen in `src/navigation/RootNavigator.js` or `src/navigation/MainTabNavigator.js`.

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo Go on your phone, or an Android/iOS emulator

### Installation

```bash
npm install
npx expo start
```

Then scan the QR code with Expo Go on your phone.

---

## API Integration

Edit `src/lib/api-client.js` and replace the base URL:

```js
const BASE_URL = 'https://api.taxease.com/v1';
```

API helpers include:

- `authAPI.login(email, password)`
- `authAPI.register(data)`
- `authAPI.confirmEmail(email, code)`
- `authAPI.forgotPassword(email)`
- `authAPI.verifyResetCode(email, code)`
- `authAPI.resetPassword(email, code, newPassword)`
- `authAPI.selectUserType(userId, userType)`

---

## Design System

| Token | Value |
| --- | --- |
| Primary green | `#028a07` |
| Dark green | `#026805` |
| Text dark | `#1f2937` |
| System info | `#f3b24e` |
| Background | `#ffffff` |
| Error message | `#ff383c` |

All design tokens live in `src/theme/tokens.js`.

---

## Key Dependencies

| Package | Purpose |
| --- | --- |
| `expo` | SDK and development tools |
| `@react-navigation/native` | Navigation container |
| `@react-navigation/stack` | Stack navigator |
| `@react-navigation/bottom-tabs` | Tab navigator |
| `@expo/vector-icons` | Ionicons and app icons |
| `axios` | HTTP client |
| `@react-native-async-storage/async-storage` | Token persistence |
| `react-native-safe-area-context` | Safe area handling |