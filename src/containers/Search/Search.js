
import { connect } from 'react-redux';
import Search from '../../components/Search/Search'
import * as searchAction from '../../actions/search';
import {bindActionCreators} from 'redux';

const mapStateToProps = (state)=>{
    return state; //reducer里定义的state属性
}

const mapDispatchToProps = (dispatch)=>{
    return {
        searchActions:bindActionCreators(searchAction,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);