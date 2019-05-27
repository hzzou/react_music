
import * as actionTypes from '../constants/index'
import api from "../util/api"
import request from "../util/request"
import {parseLyric} from "../util/tool"

//添加一首歌到播放列表(音乐地址和歌词)
const addMusicOne = (data)=>{
    return{
        type:actionTypes.MUSIC_ADD_ONE,
        data
    }
}

//从播放列表中移除一首歌
const removeMusicOne = (data)=>{
    return{
        type:actionTypes.MUSIC_REMOVE_ONE,
        data
    }
}

//一次性从播放列表移除
const removeMusicAll = (data)=>{
    return{
        type:actionTypes.MUSIC_REMOVE_ALL,
        data
    }
}

//添加到收藏
const addFavoriteMusic = (data)=>{
    return{
        type:actionTypes.MUSIC_ADD_FAVORITE,
        data
    }
}

//从收藏移除
const removeFavoriteMusic = (data)=>{
    return{
        type:actionTypes.MUSIC_REMOVE_FAVORITE,
        data
    }
}

//音乐播放控制
const control = (playing)=>{
    return{
        type:actionTypes.MUSIC_CONTROL,
        playing
    }
}

//设置当前播放歌曲，以hash辨别
const getMusicHash = (data)=>{
    return{
        type:actionTypes.MUSIC_GET_HASH,
        data
    }
}

//存储播放对象音乐对象audio player
const audioObj = (data)=>{
    return{
        type:actionTypes.MUSIC_AUDIO,
        data
    }
}

//歌词同步
const updateLyrics = (data)=>{
    return {
        type:actionTypes.MUSIC_UPDATE_LYRICS,
        data
    }
}

//更新播放进度(含当前播放了的时间和百分比)
const updateProgress = (data)=>{
    return{
        type:actionTypes.MUSIC_PLAYTIME,
        data
    }
}

//音量大小控制
const volumeControl = (data)=>{
    return{
        type:actionTypes.MUSIC_VOLUME,
        data
    }
}

//请求音乐播放的相关信息
const fetchMusic = (id)=>{
    return async dispatch=>{
        try{
            let song_url = await request.get(`/kugou/${api.song_detail}?cmd=playInfo&hash=${id}`)
            let song = await song_url.json()
            let lyrics_url = await request.get(`/kugou/${api.song_lyrics}?cmd=100&hash=${id}&timelength=${song.timeLength}`)
            let lyrics = await lyrics_url.text()
            let musicObj = {song:song, lyrics:parseLyric(lyrics)}
            dispatch(addMusicOne(musicObj))
        }catch(e){
            console.log(e)
        }
    }
}

export {addMusicOne, removeMusicOne, removeMusicAll, addFavoriteMusic,
    control, removeFavoriteMusic, getMusicHash, fetchMusic, updateLyrics,
    audioObj, updateProgress, volumeControl}