import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import UploadFile from "./UploadFiles";
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

const Player = () => (

    <>
        <AudioPlayer
            autoPlay={true}
            src="http://localhost:8888/SoundHelix-Song-1.mp3"
            onPlay={e => console.log("onPlay")}
            // other props here
        />

        {/*<AudioPlayer*/}
        {/*    autoPlay*/}
        {/*    src="http://localhost:8888/SoundHelix-Song-8.mp3"*/}
        {/*    onPlay={e => console.log("onPlay")}*/}
        {/*    // other props here*/}
        {/*/>*/}
    </>
);


export default Player;