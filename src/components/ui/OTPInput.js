import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS, RADIUS, FONTS, SPACING } from '../../theme/tokens';

const OTPInput = ({ length = 6, onComplete, value = [] }) => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(Array(length).fill(''));

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text.slice(-1); // only keep last character
    setOtp(newOtp);

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const joined = newOtp.join('');
    if (joined.length === length && onComplete) {
      onComplete(joined);
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={[styles.box, otp[index] ? styles.filledBox : null]}
            value={otp[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
            selectTextOnFocus
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  box: {
    flex: 1,
    height: 60,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.gray200,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.textDark,
    textAlign: 'center',
  },
  filledBox: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primaryLight,
  },
});

export default OTPInput;
