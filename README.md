# Taxease - React Native App (Expo SDK 54)

A Nigerian finance and tax management app built with Expo.

---

## Project Structure

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
    |   |-- Button.js               # Reusable button component
    |   |-- InputField.js           # Reusable input field
    |   |-- OTPInput.js             # OTP input boxes
    |   `-- TaxeaseLogo.js          # Taxease logo component
    |-- constants/
    |   `-- theme.js                # Colors, fonts, spacing, radius, shadows
    |-- context/
    |   `-- AuthContext.js          # Auth state and AsyncStorage persistence
    |-- navigation/
    |   |-- MainTabNavigator.js     # Dashboard, calculator, history, profile tabs
    |   `-- RootNavigator.js        # Auth, calculator, payment, education routes
    |-- screens/
    |   |-- AccountSuccessScreen.js
    |   |-- CalculatorFlowScreens.js # Calculator details, bands, result, saved state
    |   |-- CalculatorScreen.js
    |   |-- ConfirmEmailScreen.js
    |   |-- CreateNewPasswordScreen.js
    |   |-- EducationScreens.js      # Resources, tax basics, deductions, FAQs, videos
    |   |-- ForgotPasswordScreen.js
    |   |-- GetStartedScreen.js
    |   |-- HomeScreen.js
    |   |-- IndividualProfileTypeScreen.js
    |   |-- LoginScreen.js
    |   |-- NotificationsScreen.js
    |   |-- OnboardingScreen.js
    |   |-- PaymentScreens.js        # Payment portal, transfer, success, failed, receipt
    |   |-- ProfileScreen.js
    |   |-- ProfileSetupForms.js
    |   |-- ProfileTypeScreen.js
    |   |-- ReceiptsScreen.js        # Payment history tab
    |   |-- RegisterScreen.js
    |   |-- ResetSuccessScreen.js
    |   |-- SelectTypeScreen.js
    |   |-- SplashScreen.js
    |   `-- VerifyCodeScreen.js
    `-- services/
        `-- api.js                  # Axios API service layer
```

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

Edit `src/services/api.js` and replace the base URL:

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

All design tokens live in `src/constants/theme.js`.

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
