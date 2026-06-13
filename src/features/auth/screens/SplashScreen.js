import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../../../components/AppText';
import { COLORS } from '../../../theme/tokens';
import TaxeaseLogo from '../../../components/ui/TaxeaseLogo';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TaxeaseLogo size={130} textSize={40} />
      <AppText style={styles.tagline}>Finance and tax management simplified</AppText>
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
  tagline: {
    marginTop: 18,
    fontSize: 16,
    color: COLORS.textMedium,
    textAlign: 'center',
  },
});

export default SplashScreen;