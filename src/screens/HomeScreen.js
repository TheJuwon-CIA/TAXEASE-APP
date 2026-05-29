import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../constants/theme';

const DashboardCard = ({ title, subtitle, action = 'Calculate', icon, onPress }) => (
  <View style={styles.card}>
    <Ionicons name={icon} size={96} color="rgba(45,184,45,0.14)" style={styles.cardIcon} />
    <View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
    <TouchableOpacity style={styles.cardBtn} onPress={onPress}>
      <Text style={styles.cardBtnText}>{action}</Text>
      <Ionicons name="chevron-forward" size={20} color={COLORS.white} />
    </TouchableOpacity>
  </View>
);

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={30} color={COLORS.white} />
          </View>
          <View>
            <Text style={styles.morning}>Good Morning</Text>
            <Text style={styles.name}>John Doe</Text>
          </View>
          <TouchableOpacity style={styles.bell} onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications" size={30} color={COLORS.primary} />
            <View style={styles.badge}><Text style={styles.badgeText}>1</Text></View>
          </TouchableOpacity>
        </View>

        <Text style={styles.hero}>Calculate your Nigerian tax easily</Text>

        <View style={styles.salaryPanel}>
          <Text style={styles.salaryTitle}>SALARY EARNER</Text>
          <Text style={styles.salarySub}>Calculate PAYE and{'\n'}net salary</Text>
          <TouchableOpacity style={styles.salaryBtn} onPress={() => navigation.navigate('Calculator')}>
            <Text style={styles.cardBtnText}>Calculate</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <DashboardCard
          title="FREELANCER"
          subtitle="Estimate Self-employed Tax"
          icon="briefcase-outline"
          onPress={() => navigation.navigate('SMEIncome')}
        />
        <DashboardCard
          title="EDUCATIONAL RESOURCES"
          subtitle="Know more about PAYE and taxation in Nigeria"
          action="Learn"
          icon="school-outline"
          onPress={() => navigation.navigate('PAYETaxBand')}
        />

        <View style={styles.tabHeader}>
          <Text style={styles.activeHistory}>History</Text>
          <Text style={styles.stats}>Statistics</Text>
        </View>
        <View style={styles.historyCard}>
          <Text style={styles.historyTitle}>Last Calculations</Text>
          <Text style={styles.historyText}>Last Month</Text>
          <Text style={styles.historyLine}>Gross income: ₦ 350,000</Text>
          <Text style={styles.historyLine}>Estimated Tax: ₦ 28,500</Text>
          <Text style={styles.historyLine}>Net Salary: ₦ 321,500</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: SPACING.xxl },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.xl },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  morning: { fontSize: FONTS.sizes.xs, color: COLORS.textMedium },
  name: { fontSize: FONTS.sizes.lg, color: COLORS.textDark, fontWeight: '800' },
  bell: { marginLeft: 'auto' },
  badge: {
    position: 'absolute',
    right: -2,
    top: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: COLORS.white, fontSize: 9, fontWeight: '700' },
  hero: { fontSize: FONTS.sizes.xl, fontWeight: '700', color: COLORS.black, marginBottom: SPACING.xl },
  salaryPanel: { minHeight: 210, padding: SPACING.lg, marginBottom: SPACING.md },
  salaryTitle: { fontSize: FONTS.sizes.xl, fontWeight: '900', color: COLORS.textDark },
  salarySub: { fontSize: FONTS.sizes.lg, color: COLORS.textDark, lineHeight: 30 },
  salaryBtn: {
    position: 'absolute',
    right: SPACING.md,
    bottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  card: {
    minHeight: 150,
    borderRadius: RADIUS.lg,
    backgroundColor: '#EAF7EE',
    padding: SPACING.lg,
    overflow: 'hidden',
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  cardIcon: { position: 'absolute', right: 20, bottom: 8 },
  cardTitle: { fontSize: FONTS.sizes.xl, fontWeight: '900', color: COLORS.textDark },
  cardSubtitle: { fontSize: FONTS.sizes.lg, color: COLORS.textDark, maxWidth: '70%', lineHeight: 28 },
  cardBtn: {
    position: 'absolute',
    right: SPACING.md,
    bottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  cardBtnText: { color: COLORS.white, fontWeight: '800', fontSize: FONTS.sizes.lg },
  tabHeader: { flexDirection: 'row', gap: SPACING.xl, marginLeft: SPACING.sm, marginBottom: SPACING.sm },
  activeHistory: { fontSize: FONTS.sizes.xl, fontWeight: '900', color: COLORS.black, borderBottomWidth: 3 },
  stats: { fontSize: FONTS.sizes.xl, color: COLORS.black },
  historyCard: { backgroundColor: '#EEF6EF', borderRadius: RADIUS.lg, padding: SPACING.md },
  historyTitle: { fontSize: FONTS.sizes.lg, fontWeight: '800', color: COLORS.black, marginBottom: SPACING.sm },
  historyText: { fontSize: FONTS.sizes.lg, fontWeight: '700', marginBottom: SPACING.sm },
  historyLine: { fontSize: FONTS.sizes.lg, color: COLORS.black, marginBottom: SPACING.xs },
});

export default HomeScreen;
