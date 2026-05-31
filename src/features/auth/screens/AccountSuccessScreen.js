import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../theme/tokens';
import { appImages } from '../../../lib/assets';

const AccountSuccessScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Image source={appImages.success} style={styles.successImage} resizeMode="contain" />
        <Text style={styles.title}>Account creation{'\n'}successful!</Text>
      </View>

      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => navigation.navigate('ProfileType')}
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
  successImage: {
    width: 118,
    height: 118,
    marginBottom: SPACING.xl,
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