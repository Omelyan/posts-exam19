import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Icon } from './Icon';
import { Text } from './Text';
import { Gradient } from './Gradient';

interface HeaderProps {
  onPressCreate?: (mode: boolean) => void;
}

export const Header = ({ onPressCreate }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <Gradient
        style={styles.gradient}
        startColor="#7891FF"
        endColor="#7891FF"
        endOpacity={0}
      />
      <Icon
        color="gold"
        style={styles.icon}
        onPress={() => onPressCreate?.(true)}
      >
        <Text style={styles.iconText}>Create post</Text>
      </Icon>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'flex-end',
    width: '100%',
    height: 120,
    borderTopWidth: 70,
    borderColor: '#7891FF',
  },

  icon: {
    alignSelf: 'flex-start',
    width: 'auto',
    aspectRatio: undefined,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 18,
    shadowRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.25,
  },

  iconText: {
    fontWeight: '500',
  },

  gradient: {
    position: 'absolute',
  },
});
