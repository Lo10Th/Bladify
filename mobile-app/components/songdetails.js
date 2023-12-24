import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import { Audio } from 'expo-av';

const SongDetails = ({ route }) => {
  const { title, artist, id } = route.params;
  const [songDetails, setSongDetails] = useState(null);
  const [sound, setSound] = useState(null);

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
    } catch (error) {
      console.error('Error while playing audio:', error);
    }
  }

  async function pauseAudio() {
    if (sound) {
      await sound.pauseAsync();
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
      <Text>Title: {title.replace('.mp3', '')}</Text>
      <Text>Artist: {artist || 'Unknown'}</Text>
      <Text>ID: {id}</Text>
      <Button title="Play" onPress={playAudio} />
      <Button title="Pause" onPress={pauseAudio} />
    </View>
  );
};

export default SongDetails;
