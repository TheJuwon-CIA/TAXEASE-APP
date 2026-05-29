import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { COLORS } from '../constants/theme';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Simple logo render without TaxeaseLogo component to isolate issues */}
      <View style={styles.logoCircle}>
        <Text style={styles.naira}>₦</Text>
      </View>
      <Text style={styles.appName}>Taxease</Text>
      <Text style={styles.tagline}>Finance and tax management simplified</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  naira: {
    fontSize: 56,
    color: '#fff',
    fontWeight: '900',
  },
  appName: {
    fontSize: 40,
    fontWeight: '800',
    color: COLORS.primaryLight,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.textMedium,
    textAlign: 'center',
  },
});

export default SplashScreen;