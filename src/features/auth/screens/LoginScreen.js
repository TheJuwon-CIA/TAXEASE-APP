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
import { useAuth } from '../../../providers/AuthProvider';
import { appImages } from '../../../lib/assets';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();

  const handleLogin = async () => {
    setErrors({});
    setLoading(true);
    await login(
      {
        id: 'demo-user',
        email: email.trim() || 'demo@taxease.app',
        firstName: 'Demo',
        lastName: 'User',
      },
      'demo-token',
    );
    setLoading(false);
  };

  const handleGoogleLogin = () => {
    handleLogin();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={26} color={COLORS.textDark} />
        </TouchableOpacity>

        <AppText style={styles.title}>Log In</AppText>
        <AppText style={styles.subtitle}>Welcome Back To Taxease</AppText>

        <View style={styles.form}>
          <InputField
            label="Email"
            placeholder="Example@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={
              <Ionicons name="mail-outline" size={18} color={COLORS.gray500} />
            }
            error={errors.email}
          />

          <InputField
            label="Password"
            placeholder="**********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon={
              <Ionicons name="lock-closed-outline" size={18} color={COLORS.gray500} />
            }
            error={errors.password}
          />

          <View style={styles.rememberRow}>
            <TouchableOpacity
              style={styles.checkRow}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkedBox]}>
                {rememberMe && (
                  <Ionicons name="checkmark" size={14} color={COLORS.white} />
                )}
              </View>
              <AppText style={styles.rememberText}>Remember Me</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <AppText style={styles.forgotText}>Forgot Password?</AppText>
            </TouchableOpacity>
          </View>
        </View>

        <Button
          title="Login"
          onPress={handleLogin}
          loading={loading}
          style={styles.loginBtn}
        />

        <View style={styles.signupRow}>
          <AppText style={styles.signupText}>Dont have an account? </AppText>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <AppText style={styles.signupLink}>Sign Up</AppText>
          </TouchableOpacity>
        </View>

        <AppText style={styles.orText}>OR</AppText>

        <Button
          title="Login Using Google"
          variant="outline"
          onPress={handleGoogleLogin}
          icon={<Image source={appImages.google} style={styles.googleIcon} resizeMode="contain" />}
          textStyle={styles.googleText}
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
    fontSize: FONTS.sizes.display,
    fontWeight: '800',
    color: COLORS.primaryLight,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textMedium,
    marginBottom: SPACING.xl,
  },
  form: {
    marginBottom: SPACING.sm,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
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
  rememberText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textDark,
  },
  forgotText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.primaryLight,
    fontWeight: '600',
  },
  loginBtn: {
    marginTop: SPACING.xl,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  signupText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textDark,
  },
  signupLink: {
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
  googleText: {
    color: COLORS.textDark,
    fontWeight: '600',
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
});

export default LoginScreen;