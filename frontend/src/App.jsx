import React, { useState } from 'react';
import './index.css';

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
    }
  };

  return (
    <div className='content'>
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
    </div>
  );
}

export default App;
