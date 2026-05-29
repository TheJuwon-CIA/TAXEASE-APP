import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../constants/theme';

const OPTIONS = [
  {
    title: 'Individual Profile',
    icon: 'person-outline',
    color: '#DFF4E6',
    route: 'IndividualProfileType',
  },
  {
    title: 'Business Profile',
    icon: 'business-outline',
    color: '#E8F4FF',
    route: 'BusinessProfileForm',
  },
];

const ProfileTypeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-outline" size={40} color={COLORS.black} />
        </TouchableOpacity>

        <Text style={styles.title}>Profile Type</Text>
        <Text style={styles.subtitle}>Select the option that describes you :</Text>

        {OPTIONS.map((item) => (
          <View key={item.title} style={[styles.card, { backgroundColor: item.color }]}>
            <View style={styles.cardFade} />
            <Ionicons name={item.icon} size={120} color="rgba(45,184,45,0.18)" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <TouchableOpacity style={styles.selectBtn} onPress={() => navigation.navigate(item.route)}>
              <Text style={styles.selectText}>Select</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: SPACING.xxl },
  backBtn: { width: 44, marginBottom: SPACING.sm },
  title: {
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '800',
    color: '#253041',
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  subtitle: { fontSize: 21, color: '#424B5A', marginBottom: SPACING.xl },
  card: {
    height: 230,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginBottom: SPACING.xl,
    padding: SPACING.xl,
    justifyContent: 'space-between',
    ...SHADOWS.medium,
  },
  cardFade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.58)',
  },
  cardIcon: { position: 'absolute', right: 20, bottom: 20 },
  cardTitle: { fontSize: 30, fontWeight: '900', color: '#253041' },
  selectBtn: {
    alignSelf: 'flex-end',
    backgroundColor: '#12961F',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.full,
    minWidth: 120,
    alignItems: 'center',
  },
  selectText: { color: COLORS.white, fontWeight: '800', fontSize: FONTS.sizes.lg },
});

export default ProfileTypeScreen;
