import React, { useEffect } from 'react';

const MusicPlayer: React.FC = () => {
    useEffect(() => {
        // Add your JavaScript code here
        let link = document.querySelector('.links');
        let collect = document.querySelector('.collector');
        let hide = document.querySelector('.hide');
        let collectleft = document.querySelector('.collector1');
        let hideleft = document.querySelector('.hide-left');
        let leftdiv = document.querySelector('.details');
        let menu = document.getElementById('menu');
        let cross = document.getElementById('menus');

        let now_playing = document.querySelector('.now-playing');
        let track_art = document.querySelector('.track-art');
        let track_name = document.querySelector('.track-name');
        let track_artist = document.querySelector('.track-artist');
        let playpause_btn = document.querySelector('.playpause-track');
        let pause = document.querySelector('#pause');
        let next_btn = document.querySelector('.next-track');
        let prev_btn = document.querySelector('.prev-track');
        let seek_slider = document.querySelector('.seek_slider');
        let volume_slider = document.querySelector('.volume_slider');
        let curr_time = document.querySelector('.current-time');
        let total_duration = document.querySelector('.total-duration');
        let wave = document.getElementById('wave');
        let randomIcon = document.querySelector('.fa-random');
        let curr_track = document.createElement('audio');
        // linke value

        //let track_index = 0;
        let isRandom = false;
        let updateTimer;
    }, []);

    return (
        <div>
            <div className="layout">
                {
                    <div className="layout">
                        <button className="hide" onClick={handlediv}>
                            <i className="fa-sharp fa-solid fa-caret-down"></i>
                        </button>
                        <button className="hide-left" onClick={handleleft}>
                            <i className="fa-sharp fa-solid fa-caret-down"></i>
                        </button>
                        <button className="collector" onClick={handlebtn}>
                            Collections
                        </button>
                        <button className="collector1" onClick={handleleftbtn}>
                            <i className="fa-sharp fa-solid fa-caret-up"></i>
                        </button>
                        <button onClick={clickedbtn} className="fas fa-bars" id="menu"></button>
                        <button onClick={clickedcross} className="fas fa-times" id="menus"></button>
                        <div className="links" id="linkss">
                            <div className="collection">
                                <div className="button">
                                    <a className="btn" href="#">
                                        Collection
                                    </a>
                                    <i className="fas fa-plus"></i>
                                </div>
                                <div className="link" id="coll"></div>
                            </div>
                        </div>
                        <div className="details">
                            <div className="top">
                                <div className="image">
                                    <img id="artistImage" src="./assets/overview.png" alt="" />
                                </div>
                                <div className="content">
                                    <div className="button">
                                        <a href="./index2.html" className="btn">
                                            video
                                        </a>
                                        <a href="./index3.html" className="btn">
                                            Art
                                        </a>
                                    </div>
                                    <div className="content-details">
                                        <h1 id="titl"></h1>
                                        <h2 id="artis"></h2>
                                        <div className="content-details" id="singleSong">
                                            <div className="overview" style={{ marginTop: '10%' }}>
                                                <h1>Use this space to give information</h1>
                                                <h1>
                                                    We need to fill the space that stays blank until a user selects an album
                                                </h1>
                                                <h1>This space can be used to present the way the project works</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom">
                                <p id="descri"> </p>
                            </div>
                        </div>
                        <div className="player">
                            <div className="wrapper">
                                <div className="data">
                                    <div className="track-art"></div>
                                    <div className="data-details">
                                        <div className="track-name">Track Name</div>
                                        <div className="track-artist">Track Artist</div>
                                        <div className="now-playing">PLAYING x OF y</div>
                                    </div>
                                </div>
                                <div className="wrapper-box">
                                    <div className="slider_container" id="controller">
                                        <div className="current-time">00:00</div>
                                        <input
                                            type="range"
                                            min="1"
                                            max="100"
                                            value="0"
                                            className="seek_slider"
                                            onChange={seekTo}
                                        />
                                        <div className="total-duration">00:00</div>
                                    </div>
                                    <div className="slider_container">
                                        <i className="fa fa-volume-up" id="volume_icon"></i>
                                        <input
                                            type="range"
                                            min="1"
                                            max="100"
                                            value="99"
                                            className="volume_slider"
                                            onChange={setVolume}
                                        />
                                    </div>
                                    <div className="buttons">
                                        <div className="prev-track" onClick={prevTrack}>
                                            <i className="fa fa-step-backward fa-2x"></i>
                                        </div>
                                        <div className="playpause-track" onClick={playpauseTrack}>
                                            <i className="fa fa-play-circle fa-5x" id="pause"></i>
                                        </div>
                                        <div className="next-track" onClick={nextTrack}>
                                            <i className="fa fa-step-forward fa-2x"></i>
                                        </div>
                                        <div className="repeat-track" onClick={repeatTrack}>
                                            <i className="fa fa-repeat fa-2x" title="repeat"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                }
            </div>
        </div>
    );
};

export default MusicPlayer;
