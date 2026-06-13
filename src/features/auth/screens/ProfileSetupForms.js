import React from 'react';
import AppText from '../../../components/AppText';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../../../theme/tokens';
import { useAuth } from '../../../providers/AuthProvider';

const demoUser = (type) => ({
  id: 'demo-user',
  firstName: type === 'business' ? 'Doe' : 'John',
  lastName: type === 'business' ? 'Enterprises' : 'Doe',
  email: 'Johndoe@gmail.com',
  userType: type,
});

const Field = ({ label, placeholder, compact }) => (
  <View style={[styles.field, compact && styles.compactField]}>
    <AppText style={styles.label}>{label}</AppText>
    <TextInput placeholder={placeholder} placeholderTextColor="#9CA3AF" style={[styles.input, compact && styles.compactInput]} />
  </View>
);

const SectionTitle = ({ children }) => <AppText style={styles.sectionTitle}>{children}</AppText>;

const SetupShell = ({ title, subtitle, children, onSave, navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <AppText style={styles.title}>{title}</AppText>
      </View>
      <AppText style={styles.subtitle}>{subtitle}</AppText>
      {children}
      <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
        <AppText style={styles.saveText}>Save and continue</AppText>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);

export const FreelancerProfileForm = ({ navigation }) => {
  const { login } = useAuth();
  const save = () => login(demoUser('individual'), 'demo-token');
  return (
    <SetupShell title="Freelancer Profile" subtitle="Set your freelancer account" onSave={save} navigation={navigation}>
      <SectionTitle>Personal Information:</SectionTitle>
      <Field label="Full Name" placeholder="Input your name" />
      <Field label="Email Address" placeholder="Input your email" />
      <Field label="Phone Number" placeholder="Input your phone number" />
      <SectionTitle>Freelancer Information:</SectionTitle>
      <Field label="Profession" />
      <Field label="Monthly Income" />
      <Field label="Years Of Experience" />
      <SectionTitle>Tax Information:</SectionTitle>
      <Field label="TIN:" />
      <Field label="Estimated Annual Income" />
    </SetupShell>
  );
};

export const EmployeeProfileForm = ({ navigation }) => {
  const { login } = useAuth();
  const save = () => login(demoUser('individual'), 'demo-token');
  return (
    <SetupShell title="Employee Profile" subtitle="Set your employee account" onSave={save} navigation={navigation}>
      <SectionTitle>Personal Information:</SectionTitle>
      <Field label="Full Name" placeholder="Input your name" />
      <Field label="Email Address" placeholder="Input your email" />
      <Field label="Phone Number" placeholder="Input your phone number" />
      <Field label="Residential Address" placeholder="Input your residential address" />
      <SectionTitle>Employment Information:</SectionTitle>
      <Field label="Company Name" placeholder="E.g. John Enterprise" />
      <Field label="Job Title" placeholder="E.g. Manager" />
      <Field label="Employment Type" placeholder="E.g. Full Time" />
      <Field label="Years Of Experience" placeholder="E.g. 2 years" />
      <SectionTitle>Salary Information:</SectionTitle>
      <View style={styles.inlineLine}><AppText style={styles.inlineLabel}>Monthly Salary:</AppText><Field compact /></View>
      <View style={styles.inlineLine}><AppText style={styles.inlineLabel}>Salary Frequency:</AppText><Field compact /></View>
      <SectionTitle>Tax & Deductions:</SectionTitle>
      <View style={styles.inlineLine}><AppText style={styles.inlineLabel}>TIN:</AppText><Field compact /></View>
      <SectionTitle>Others:</SectionTitle>
      <View style={styles.inlineLine}><AppText style={styles.inlineLabel}>Pension:</AppText><Field compact /></View>
      <View style={styles.inlineLine}><AppText style={styles.inlineLabel}>NHF Deductions:</AppText><Field compact /></View>
      <View style={styles.inlineLine}><AppText style={styles.inlineLabel}>NHIS Deductions:</AppText><Field compact /></View>
      <View style={styles.inlineLine}><AppText style={styles.inlineLabel}>Registered with FIRS:</AppText><Field compact /></View>
      <SectionTitle>Notification Preferences:</SectionTitle>
      <View style={styles.inlineLine}><AppText style={styles.inlineLabel}>Salary tax reminders:</AppText><Field compact /></View>
      <View style={styles.inlineLine}><AppText style={styles.inlineLabel}>Monthly reports:</AppText><Field compact /></View>
    </SetupShell>
  );
};

export const BusinessProfileForm = ({ navigation }) => {
  const { login } = useAuth();
  const save = () => login(demoUser('business'), 'demo-token');
  return (
    <SetupShell title="Business Owner Profile" subtitle="Set your business account" onSave={save} navigation={navigation}>
      <SectionTitle>Personal Information:</SectionTitle>
      <Field label="Full Name" placeholder="Input your name" />
      <Field label="Email Address" placeholder="Input your email" />
      <Field label="Phone Number" placeholder="Input your phone number" />
      <SectionTitle>Business Information:</SectionTitle>
      <Field label="Business Name" placeholder="E.g. John Enterprise" />
      <Field label="Business Type" placeholder="E.g. Sole Proprietorship" />
      <Field label="Industry Category" />
      <Field label="CAC Registration Number" placeholder="E.g. 1268" />
      <SectionTitle>Financial Information:</SectionTitle>
      <Field label="Estimated Monthly Revenue" />
      <Field label="Number Of Employees" />
      <Field label="Business Bank Name" />
      <Field label="Business Account Number" />
      <SectionTitle>Tax Information:</SectionTitle>
      <View style={styles.inlineLine}><AppText style={styles.inlineLabel}>TIN:</AppText><Field compact /></View>
      <SectionTitle>Notification Preferences:</SectionTitle>
      <View style={styles.inlineLine}><AppText style={styles.inlineLabel}>Salary tax reminders:</AppText><Field compact /></View>
      <View style={styles.inlineLine}><AppText style={styles.inlineLabel}>Monthly reports:</AppText><Field compact /></View>
    </SetupShell>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingHorizontal: 18, paddingTop: SPACING.lg, paddingBottom: SPACING.xxl },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minHeight: 44 },
  backBtn: { position: 'absolute', left: 0, width: 34, height: 34, justifyContent: 'center' },
  title: { flex: 1, maxWidth: 260, textAlign: 'center', fontSize: 28, lineHeight: 33, fontWeight: '800', color: COLORS.primary },
  subtitle: { fontSize: 18, fontWeight: '800', color: COLORS.textDark, marginTop: SPACING.sm, marginBottom: SPACING.lg },
  sectionTitle: { fontSize: 20, color: '#343D4C', marginTop: SPACING.md, marginBottom: SPACING.sm },
  field: { marginBottom: SPACING.sm },
  compactField: { flex: 1, marginBottom: 0 },
  label: { fontSize: 12, color: COLORS.textDark, fontWeight: '800', marginBottom: 3 },
  input: { height: 31, borderWidth: 1, borderColor: COLORS.black, borderRadius: 6, backgroundColor: COLORS.white, paddingHorizontal: 8, fontSize: 12, color: COLORS.textDark },
  compactInput: { height: 28 },
  inlineLine: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.sm },
  inlineLabel: { minWidth: 122, fontSize: 12, color: COLORS.textDark },
  saveBtn: { alignSelf: 'flex-end', marginTop: SPACING.xl, backgroundColor: COLORS.primary, paddingHorizontal: SPACING.md, paddingVertical: SPACING.md, borderRadius: RADIUS.sm, ...SHADOWS.medium },
  saveText: { color: COLORS.white, fontSize: 18, fontWeight: '900' },
});