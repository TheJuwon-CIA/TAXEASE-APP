import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { authAPI } from '../services/api';

const RULES = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { label: 'One number', test: (p) => /[0-9]/.test(p) },
  { label: 'One special character', test: (p) => /[^A-Za-z0-9]/.test(p) },
];

const CreateNewPasswordScreen = ({ navigation, route }) => {
  const { email, code } = route?.params || {};
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const allRulesPassed = RULES.every((r) => r.test(password));
  const passwordsMatch = password && password === confirm;

  const handleReset = async () => {
    if (!allRulesPassed) {
      Alert.alert('Weak Password', 'Please meet all password requirements.');
      return;
    }
    if (!passwordsMatch) {
      Alert.alert('Mismatch', 'Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await authAPI.resetPassword(email, code, password);
      navigation.navigate('ResetSuccess');
    } catch (err) {
      Alert.alert('Error', err?.message || 'Could not reset password.');
    } finally {
      setLoading(false);
    }
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

        {/* Lock icon */}
        <View style={styles.iconWrap}>
          <Ionicons name="lock-closed" size={60} color={COLORS.primaryLight} />
        </View>

        <Text style={styles.title}>Create New Password</Text>
        <Text style={styles.subtitle}>
          Please use a strong, new password that you haven't used before.
        </Text>

        <InputField
          placeholder="New Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          leftIcon={
            <Ionicons name="lock-closed-outline" size={18} color={COLORS.gray500} />
          }
          style={styles.input}
        />

        <InputField
          placeholder="Confirm Password"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
          leftIcon={
            <Ionicons name="lock-closed-outline" size={18} color={COLORS.gray500} />
          }
        />

        {/* Rules checklist */}
        <View style={styles.rulesList}>
          {RULES.map((rule) => {
            const passed = rule.test(password);
            return (
              <View key={rule.label} style={styles.ruleRow}>
                <Ionicons
                  name="checkmark"
                  size={16}
                  color={passed ? COLORS.primaryLight : COLORS.gray400}
                />
                <Text
                  style={[
                    styles.ruleText,
                    passed && styles.ruleTextPassed,
                  ]}
                >
                  {rule.label}
                </Text>
              </View>
            );
          })}
        </View>

        <Button
          title="Reset Password"
          onPress={handleReset}
          loading={loading}
          disabled={!allRulesPassed || !passwordsMatch}
          style={styles.btn}
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
    alignItems: 'center',
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
    width: 36,
  },
  iconWrap: {
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '800',
    color: COLORS.primaryLight,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textMedium,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.xl,
  },
  input: {
    width: '100%',
  },
  rulesList: {
    alignSelf: 'flex-start',
    marginTop: SPACING.md,
    marginBottom: SPACING.xl,
    gap: SPACING.sm,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  ruleText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.gray500,
  },
  ruleTextPassed: {
    color: COLORS.textDark,
    fontWeight: '500',
  },
  btn: {
    width: '100%',
  },
});

export default CreateNewPasswordScreen;
