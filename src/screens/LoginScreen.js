import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

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
      'demo-token'
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
        {/* Back button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={26} color={COLORS.textDark} />
        </TouchableOpacity>

        {/* Header */}
        <Text style={styles.title}>Log In</Text>
        <Text style={styles.subtitle}>Welcome Back To Taxease</Text>

        {/* Form */}
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
            placeholder="••••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon={
              <Ionicons name="lock-closed-outline" size={18} color={COLORS.gray500} />
            }
            error={errors.password}
          />

          {/* Remember Me + Forgot Password */}
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
              <Text style={styles.rememberText}>Remember Me</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Login button */}
        <Button
          title="Login"
          onPress={handleLogin}
          loading={loading}
          style={styles.loginBtn}
        />

        {/* Sign up */}
        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Dont have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* OR divider */}
        <Text style={styles.orText}>OR</Text>

        {/* Google login */}
        <Button
          title="Login Using Google"
          variant="outline"
          onPress={handleGoogleLogin}
          icon={<Text style={{ fontSize: 18 }}>G</Text>}
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
});

export default LoginScreen;
