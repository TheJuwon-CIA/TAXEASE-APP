import React, { useState } from 'react';
import AppText from '../../../components/AppText';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import OTPInput from '../../../components/ui/OTPInput';
import Button from '../../../components/ui/Button';
import { COLORS, FONTS, SPACING } from '../../../theme/tokens';

const ConfirmEmailScreen = ({ navigation, route }) => {
  const email = route?.params?.email || 'example@gmail.com';
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true);
    navigation.navigate('AccountSuccess');
    setLoading(false);
  };

  const handleResend = async () => {
    setOtp('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={26} color={COLORS.textDark} />
      </TouchableOpacity>

      <View style={styles.content}>
        <AppText style={styles.title}>Confirm Email</AppText>
        <AppText style={styles.subtitle}>
          An email with a confirmation code has been sent to your email address{' '}
          <AppText style={styles.emailHighlight}>{email}</AppText>. Enter the code to proceed
        </AppText>

        <View style={styles.otpWrap}>
          <OTPInput length={4} onComplete={setOtp} />
        </View>

        <Button
          title="Continue"
          onPress={handleContinue}
          loading={loading}
          style={styles.btn}
        />

        <View style={styles.resendRow}>
          <AppText style={styles.resendText}>Didn't receive a code? </AppText>
          <TouchableOpacity onPress={handleResend}>
            <AppText style={styles.resendLink}>Resend Code</AppText>
          </TouchableOpacity>
        </View>
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
  backBtn: {
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
    width: 36,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: SPACING.xl,
  },
  title: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '800',
    color: COLORS.primaryLight,
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textMedium,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.xl,
  },
  emailHighlight: {
    color: COLORS.textDark,
    fontWeight: '600',
  },
  otpWrap: {
    width: '100%',
    marginBottom: SPACING.xl,
  },
  btn: {
    width: '100%',
    marginBottom: SPACING.md,
  },
  resendRow: {
    flexDirection: 'row',
    marginTop: SPACING.sm,
  },
  resendText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textDark,
  },
  resendLink: {
    fontSize: FONTS.sizes.md,
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
});

export default ConfirmEmailScreen;
