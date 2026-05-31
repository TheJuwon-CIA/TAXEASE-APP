import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../../../theme/tokens';
import { appImages } from '../../../lib/assets';

const OPTIONS = [
  {
    title: 'Individual Profile',
    image: appImages.individualCard,
    route: 'IndividualProfileType',
  },
  {
    title: 'Business Profile',
    image: appImages.businessCard,
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
          <ImageBackground key={item.title} source={item.image} style={styles.card} imageStyle={styles.cardImage}>
            <View style={styles.cardFade} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <TouchableOpacity style={styles.selectBtn} onPress={() => navigation.navigate(item.route)}>
              <Text style={styles.selectText}>Select</Text>
            </TouchableOpacity>
          </ImageBackground>
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
    fontSize: FONTS.sizes.xxl,
    lineHeight: 44,
    fontWeight: '800',
    color: COLORS.textDark,
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
  cardImage: { borderRadius: RADIUS.lg },
  cardFade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.58)',
  },
  cardTitle: { fontSize: FONTS.sizes.xl, fontWeight: '900', color: COLORS.textDark },
  selectBtn: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    minWidth: 120,
    alignItems: 'center',
  },
  selectText: { color: COLORS.white, fontWeight: '800', fontSize: FONTS.sizes.lg },
});

export default ProfileTypeScreen;