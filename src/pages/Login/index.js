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
import { isValidEmail, isValidPassword } from '../../utils/validators';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { login } from '../../services/authentication';
import { useAuth } from '../../navigation/AuthProvider';

function Login({ navigation }) {
  const [email, setEmail] = useState('rona@gmail.com');
  const [password, setPassword] = useState('123456');
  const [errorMsg, setErrorMsg] = useState();
  const [isEmailInvalid, setIsEmailInvalid] = useState();
  const [isPasswordInvalid, setIsPasswordInvalid] = useState();

  const { setUser } = useAuth();

  function handleRegisterPressed() {
    navigation.push('Register');
  }

  async function handleLoginPressed() {
    if (!isValidEmail(email)) {
      setErrorMsg('Invalid email');
      setIsEmailInvalid(true);
    } else if (!isValidPassword(password)) {
      setErrorMsg('Invalid password');
      setIsPasswordInvalid(true);
    } else {
      setErrorMsg('');
      setIsEmailInvalid(false);
      setIsPasswordInvalid(false);

      const userInfo = await login({ email, password });
      if (userInfo.isUserValid) {
        setUser(userInfo);
      }
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <SafeAreaView>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🦄</Text>
          <Text style={styles.appName}>UNICORN PLAYER</Text>
        </View>

        <View style={styles.inputContainer}>
          <Input
            placeholder="Email"
            onChangeText={setEmail}
            textContentType="emailAddress"
            value={email}
            isInputValid={isEmailInvalid}
            autoCorrect
          />
          <Input
            placeholder="Password"
            textContentType="password"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
            isInputValid={isPasswordInvalid}
            autoCorrect
          />
        </View>

        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            onPress={handleLoginPressed}
            disabled={!email || !password}
          />

          <Text
            style={styles.createAccountLink}
            onPress={handleRegisterPressed}>
            Don't have an account?
            <Text style={styles.strong}> Create one now!</Text>
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
  },
  appName: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rebeccapurple',
  },
  inputContainer: {
    // Getting 90% of the width
    width: width * 0.9,
  },

  buttonContainer: {
    // Getting 90% of the width
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

export default Login;
