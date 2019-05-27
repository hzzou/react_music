
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as musicAction from '../../actions/music';
import MusicList from "../../components/MusicList/MusicList";

const mapStateToProps = (state)=>{
    return{
        musicList: state.musicList,
        currentMusic: state.currentMusic
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        musicActions:bindActionCreators(musicAction,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicList)