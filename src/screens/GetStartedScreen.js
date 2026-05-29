import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaxeaseLogo from '../components/TaxeaseLogo';
import Button from '../components/Button';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const GetStartedScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Center content */}
      <View style={styles.center}>
        <TaxeaseLogo size={100} textSize={36} />
        <Text style={styles.tagline}>Finance and tax management{'\n'}simplified</Text>
      </View>

      {/* Bottom buttons */}
      <View style={styles.bottomButtons}>
        <Button
          title="Log In"
          onPress={() => navigation.navigate('Login')}
          style={styles.loginBtn}
        />
        <Button
          title="Register"
          variant="outline"
          onPress={() => navigation.navigate('Register')}
          style={styles.registerBtn}
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
  tagline: {
    marginTop: SPACING.xl,
    fontSize: FONTS.sizes.lg,
    color: COLORS.textMedium,
    textAlign: 'center',
    lineHeight: 26,
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  loginBtn: {
    flex: 1,
  },
  registerBtn: {
    flex: 1,
  },
});

export default GetStartedScreen;
