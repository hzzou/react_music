
import React from 'react';
import Header from '../../common/Header/Header';
import { Link } from 'react-router-dom';
import {Icon} from 'antd';
import Loading from '../../common/Loading/Loading';
import './result.styl';

class Result extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            addRemove:true
        }
        this.setStyle = this.setStyle.bind(this);
    }
    componentWillMount(){
        //清空之前页面的数据遗留问题，则转换为清空state里resultList原来存储的值
        console.log(this.props)
        this.props.searchActions.clearSearchResult();
    }

    componentDidMount(){
        console.log(this.props)
        this.props.searchActions.fetchSearchResult(this.props.location.state.searchValue)
    }


    addFavorite = (e,ele)=>{
        if(e.currentTarget.style.color === "" || e.currentTarget.style.color === "rgb(102, 102, 102)"){
            e.currentTarget.style.color = "#f00";
            this.props.musicActions.addFavoriteMusic(ele.hash+','+ele.filename);
        }
        else{
            e.currentTarget.style.color = "#666";
            this.props.musicActions.removeFavoriteMusic(ele.hash+','+ele.filename);
        }
    }

    addOne(e,ele){
        /*console.log(e)
        console.log(ele)
        console.log(e.currentTarget)
        console.log(e.currentTarget.previousSibling)
        console.log(this.props)*/
        e.currentTarget.style.display = "none";
        e.currentTarget.nextSibling.style.display = "block";
        this.props.musicActions.addMusicOne(ele)
    }

    removeOne(e,ele){
        e.currentTarget.style.display = "none";
        e.currentTarget.previousSibling.style.display = "block";
        this.props.musicActions.removeMusicOne(ele)
    }

    addOrRemoveAll(data){
        let plusOne = document.getElementsByClassName('plus_one')
        let minusOne = document.getElementsByClassName('minus_one')
        if(this.state.addRemove){
            this.props.musicActions.addMusicAll(data)
            this.setState({
                addRemove:false
            });
            for(let i = 0; i < plusOne.length; i++){
                plusOne[i].style.display = "none";
            }

            for(let i = 0; i < minusOne.length; i++){
                minusOne[i].style.display = "block";
            }
        }
        else{
            this.props.musicActions.removeMusicAll()
            this.setState({
                addRemove:true
            });
            for(let i = 0; i < plusOne.length; i++){
                plusOne[i].style.display = "block";
            }

            for(let i = 0; i < minusOne.length; i++){
                minusOne[i].style.display = "none";
            }
        }
    }

    setStyle(ele){
        return this.props.favoriteMusic.length > 0 && this.props.favoriteMusic.indexOf(ele.filename) >= 0 ? {color:"rgba(233,32,61)"} : {color:""}
    }

    back(){
        this.props.history.goBack();
    }

    render(){
        console.log(this.props)
        let result = null;
        let data = this.props.resultList;
        let onOff = 0;
        if(data.length>0){
            onOff = 1;
            result = data.map((ele,index)=>{
                return(
                        <li key={index}>
                            <Link to={'/search/result'}>
                                <span>{ele.filename}</span>
                                <span style={{"float":"right","marginLeft":"20px","display":"flex","justifyContent":"flex-start"}}>
                                     <Icon onClick={(e)=>this.addFavorite(e,ele)} type="heart" style={this.setStyle(ele)} theme="filled" />
                                     <Icon onClick={(e)=>this.addOne(e,ele)} className="plus_one" type="plus"  />
                                     <Icon onClick={(e)=>this.removeOne(e,ele)} className="minus_one" type="minus"  />
                                </span>

                            </Link>
                        </li>
                )
            })
        }

        return(
                <div className="result">
                    <Header title={"搜索结果"} leftAction={()=>this.back()} rightIcon={true} rightClassName={"plus"} rightAction={()=>this.addOrRemoveAll(data)} />
                    {onOff === 1 ? <ul>{result}</ul> : <Loading/>}
                </div>

        )
    }
}

export default Result;