import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    setError('');
    setLoading(true);
    navigation.navigate('VerifyCode', { email: email.trim() || 'demo@taxease.app' });
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={26} color={COLORS.textDark} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter the email address associated with your Taxease account
        </Text>

        <InputField
          placeholder="Email Address"
          value={email}
          onChangeText={(v) => {
            setEmail(v);
            if (error) setError('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          error={error}
          style={styles.input}
        />

        <Button
          title="Send Reset Link"
          onPress={handleSend}
          loading={loading}
          style={styles.btn}
        />

        <Button
          title="Back To Log In"
          variant="outline"
          onPress={() => navigation.navigate('Login')}
          style={styles.backToLoginBtn}
          textStyle={{ color: COLORS.textDark }}
        />
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
    marginBottom: SPACING.xl,
    width: 36,
  },
  content: {
    flex: 1,
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
    lineHeight: 22,
    marginBottom: SPACING.xl,
  },
  input: {
    marginBottom: SPACING.xl,
  },
  btn: {
    marginBottom: SPACING.md,
  },
  backToLoginBtn: {},
});

export default ForgotPasswordScreen;
