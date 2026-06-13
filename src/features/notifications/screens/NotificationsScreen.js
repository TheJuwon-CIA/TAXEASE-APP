import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from '../../../components/AppText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../../../theme/tokens';

const tabs = ['PAYMENT REMINDERS', 'TAX DEADLINES', 'UPDATES & TIPS'];

const NotificationsScreen = ({ navigation }) => {
  const [active, setActive] = useState(null);
  const hasNotification = active === 'UPDATES & TIPS';

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={32} color={COLORS.black} />
      </TouchableOpacity>

      <View style={styles.titleRow}>
        <AppText style={styles.title}>Notifications</AppText>
        {hasNotification ? <View style={styles.titleBadge}><AppText style={styles.titleBadgeText}>1</AppText></View> : null}
      </View>

      {hasNotification ? (
        <>
          <AppText style={styles.sub}>UPDATES & TIPS</AppText>
          <View style={styles.card}>
            <AppText style={styles.cardTitle}>NHIS PAYMENT</AppText>
            <AppText style={styles.cardText}>NHIS tax reminder coming up in 6 days</AppText>
            <AppText style={styles.time}>2hrs ago</AppText>
          </View>
        </>
      ) : active ? (
        <View style={styles.emptyState}>
          <Ionicons name="notifications-outline" size={94} color="#B5B5B5" />
          <AppText style={styles.emptyText}>
            No current notifications are available on this page, you will be notified if any.
          </AppText>
        </View>
      ) : (
        <View style={styles.tabList}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabCard, active === tab && styles.tabCardActive]}
              onPress={() => setActive(tab)}
            >
              <AppText style={[styles.tabText, active === tab && styles.tabTextActive]}>
                {tab}{tab === 'UPDATES & TIPS' ? <AppText style={styles.required}>*</AppText> : null}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {(active || hasNotification) ? (
        <TouchableOpacity style={styles.dashboardBtn} onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}>
          <AppText style={styles.dashboardText}>Dashboard</AppText>
          <Ionicons name="chevron-forward" color={COLORS.white} size={18} />
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white, paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl },
  backBtn: { width: 40, marginBottom: SPACING.md },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.xs },
  title: { fontSize: 30, fontWeight: '900', color: COLORS.black },
  titleBadge: { width: 14, height: 14, borderRadius: 7, backgroundColor: COLORS.error, alignItems: 'center', justifyContent: 'center', marginLeft: 4 },
  titleBadgeText: { color: COLORS.white, fontSize: 8, fontWeight: '900' },
  sub: { fontSize: FONTS.sizes.xs, fontWeight: '900', color: COLORS.black, marginBottom: SPACING.lg },
  tabList: { marginTop: SPACING.lg, gap: SPACING.md },
  tabCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.md, paddingVertical: SPACING.md, paddingHorizontal: SPACING.lg, ...SHADOWS.medium },
  tabCardActive: { backgroundColor: COLORS.primary },
  tabText: { fontSize: 12, fontWeight: '900', color: COLORS.black },
  tabTextActive: { color: COLORS.white },
  required: { color: COLORS.error },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: SPACING.xl, paddingBottom: 120 },
  emptyText: { marginTop: SPACING.md, textAlign: 'center', color: '#A6A6A6', fontSize: 12, lineHeight: 18 },
  card: { backgroundColor: COLORS.white, borderRadius: RADIUS.sm, padding: SPACING.md, ...SHADOWS.medium },
  cardTitle: { fontSize: FONTS.sizes.sm, fontWeight: '900', color: COLORS.black, marginBottom: SPACING.xs },
  cardText: { fontSize: FONTS.sizes.sm, color: COLORS.black },
  time: { alignSelf: 'flex-end', fontSize: FONTS.sizes.xs, color: COLORS.black, marginTop: SPACING.md },
  dashboardBtn: { position: 'absolute', right: SPACING.xl, bottom: SPACING.xl, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, borderRadius: RADIUS.sm, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md },
  dashboardText: { color: COLORS.white, fontWeight: '900', fontSize: 16, marginRight: SPACING.sm },
});

export default NotificationsScreen;