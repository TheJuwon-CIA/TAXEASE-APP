import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AppText from '../../../components/AppText';
import { useAuth } from '../../../providers/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../../../theme/tokens';

const Section = ({ title, items }) => (
  <View style={styles.section}>
    <AppText style={styles.sectionTitle}>{title}</AppText>
    {items.map((item) => <AppText key={item} style={styles.item}>{item}</AppText>)}
  </View>
);

const ProfileScreen = ({ navigation }) => {
  const { logout } = useAuth();  // ← add this

  const handleSignOut = async () => {
    await logout();  // ← this sets token to null, which switches the stack automatically
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={48} color={COLORS.black} />
        </TouchableOpacity>

        <View style={styles.profileHead}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={64} color={COLORS.white} />
          </View>
          <AppText style={styles.name}>John Doe</AppText>
          <AppText style={styles.email}>Johndoe@gmail.com</AppText>
          <TouchableOpacity style={styles.editBtn}>
            <AppText style={styles.editText}>Edit Profile</AppText>
          </TouchableOpacity>
        </View>

        <Section title="Tax Info" items={['Tax summary', 'Calculation history']} />
        <Section title="Settings" items={['Language', 'Theme', 'Notification', 'Contact support']} />
        <Section title="About Us" items={['Taxease', 'FAQs']} />

        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
          <AppText style={styles.signOutText}>Sign Out</AppText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: 120 },
  backBtn: { width: 54, marginBottom: SPACING.xl },
  profileHead: { alignItems: 'center', marginBottom: SPACING.xxl },
  avatar: { width: 120, height: 120, borderRadius: 60, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.md },
  name: { fontSize: FONTS.sizes.xl, fontWeight: '900', color: COLORS.textDark },
  email: { fontSize: FONTS.sizes.sm, color: COLORS.textDark, marginVertical: SPACING.md },
  editBtn: { borderWidth: 2, borderColor: COLORS.primary, borderRadius: RADIUS.md, paddingHorizontal: SPACING.xl, paddingVertical: SPACING.sm },
  editText: { color: COLORS.primary, fontSize: FONTS.sizes.lg, fontWeight: '800' },
  section: { backgroundColor: COLORS.white, borderRadius: RADIUS.md, padding: SPACING.md, marginBottom: SPACING.xl, ...SHADOWS.medium },
  sectionTitle: { fontSize: 28, fontWeight: '900', color: COLORS.black, marginBottom: SPACING.md },
  item: { fontSize: 22, color: COLORS.black, marginBottom: SPACING.md },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
  },
  signOutText: { fontSize: 22, fontWeight: '800', color: COLORS.error },
});

export default ProfileScreen;