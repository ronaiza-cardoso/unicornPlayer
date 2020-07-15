import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import { useAuth } from '../../navigation/AuthProvider';

import Button from '../../components/Button';

function Home() {
  const { logOut } = useAuth();
  return (
    <SafeAreaView>
      <View>
        <Text>Hello from Home</Text>
      </View>

      <Button title="Log out" onPress={logOut} />
    </SafeAreaView>
  );
}

export default Home;
