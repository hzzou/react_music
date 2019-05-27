
import {connect} from 'react-redux';
import * as searchAction from '../../actions/search';
import * as musicAction from '../../actions/music';
import {bindActionCreators} from 'redux';
import Result from '../../components/Search/Result';

const mapStateToProps = (state)=>{
    return state
}

const mapDispatchToProps = (dispatch)=>{
    return{
        searchActions:bindActionCreators(searchAction,dispatch),
        musicActions:bindActionCreators(musicAction,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Result)