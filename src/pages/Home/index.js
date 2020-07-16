import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';

import { useAuth } from '../../navigation/AuthProvider';
import { width } from '../../utils/dimensions';

import Button from '../../components/Button';

const AUDIO_URL = 'https://mystifying-poitras-20cf53.netlify.app/sound.mp3';

const track = {
  id: 'pink_fluffy_unicorns',

  url: AUDIO_URL,

  title: 'Pink Fluffy Unicorns Dancing On Rainbows',
  artist: 'Unicorns',
  album: 'whiUnicorns',
  genre: 'Unicorns',
};

function Home() {
  useEffect(() => {
    TrackPlayer.registerEventHandler((data) => {
      const { type } = data;
      if (type === 'playback-track-changed' && Platform.OS === 'ios') {
        // workaround to play the same song in loop on ios
        // https://github.com/react-native-kit/react-native-track-player/issues/122
        TrackPlayer.pause();
        TrackPlayer.skip(track.id).then(() => TrackPlayer.play());
      }
    });
  }, []);

  const [animatedValue] = useState(new Animated.Value(0));

  const playbackState = usePlaybackState();
  const { user, logOut } = useAuth();

  useEffect(() => {
    setup();
  }, []);

  function slidingUnicorns() {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [width, -width],
  });

  async function setup() {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,

        // workaround to play the same song in loop on ios
        TrackPlayer.CAPABILITY_SKIP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
      ],
    });
  }

  async function handlePlay() {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      await TrackPlayer.reset();
      await TrackPlayer.add(track);
      await TrackPlayer.play().then(slidingUnicorns);
    } else {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play().then(slidingUnicorns);
      } else {
        await TrackPlayer.pause();
      }
    }
  }

  function handleStop() {
    TrackPlayer.stop().then(() => {
      setup();
      animatedValue.setValue(0);
    });
  }

  function handleLogOut() {
    logOut();
    handleStop();
  }

  const isPlaying = playbackState === TrackPlayer.STATE_PLAYING;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>
          Welcome {user.name} to 🦄 paradise!
        </Text>
      </View>

      <View style={styles.playerContainer}>
        <Button
          textStyle={styles.playButton}
          title={isPlaying ? '⏸️' : '▶️ '}
          outlined
          onPress={handlePlay}
        />
        <Button
          textStyle={styles.stopButton}
          title={'⏹️'}
          outlined
          onPress={handleStop}
          disabled={!isPlaying}
        />
      </View>

      {isPlaying ? (
        <Animated.View
          style={[
            styles.unicornCarrouselContainer,
            { transform: [{ translateX }] },
          ]}>
          <Text style={styles.unicornText}>🦄🦄🦄</Text>
        </Animated.View>
      ) : (
        <View style={styles.unicornCarrouselContainer} />
      )}

      <View style={styles.footer}>
        <Button title="Log out" onPress={handleLogOut} />
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
  welcomeContainer: {
    flex: 2,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    marginTop: 20,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'rebeccapurple',
  },
  playerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    borderBottomWidth: 2,
    borderBottomColor: 'rebeccapurple',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width,
    height: 90,
    backgroundColor: 'rebeccapurple',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  playButton: {
    fontSize: 80,
    marginVertical: 10,
  },
  stopButton: {
    fontSize: 26,
  },
  unicornCarrouselContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unicornText: {
    fontSize: 50,
  },
});

export default Home;
