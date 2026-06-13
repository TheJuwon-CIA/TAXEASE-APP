import React from 'react';
import AppText from '../../../components/AppText';
import { View, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
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
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle-outline" size={31} color={COLORS.black} />
          </TouchableOpacity>
          <AppText style={styles.title}>Profile Type</AppText>
          <View style={styles.headerSpacer} />
        </View>
        <AppText style={styles.subtitle}>Select the option that describes you :</AppText>

        {OPTIONS.map((item) => (
          <View key={item.title} style={styles.cardWrapper}>
          <ImageBackground
            key={item.title}
            source={item.image}
            resizeMode="cover"
            style={styles.card}
            imageStyle={styles.cardImage}
          >
            <AppText style={styles.cardTitle}>{item.title}</AppText>
            <TouchableOpacity style={styles.selectBtn} onPress={() => navigation.navigate(item.route)}>
              <AppText style={styles.selectText}>Select</AppText>
            </TouchableOpacity>
          </ImageBackground>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.xxl },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerSpacer: { width: 40 },
  title: {
    fontSize: 27,
    lineHeight: 34,
    fontWeight: '800',
    color: COLORS.textDark,
    textAlign: 'center',
  },
  subtitle: { fontSize: 15, color: '#424B5A', marginBottom: SPACING.md },
  cardWrapper: {
  borderRadius: RADIUS.lg,
  marginBottom: SPACING.xl,

},
card: {
  height: 174,
  borderRadius: RADIUS.lg,
  overflow: 'hidden',  // clip lives here, no shadow
  padding: SPACING.md,
  justifyContent: 'space-between',
},
  cardImage: {
    borderRadius: RADIUS.lg,
    opacity: 0.4,
  },
  cardTitle: { fontSize: 20, fontWeight: '900', color: COLORS.textDark },
  selectBtn: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 9,
    borderRadius: RADIUS.full,
    minWidth: 72,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  selectText: { color: COLORS.white, fontWeight: '800', fontSize: 11 },
});

export default ProfileTypeScreen;
