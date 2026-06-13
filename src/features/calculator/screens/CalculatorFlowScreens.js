import React, { useMemo, useState } from 'react';
import AppText from '../../../components/AppText';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../theme/tokens';
import { AmountField, PeriodToggle, formatCurrency, parseAmount } from './CalculatorScreen';

const Back = ({ navigation }) => (
  <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
    <Ionicons name="chevron-back" size={54} color={COLORS.black} />
  </TouchableOpacity>
);

const CalcShell = ({ title, subtitle, children, buttonTitle = 'Continue', onContinue }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <AppText style={styles.pill}>{title}</AppText>
      <AppText style={styles.heading}>{subtitle}</AppText>
      {children}
      <TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
        <AppText style={styles.continueText}>{buttonTitle}</AppText>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);

const individualDeductionFields = [
  ['pensionContribution', 'Pension Contribution'],
  ['rentRelief', 'Relief Rent (CRA)'],
  ['housingFund', 'National Housing Fund (2.5%)'],
];

const smeIncomeFields = [
  ['businessRevenue', 'Business Revenue (Required)'],
  ['serviceIncome', 'Service Income'],
  ['investments', 'Investments'],
];

const smeDeductionFields = [
  ['businessExpenses', 'Business Expenses'],
  ['loan', 'Loan'],
  ['taxCredits', 'Tax Credits/Reliefs'],
];

const getTaxRate = (annualTaxableIncome) => {
  if (annualTaxableIncome <= 300000) return '7%';
  if (annualTaxableIncome <= 600000) return '11%';
  if (annualTaxableIncome <= 1100000) return '15%';
  if (annualTaxableIncome <= 1600000) return '19%';
  if (annualTaxableIncome <= 3200000) return '21%';
  return '24%';
};

const calculateProgressivePaye = (annualTaxableIncome) => {
  const bands = [
    [300000, 0.07],
    [300000, 0.11],
    [500000, 0.15],
    [500000, 0.19],
    [1600000, 0.21],
    [Infinity, 0.24],
  ];

  let remaining = Math.max(annualTaxableIncome, 0);
  let tax = 0;

  for (const [limit, rate] of bands) {
    if (remaining <= 0) break;
    const taxableBand = Math.min(remaining, limit);
    tax += taxableBand * rate;
    remaining -= taxableBand;
  }

  return tax;
};

const buildPayeCalculation = (grossIncome, deductions) => {
  const monthlyGross = Number(grossIncome) || 0;
  const monthlyDeductions = Number(deductions) || 0;
  const annualGross = monthlyGross * 12;
  const consolidatedRelief = Math.max(annualGross * 0.01, 200000) + annualGross * 0.2;
  const annualDeductions = monthlyDeductions * 12;
  const annualTaxableIncome = Math.max(annualGross - consolidatedRelief - annualDeductions, 0);
  const annualTax = calculateProgressivePaye(annualTaxableIncome);
  const monthlyTax = annualTax / 12;
  const monthlyNetIncome = Math.max(monthlyGross - monthlyDeductions - monthlyTax, 0);

  return {
    monthlyGross,
    monthlyDeductions,
    annualGross,
    consolidatedRelief,
    annualDeductions,
    annualTaxableIncome,
    annualTax,
    monthlyTax,
    monthlyNetIncome,
    taxRate: getTaxRate(annualTaxableIncome),
  };
};

export const IndividualDeductionsScreen = ({ navigation, route }) => {
  const grossIncome = route?.params?.grossIncome || 0;
  const income = route?.params?.income || {};
  const [deductions, setDeductions] = useState({
    pensionContribution: '',
    rentRelief: '',
    housingFund: '',
  });

  const totalDeductions = useMemo(
    () => Object.values(deductions).reduce((total, value) => total + parseAmount(value), 0),
    [deductions]
  );

  const updateDeduction = (key, value) => {
    setDeductions((current) => ({ ...current, [key]: value }));
  };

  return (
    <CalcShell
      title="Individuals"
      subtitle={'Input what reduces taxable\nincome'}
      onContinue={() => navigation.navigate('PAYETaxDetails', { income, deductions, grossIncome, totalDeductions })}
    >
      <View style={styles.row}>
        <AppText style={styles.sectionTitle}>Deduction/Credit</AppText>
        <PeriodToggle />
      </View>
      <TouchableOpacity style={styles.standardBtn}>
        <AppText style={styles.standardText}>CRA is calculated automatically</AppText>
      </TouchableOpacity>
      {individualDeductionFields.map(([key, label]) => (
        <AmountField key={key} label={label} value={deductions[key]} onChangeText={(value) => updateDeduction(key, value)} />
      ))}
      <AmountField label="Total Deductions" value={totalDeductions ? formatCurrency(totalDeductions) : ''} editable={false} />
    </CalcShell>
  );
};

export const SMEIncomeScreen = ({ navigation }) => {
  const [income, setIncome] = useState({
    businessRevenue: '',
    serviceIncome: '',
    investments: '',
  });
  const grossIncome = useMemo(
    () => Object.values(income).reduce((total, value) => total + parseAmount(value), 0),
    [income]
  );

  return (
    <CalcShell
      title="SMEs"
      subtitle={'Enter your business income details for\naccurate tax calculation'}
      onContinue={() => navigation.navigate('SMEDeductions', { income, grossIncome })}
    >
      <View style={styles.row}>
        <AppText style={styles.sectionTitle}>Income Details</AppText>
        <PeriodToggle />
      </View>
      {smeIncomeFields.map(([key, label]) => (
        <AmountField key={key} label={label} value={income[key]} onChangeText={(value) => setIncome((current) => ({ ...current, [key]: value }))} />
      ))}
      <AmountField label="Gross Income Summary" value={grossIncome ? formatCurrency(grossIncome) : ''} editable={false} />
    </CalcShell>
  );
};

export const SMEDeductionsScreen = ({ navigation, route }) => {
  const [deductions, setDeductions] = useState({
    businessExpenses: '',
    loan: '',
    taxCredits: '',
  });
  const totalDeductions = useMemo(
    () => Object.values(deductions).reduce((total, value) => total + parseAmount(value), 0),
    [deductions]
  );

  return (
    <CalcShell
      title="SMEs"
      subtitle={'Input allowable deductions to\ncalculate taxable income'}
      onContinue={() => navigation.navigate('SMETaxBand', { ...route?.params, deductions, totalDeductions })}
    >
      <View style={styles.row}>
        <AppText style={styles.sectionTitle}>Deduction/Credit</AppText>
        <PeriodToggle />
      </View>
      {smeDeductionFields.map(([key, label]) => (
        <AmountField key={key} label={label} value={deductions[key]} onChangeText={(value) => setDeductions((current) => ({ ...current, [key]: value }))} />
      ))}
      <AmountField label="Total Deductions" value={totalDeductions ? formatCurrency(totalDeductions) : ''} editable={false} />
    </CalcShell>
  );
};

export const PAYETaxDetailsScreen = ({ navigation, route }) => {
  const calculation = buildPayeCalculation(route?.params?.grossIncome, route?.params?.totalDeductions);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Back navigation={navigation} />
        <AppText style={styles.centerTitle}>PAYE Tax Details</AppText>
        <AppText style={styles.centerSub}>Detailed tax breakdown based{'\n'}on Nigeria tax law</AppText>

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
          <InfoBox
            title="Net Income"
            body={`${formatCurrency(calculation.monthlyGross)} - ${formatCurrency(calculation.monthlyDeductions)} - ${formatCurrency(calculation.monthlyTax)}\nGross Income   Deductions   Tax\n\nTotal = ${formatCurrency(calculation.monthlyNetIncome)}`}
            dot
          />
          <InfoBox
            title="Annual Taxable Income"
            body={`${formatCurrency(calculation.annualGross)} - ${formatCurrency(calculation.consolidatedRelief)} - ${formatCurrency(calculation.annualDeductions)}\nAnnual gross   CRA relief   Annual deductions\n\nTaxable = ${formatCurrency(calculation.annualTaxableIncome)}\nRate band = ${calculation.taxRate}`}
          />
          <InfoBox
            title="Annual Tax"
            body={`Progressive PAYE tax\n= ${formatCurrency(calculation.annualTax)}\n\nMonthly Tax Payment\n${formatCurrency(calculation.annualTax)} / 12\n= ${formatCurrency(calculation.monthlyTax)}`}
          />
          <InfoBox
            title=""
            body={`• Net Income   ${formatCurrency(calculation.monthlyNetIncome)}\n\n• Tax              ${formatCurrency(calculation.monthlyTax)}\n\n• Deduction   ${formatCurrency(calculation.monthlyDeductions)}`}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('PAYETaxBand')}>
          <AppText style={styles.help}>Need help understanding your tax rate?</AppText>
          <AppText style={styles.helpLink}>Check PAYE Tax Bands →</AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('PAYEResult', { calculation })}>
          <AppText style={styles.continueText}>View Result</AppText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export const PAYETaxBandScreen = ({ navigation }) => (
  <TaxBand
    navigation={navigation}
    rows={[
      ['First 300,000', '7%'],
      ['Next 300,000', '11%'],
      ['Next 500,000', '15%'],
      ['Next 500,000', '19%'],
      ['Next 1,600,000', '21%'],
      ['Above 3,200,000', '24%'],
    ]}
    headerLeft="Annual Taxable Income (₦)"
    note="PAYE in Nigeria uses progressive bands after allowable reliefs and deductions have been removed from annual income."
    button="Back to Calculator"
    onPress={() => navigation.navigate('MainTabs', { screen: 'Calculator' })}
  />
);

export const SMETaxBandScreen = ({ navigation }) => (
  <TaxBand
    navigation={navigation}
    rows={[
      ['Small Company CIT 0 -25M', '0%'],
      ['Medium Company 25M - 100M', '20%'],
      ['Large Company 100M - Above', '30%'],
      ['VAT', '7.5%'],
      ['WHT (Deducts/Services)', '5%'],
      ['WHT (Rent/Dividends/Interest)', '5%'],
    ]}
    headerLeft="Tax Type (₦)"
    note="VAT is added to the price of goods and services when they are sold. It is paid by the customer, but collected by the business and remitted to the government."
    button="Continue"
    onPress={() => navigation.navigate('PAYEResult')}
  />
);

const TaxBand = ({ navigation, rows, headerLeft, note, button, onPress }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Back navigation={navigation} />
      <AppText style={styles.centerTitle}>PAYE Tax Band</AppText>
      <AppText style={styles.centerSub}>Nigerian annual income tax{'\n'}rates and brackets</AppText>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <AppText style={styles.tableHead}>{headerLeft}</AppText>
          <AppText style={styles.tableHead}>Tax Rate</AppText>
        </View>
        {rows.map(([left, right, active]) => (
          <View key={left} style={[styles.tableRow, active && styles.activeRow]}>
            <AppText style={[styles.tableText, active && styles.activeText]}>{left}</AppText>
            <AppText style={[styles.tableText, active && styles.activeText]}>{right}</AppText>
          </View>
        ))}
      </View>
      <AppText style={styles.note}>{note}</AppText>
      <TouchableOpacity style={styles.continueBtn} onPress={onPress}>
        <AppText style={styles.continueText}>{button}</AppText>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);

export const PAYEResultScreen = ({ navigation, route }) => {
  const calculation = route?.params?.calculation || buildPayeCalculation(0, 0);
  const totalTaxAndDeductions = calculation.monthlyTax + calculation.monthlyDeductions;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Back navigation={navigation} />
        <AppText style={styles.centerTitle}>PAYE Tax Result</AppText>
        <AppText style={styles.centerSub}>Summary after tax and{'\n'}deduction</AppText>
        <AppText style={styles.resultHead}>Tax & Deductions Summary</AppText>
        <AppText style={styles.resultText}>Tax + Deduction = {formatCurrency(calculation.monthlyTax)} + {formatCurrency(calculation.monthlyDeductions)}</AppText>
        <AppText style={styles.resultText}>Total = {formatCurrency(totalTaxAndDeductions)}</AppText>
        <AppText style={styles.resultHead}>Net Salary (Take-Home Pay)</AppText>
        <AppText style={styles.resultText}>Gross Income - Tax & Deduction = {formatCurrency(calculation.monthlyGross)} - {formatCurrency(totalTaxAndDeductions)}</AppText>
        <AppText style={styles.resultText}>Total = {formatCurrency(calculation.monthlyNetIncome)}</AppText>
        <AppText style={styles.summaryTitle}>Summary</AppText>
        {[
          ['Final Salary', formatCurrency(calculation.monthlyNetIncome)],
          ['Total Tax', formatCurrency(calculation.monthlyTax)],
          ['Total Deduction', formatCurrency(calculation.monthlyDeductions)],
        ].map(([label, value]) => (
          <View key={label} style={styles.summaryRow}>
            <AppText style={styles.summaryLabel}>{label}</AppText>
            <AppText style={styles.summaryValue}>{value}</AppText>
          </View>
        ))}
        <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('SavedSuccess')}>
          <AppText style={styles.continueText}>Save Results</AppText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export const SavedSuccessScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.successWrap}>
      <View style={styles.successCircle}>
        <Ionicons name="checkmark" size={110} color={COLORS.white} />
      </View>
      <AppText style={styles.savedTitle}>Saved Successfully</AppText>
      <AppText style={styles.savedSub}>Your tax calculation has been saved{'\n'}successfully.</AppText>
      <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('MainTabs', { screen: 'Calculator' })}>
        <AppText style={styles.continueText}>Back to Calculator</AppText>
      </TouchableOpacity>
      <View style={styles.successLinks}>
        <AppText style={styles.share}>Share Result ↴</AppText>
        <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Profile' })}>
          <AppText style={styles.saveProfile}>Save to Profile →</AppText>
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>
);

const Legend = ({ color, label }) => (
  <View style={styles.legend}>
    <View style={[styles.legendDot, { backgroundColor: color }]} />
    <AppText style={styles.legendText}>{label}</AppText>
  </View>
);

const InfoBox = ({ title, body, dot }) => (
  <View style={styles.infoBox}>
    {title ? <AppText style={styles.infoTitle}>{dot ? '• ' : ''}{title}</AppText> : null}
    <AppText style={styles.infoBody}>{body}</AppText>
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
  sectionTitle: { fontSize: 20, fontWeight: '900', color: COLORS.black },
  standardBtn: { alignSelf: 'flex-end', backgroundColor: COLORS.primary, borderRadius: RADIUS.sm, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, marginBottom: SPACING.lg },
  standardText: { color: COLORS.white, fontSize: FONTS.sizes.md, fontWeight: '700' },
  continueBtn: { alignSelf: 'center', width: '70%', backgroundColor: COLORS.primary, borderRadius: RADIUS.md, paddingVertical: SPACING.md, alignItems: 'center', marginTop: SPACING.lg, marginBottom: SPACING.lg },
  continueText: { color: COLORS.white, fontSize: FONTS.sizes.xl, fontWeight: '700' },
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
  infoBox: { width: '47%', backgroundColor: COLORS.gray300, padding: SPACING.md, minHeight: 178 },
  infoTitle: { fontSize: FONTS.sizes.lg, fontWeight: '900', color: COLORS.black, marginBottom: SPACING.md },
  infoBody: { fontSize: FONTS.sizes.sm, fontWeight: '700', color: COLORS.black, lineHeight: 20 },
  help: { textAlign: 'center', fontSize: FONTS.sizes.lg, color: COLORS.black, marginTop: SPACING.xl },
  helpLink: { textAlign: 'center', fontSize: FONTS.sizes.lg, color: COLORS.primary, fontWeight: '700' },
  table: { borderWidth: 2, borderColor: COLORS.black, borderRadius: RADIUS.lg, overflow: 'hidden', marginBottom: SPACING.xl },
  tableRow: { minHeight: 72, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.md, borderBottomWidth: 2, borderBottomColor: COLORS.black },
  tableHead: { fontSize: FONTS.sizes.xl, fontWeight: '700', color: COLORS.black },
  tableText: { fontSize: FONTS.sizes.lg, color: COLORS.black },
  activeRow: { backgroundColor: COLORS.primary },
  activeText: { color: COLORS.white, fontWeight: '800' },
  note: { fontSize: FONTS.sizes.xl, lineHeight: 35, color: COLORS.textDark, marginBottom: SPACING.xl },
  resultHead: { fontSize: 24, fontWeight: '900', marginTop: SPACING.xl, marginBottom: SPACING.sm },
  resultText: { fontSize: 22, fontWeight: '500', lineHeight: 32 },
  summaryTitle: { fontSize: FONTS.sizes.xxl, fontWeight: '900', marginTop: SPACING.xxxl, marginBottom: SPACING.md },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.md },
  summaryLabel: { fontSize: 26, fontWeight: '600' },
  summaryValue: { fontSize: 26, fontWeight: '600' },
  successWrap: { flex: 1, paddingHorizontal: SPACING.lg, justifyContent: 'center', alignItems: 'center' },
  successCircle: { width: 190, height: 190, borderRadius: 95, backgroundColor: '#50D37E', alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.xl },
  savedTitle: { fontSize: FONTS.sizes.xl, fontWeight: '900', marginBottom: SPACING.md },
  savedSub: { fontSize: 24, fontWeight: '700', textAlign: 'center', lineHeight: 34, marginBottom: SPACING.xxxl },
  successLinks: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: SPACING.xl },
  share: { fontSize: 24, fontWeight: '800', color: COLORS.black },
  saveProfile: { fontSize: 24, fontWeight: '800', color: COLORS.primary },
});
