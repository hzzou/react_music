
import { combineReducers } from 'redux'
import {hotList, resultList} from './search'
import {favoriteMusic,musicList,currentMusic,audioPlayer,control,progress,volumeObj,lyricsObj} from './music'
export default combineReducers({
    hotList,
    resultList,
    favoriteMusic,
    musicList,
    currentMusic,
    audioPlayer,
    control,
    progress,
    volumeObj,
    lyricsObj
})