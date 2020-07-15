import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

import { useAuth } from '../../navigation/AuthProvider';
import { width, height } from '../../utils/dimensions';

import Button from '../../components/Button';

function Home() {
  const { user, logOut } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>
          Welcome {user.name} to 🦄 paradise!
        </Text>
      </View>

      <View style={styles.footer}>
        <Button title="Log out" onPress={logOut} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEFAFA',
    position: 'relative',
  },
  welcomeContainer: {},
  welcomeText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rebeccapurple',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width,
    height: 90,
    backgroundColor: 'rebeccapurple',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
