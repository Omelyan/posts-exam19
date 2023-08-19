import React from 'react';
import { Text as RNText, StyleSheet, TextProps } from 'react-native';

export const Text = ({ style, ...props }: TextProps) => (
  <RNText style={[styles.text, style]} {...props} />
);

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: '#111',
  },
});
