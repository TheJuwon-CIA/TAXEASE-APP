import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../theme/tokens';
import { appImages } from '../../lib/assets';

const TaxeaseLogo = ({ size = 80, showText = true, textSize = 32 }) => {
  return (
    <View style={styles.container}>
      <Image
        source={appImages.logo}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
      {showText && (
        <Text style={[styles.wordmark, { fontSize: textSize }]}>Taxease</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  wordmark: {
    color: COLORS.primaryLight,
    fontWeight: '800',
    marginTop: 12,
    letterSpacing: 0.5,
  },
});

export default TaxeaseLogo;