import AsyncStorage from '@react-native-community/async-storage';

async function login({ email, password }) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(email).then(async (res) => {
      const userInfo = JSON.parse(res);
      if (
        userInfo &&
        userInfo.email === email &&
        userInfo.password === password
      ) {
        resolve({ ...userInfo, isUserValid: true });
      }

      reject({ ...userInfo, isUserValid: false });
    });
  });
}

function loginOut(email) {
  return AsyncStorage.removeItem(email);
}

function register({ email, userInfo }) {
  return AsyncStorage.setItem(email, JSON.stringify(userInfo));
}

export { login, loginOut, register };
