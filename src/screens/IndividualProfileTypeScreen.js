import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../constants/theme';

const IndividualProfileTypeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-outline" size={40} color={COLORS.black} />
        </TouchableOpacity>

        <Text style={styles.title}>Individual Profile</Text>
        <Text style={styles.subtitle}>What best describes you ?</Text>

        <ProfileCard
          title="Freelancer"
          description="Self employed or contract based worker"
          icon="briefcase-outline"
          onPress={() => navigation.navigate('FreelancerProfileForm')}
        />

        <ProfileCard
          title="Employee"
          description="Works under an organisation or company."
          icon="id-card-outline"
          muted
          onPress={() => navigation.navigate('EmployeeProfileForm')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const ProfileCard = ({ title, description, icon, muted, onPress }) => (
  <View style={[styles.card, muted && styles.mutedCard]}>
    <Ionicons name={icon} size={120} color="rgba(45,184,45,0.16)" style={styles.cardIcon} />
    <Text style={styles.cardTitle}>{title}</Text>
    <View style={styles.cardBottom}>
      <Text style={styles.cardDescription}>{description}</Text>
      <TouchableOpacity style={styles.selectBtn} onPress={onPress}>
        <Text style={styles.selectText}>Select</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: SPACING.xxl },
  backBtn: { width: 44, marginBottom: SPACING.sm },
  title: { fontSize: FONTS.sizes.xxl, fontWeight: '800', color: COLORS.textDark, marginBottom: SPACING.md },
  subtitle: { fontSize: 22, fontWeight: '600', color: '#424B5A', marginBottom: SPACING.xl },
  card: {
    height: 235,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    backgroundColor: '#EAF7EE',
    marginBottom: SPACING.xxl,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  mutedCard: { backgroundColor: '#FFFFFF', shadowOpacity: 0 },
  cardIcon: { position: 'absolute', right: 10, top: 24 },
  cardTitle: { fontSize: FONTS.sizes.xl, fontWeight: '900', color: COLORS.textDark },
  cardBottom: { flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  cardDescription: { fontSize: FONTS.sizes.lg, color: COLORS.black, lineHeight: 25, maxWidth: '55%' },
  selectBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    minWidth: 120,
    alignItems: 'center',
  },
  selectText: { color: COLORS.white, fontWeight: '800', fontSize: FONTS.sizes.lg },
});

export default IndividualProfileTypeScreen;
