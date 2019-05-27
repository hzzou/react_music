
import * as actionTypes from '../constants/index';
import {unique} from "../util/tool";
//action动作传给reducer里定义的某一个state属性,
//然后根据action.type执行相应动作合并出新的state属性

//歌曲收藏
const favoriteMusic = (state = [], action)=>{ //如果state么有初始值，则为空数组
    switch(action.type){
        case actionTypes.MUSIC_ADD_FAVORITE://执行添加
            let arr = [...state,action.data]
                console.log(unique(arr))
            return unique(arr)
        case actionTypes.MUSIC_REMOVE_FAVORITE:
            const index = state.indexOf(action.data) //取位置,一定有(不用判断)
            state.splice(index,1)
            return state
        default:
            return state
    }
}

//播放列表(含歌曲地址和歌词)
const musicList = (state = [],action)=>{
    switch(action.type){
        case actionTypes.MUSIC_ADD_ONE:
            let arr = [...state,action.data];
            return unique(arr)
        case actionTypes.MUSIC_REMOVE_ONE:
            const index = state.indexOf(action.data) //取位置,一定有(不用判断)
            state.splice(index,1);
            return state
        case actionTypes.MUSIC_REMOVE_ALL:
            return []
        default:
            return state
    }
}

//当前播放的音乐hash(使用音乐hash与musicList的每一项的hash值进行比对，得到歌曲地址和歌词)
const currentMusic = (state = {},action)=>{
    switch(action.type){
        case actionTypes.MUSIC_GET_HASH:
            return action.data;//直接冲掉之前的数据
        default:
            return state;
    }
}

//音乐播放对象
const audioPlayer = (state = {},action)=>{
    switch(action.type){
        case actionTypes.MUSIC_AUDIO:
            return action.data
        default:
            return state;
    }
}

//播放控制
const control = (state = {playing:false}, action)=>{
    switch(action.type){
        case actionTypes.MUSIC_CONTROL:
            return  action.playing;
        default:
            return state;
    }
}

//播放进度存储
const progress = (state = {currentTime:0, percentage:0}, action)=>{
    switch(action.type){
        case actionTypes.MUSIC_PLAYTIME:
            return Object.assign({},state,action.data); //最好不要使用action.data冲掉之前的数据
        default:
            return state;
    }
}

//音量大小存储
const volumeObj = (state = {volume:0.5}, action)=>{
    switch(action.type){
        case actionTypes.MUSIC_VOLUME:
            return action.data;
        default:
            return state;
    }
}

//当前歌曲的歌词存储
const lyricsObj = (state = { updateLyrics:"", time:0},action)=>{
    switch(action.type){
        case actionTypes.MUSIC_UPDATE_LYRICS:
            return Object.assign({},state,action.data);
        default:
            return state;
    }
}

export { favoriteMusic,musicList,currentMusic,audioPlayer,control,progress,volumeObj,lyricsObj }
