import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../constants/theme';

const NotificationsScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back" size={34} color={COLORS.black} />
    </TouchableOpacity>
    <Text style={styles.title}>Notifications</Text>
    <Text style={styles.sub}>UPDATES & TIPS</Text>
    <View style={styles.card}>
      <Text style={styles.cardTitle}>NHIS PAYMENT</Text>
      <Text style={styles.cardText}>NHIS tax payment coming up in 6 days</Text>
      <Text style={styles.time}>2hrs ago</Text>
    </View>
    <TouchableOpacity style={styles.dashboardBtn} onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}>
      <Text style={styles.dashboardText}>Dashboard</Text>
      <Ionicons name="chevron-forward" color={COLORS.white} size={18} />
    </TouchableOpacity>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white, padding: SPACING.lg },
  backBtn: { width: 40, marginTop: SPACING.xl, marginBottom: SPACING.md },
  title: { fontSize: 30, fontWeight: '900', color: COLORS.black, marginBottom: SPACING.xs },
  sub: { fontSize: FONTS.sizes.xs, fontWeight: '900', color: COLORS.black, marginBottom: SPACING.lg },
  card: { backgroundColor: COLORS.white, borderRadius: RADIUS.sm, padding: SPACING.md, ...SHADOWS.medium },
  cardTitle: { fontSize: FONTS.sizes.sm, fontWeight: '900', color: COLORS.black, marginBottom: SPACING.xs },
  cardText: { fontSize: FONTS.sizes.sm, color: COLORS.black },
  time: { alignSelf: 'flex-end', fontSize: FONTS.sizes.xs, color: COLORS.black, marginTop: SPACING.md },
  dashboardBtn: { position: 'absolute', right: SPACING.xl, bottom: SPACING.xl, flexDirection: 'row', alignItems: 'center', backgroundColor: '#078E18', borderRadius: RADIUS.sm, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm },
  dashboardText: { color: COLORS.white, fontWeight: '800', marginRight: SPACING.sm },
});

export default NotificationsScreen;
