import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const ReceiptsScreen = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.center}>
      <Ionicons name="document-text-outline" size={82} color={COLORS.black} />
      <Text style={styles.title}>History</Text>
      <Text style={styles.sub}>Saved tax calculations and receipts will appear here.</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.lg },
  title: { fontSize: FONTS.sizes.xxl, fontWeight: '800', color: COLORS.black, marginTop: SPACING.md, marginBottom: SPACING.sm },
  sub: { fontSize: FONTS.sizes.md, color: COLORS.textMedium, textAlign: 'center' },
});

export default ReceiptsScreen;
