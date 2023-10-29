import React, { useState } from 'react';

const AudioPlayer: React.FC<{ audioId: string }> = ({ audioId }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const playBtnId = `play${audioId}`;
    const myAudio = document.getElementById(`myAudio${audioId}`) as HTMLAudioElement;
    const playBtn = document.getElementById(playBtnId);

    if (!myAudio || !playBtn) {
        return null;
    }

    myAudio.onplaying = function () {
        setIsPlaying(true);
        playBtn.innerHTML = '<i class="fa fa-pause-circle "></i>';
    };

    myAudio.onpause = function () {
        setIsPlaying(false);
        playBtn.innerHTML = '<i class="fa fa-play-circle "></i>';
    };

    const togglePlay = () => {
        if (isPlaying) {
            myAudio.pause();
        } else {
            myAudio.play();
        }
    };

    return (
        <div>
            <audio id={`myAudio${audioId}`} controls>
                <source src={`audio_${audioId}.mp3`} type="audio/mpeg" />
            </audio>
            <button id={playBtnId} onClick={togglePlay}>
                <i className={`fa ${isPlaying ? 'fa-pause-circle' : 'fa-play-circle'}`}></i>
            </button>
        </div>
    );
};

export default AudioPlayer;
