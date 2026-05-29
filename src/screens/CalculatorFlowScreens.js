import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { AmountField, PeriodToggle } from './CalculatorScreen';

const Back = ({ navigation }) => (
  <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
    <Ionicons name="chevron-back" size={54} color={COLORS.black} />
  </TouchableOpacity>
);

const CalcShell = ({ title, subtitle, children, buttonTitle = 'Continue', onContinue }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.pill}>{title}</Text>
      <Text style={styles.heading}>{subtitle}</Text>
      {children}
      <TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
        <Text style={styles.continueText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);

export const IndividualDeductionsScreen = ({ navigation }) => (
  <CalcShell
    title="Individuals"
    subtitle={'Input what reduces taxable\nincome'}
    onContinue={() => navigation.navigate('PAYETaxDetails')}
  >
    <View style={styles.row}>
      <Text style={styles.sectionTitle}>Deduction/Credit</Text>
      <PeriodToggle />
    </View>
    <TouchableOpacity style={styles.standardBtn}>
      <Text style={styles.standardText}>8% Standard</Text>
    </TouchableOpacity>
    <AmountField label="Pension Contribution" value="₦ 40,000" />
    <AmountField label="Relief Rent (CRA) 20% of annual rent <or = 500,000" value="₦ 300,000 x 20% = 60,000" />
    <AmountField label="National Housing Fund (2.5%)" value="₦ 0" />
    <AmountField label="Total Deductions" value="₦ 280,000" />
  </CalcShell>
);

export const SMEIncomeScreen = ({ navigation }) => (
  <CalcShell
    title="SMEs"
    subtitle={'Enter your business income details for\naccurate tax calculation'}
    onContinue={() => navigation.navigate('SMEDeductions')}
  >
    <View style={styles.row}>
      <Text style={styles.sectionTitle}>Income Details</Text>
      <PeriodToggle />
    </View>
    <AmountField label="Business Revenue (Required)" value="₦25,000,000" />
    <AmountField label="Service Income" value="₦2,000,000" />
    <AmountField label="Investments" value="₦1,000,000" />
    <AmountField label="Gross Income Summary" value="₦ 28,000,000" />
  </CalcShell>
);

export const SMEDeductionsScreen = ({ navigation }) => (
  <CalcShell
    title="SMEs"
    subtitle={'Input allowable deductions to\ncalculate taxable income'}
    onContinue={() => navigation.navigate('SMETaxBand')}
  >
    <View style={styles.row}>
      <Text style={styles.sectionTitle}>Deduction/Credit</Text>
      <PeriodToggle />
    </View>
    <AmountField label="Business Expenses" value="₦10,000,000" />
    <AmountField label="Loan" value="₦ 2,500,000" />
    <AmountField label="Tax Credits/Reliefs" value="₦ 1,500,000" />
    <AmountField label="Total Deductions" value="₦ 11,000,000" />
  </CalcShell>
);

export const PAYETaxDetailsScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Back navigation={navigation} />
      <Text style={styles.centerTitle}>PAYE Tax Details</Text>
      <Text style={styles.centerSub}>Detailed tax breakdown based{'\n'}on Nigeria tax law</Text>

      <View style={styles.chartRow}>
        <View>
          <Legend color="#50D37E" label="Net Income" />
          <Legend color="#1E2937" label="Tax" />
          <Legend color="#F4B64D" label="Deduction" />
        </View>
        <View style={styles.pie}>
          <View style={styles.pieDark} />
          <View style={styles.pieGold} />
        </View>
      </View>

      <View style={styles.infoGrid}>
        <InfoBox title="Net Income" body={'800,000 - 280,000\nGross Income     Deductions\n\nTotal = 520,000'} dot />
        <InfoBox title="Annual Net Income" body={'520,000 x 12 =  6,240,000\n\nSince 6.2M falls within\nthe 3M - 12M bracket, the\ntax rate is 18%'} />
        <InfoBox title="Annual Tax" body={'18% X 6,240,000\n= 1,123,200\nMonthly Tax Payment\n1,123,200  ÷  12\n93,600   per month'} />
        <InfoBox title="" body={'● Net Income   ₦520,000\n\n● Tax              ₦93,600\n\n● Deduction   ₦280,000'} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('PAYETaxBand')}>
        <Text style={styles.help}>Need help understanding your tax rate?</Text>
        <Text style={styles.helpLink}>Check PAYE Tax Bands ⟶</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('PAYEResult')}>
        <Text style={styles.continueText}>View Result</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);

export const PAYETaxBandScreen = ({ navigation }) => (
  <TaxBand
    navigation={navigation}
    rows={[
      ['0 - 800,000', '0%'],
      ['800,001 - 3,000,000', '15%'],
      ['3,000,001 - 12,000,000', '18%', true],
      ['12,000,001 - 25,000,000', '21%'],
      ['25,000,001 - 50,000,000', '23%'],
      ['50,000,001 - Above', '25%'],
    ]}
    headerLeft="Annual Taxable Income(₦)"
    note="PAYE (Pay As You Earn) in Nigeria uses a progressive tax system, meaning different portions of income are taxed at different rates."
    button="Back to Calculator"
    onPress={() => navigation.navigate('MainTabs', { screen: 'Calculator' })}
  />
);

export const SMETaxBandScreen = ({ navigation }) => (
  <TaxBand
    navigation={navigation}
    rows={[
      ['Small Company CIT 0 -25M', '0%'],
      ['Medium Company 25M - 100M', '', true],
      ['Large Company 100M - Above', '30%'],
      ['VAT', '7.5%'],
      ['WHT (Deducts/Services)', '5%'],
      ['WHT (Rent/Dividends/Interest)', '5%'],
    ]}
    headerLeft="Tax Type (₦)"
    note="VAT (Value added tax). It is tax added to the price of goods and services when they are sold. It is paid by customer, but collected by the business and sent to the government."
    button="Continue"
    onPress={() => navigation.navigate('PAYEResult')}
  />
);

const TaxBand = ({ navigation, rows, headerLeft, note, button, onPress }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Back navigation={navigation} />
      <Text style={styles.centerTitle}>PAYE Tax Band</Text>
      <Text style={styles.centerSub}>Nigerian annual income tax{'\n'}rates and brackets</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHead}>{headerLeft}</Text>
          <Text style={styles.tableHead}>Tax Rate</Text>
        </View>
        {rows.map(([left, right, active]) => (
          <View key={left} style={[styles.tableRow, active && styles.activeRow]}>
            <Text style={[styles.tableText, active && styles.activeText]}>{left}</Text>
            <Text style={[styles.tableText, active && styles.activeText]}>{right}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.note}>{note}</Text>
      <TouchableOpacity style={styles.continueBtn} onPress={onPress}>
        <Text style={styles.continueText}>{button}</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);

export const PAYEResultScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Back navigation={navigation} />
      <Text style={styles.centerTitle}>PAYE Tax Result</Text>
      <Text style={styles.centerSub}>Summary after tax and{'\n'}deduction</Text>
      <Text style={styles.resultHead}>Tax & Deductions Summary</Text>
      <Text style={styles.resultText}>Tax + Deduction =₦134,550 +₦ 52,500</Text>
      <Text style={styles.resultText}>Total = ₦187,050</Text>
      <Text style={styles.resultHead}>Net Salary (Take-Home Pay)</Text>
      <Text style={styles.resultText}>Gross Income - Deduction =₦ 800,000 -₦187,050</Text>
      <Text style={styles.resultText}>Total = ₦612,950</Text>
      <Text style={styles.summaryTitle}>Summary</Text>
      {[
        ['Final Salary', '₦612,950'],
        ['Total Tax', '₦134,550'],
        ['Total Deduction', '₦52,500'],
      ].map(([label, value]) => (
        <View key={label} style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>{label}</Text>
          <Text style={styles.summaryValue}>{value}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('SavedSuccess')}>
        <Text style={styles.continueText}>Save Results</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);

export const SavedSuccessScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.successWrap}>
      <View style={styles.successCircle}>
        <Ionicons name="checkmark" size={110} color={COLORS.white} />
      </View>
      <Text style={styles.savedTitle}>Saved Successfully</Text>
      <Text style={styles.savedSub}>Your tax  calculation has been saved{'\n'}successfully.</Text>
      <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('PaymentPortal')}>
        <Text style={styles.continueText}>Pay Now</Text>
      </TouchableOpacity>
      <View style={styles.successLinks}>
        <Text style={styles.share}>Share Result ⤴</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Profile' })}>
          <Text style={styles.saveProfile}>Save to Profile  ⟶</Text>
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>
);

const Legend = ({ color, label }) => (
  <View style={styles.legend}>
    <View style={[styles.legendDot, { backgroundColor: color }]} />
    <Text style={styles.legendText}>{label}</Text>
  </View>
);

const InfoBox = ({ title, body, dot }) => (
  <View style={styles.infoBox}>
    {title ? <Text style={styles.infoTitle}>{dot ? '● ' : ''}{title}</Text> : null}
    <Text style={styles.infoBody}>{body}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: 120 },
  backBtn: { alignSelf: 'flex-start', marginBottom: SPACING.sm },
  pill: {
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    paddingVertical: SPACING.md,
    width: '75%',
    borderRadius: RADIUS.lg,
    textAlign: 'center',
    overflow: 'hidden',
    marginBottom: SPACING.xl,
  },
  heading: { textAlign: 'center', fontSize: 25, fontWeight: '900', lineHeight: 34, marginBottom: SPACING.xl },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: SPACING.lg },
  sectionTitle: { fontSize: 27, fontWeight: '900', color: COLORS.black },
  standardBtn: { alignSelf: 'flex-end', backgroundColor: COLORS.primary, borderRadius: RADIUS.sm, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, marginBottom: SPACING.lg },
  standardText: { color: COLORS.white, fontSize: FONTS.sizes.lg, fontWeight: '700' },
  continueBtn: { alignSelf: 'center', width: '78%', backgroundColor: COLORS.primary, borderRadius: RADIUS.md, paddingVertical: SPACING.md, alignItems: 'center', marginTop: SPACING.lg, marginBottom: SPACING.lg },
  continueText: { color: COLORS.white, fontSize: FONTS.sizes.xxl, fontWeight: '700' },
  centerTitle: { textAlign: 'center', fontSize: 30, fontWeight: '900', color: COLORS.black, marginBottom: SPACING.md },
  centerSub: { textAlign: 'center', fontSize: 24, fontWeight: '800', lineHeight: 34, marginBottom: SPACING.xl },
  chartRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: SPACING.xl },
  legend: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm },
  legendDot: { width: 24, height: 24, borderRadius: 12, marginRight: SPACING.sm },
  legendText: { fontSize: 26, color: COLORS.black },
  pie: { width: 170, height: 170, borderRadius: 85, backgroundColor: '#50D37E', overflow: 'hidden' },
  pieDark: { position: 'absolute', right: 0, top: 0, width: 85, height: 85, backgroundColor: '#1E2937' },
  pieGold: { position: 'absolute', right: 0, top: 0, width: 58, height: 58, backgroundColor: '#F4B64D' },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.md, justifyContent: 'space-between' },
  infoBox: { width: '47%', backgroundColor: COLORS.gray300, padding: SPACING.md, minHeight: 155 },
  infoTitle: { fontSize: FONTS.sizes.lg, fontWeight: '900', color: COLORS.black, marginBottom: SPACING.md },
  infoBody: { fontSize: FONTS.sizes.md, fontWeight: '700', color: COLORS.black, lineHeight: 24 },
  help: { textAlign: 'center', fontSize: FONTS.sizes.lg, color: COLORS.black, marginTop: SPACING.xl },
  helpLink: { textAlign: 'center', fontSize: FONTS.sizes.lg, color: COLORS.primary, fontWeight: '700' },
  table: { borderWidth: 2, borderColor: COLORS.black, borderRadius: RADIUS.lg, overflow: 'hidden', marginBottom: SPACING.xl },
  tableRow: { minHeight: 72, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.md, borderBottomWidth: 2, borderBottomColor: COLORS.black },
  tableHead: { fontSize: FONTS.sizes.xl, fontWeight: '700', color: COLORS.black },
  tableText: { fontSize: FONTS.sizes.xl, color: COLORS.black },
  activeRow: { backgroundColor: COLORS.primary },
  activeText: { color: COLORS.white, fontWeight: '900' },
  note: { fontSize: FONTS.sizes.xl, lineHeight: 35, color: COLORS.textDark, marginBottom: SPACING.xl },
  resultHead: { fontSize: 24, fontWeight: '900', marginTop: SPACING.xl, marginBottom: SPACING.sm },
  resultText: { fontSize: 22, fontWeight: '800', lineHeight: 32 },
  summaryTitle: { fontSize: FONTS.sizes.xxl, fontWeight: '900', marginTop: SPACING.xxxl, marginBottom: SPACING.md },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.md },
  summaryLabel: { fontSize: 26, fontWeight: '900' },
  summaryValue: { fontSize: 26, fontWeight: '900' },
  successWrap: { flex: 1, paddingHorizontal: SPACING.lg, justifyContent: 'center', alignItems: 'center' },
  successCircle: { width: 190, height: 190, borderRadius: 95, backgroundColor: '#50D37E', alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.xl },
  savedTitle: { fontSize: FONTS.sizes.xl, fontWeight: '900', marginBottom: SPACING.md },
  savedSub: { fontSize: 24, fontWeight: '700', textAlign: 'center', lineHeight: 34, marginBottom: SPACING.xxxl },
  successLinks: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: SPACING.xl },
  share: { fontSize: 24, fontWeight: '800', color: COLORS.black },
  saveProfile: { fontSize: 24, fontWeight: '800', color: COLORS.primary },
});
