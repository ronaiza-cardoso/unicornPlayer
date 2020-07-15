import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, TextInput } from 'react-native';

const Input = ({
  isInputValid,
  onChangeText,
  value,
  autoCapitalize,
  autoCorrect,
}) => {
  return (
    <TextInput
      style={[styles.input, isInputValid && styles.error]}
      placeholder="password"
      textContentType="password"
      onChangeText={onChangeText}
      value={value}
      {...{ autoCapitalize, autoCorrect }}
    />
  );
};

const styles = StyleSheet.create({
  error: {
    borderColor: 'red',
  },
  input: {
    height: 56,
    alignSelf: 'stretch',
    padding: 16,
    margin: 5,
    fontSize: 18,
    fontWeight: '600',

    borderRadius: 10,
    borderColor: 'rebeccapurple',
    borderStyle: 'solid',
    borderWidth: 2,
  },
});

Input.propTypes = {
  isInputValid: PropTypes.func,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  autoCapitalize: PropTypes.bool,
  autoCorrect: PropTypes.bool,
};

export default Input;
