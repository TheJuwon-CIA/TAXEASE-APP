import React from 'react';
import { Text, StyleSheet } from 'react-native';

const weightMap = {
  '100': 'Poppins-Thin',
  '200': 'Poppins-ExtraLight',
  '300': 'Poppins-Light',
  '400': 'Poppins-Regular',
  '500': 'Poppins-Medium',
  '600': 'Poppins-SemiBold',
  '700': 'Poppins-Bold',
  '800': 'Poppins-ExtraBold',
  '900': 'Poppins-Black',
};

const AppText = ({ style, ...props }) => {
  const flatStyle = StyleSheet.flatten(style) || {};
  const weight = String(flatStyle.fontWeight || '400');
  const fontFamily = weightMap[weight] || 'Poppins-Regular';

  return (
    <Text
      {...props}
      style={[style, { fontFamily, fontWeight: undefined }]}
    />
  );
};

export default AppText;