import React from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { width } from '../../utils/dimensions';

const Button = ({ title, onPress, disabled }) => {
  const opacity = disabled ? 0.5 : 1;
  return (
    <TouchableOpacity {...disabled} onPress={onPress} style={styles.container}>
      <View style={{ opacity }}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rebeccapurple',
    width: width * 0.5,
    borderRadius: 10,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FEFAFA',
    fontSize: 20,
  },
});

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
