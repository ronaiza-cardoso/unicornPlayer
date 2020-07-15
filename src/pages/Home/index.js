import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
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
  const playbackState = usePlaybackState();

  const { user, logOut } = useAuth();

  useEffect(() => {
    setup();
  }, []);

  async function setup() {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
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
      await TrackPlayer.play();
    } else {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  }

  function handleStop() {
    TrackPlayer.stop().then(() => {
      setup();
    });
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
  playerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default Home;
