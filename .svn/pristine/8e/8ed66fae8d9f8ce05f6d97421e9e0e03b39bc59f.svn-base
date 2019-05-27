
import React from 'react';
import './search.styl';
import { Icon } from 'antd';

class Search extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loaded:false,
            value:'',
            display:true,
            history:localStorage.getItem('search_history') ? JSON.parse(localStorage.getItem('search_history')) : [],
            hotListData:[]
        };

        this.setHistory = this.setHistory.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

    }

    componentDidMount() {
        this.props.hotList.length > 0 && localStorage.setItem('hotList', JSON.stringify(this.props.hotList));
    }

    handleSearchHot(val){
        this.props.history.push({pathname:'/search/result',state:{searchValue:val}});
        this.setHistory(val)
    }

    keyUp(e){
        this.setState({display:true}); //显示清除按钮
        //左边的表达式成立,右边的才能执行
        e.keyCode === 13 && this.handleSearch();
    }

    handleSearch(){
       const searchValue = this.state.value.trim();
       if(searchValue !== ''){
           //在页面的浏览历史中加入跳转
           this.props.history.push({pathname:'/search/result',state:{searchValue:searchValue}})
           this.setHistory(searchValue);
       }
    }

    setHistory(val){
        console.log(this.state)
        this.setState({history:this.state.history.push(val)});
        const searchHistory = this.state.history;
        let newHistory = [];
        for(let i = 0; i < searchHistory.length; i++){
            if(newHistory.indexOf(searchHistory[i]) === -1){//去重
                newHistory.push(searchHistory[i]);
            }
        }
        console.log(newHistory)
        localStorage.setItem('search_history',JSON.stringify(newHistory));
    }

    handleChange(e){
        this.setState({value:e.target.value});
    }

    clearHistory(text){
        const historyArr = JSON.parse(localStorage.getItem("search_history"));
        const index = historyArr.indexOf(text);
        historyArr.splice(index,1); //删除指定位置的元素
        localStorage.setItem('search_history',JSON.stringify(historyArr));
        this.setState({history:historyArr});
    }

    clearAll(){
        localStorage.setItem('search_history',JSON.stringify([]));
        this.setState({history:[]});
    }

    clearText(){
        this.setState({
            value:'',
            display:false
        })
    }

    back(){
        this.props.history.goBack()
    }
    render(){
        //不能在存入取出时直接转,需要在完全的到时转(如果存入的是数组)
        const hotListData =  this.props.hotList.length > 0 ? this.props.hotList : JSON.parse(localStorage.getItem('hotList'));
        console.log(hotListData)
        console.log(this.state)
        //热门搜索词
        const hotList = hotListData.map((ele)=>{
            return (
                    <span key={ele.sort} onClick={()=>this.handleSearchHot(ele.keyword)}>{ele.keyword}</span>
            )
        });
        return (
                <div className='search'>
                    <div className='header'>
                        <div className='headerBack' onClick={()=>this.back()}>
                            <Icon type='arrow-left' />
                        </div>
                        <div className='searchBar'>
                            <div className="searchInput">
                                <Icon type='search' />
                                <input type="text" className='input-search' value={this.state.value} onChange={(e)=>this.handleChange(e)}  placeholder={"请输入关键字"} onKeyUp={(e)=>this.keyUp(e)} />
                                <Icon type="close" onClick={()=>this.clearText()} style={{display:this.state.display ? 'block' : 'none'}} />
                            </div>
                        </div>
                        <div className="headerRight" onClick={this.handleSearch}>搜索</div>
                    </div>
                    <div className="hotSearch">热门搜索</div>
                    <div className="hotList">
                        {hotList}
                    </div>
                    <div className="searchHistory">
                        <span>搜索历史</span>
                        <span onClick={()=>this.clearAll()}>清除历史</span>
                    </div>
                    <div className="historyList">
                        {
                            this.state.history.length > 0 ? this.state.history.map((ele,index)=>{
                                return(
                                        <p key={index}>
                                            <span>{ele}</span>
                                            <Icon type={'close'} onClick={()=>this.clearHistory(ele)} />
                                        </p>
                                )
                            }) : null
                        }
                    </div>
                </div>
        )
    }
}

export default Search;
