import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '../providers/AuthProvider';
import { COLORS } from '../theme/tokens';

import SplashScreen from '../features/auth/screens/SplashScreen';
import OnboardingScreen from '../features/auth/screens/OnboardingScreen';
import GetStartedScreen from '../features/auth/screens/GetStartedScreen';
import LoginScreen from '../features/auth/screens/LoginScreen';
import RegisterScreen from '../features/auth/screens/RegisterScreen';
import ConfirmEmailScreen from '../features/auth/screens/ConfirmEmailScreen';
import AccountSuccessScreen from '../features/auth/screens/AccountSuccessScreen';
import SelectTypeScreen from '../features/auth/screens/SelectTypeScreen';
import ForgotPasswordScreen from '../features/auth/screens/ForgotPasswordScreen';
import VerifyCodeScreen from '../features/auth/screens/VerifyCodeScreen';
import CreateNewPasswordScreen from '../features/auth/screens/CreateNewPasswordScreen';
import ResetSuccessScreen from '../features/auth/screens/ResetSuccessScreen';
import MainTabNavigator from './MainTabNavigator';
import ProfileTypeScreen from '../features/auth/screens/ProfileTypeScreen';
import IndividualProfileTypeScreen from '../features/auth/screens/IndividualProfileTypeScreen';
import {
  FreelancerProfileForm,
  EmployeeProfileForm,
  BusinessProfileForm,
} from '../features/auth/screens/ProfileSetupForms';
import NotificationsScreen from '../features/notifications/screens/NotificationsScreen';
import {
  PaymentPortalScreen,
  FlutterwavePaymentScreen,
  SelectPaymentMethodScreen,
  SelectPreferredAccountScreen,
  MakeTransferScreen,
  LoadingPaymentScreen,
  PaymentSuccessScreen,
  PaymentFailedScreen,
  ReceiptDetailScreen,
} from '../features/payments/screens/PaymentScreens';
import {
  EducationalResourcesScreen,
  TaxBasicsScreen,
  DeductionGuideScreen,
  FAQsScreen,
  VideoTutorialsScreen,
} from '../features/education/screens/EducationScreens';
import {
  IndividualDeductionsScreen,
  SMEIncomeScreen,
  SMEDeductionsScreen,
  PAYETaxDetailsScreen,
  PAYETaxBandScreen,
  SMETaxBandScreen,
  PAYEResultScreen,
  SavedSuccessScreen,
} from '../features/calculator/screens/CalculatorFlowScreens';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color={COLORS.primaryLight} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? 'MainTabs' : 'Onboarding'}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#ffffff' },
      }}
    >
      {isLoggedIn ? (
        <>
          <Stack.Screen name="MainTabs" component={MainTabNavigator} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="IndividualDeductions" component={IndividualDeductionsScreen} />
          <Stack.Screen name="SMEIncome" component={SMEIncomeScreen} />
          <Stack.Screen name="SMEDeductions" component={SMEDeductionsScreen} />
          <Stack.Screen name="PAYETaxDetails" component={PAYETaxDetailsScreen} />
          <Stack.Screen name="PAYETaxBand" component={PAYETaxBandScreen} />
          <Stack.Screen name="SMETaxBand" component={SMETaxBandScreen} />
          <Stack.Screen name="PAYEResult" component={PAYEResultScreen} />
          <Stack.Screen name="SavedSuccess" component={SavedSuccessScreen} />
          <Stack.Screen name="PaymentPortal" component={PaymentPortalScreen} />
          <Stack.Screen name="FlutterwavePayment" component={FlutterwavePaymentScreen} />
          <Stack.Screen name="SelectPaymentMethod" component={SelectPaymentMethodScreen} />
          <Stack.Screen name="SelectPreferredAccount" component={SelectPreferredAccountScreen} />
          <Stack.Screen name="MakeTransfer" component={MakeTransferScreen} />
          <Stack.Screen name="LoadingPayment" component={LoadingPaymentScreen} />
          <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
          <Stack.Screen name="PaymentFailed" component={PaymentFailedScreen} />
          <Stack.Screen name="ReceiptDetail" component={ReceiptDetailScreen} />
          <Stack.Screen name="EducationalResources" component={EducationalResourcesScreen} />
          <Stack.Screen name="TaxBasics" component={TaxBasicsScreen} />
          <Stack.Screen name="DeductionGuide" component={DeductionGuideScreen} />
          <Stack.Screen name="FAQs" component={FAQsScreen} />
          <Stack.Screen name="VideoTutorials" component={VideoTutorialsScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="GetStarted" component={GetStartedScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
          <Stack.Screen name="AccountSuccess" component={AccountSuccessScreen} />
          <Stack.Screen name="ProfileType" component={ProfileTypeScreen} />
          <Stack.Screen name="IndividualProfileType" component={IndividualProfileTypeScreen} />
          <Stack.Screen name="FreelancerProfileForm" component={FreelancerProfileForm} />
          <Stack.Screen name="EmployeeProfileForm" component={EmployeeProfileForm} />
          <Stack.Screen name="BusinessProfileForm" component={BusinessProfileForm} />
          <Stack.Screen name="SelectType" component={SelectTypeScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
          <Stack.Screen name="CreateNewPassword" component={CreateNewPasswordScreen} />
          <Stack.Screen name="ResetSuccess" component={ResetSuccessScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
