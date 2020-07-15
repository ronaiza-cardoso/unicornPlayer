import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, TextInput } from 'react-native';

const Input = ({
  isInputValid,
  onChangeText,
  value,
  placeholder,
  autoCapitalize,
  autoCorrect,
  secureTextEntry,
}) => {
  return (
    <TextInput
      style={[styles.input, isInputValid && styles.error]}
      textContentType="password"
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      {...{ autoCorrect, secureTextEntry }}
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
  isInputValid: PropTypes.bool,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  autoCapitalize: PropTypes.string,
  autoCorrect: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
};

Input.defaultProps = {
  autoCapitalize: 'none',
};

export default Input;
