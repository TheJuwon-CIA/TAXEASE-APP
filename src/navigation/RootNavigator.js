import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '../context/AuthContext';
import { COLORS } from '../constants/theme';

import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import GetStartedScreen from '../screens/GetStartedScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import AccountSuccessScreen from '../screens/AccountSuccessScreen';
import SelectTypeScreen from '../screens/SelectTypeScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerifyCodeScreen from '../screens/VerifyCodeScreen';
import CreateNewPasswordScreen from '../screens/CreateNewPasswordScreen';
import ResetSuccessScreen from '../screens/ResetSuccessScreen';
import MainTabNavigator from './MainTabNavigator';
import ProfileTypeScreen from '../screens/ProfileTypeScreen';
import IndividualProfileTypeScreen from '../screens/IndividualProfileTypeScreen';
import {
  FreelancerProfileForm,
  EmployeeProfileForm,
  BusinessProfileForm,
} from '../screens/ProfileSetupForms';
import NotificationsScreen from '../screens/NotificationsScreen';
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
} from '../screens/PaymentScreens';
import {
  EducationalResourcesScreen,
  TaxBasicsScreen,
  DeductionGuideScreen,
  FAQsScreen,
  VideoTutorialsScreen,
} from '../screens/EducationScreens';
import {
  IndividualDeductionsScreen,
  SMEIncomeScreen,
  SMEDeductionsScreen,
  PAYETaxDetailsScreen,
  PAYETaxBandScreen,
  SMETaxBandScreen,
  PAYEResultScreen,
  SavedSuccessScreen,
} from '../screens/CalculatorFlowScreens';

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
