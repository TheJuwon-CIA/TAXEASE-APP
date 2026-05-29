# Taxease — React Native App (Expo SDK 54)

A Nigerian finance & tax management app built with Expo SDK 54.

---

## 📁 Project Structure

```
taxease/
├── App.js                          # Root entry point
├── app.json                        # Expo config (SDK 54)
├── package.json                    # Dependencies
├── babel.config.js
└── src/
    ├── constants/
    │   └── theme.js                # Colors, fonts, spacing, radius
    ├── context/
    │   └── AuthContext.js          # Global auth state + AsyncStorage
    ├── services/
    │   └── api.js                  # Axios API service layer
    ├── components/
    │   ├── Button.js               # Reusable button (primary/outline/ghost)
    │   ├── InputField.js           # Reusable text input with icon support
    │   ├── OTPInput.js             # 4 or 6-digit OTP input boxes
    │   └── TaxeaseLogo.js          # Green speech-bubble calculator logo
    ├── navigation/
    │   ├── RootNavigator.js        # Auth vs main app routing
    │   └── MainTabNavigator.js     # Bottom tab navigator (4 tabs)
    └── screens/
        ├── SplashScreen.js         # Splash — logo, auto-redirects
        ├── OnboardingScreen.js     # 4 swipeable onboarding slides
        ├── GetStartedScreen.js     # Log In / Register landing
        ├── LoginScreen.js          # Email + password login
        ├── RegisterScreen.js       # Full registration form
        ├── ConfirmEmailScreen.js   # 4-digit email OTP
        ├── AccountSuccessScreen.js # Account created success
        ├── SelectTypeScreen.js     # User type selection
        ├── ForgotPasswordScreen.js # Forgot password email input
        ├── VerifyCodeScreen.js     # 6-digit password reset OTP
        ├── CreateNewPasswordScreen.js  # New password + rules
        ├── ResetSuccessScreen.js   # Password reset success
        ├── HomeScreen.js           # Main dashboard tab
        ├── CalculatorScreen.js     # Tax calculator tab
        ├── ReceiptsScreen.js       # Receipts tab
        └── ProfileScreen.js        # Profile + logout tab
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app (v54) on your phone, or an Android/iOS emulator

### Installation

```bash
# 1. Clone / download the project
cd taxease

# 2. Install dependencies
npm install

# 3. Start the dev server
npx expo start
```

Then scan the QR code with Expo Go on your phone.

---

## 🔌 API Integration

Edit `src/services/api.js` and replace the base URL:

```js
const BASE_URL = 'https://api.taxease.com/v1'; // ← your actual API
```

All API methods are already wired up:
- `authAPI.login(email, password)`
- `authAPI.register(data)`
- `authAPI.confirmEmail(email, code)`
- `authAPI.forgotPassword(email)`
- `authAPI.verifyResetCode(email, code)`
- `authAPI.resetPassword(email, code, newPassword)`
- `authAPI.selectUserType(userId, userType)`

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary green | `#28A07` |
| Dark green | `#26805` |
| Text dark | `#1f2937` |
| System info | `#f3b24e` |
| Background | `#FFFFFF` |
| Error Message | `#ff383c` |

All design tokens live in `src/constants/theme.js`.

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `expo ~54.0.8` | SDK & dev tools |
| `@react-navigation/native` | Navigation container |
| `@react-navigation/stack` | Stack navigator |
| `@react-navigation/bottom-tabs` | Tab navigator |
| `@expo/vector-icons` | Ionicons |
| `axios` | HTTP client |
| `@react-native-async-storage/async-storage` | Token persistence |
| `react-native-safe-area-context` | Safe area handling |
