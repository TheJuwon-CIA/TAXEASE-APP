import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';

const values = ['₦ 500,000', '₦ 200,000', '₦ 100,000', '₦ 800,000'];
const labels = ['Basic Salary (Required)', 'Housing Allowance', 'Other Allowance', 'Gross Income Summary'];

const CalculatorScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.pill}>Individuals</Text>
      <Text style={styles.heading}>Enter all sources of your{'\n'}monthly income.</Text>

      <View style={styles.row}>
        <Text style={styles.sectionTitle}>Income Details</Text>
        <PeriodToggle />
      </View>

      {labels.map((label, index) => (
        <AmountField key={label} label={label} value={values[index]} />
      ))}

      <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('IndividualDeductions')}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);

export const PeriodToggle = () => (
  <View style={styles.toggle}>
    <Text style={styles.toggleActive}>Monthly</Text>
    <Text style={styles.toggleInactive}>Annual</Text>
  </View>
);

export const AmountField = ({ label, value }) => (
  <View style={styles.amountBlock}>
    <Text style={styles.amountLabel}>{label}</Text>
    <TextInput style={styles.amountInput} defaultValue={value} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: 120 },
  pill: {
    alignSelf: 'center',
    backgroundColor: '#078E18',
    color: COLORS.white,
    fontSize: 32,
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
  toggleActive: { backgroundColor: '#078E18', color: COLORS.white, fontSize: FONTS.sizes.lg, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm },
  toggleInactive: { color: COLORS.white, fontSize: FONTS.sizes.lg, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm },
  amountBlock: { marginBottom: SPACING.lg },
  amountLabel: { fontSize: FONTS.sizes.xl, fontWeight: '700', color: COLORS.black, marginBottom: SPACING.sm },
  amountInput: {
    height: 88,
    borderWidth: 3,
    borderColor: COLORS.black,
    borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.xl,
    fontSize: FONTS.sizes.xl,
    color: COLORS.black,
  },
  continueBtn: {
    alignSelf: 'center',
    width: '78%',
    backgroundColor: '#078E18',
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  continueText: { color: COLORS.white, fontSize: 38, fontWeight: '700' },
});

export default CalculatorScreen;
