import React, { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native';


const SongDetails = ({ route }) => {
  const { title, artist, id } = route.params;
  const audioRef = useRef(null);
  const [audioSource, setAudioSource] = useState(null);

  const playAudio = () => {
    if (audioRef.current) {
        if (!audioSource) {
            setAudioSource(
                <source
                    src={`http://localhost:5000/stream/${songDetails.title}`}
                    type="audio/mpeg"
                />
            );
        }
        audioRef.current.load();
        audioRef.current.play();
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/song/${id}`)
        .then((response) => response.json())
        .then((data) => {
            data.title = data.title.replace('.mp3', '');
            setSongDetails(data);
        });
}, [id]);


  return (
    <View>
      <Text>Title: {title}</Text>
      <Text>Artist: {artist || 'Unknown'}</Text>
      <Text>ID: {id}</Text>
      <audio ref={audioRef} controls preload="none">
        {audioSource}
          Your browser does not support the audio element.
      </audio>
      <button onClick={playAudio}>Play</button>
    </View>
  );
};

export default SongDetails;
