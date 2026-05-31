import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../../../theme/tokens';
import { appImages } from '../../../lib/assets';

const ActionButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
    <Text style={styles.actionText}>{title}</Text>
    <Ionicons name="chevron-forward" size={20} color={COLORS.white} />
  </TouchableOpacity>
);

const DashboardCard = ({ title, subtitle, action = 'Calculate', image, onPress }) => (
  <ImageBackground source={image} style={styles.card} imageStyle={styles.cardImage}>
    <View style={styles.cardOverlay} />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardSubtitle}>{subtitle}</Text>
    <ActionButton title={action} onPress={onPress} />
  </ImageBackground>
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
            <Ionicons name="notifications" size={34} color={COLORS.primary} />
            <View style={styles.badge}><Text style={styles.badgeText}>1</Text></View>
          </TouchableOpacity>
        </View>

        <Text style={styles.hero}>Calculate your Nigerian tax easily</Text>

        <View style={styles.salaryPanel}>
          <Text style={styles.salaryTitle}>SALARY EARNER</Text>
          <Text style={styles.salarySub}>Calculate PAYE and{'\n'}net salary</Text>
          <ActionButton title="Calculate" onPress={() => navigation.navigate('Calculator')} />
        </View>

        <DashboardCard
          title="FREELANCER"
          subtitle="Estimate Self-employed Tax"
          image={appImages.freelancerCard}
          onPress={() => navigation.navigate('SMEIncome')}
        />
        <DashboardCard
          title="EDUCATIONAL RESOURCES"
          subtitle="Know more about PAYE and taxation in Nigeria"
          action="Learn"
          image={appImages.educationCard}
          onPress={() => navigation.navigate('EducationalResources')}
        />

        <View style={styles.tabHeader}>
          <Text style={styles.activeHistory}>History</Text>
          <Text style={styles.stats}>Statistics</Text>
        </View>
        <ImageBackground source={appImages.historyCard} style={styles.historyCard} imageStyle={styles.historyImage}>
          <View style={styles.historyOverlay} />
          <Text style={styles.historyTitle}>Last Calculations</Text>
          <Text style={styles.historyText}>Last Month</Text>
          <Text style={styles.historyLine}>Gross income: ₦ 350,000</Text>
          <Text style={styles.historyLine}>Estimated Tax: ₦ 28,500</Text>
          <Text style={styles.historyLine}>Net Salary:      ₦ 321,500</Text>
          <Text style={styles.historyText}>Last Month</Text>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: 110 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.lg },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  morning: { fontSize: FONTS.sizes.xs, color: COLORS.textMedium },
  name: { fontSize: FONTS.sizes.lg, color: COLORS.textDark, fontWeight: '800', marginTop: -4 },
  bell: { marginLeft: 'auto', paddingRight: SPACING.sm },
  badge: {
    position: 'absolute',
    right: 7,
    top: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: COLORS.white, fontSize: 8, fontWeight: '800' },
  hero: { fontSize: 21, fontWeight: '700', color: COLORS.black, marginBottom: SPACING.xl },
  salaryPanel: {
    minHeight: 220,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    marginBottom: SPACING.md,
    justifyContent: 'space-between',
  },
  salaryTitle: { fontSize: 28, fontWeight: '900', color: COLORS.textDark },
  salarySub: { fontSize: 23, color: COLORS.textDark, lineHeight: 28, marginBottom: SPACING.lg },
  actionBtn: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 10,
    ...SHADOWS.medium,
  },
  actionText: { color: COLORS.white, fontWeight: '900', fontSize: 20 },
  card: {
    height: 185,
    borderRadius: 26,
    padding: SPACING.lg,
    overflow: 'hidden',
    marginBottom: SPACING.lg,
    justifyContent: 'space-between',
    ...SHADOWS.medium,
  },
  cardImage: { borderRadius: 26 },
  cardOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.66)' },
  cardTitle: { fontSize: 28, fontWeight: '900', color: COLORS.textDark },
  cardSubtitle: { fontSize: 22, color: COLORS.textDark, maxWidth: '64%', lineHeight: 31 },
  tabHeader: { flexDirection: 'row', gap: SPACING.xl, marginLeft: SPACING.md, marginBottom: SPACING.sm },
  activeHistory: { fontSize: 24, fontWeight: '900', color: COLORS.black, borderBottomWidth: 3 },
  stats: { fontSize: 24, color: COLORS.black },
  historyCard: {
    minHeight: 245,
    borderRadius: 26,
    overflow: 'hidden',
    padding: SPACING.md,
    ...SHADOWS.medium,
  },
  historyImage: { borderRadius: 26 },
  historyOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.72)' },
  historyTitle: { fontSize: 20, fontWeight: '900', color: COLORS.black, marginBottom: SPACING.sm },
  historyText: { fontSize: 20, fontWeight: '800', color: COLORS.black, marginBottom: SPACING.sm },
  historyLine: { fontSize: 20, color: COLORS.black, marginBottom: SPACING.xs },
});

export default HomeScreen;