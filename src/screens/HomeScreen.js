import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaxeaseLogo from '../components/TaxeaseLogo';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TaxeaseLogo size={36} showText={false} />
        <Text style={styles.headerTitle}>Taxease</Text>
      </View>
      <View style={styles.center}>
        <Text style={styles.welcome}>Welcome to Taxease 🎉</Text>
        <Text style={styles.sub}>Your tax dashboard will appear here.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    gap: SPACING.sm,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '800',
    color: COLORS.primaryLight,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },
  welcome: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  sub: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textMedium,
    textAlign: 'center',
  },
});

export default HomeScreen;
