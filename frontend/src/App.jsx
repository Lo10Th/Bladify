import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setAudioUrl(`http://localhost:5000/stream/${newValue}`);
  };

  const playAudio = () => {
    if (inputValue) {
      setIsAudioPlaying(true);
      // Hier protokollieren wir die URL in der Konsole
      console.log(`Audio URL: ${audioUrl}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={playAudio}>Play Audio</button>
      {isAudioPlaying && inputValue && (
        <audio controls autoPlay>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}

export default App;
