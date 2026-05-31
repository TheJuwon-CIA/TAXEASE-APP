import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/ui/Button';
import { COLORS, FONTS, SPACING } from '../../../theme/tokens';
import { appImages } from '../../../lib/assets';

const ResetSuccessScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Image source={appImages.success} style={styles.successImage} resizeMode="contain" />

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
  successImage: {
    width: 118,
    height: 118,
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