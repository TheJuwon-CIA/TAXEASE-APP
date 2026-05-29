import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import OTPInput from '../components/OTPInput';
import Button from '../components/Button';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const VerifyCodeScreen = ({ navigation, route }) => {
  const email = route?.params?.email || 'e*****@email.com';
  const maskedEmail = email.replace(/(.{1})(.*)(@.*)/, '$1*****$3');

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    navigation.navigate('CreateNewPassword', { email, code: otp || '000000' });
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
        {/* Email icon */}
        <View style={styles.iconCircle}>
          <Ionicons name="mail-open-outline" size={44} color={COLORS.primaryLight} />
        </View>

        <Text style={styles.title}>Check Your Email</Text>
        <Text style={styles.subtitle}>
          We've sent a 6-digit verification code to your email address
          (e.g. {maskedEmail}). Please enter it below.
        </Text>

        <View style={styles.otpWrap}>
          <OTPInput length={6} onComplete={setOtp} />
        </View>

        <Button
          title="Verify Code"
          onPress={handleVerify}
          loading={loading}
          style={styles.btn}
        />

        <View style={styles.resendRow}>
          <Text style={styles.resendText}>Didn't receive any code? </Text>
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendLink}>Resend</Text>
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
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2.5,
    borderColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '800',
    color: COLORS.primaryLight,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textMedium,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.xl,
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

export default VerifyCodeScreen;
