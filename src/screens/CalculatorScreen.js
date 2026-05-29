import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const CalculatorScreen = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.center}>
      <Text style={styles.emoji}>🧮</Text>
      <Text style={styles.title}>Tax Calculator</Text>
      <Text style={styles.sub}>Calculate your taxes easily here.</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.lg },
  emoji: { fontSize: 60, marginBottom: SPACING.md },
  title: { fontSize: FONTS.sizes.xxl, fontWeight: '800', color: COLORS.primaryLight, marginBottom: SPACING.sm },
  sub: { fontSize: FONTS.sizes.md, color: COLORS.textMedium, textAlign: 'center' },
});

export default CalculatorScreen;
