import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={48} color={COLORS.white} />
        </View>
        <Text style={styles.name}>
          {user ? `${user.firstName} ${user.lastName}` : 'User'}
        </Text>
        <Text style={styles.email}>{user?.email || ''}</Text>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.lg },
  avatar: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  name: { fontSize: FONTS.sizes.xxl, fontWeight: '800', color: COLORS.textDark, marginBottom: 4 },
  email: { fontSize: FONTS.sizes.md, color: COLORS.textMedium, marginBottom: SPACING.xl },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    padding: SPACING.md, borderRadius: 12,
    borderWidth: 1, borderColor: COLORS.error,
  },
  logoutText: { fontSize: FONTS.sizes.md, color: COLORS.error, fontWeight: '600' },
});

export default ProfileScreen;
