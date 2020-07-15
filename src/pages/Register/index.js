import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';

import { width, height } from '../../utils/dimensions';
import {
  isValidEmail,
  isValidPassword,
  isValidName,
} from '../../utils/validators';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { register } from '../../services/authentication';

function Register({ navigation }) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  function handleTextInput({ field, value }) {
    setUserData((prevState) => ({ ...prevState, [field]: value }));
  }

  function getErrorMsg() {
    let error = '';
    if (userData.email && !isValidEmail(userData.email)) {
      error = 'Invalid email';
    }

    if (userData.password && !isValidPassword(userData.password)) {
      error = 'Password must have at least 6 number or letters';
    }

    if (userData.name && !isValidName(userData.name)) {
      error = 'Name must contains just letters';
    }

    return error;
  }

  function handleRegisterPressed() {
    register({ email: userData.email, userInfo: userData });
  }

  function handleBackPressed() {
    navigation.push('Login');
  }

  function isRegisterButtonInvalid() {
    const allFieldsHasValue = Object.keys(userData).every(
      (key) => userData[key],
    );

    return (
      allFieldsHasValue &&
      isValidEmail(userData.email) &&
      isValidPassword(userData.password) &&
      isValidName(userData.name)
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <SafeAreaView>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🦄</Text>
          <Text style={styles.welcomeText}>Welcome to the UNICORN PLAYER.</Text>
          <Text style={styles.welcomeText}>
            Please register to access the Unicorn Song
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Input
            placeholder="Email"
            onChangeText={(value) => handleTextInput({ field: 'email', value })}
            textContentType="emailAddress"
            value={userData.email}
            isInputValid={!!userData.email && !isValidEmail(userData.email)}
            autoCorrect
          />
          <Input
            placeholder="Password"
            textContentType="password"
            onChangeText={(value) =>
              handleTextInput({ field: 'password', value })
            }
            value={userData.password}
            isInputValid={
              !!userData.password && !isValidPassword(userData.password)
            }
            autoCorrect
            secureTextEntry
          />
          <Input
            placeholder="Name"
            onChangeText={(value) => handleTextInput({ field: 'name', value })}
            value={userData.name}
            isInputValid={!!userData.name && !isValidName(userData.name)}
            autoCorrect
          />
        </View>

        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{getErrorMsg()}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Register"
            onPress={handleRegisterPressed}
            disabled={!isRegisterButtonInvalid()}
          />

          <Text style={styles.createAccountLink} onPress={handleBackPressed}>
            Already have an account?
            <Text style={styles.strong}> Go to Login!</Text>
          </Text>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEFAFA',
  },
  logoContainer: {
    height: height * 0.3,
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    marginBottom: 15,
  },
  welcomeText: {
    paddingVertical: 4,
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rebeccapurple',
    textAlign: 'center',
  },
  inputContainer: {
    width: width * 0.9,
  },

  buttonContainer: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  errorContainer: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
  },
  createAccountLink: {
    marginTop: 20,
    fontSize: 15,
    color: 'gray',
  },
  strong: {
    marginTop: 15,
    fontSize: 15,
    color: 'rebeccapurple',
    fontWeight: 'bold',
  },
});

export default Register;
