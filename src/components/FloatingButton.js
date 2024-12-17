import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function FloatingButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name="add" size={24} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#6200ee',
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
