import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const SongDetails = ({ route }) => {
  const { title, artist, id } = route.params;
  const [songDetails, setSongDetails] = useState(null);
  const [sound, setSound] = useState(null);
  let playing = false;

  useEffect(() => {
    fetch(`http://192.168.178.90:5000/song/${id}`)
        .then((response) => response.json())
        .then((data) => {
            data.title = data.title.replace('.mp3', '');
            setSongDetails(data);
        });
  }, [id]);

  async function playAudio() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: `http://192.168.178.90:5000/stream/${songDetails.title}`}
      );
      setSound(sound);
      await sound.playAsync();
      playing = true;
    } catch (error) {
      console.error('Error while playing audio:', error);
    }
  }

  async function pauseAudio() {
    if (sound) {
      if(playing) {  
      await sound.pauseAsync();
      playing = false;
      }
    else {
      await sound.playAsync();
      playing = true;
    }
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View>
      <Text style={styles.heading}>{title.replace('.mp3', '')}</Text>
      <Text style={styles.Text}>{artist || 'Unknown'}</Text>
      <View style={styles.container}>
      <TouchableOpacity style={styles.buttonleft} onPress={playAudio}>
        <Text style={styles.buttonText}>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.butttonright} onPress={pauseAudio}>
        <Text style={styles.buttonText}>Pause</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Text: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },

  heading: {
    fontSize: 25,
    marginBottom: 10,
    textAlign: 'center',
  },
  container: {
    display: 'flex',
  },

  buttonleft: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginRight: 220,
    marginLeft: 10,
    alignContent:'left',
  },

  butttonright: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginLeft: 220,
    marginRight: 10,
    alignContent:'right',
    },

  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});

export default SongDetails;
