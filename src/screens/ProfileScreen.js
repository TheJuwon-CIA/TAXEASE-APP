import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../constants/theme';

const Section = ({ title, items }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {items.map((item) => <Text key={item} style={styles.item}>{item}</Text>)}
  </View>
);

const ProfileScreen = ({ navigation }) => {
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
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>Johndoe@gmail.com</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <Section title="Payment Info" items={['Tax summary', 'Payment Method']} />
        <Section title="Settings" items={['Language', 'Theme', 'Notification', 'Contact support']} />
        <Section title="About Us" items={['Taxease', 'FAQs']} />
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
});

export default ProfileScreen;
