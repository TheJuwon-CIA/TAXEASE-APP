import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import OTPInput from '../components/OTPInput';
import Button from '../components/Button';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { authAPI } from '../services/api';

const ConfirmEmailScreen = ({ navigation, route }) => {
  const email = route?.params?.email || 'example@gmail.com';
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (otp.length < 4) {
      Alert.alert('Error', 'Please enter the 4-digit code.');
      return;
    }
    setLoading(true);
    try {
      await authAPI.confirmEmail(email, otp);
      navigation.navigate('AccountSuccess');
    } catch (err) {
      Alert.alert('Invalid Code', err?.message || 'The code you entered is invalid.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await authAPI.resendCode(email);
      Alert.alert('Code Sent', 'A new code has been sent to your email.');
    } catch {
      Alert.alert('Error', 'Could not resend code. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={26} color={COLORS.textDark} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Confirm Email</Text>
        <Text style={styles.subtitle}>
          An email with a confirmation code has been sent to your email address{' '}
          <Text style={styles.emailHighlight}>{email}</Text>. Enter the code to proceed
        </Text>

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
          <Text style={styles.resendText}>Didn't receive a code? </Text>
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendLink}>Resend Code</Text>
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
