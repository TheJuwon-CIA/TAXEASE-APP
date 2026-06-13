import React from 'react';
import AppText from '../../../components/AppText';
import { View, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../../../theme/tokens';
import { appImages } from '../../../lib/assets';
import { useAuth } from '../../../providers/AuthProvider';

const ActionButton = ({ title, onPress, small }) => (
  <TouchableOpacity style={[styles.actionBtn, small && styles.smallAction]} onPress={onPress}>
    <AppText style={[styles.actionText, small && styles.smallActionText]}>{title}</AppText>
    <Ionicons name="chevron-forward" size={small ? 14 : 20} color={COLORS.white} />
  </TouchableOpacity>
);

const DashboardCard = ({ title, subtitle, action = 'Calculate', image, onPress }) => (
  <ImageBackground source={image} resizeMode="cover" style={styles.card} imageStyle={styles.cardImage}>
    <AppText style={styles.cardTitle}>{title}</AppText>
    <AppText style={styles.cardSubtitle}>{subtitle}</AppText>
    <ActionButton title={action} onPress={onPress} />
  </ImageBackground>
);

const BusinessInfoCard = () => (
  <ImageBackground source={appImages.businessCard} style={styles.businessInfo} imageStyle={styles.businessInfoImage}>
    <AppText style={styles.businessInfoTitle}>Company Information</AppText>
    <View style={styles.businessInfoRow}>
      <View>
        <AppText style={styles.miniLabel}>Category</AppText>
        <AppText style={styles.miniValue}>Fintech</AppText>
      </View>
      <View>
        <AppText style={styles.miniLabel}>TIN</AppText>
        <AppText style={styles.miniValue}>TIN</AppText>
      </View>
      <View>
        <AppText style={styles.miniLabel}>CAC</AppText>
        <AppText style={styles.miniValue}>xxx-xxx</AppText>
      </View>
    </View>
  </ImageBackground>
);

const MetricCard = ({ title, lines, action, image, onPress }) => (
  <ImageBackground source={image} resizeMode="cover" style={styles.metricCard} imageStyle={styles.metricImage}>
    <AppText style={styles.metricTitle}>{title}</AppText>
    {lines.map((line) => (
      <AppText key={line} style={styles.metricLine}>{line}</AppText>
    ))}
    <ActionButton title={action} small onPress={onPress} />
  </ImageBackground>
);

const Header = ({ navigation, business }) => (
  <View style={styles.header}>
    <View style={styles.avatar}>
      <Ionicons name="person" size={30} color={COLORS.white} />
    </View>
    <View>
      <AppText style={styles.morning}>Welcome!</AppText>
<AppText style={styles.name}>{business ? 'Doe Enterprises' : 'John Doe'}</AppText>
    </View>
    <TouchableOpacity style={styles.bell} onPress={() => navigation.navigate('Notifications')}>
      <Ionicons name="notifications" size={business ? 23 : 34} color={COLORS.primary} />
      <View style={styles.badge}><AppText style={styles.badgeText}>1</AppText></View>
    </TouchableOpacity>
  </View>
);

const BusinessDashboard = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.businessContent} showsVerticalScrollIndicator={false}>
      <Header navigation={navigation} business />
      <AppText style={styles.businessHero}>Calculate your Nigerian tax easily</AppText>
      <BusinessInfoCard />
      <View style={styles.metricGrid}>
        <MetricCard title="Summary" lines={['Revenue', 'Expenditure', 'Net Profit']} action="Calculate" image={appImages.historyCard} onPress={() => navigation.navigate('SMEIncome')} />
        <MetricCard title="Tax details" lines={['Income', 'Tax', 'Deduction']} action="Check" image={appImages.historyCard} onPress={() => navigation.navigate('SMEDeductions')} />
        <MetricCard title="VAT" lines={['(Value Added Tax)', 'History', 'Aug', 'Jul']} action="Calculate" image={appImages.historyCard} onPress={() => navigation.navigate('SMEIncome')} />
        <MetricCard title="WHT" lines={['(Withholding tax)', 'View Deductions', 'Aug', 'Jul']} action="Check" image={appImages.historyCard} onPress={() => navigation.navigate('SMEDeductions')} />
      </View>
      <DashboardCard
  title="LEARNING HUB"
  subtitle="Know more about PAYE and taxation in Nigeria"
  action="Learn"
  image={appImages.educationCard}
  onPress={() => navigation.navigate('EducationalResources')}
/>
    </ScrollView>
  </SafeAreaView>
);

const PersonalDashboard = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Header navigation={navigation} />
      <AppText style={styles.hero}>Calculate your Nigerian tax easily</AppText>

      <ImageBackground source={appImages.individualCard} resizeMode="cover" style={styles.salaryPanel} imageStyle={styles.salaryImage}>
        <AppText style={styles.salaryTitle}>SALARY EARNER</AppText>
        <AppText style={styles.salarySub}>Calculate PAYE and{'\n'}net salary</AppText>
        <ActionButton title="Calculate" onPress={() => navigation.navigate('IndividualDeductions')} />
      </ImageBackground>

      <DashboardCard
        title="FREELANCER"
        subtitle="Estimate Self-employed Tax"
        image={appImages.freelancerCard}
        onPress={() => navigation.navigate('IndividualDeductions')}
      />
      <DashboardCard
        title="EDUCATIONAL RESOURCES"
        subtitle="Know more about PAYE and taxation in Nigeria"
        action="Learn"
        image={appImages.educationCard}
        onPress={() => navigation.navigate('EducationalResources')}
      />

      <View style={styles.tabHeader}>
        <AppText style={styles.activeHistory}>History</AppText>
        <AppText style={styles.stats}>Statistics</AppText>
      </View>
      <ImageBackground source={appImages.historyCard} resizeMode="cover" style={styles.historyCard} imageStyle={styles.historyImage}>
        <AppText style={styles.historyTitle}>Last Calculations</AppText>
        <AppText style={styles.historyText}>Last Month</AppText>
        <AppText style={styles.historyLine}>Gross income: ₦ 350,000</AppText>
        <AppText style={styles.historyLine}>Estimated Tax: ₦ 28,500</AppText>
        <AppText style={styles.historyLine}>Net Salary:      ₦ 321,500</AppText>
        <AppText style={styles.historyText}>Last Month</AppText>
      </ImageBackground>
    </ScrollView>
  </SafeAreaView>
);

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  if (user?.userType === 'business') {
    return <BusinessDashboard navigation={navigation} />;
  }
  return <PersonalDashboard navigation={navigation} />;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: 110 },
  businessContent: { paddingHorizontal: SPACING.md, paddingTop: SPACING.xl, paddingBottom: 110 },
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
  businessHero: { fontSize: 11, fontWeight: '700', color: COLORS.black, marginTop: -SPACING.md, marginBottom: SPACING.lg },
  salaryPanel: {
    minHeight: 220,
    borderRadius: 26,
    overflow: 'hidden',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    marginBottom: SPACING.md,
    justifyContent: 'space-between',
    
  },
  salaryImage: { borderRadius: 5, opacity: 0.5 },
  salaryTitle: { fontSize: 28, fontWeight: '900', color: COLORS.textDark },
  salarySub: { fontSize: 23, color: COLORS.textDark, lineHeight: 28, marginBottom: SPACING.lg },
  actionBtn: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: 10,
   
  },
  actionText: { color: COLORS.white, fontWeight: '900', fontSize: 20 },
  smallAction: { paddingHorizontal: SPACING.sm, paddingVertical: 6, gap: 2 },
  smallActionText: { fontSize: 9 },
  card: {
    height: 185,
    borderRadius: 30,
    padding: SPACING.sm,
    overflow: 'hidden',
    marginBottom: SPACING.lg,
    justifyContent: 'space-between',
    ...SHADOWS.small,
    
  },
  cardImage: { borderRadius: 26, opacity: 0.5 },
  cardTitle: { fontSize: 28, fontWeight: '900', color: COLORS.textDark },
  cardSubtitle: { fontSize: 22, color: COLORS.textDark, maxWidth: '64%', lineHeight: 31 },
  businessInfo: {
    height: 92,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    padding: SPACING.md,
    marginBottom: SPACING.lg,
      justifyContent: 'center',
  },
  businessInfoImage: { borderRadius: RADIUS.sm, opacity: 0.4 },
  businessInfoTitle: { fontSize: 15, fontWeight: '900', color: COLORS.textDark, marginBottom: SPACING.md },
  businessInfoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingRight: SPACING.md },
  miniLabel: { fontSize: 8, color: COLORS.textDark },
  miniValue: { fontSize: 8, color: COLORS.black, fontWeight: '700' },
  metricGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginBottom: SPACING.md },
  metricCard: {
    width: '%',
    height: 140,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    padding: SPACING.sm,
    justifyContent: 'space-between',
      ...SHADOWS.xsmall,
    
  },
  metricImage: { borderRadius: RADIUS.md, opacity: 0.2,  },
  metricTitle: { fontSize: 15, fontWeight: '900', color: COLORS.textDark },
  metricLine: { fontSize: 8, color: COLORS.black },
  tabHeader: { flexDirection: 'row', gap: SPACING.xl, marginLeft: SPACING.md, marginBottom: SPACING.sm },
  activeHistory: { fontSize: 24, fontWeight: '900', color: COLORS.black, borderBottomWidth: 3 },
  stats: { fontSize: 24, color: COLORS.black },
  historyCard: {
    width: '100%',
    minHeight: 245,
    borderRadius: 26,
    overflow: 'hidden',
    padding: SPACING.md,
    ...SHADOWS.small,
    
  },
  historyImage: { borderRadius: 26, opacity: 0.3 },
  historyTitle: { fontSize: 20, fontWeight: '900', color: COLORS.black, marginBottom: SPACING.sm },
  historyText: { fontSize: 20, fontWeight: '800', color: COLORS.black, marginBottom: SPACING.sm },
  historyLine: { fontSize: 20, color: COLORS.black, marginBottom: SPACING.xs },
});

export default HomeScreen;