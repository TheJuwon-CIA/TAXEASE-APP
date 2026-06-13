import React, { useMemo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../theme/tokens';

export const parseAmount = (value) => {
  const clean = String(value || '').replace(/[^0-9.]/g, '');
  const parsed = Number(clean);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const formatCurrency = (value) => {
  const amount = Number(value) || 0;
  return `₦${Math.round(amount).toLocaleString('en-NG')}`;
};

const incomeFields = [
  ['basicSalary', 'Basic Salary (Required)'],
  ['housingAllowance', 'Housing Allowance'],
  ['otherAllowance', 'Other Allowance'],
];

const CalculatorScreen = ({ navigation }) => {
  const [income, setIncome] = useState({
    basicSalary: '',
    housingAllowance: '',
    otherAllowance: '',
  });

  const grossIncome = useMemo(
    () => Object.values(income).reduce((total, value) => total + parseAmount(value), 0),
    [income]
  );

  const updateIncome = (key, value) => {
    setIncome((current) => ({ ...current, [key]: value }));
  };

  const continueToDeductions = () => {
    navigation.navigate('IndividualDeductions', {
      income,
      grossIncome,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppText style={styles.pill}>Individuals</AppText>
        <AppText style={styles.heading}>Enter all sources of your{'\n'}monthly income.</AppText>

        <View style={styles.row}>
          <AppText style={styles.sectionTitle}>Income Details</AppText>
          <PeriodToggle />
        </View>

        {incomeFields.map(([key, label]) => (
          <AmountField key={key} label={label} value={income[key]} onChangeText={(value) => updateIncome(key, value)} />
        ))}
        <AmountField label="Gross Income Summary" value={grossIncome ? formatCurrency(grossIncome) : ''} editable={false} />

        <TouchableOpacity style={styles.continueBtn} onPress={continueToDeductions}>
          <AppText style={styles.continueText}>Continue</AppText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export const PeriodToggle = () => (
  <View style={styles.toggle}>
    <AppText style={styles.toggleActive}>Monthly</AppText>
    <AppText style={styles.toggleInactive}>Annual</AppText>
  </View>
);

export const AmountField = ({ label, value, onChangeText, editable = true, placeholder = 'Enter amount' }) => (
  <View style={styles.amountBlock}>
    <AppText style={styles.amountLabel}>{label}</AppText>
    <TextInput
      style={[styles.amountInput, !editable && styles.readOnlyInput]}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
      keyboardType="numeric"
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: 120 },
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
  heading: { textAlign: 'center', fontSize: 26, fontWeight: '900', lineHeight: 34, marginBottom: SPACING.xl },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: SPACING.lg },
  sectionTitle: { fontSize: 27, fontWeight: '900', color: COLORS.black },
  toggle: { flexDirection: 'row', borderRadius: RADIUS.sm, overflow: 'hidden', backgroundColor: '#67BD70' },
  toggleActive: { backgroundColor: COLORS.primary, color: COLORS.white, fontSize: FONTS.sizes.lg, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm },
  toggleInactive: { color: COLORS.white, fontSize: FONTS.sizes.lg, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm },
  amountBlock: { marginBottom: SPACING.lg },
  amountLabel: { fontSize: FONTS.sizes.xl, fontWeight: '700', color: COLORS.black, marginBottom: SPACING.sm },
  amountInput: {
    height: 88,
    borderWidth: 3,
    borderColor: COLORS.black,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.xl,
    fontSize: FONTS.sizes.xl,
    color: COLORS.black,
  },
  readOnlyInput: { backgroundColor: '#F3F4F6', color: COLORS.textDark },
  continueBtn: {
    alignSelf: 'center',
    width: '78%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  continueText: { color: COLORS.white, fontSize: FONTS.sizes.xxl, fontWeight: '700' },
});

export default CalculatorScreen;
