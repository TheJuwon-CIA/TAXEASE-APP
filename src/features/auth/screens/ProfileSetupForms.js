import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../theme/tokens';
import { useAuth } from '../../../providers/AuthProvider';

const demoUser = (type) => ({
  id: 'demo-user',
  firstName: 'John',
  lastName: 'Doe',
  email: 'Johndoe@gmail.com',
  userType: type,
});

const Field = ({ label, placeholder, compact }) => (
  <View style={[styles.field, compact && styles.compactField]}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#6F7784"
      style={styles.input}
    />
  </View>
);

const SectionTitle = ({ children }) => <Text style={styles.sectionTitle}>{children}</Text>;

const SetupShell = ({ title, subtitle, children, onSave, navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle-outline" size={40} color={COLORS.black} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {children}
      <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
        <Text style={styles.saveText}>Save And Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);

export const FreelancerProfileForm = ({ navigation }) => {
  const { login } = useAuth();
  const save = () => login(demoUser('freelancer'), 'demo-token');

  return (
    <SetupShell title="Freelancer Profile" subtitle="Set your freelancer Account" onSave={save} navigation={navigation}>
      <SectionTitle>Personal Information :</SectionTitle>
      <View style={styles.group}>
        <Field label="Full Name:" placeholder="INPUT YOUR NAME" />
        <Field label="Email Adress:" placeholder="INPUT YOUR EMAIL" />
        <Field label="Phone Number:" placeholder="INPUT YOUR PHONE NUMBER" />
      </View>

      <View style={styles.outlined}>
        <SectionTitle>Freelancer Information :</SectionTitle>
        <Field label="Profession:" />
        <Field label="Monthly Income:" />
        <Field label="Years Of Experience:" />
      </View>

      <SectionTitle>Tax Information :</SectionTitle>
      <Field label="TIN:" />
      <Field label="Estimated Annual Income:" />
    </SetupShell>
  );
};

export const EmployeeProfileForm = ({ navigation }) => {
  const { login } = useAuth();
  const save = () => login(demoUser('employee'), 'demo-token');

  return (
    <SetupShell title="Employee Profile" subtitle="Set your employee account :" onSave={save} navigation={navigation}>
      <SectionTitle>Personal Information :</SectionTitle>
      <Field label="Full Name:" placeholder="INPUT YOUR NAME" />
      <Field label="Email Adress:" placeholder="INPUT YOUR EMAIL" />
      <Field label="Phone Number:" placeholder="INPUT YOUR PHONE NUMBER" />
      <Field label="Residential Address:" placeholder="INPUT YOUR ADDRESS" />

      <SectionTitle>Employment Information :</SectionTitle>
      <Field label="Company Name:" placeholder="E.g, john enterprises" />
      <Field label="Job Title:" placeholder="E.g, Full Time" />
      <Field label="Employment Type:" placeholder="E.g, Full Time" />
      <Field label="Years Of Experience :" placeholder="E.g, Full Time" />

      <SectionTitle>Salary Information :</SectionTitle>
      <View style={styles.inlineRow}>
        <Field label="Monthly Salary:" compact />
        <Field label="Payment Frequency:" compact />
      </View>

      <SectionTitle>Tax & Deductions :</SectionTitle>
      <Field label="TIN:" />
      <SectionTitle>Others:</SectionTitle>
      <Field label="Pension:" />
      <Field label="NHF Deduction:" />
      <Field label="NHIS Deduction:" />
      <Field label="Registered With FIRS:" />

      <SectionTitle>Notification preferences :</SectionTitle>
      <View style={styles.inlineRow}>
        <Field label="Salary Tax Remainders:" compact />
        <Field label="Monthly Reports:" compact />
      </View>
    </SetupShell>
  );
};

export const BusinessProfileForm = ({ navigation }) => {
  const { login } = useAuth();
  const save = () => login(demoUser('business'), 'demo-token');

  return (
    <SetupShell title="Business owner Profile" subtitle="Set your business account :" onSave={save} navigation={navigation}>
      <SectionTitle>Personal Information :</SectionTitle>
      <Field label="Full Name:" placeholder="INPUT YOUR NAME" />
      <Field label="Email Adress:" placeholder="INPUT YOUR EMAIL" />
      <Field label="Phone Number:" placeholder="INPUT YOUR PHONE NUMBER" />

      <SectionTitle>Business Information :</SectionTitle>
      <Field label="Business Name:" placeholder="E.g, John's Enterprises" />
      <Field label="Business Type:" placeholder="E.g, Sole Proprietorship" />
      <Field label="Industry Category:" />
      <Field label="Business Address:" placeholder="E.g Wuse, Abuja" />
      <Field label="CAC Registration Number:" placeholder="E.g 1268.." />

      <SectionTitle>Financial Information :</SectionTitle>
      <Field label="Estimated Monthly Revenue:" />
      <Field label="Number Of Employees:" />
      <Field label="Business Bank Name:" />
      <Field label="Business Account Number:" />

      <SectionTitle>Tax Information :</SectionTitle>
      <Field label="TIN:" />

      <SectionTitle>Notification Preferences :</SectionTitle>
      <Field label="Tax Reminder:" />
      <Field label="Monthly Reports:" />
    </SetupShell>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: SPACING.xxl },
  backBtn: { width: 44, marginBottom: SPACING.sm },
  title: { fontSize: FONTS.sizes.xxl, fontWeight: '800', color: COLORS.textDark, marginBottom: SPACING.xs },
  subtitle: { fontSize: 24, fontWeight: '600', color: '#343D4C', marginBottom: SPACING.lg },
  sectionTitle: { fontSize: 24, color: '#343D4C', marginTop: SPACING.md, marginBottom: SPACING.sm },
  group: { marginBottom: SPACING.sm },
  outlined: { borderWidth: 2, borderColor: '#1597EF', padding: SPACING.xs, marginVertical: SPACING.md },
  field: { marginBottom: SPACING.sm },
  compactField: { flex: 1 },
  label: { fontSize: FONTS.sizes.lg, color: COLORS.textDark, marginLeft: SPACING.sm, marginBottom: SPACING.xs },
  input: {
    height: 32,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.gray300,
    paddingHorizontal: SPACING.md,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textDark,
  },
  inlineRow: { flexDirection: 'row', gap: SPACING.md, alignItems: 'center' },
  saveBtn: {
    alignSelf: 'flex-end',
    marginTop: SPACING.xl,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
  },
  saveText: { color: COLORS.white, fontSize: FONTS.sizes.lg, fontWeight: '700' },
});
