import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as musicAction from '../../actions/music';
import PlayAudio from '../../components/Play/PlayAduio';

const mapStateProps = (state)=>{
    return state
}

const mapDispatchProps = (dispatch)=>{
    return {
        musicActions:bindActionCreators(musicAction,dispatch)
    }
}

export default connect(mapStateProps, mapDispatchProps)(PlayAudio)