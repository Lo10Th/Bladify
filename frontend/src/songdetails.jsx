import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

function SongDetails() {
    const { id } = useParams();
    const [songDetails, setSongDetails] = useState({});
    const audioRef = useRef(null);
    const [audioSource, setAudioSource] = useState(null); // Dynamisch hinzugefügte Audioquelle

    const playAudio = () => {
        if (audioRef.current) {
            if (!audioSource) {
                // Setzen Sie die Audioquelle, wenn sie noch nicht gesetzt ist
                setAudioSource(
                    <source
                        src={`http://localhost:5000/stream/${songDetails.title}`}
                        type="audio/mpeg"
                    />
                );
            }
            audioRef.current.load(); // Laden Sie das Audio-Element
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
        <div>
            <h2>Song Details</h2>
            <p>Title: {songDetails.title}</p>
            <p>Artist: {songDetails.artist}</p>
            <audio ref={audioRef} controls preload="none">
                {audioSource}
                Your browser does not support the audio element.
            </audio>
            <button onClick={playAudio}>Play</button>
        </div>
    );
}

export default SongDetails;
