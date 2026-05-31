import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import HomeScreen from '../features/dashboard/screens/HomeScreen';
import CalculatorScreen from '../features/calculator/screens/CalculatorScreen';
import ReceiptsScreen from '../features/receipts/screens/ReceiptsScreen';
import ProfileScreen from '../features/profile/screens/ProfileScreen';

import { COLORS, FONTS } from '../theme/tokens';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primaryLight,
        tabBarInactiveTintColor: COLORS.gray500,
        tabBarLabelStyle: {
          fontSize: FONTS.sizes.xs,
          fontWeight: '600',
          marginBottom: Platform.OS === 'ios' ? 0 : 4,
        },
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 84 : 64,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: COLORS.gray200,
          backgroundColor: COLORS.white,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Home: focused ? 'grid' : 'grid-outline',
            Calculator: focused ? 'calculator' : 'calculator-outline',
            Receipts: focused ? 'document-text' : 'document-text-outline',
            Profile: focused ? 'person' : 'person-outline',
          };
          return (
            <Ionicons name={icons[route.name]} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="Calculator" component={CalculatorScreen} />
      <Tab.Screen name="Receipts" component={ReceiptsScreen} options={{ title: 'History' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
