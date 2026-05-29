import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const ResetSuccessScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        {/* Large green checkmark */}
        <Ionicons name="checkmark-sharp" size={90} color={COLORS.primaryLight} />

        <Text style={styles.title}>Password Reset{'\n'}Successful</Text>
        <Text style={styles.subtitle}>
          Your password has been updated.{'\n'}
          You can use your new password to log in your Taxease account.
        </Text>
      </View>

      <View style={styles.bottom}>
        <Button
          title="Back To Login"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            })
          }
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '800',
    color: COLORS.primaryLight,
    textAlign: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textMedium,
    textAlign: 'center',
    lineHeight: 22,
  },
  bottom: {
    paddingBottom: SPACING.xl,
  },
});

export default ResetSuccessScreen;
