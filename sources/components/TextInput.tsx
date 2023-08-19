import React, { forwardRef } from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  ({ style, ...props }: TextInputProps, ref) => (
    <RNTextInput
      ref={ref}
      placeholderTextColor="#4E67D4"
      style={[styles.text, style]}
      {...props}
    />
  ),
);

const styles = StyleSheet.create({
  text: {
    padding: 0,
    fontSize: 15,
    color: '#111',
  },
});
