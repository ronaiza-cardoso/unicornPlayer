import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { IS_USER_LOGGED } from '../utils/constants';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, _setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(IS_USER_LOGGED).then((res) =>
      setUser(JSON.parse(res)),
    );
  }, []);

  function logOut() {
    AsyncStorage.removeItem(IS_USER_LOGGED).then(() => setUser(null));
  }

  function setUser(userInfo) {
    AsyncStorage.setItem(IS_USER_LOGGED, JSON.stringify(userInfo)).then(() => {
      _setUser(userInfo);
    });
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
