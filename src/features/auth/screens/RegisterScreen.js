import React, { useState } from 'react';
import AppText from '../../../components/AppText';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import InputField from '../../../components/ui/InputField';
import Button from '../../../components/ui/Button';
import { COLORS, FONTS, SPACING } from '../../../theme/tokens';
import { appImages } from '../../../lib/assets';

const RegisterScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleRegister = async () => {
    setErrors({});
    setLoading(true);
    navigation.navigate('ConfirmEmail', {
      email: form.email.trim() || 'demo@taxease.app',
    });
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color={COLORS.textDark} />
        </TouchableOpacity>

        <AppText style={styles.title}>Create Account</AppText>
        <AppText style={styles.subtitle}>
          Create An Account With Taxease To Get Started
        </AppText>

        <InputField
          placeholder="First Name"
          value={form.firstName}
          onChangeText={(v) => updateField('firstName', v)}
          autoCapitalize="words"
          error={errors.firstName}
        />
        <InputField
          placeholder="Last Name"
          value={form.lastName}
          onChangeText={(v) => updateField('lastName', v)}
          autoCapitalize="words"
          error={errors.lastName}
        />
        <InputField
          placeholder="Email Address"
          value={form.email}
          onChangeText={(v) => updateField('email', v)}
          keyboardType="email-address"
          error={errors.email}
        />
        <InputField
          placeholder="Create Password"
          value={form.password}
          onChangeText={(v) => updateField('password', v)}
          secureTextEntry
          error={errors.password}
        />
        <InputField
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChangeText={(v) => updateField('confirmPassword', v)}
          secureTextEntry
          error={errors.confirmPassword}
        />

        <TouchableOpacity
          style={styles.termsRow}
          onPress={() => setAgreeTerms(!agreeTerms)}
        >
          <View style={[styles.checkbox, agreeTerms && styles.checkedBox]}>
            {agreeTerms && (
              <Ionicons name="checkmark" size={14} color={COLORS.white} />
            )}
          </View>
          <AppText style={styles.termsText}>I agree to the Terms of Service</AppText>
        </TouchableOpacity>
        {errors.terms ? (
          <AppText style={styles.errorText}>{errors.terms}</AppText>
        ) : null}

        <Button
          title="Register"
          onPress={handleRegister}
          loading={loading}
          style={styles.registerBtn}
        />

        <View style={styles.loginRow}>
          <AppText style={styles.loginText}>Do you have an account? </AppText>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <AppText style={styles.loginLink}>Log In</AppText>
          </TouchableOpacity>
        </View>

        <AppText style={styles.orText}>OR</AppText>

        <Button
          title="Login Using Google"
          variant="outline"
          onPress={() => navigation.navigate('ConfirmEmail', { email: 'demo@taxease.app' })}
          icon={<Image source={appImages.google} style={styles.googleIcon} resizeMode="contain" />}
          textStyle={{ color: COLORS.textDark }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scroll: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  backBtn: {
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
    width: 36,
  },
  title: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '800',
    color: COLORS.primaryLight,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textMedium,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: 22,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: COLORS.checkboxBorder,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primaryLight,
  },
  termsText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textDark,
  },
  errorText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.error,
    marginBottom: SPACING.sm,
  },
  registerBtn: {
    marginTop: SPACING.lg,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  loginText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textDark,
  },
  loginLink: {
    fontSize: FONTS.sizes.md,
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  orText: {
    textAlign: 'center',
    fontSize: FONTS.sizes.md,
    color: COLORS.textMedium,
    marginVertical: SPACING.md,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
});

export default RegisterScreen;