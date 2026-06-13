import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import AppText from '../AppText';
import { COLORS, RADIUS, FONTS, SPACING } from '../../theme/tokens';

const Button = ({
  title,
  onPress,
  variant = 'primary',   // 'primary' | 'outline' | 'ghost'
  loading = false,
  disabled = false,
  icon = null,
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? COLORS.white : COLORS.primary}
          size="small"
        />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconWrap}>{icon}</View>}
          <AppText style={[styles.text, styles[`${variant}Text`], textStyle]}>
            {title}
          </AppText>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 56,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },
  primary: {
    backgroundColor: COLORS.primaryLight,
  },
  outline: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.primaryLight,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    marginRight: SPACING.sm,
  },
  text: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
  primaryText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.textDark,
  },
  ghostText: {
    color: COLORS.primaryLight,
  },
});

export default Button;
