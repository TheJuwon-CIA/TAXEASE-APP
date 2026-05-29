import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';

const AccountSuccessScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Center badge + text */}
      <View style={styles.center}>
        {/* Gear-shaped badge */}
        <View style={styles.badge}>
          <Ionicons name="checkmark" size={48} color={COLORS.white} />
        </View>
        <Text style={styles.title}>Account creation{'\n'}successful!</Text>
      </View>

      {/* Next button — bottom right */}
      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => navigation.navigate('SelectType')}
        >
          <Text style={styles.nextText}>Next</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.lg,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
    // Simulate badge shape with extra shadow
    shadowColor: COLORS.primaryLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '800',
    color: COLORS.primaryLight,
    textAlign: 'center',
    lineHeight: 44,
  },
  bottomRow: {
    alignItems: 'flex-end',
    paddingBottom: SPACING.xl,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.xl,
    gap: SPACING.sm,
  },
  nextText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.white,
  },
});

export default AccountSuccessScreen;
