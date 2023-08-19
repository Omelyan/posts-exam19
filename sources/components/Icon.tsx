import React from 'react';
import {
  StyleSheet,
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Animated, { Layout } from 'react-native-reanimated';

interface IconProps extends TouchableOpacityProps {
  color?: string;
  long?: boolean;
}

const TouchableOpacity = Animated.createAnimatedComponent(RNTouchableOpacity);

export const Icon = ({ color, long, style, ...props }: IconProps) => (
  <TouchableOpacity
    layout={Layout}
    activeOpacity={0.7}
    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    style={[
      styles.icon,
      long && styles.long,
      { backgroundColor: color || 'black' },
      style,
    ]}
    {...props}
  />
);

const styles = StyleSheet.create({
  icon: {
    width: 25,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  long: {
    width: 50,
    aspectRatio: 2,
  },
});
