import React from 'react';
import AppText from '../../../components/AppText';
import { View, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../../../theme/tokens';
import { appImages } from '../../../lib/assets';

const IndividualProfileTypeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-outline" size={40} color={COLORS.black} />
        </TouchableOpacity>

        <AppText style={styles.title}>Individual Profile</AppText>
        <AppText style={styles.subtitle}>What best describes you ?</AppText>

        <ProfileCard
          title="Freelancer"
          description="Self employed or contract based worker"
          image={appImages.freelancerCard}
          onPress={() => navigation.navigate('FreelancerProfileForm')}
        />

        <ProfileCard
          title="Employee"
          description="Works under an organisation or company."
          image={appImages.individualCard}
          muted
          onPress={() => navigation.navigate('EmployeeProfileForm')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const ProfileCard = ({ title, description, image, muted, onPress }) => (
  <ImageBackground source={image} style={[styles.card, muted && styles.mutedCard]} imageStyle={styles.cardImage}>
    <View style={[styles.cardFade, muted && styles.mutedFade]} />
    <AppText style={styles.cardTitle}>{title}</AppText>
    <View style={styles.cardBottom}>
      <AppText style={styles.cardDescription}>{description}</AppText>
      <TouchableOpacity style={styles.selectBtn} onPress={onPress}>
        <AppText style={styles.selectText}>Select</AppText>
      </TouchableOpacity>
    </View>
  </ImageBackground>
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
  cardImage: { borderRadius: RADIUS.lg, opacity: 0.4, width: 'fit-content', },
  cardFade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.62)' },
  mutedCard: { backgroundColor: '#FFFFFF', shadowOpacity: 0 },
  mutedFade: { backgroundColor: 'rgba(255,255,255,0.75)' },
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