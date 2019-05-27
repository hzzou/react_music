
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as musicAction from '../../actions/music';
import PlayControl from '../../components/Play/PlayControl';

const mapStateProps = (state) =>{
    return state
}

const mapDispatchProps = (dispatch)=>{
    return{
        musicActions:bindActionCreators(musicAction,dispatch)
    }
}

export default connect(mapStateProps,mapDispatchProps)(PlayControl)
