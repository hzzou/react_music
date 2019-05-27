//全局任意位置都播放,独立于Router之外
import React from 'react';
import API from '../../util/api';
import ReactPlayer from 'react-player';

class PlayAudio extends React.Component{

    componentDidMount(){
        console.log(this.props)
        //需要先在ReactPlayer上使用ref属性把player对象用箭头函数的方式传递给this.player
        //console.log(this.player)
        //存储播放对象audio player
        this.props.musicActions.audioObj({player: this.player});
    }

    getCurrentSong() {
        if(this.props.musicList.length > 0){
            let musicList = this.props.musicList;
            let hash = this.props.currentMusic.hash;
            let currentSong = null;
            if(musicList.length > 0 && hash !== ""){
                musicList.map((ele)=>{
                    if(ele.song.hash === hash){
                        currentSong = ele;
                    }
                    return 0;
                })
            }
            return currentSong;
        }
    }
    //播放进度发生变化时,更新store里的progress
    onProgress(value){
        //console.log(this.getCurrentSong().lyrics)
        //console.log(value.playedSeconds)
        //console.log(value.played)
        const currentLyrics = this.getCurrentSong().lyrics;
        //value.playedSeconds为已播放的秒数，value.played为已播放的百分比
        this.props.musicActions.updateProgress({currentTime:value.playedSeconds, percentage:value.played});
        //更新歌词显示
        for(let i = 0; i < currentLyrics.length; i++){
            if(value.playedSeconds > currentLyrics[i][0]){//第一项是时间
                //第二项是歌词
                this.props.musicActions.updateLyrics({updateLyrics:currentLyrics[i][1], time:currentLyrics[i][0]})
            }
        }
    }
    //总播放的时长(秒),即是持续时间
    onDuration(value){
        localStorage.setItem('duration',value);
    }
    //播放结束时
    onEnd(){
        console.log(this.props)
        this.props.musicActions.control({playing:false});
    }

    render(){
        let currentSong = this.getCurrentSong();
        let volume = localStorage.getItem("currentVolume")  > 0 ? Number(localStorage.getItem("currentVolume")) : this.props.volumeObj.volume;
        //console.log(volume)
        //console.log(currentSong)
        return(
            <div style={{display:"none"}}>
                {/*通过ref把播放对象player传给自定义属性this.player*/}
                <ReactPlayer volume={volume}
                playing={this.props.control.playing} url={currentSong ? currentSong.song.url : null} ref={player => {this.player = player}} onProgress={(value)=>this.onProgress(value)} onDuration={(value)=>this.onDuration(value)} onEnded={(value)=>this.onEnd(value)}  />
            </div>
        )
    }
}

export default PlayAudio;