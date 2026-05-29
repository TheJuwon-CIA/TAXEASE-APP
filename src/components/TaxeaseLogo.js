import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

/**
 * TaxeaseLogo
 * Renders the green speech-bubble calculator icon + "Taxease" wordmark.
 *
 * Props:
 *  size    – controls the overall scale (default 80)
 *  showText – whether to show "Taxease" below (default true)
 *  textSize – font size for the wordmark (default 32)
 */
const TaxeaseLogo = ({ size = 80, showText = true, textSize = 32 }) => {
  const iconSize = size;
  const badgeSize = iconSize * 0.38;

  return (
    <View style={styles.container}>
      <View style={{ width: iconSize + badgeSize * 0.5, height: iconSize + badgeSize * 0.4 }}>
        {/* Main bubble */}
        <View
          style={[
            styles.bubble,
            {
              width: iconSize,
              height: iconSize,
              borderRadius: iconSize / 2,
            },
          ]}
        >
          {/* Naira sign */}
          <Text style={[styles.naira, { fontSize: iconSize * 0.3 }]}>₦</Text>
          {/* Calculator grid */}
          <View style={[styles.calcGrid, { width: iconSize * 0.42, height: iconSize * 0.32 }]}>
            {['➕', '➖', '✖', '🟰'].map((sym, i) => (
              <View key={i} style={styles.calcCell}>
                <Text style={{ fontSize: iconSize * 0.08, color: COLORS.white }}>{sym}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tail of bubble */}
        <View
          style={[
            styles.tail,
            {
              borderTopWidth: iconSize * 0.15,
              borderRightWidth: iconSize * 0.12,
              bottom: iconSize * 0.04,
              left: iconSize * 0.22,
            },
          ]}
        />

        {/* % badge */}
        <View
          style={[
            styles.badge,
            {
              width: badgeSize,
              height: badgeSize,
              borderRadius: badgeSize / 2,
              right: 0,
              bottom: 0,
            },
          ]}
        >
          <Text style={[styles.badgeText, { fontSize: badgeSize * 0.42 }]}>%</Text>
        </View>
      </View>

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
  bubble: {
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  naira: {
    color: COLORS.white,
    fontWeight: '900',
    marginBottom: 2,
  },
  calcGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  calcCell: {
    width: '45%',
    alignItems: 'center',
    marginBottom: 1,
  },
  tail: {
    position: 'absolute',
    borderTopColor: COLORS.primaryLight,
    borderRightColor: 'transparent',
    borderTopLeftRadius: 2,
  },
  badge: {
    position: 'absolute',
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  badgeText: {
    color: COLORS.white,
    fontWeight: '800',
  },
  wordmark: {
    color: COLORS.primaryLight,
    fontWeight: '800',
    marginTop: 12,
    letterSpacing: 0.5,
  },
});

export default TaxeaseLogo;
