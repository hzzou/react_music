import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as musicAction from '../../actions/music';
import * as searchAction from '../../actions/search';
import AlbumList from '../../components/AlbumList/AlbumList';

const mapStateToProps = (state)=>{
    return state;
}

const mapDispatchToProps = (dispatch)=>{
    return {
        musicActions:bindActionCreators(musicAction,dispatch),
        searchActions:bindActionCreators(searchAction,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AlbumList)