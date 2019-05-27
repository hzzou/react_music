
import React from 'react'
import { Link } from 'react-router-dom'
import API from '../../util/api'
import Header from '../../common/Header/Header'
import { Icon } from "antd";
import Loading from "../../common/Loading/Loading";
import "./albumList.styl";

class AlbumList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loaded:false,
            songList:[],
            songInfo:{},
            addRemove:true
        }
        this.getData = this.getData.bind(this)
    }

    componentDidMount(){
        this.getData()
        console.log(this.props)
    }

    async getData(){
        let song_data = await fetch(`/kugou/${API.song_playlist}/${this.props.match.params.id}&json=true`).then(function(res){
            return res.json()
        }).catch(function(error){
            console.log(error)
        })

        if(song_data.list.list.info.length>0){
            this.setState({
                songList:song_data.list.list.info,
                songInfo:{
                    img:song_data.info.list.imgurl,
                    name:song_data.info.list.specialname,
                    creater:song_data.info.list.nickname,
                    time:song_data.info.list.publishtime
                },
                loaded:true
            })
        }

    }

    addFavorite = (e,ele)=>{
        if(e.currentTarget.style.color === "" || e.currentTarget.style.color === "rgb(102, 102, 102)"){
            e.currentTarget.style.color = "#f00";
            this.props.musicActions.addFavoriteMusic(ele.filename);
        }
        else{
            e.currentTarget.style.color = "#666";
            this.props.musicActions.removeFavoriteMusic(ele.filename);
        }
    }

    //添加时自动播放第一首(控制全局播放条)
    addOne(e,ele){
        e.currentTarget.style.display = "none";
        e.currentTarget.nextSibling.style.display = "block";
        //musicList为空，则说明此时装进去的是第一个元素,则执行自动播放
        this.props.musicList.length === 0 && this.props.musicActions.fetchMusic(ele.hash);
        this.props.musicActions.getMusicHash({hash:ele.hash});//把这首歌的hash存为当前音乐hash
        this.props.musicActions.fetchMusic(ele.hash); //获取歌曲地址和歌词信息,存在musicList
        this.props.musicActions.control({playing:true});
        this.props.history.push(`/playControl/#${ele.hash}`);
    }

    //删除已获取的音乐地址和歌词
    removeOne(e,ele){
        e.currentTarget.style.display = "none";
        e.currentTarget.previousSibling.style.display = "block";
        this.props.musicActions.removeMusicOne(ele);//从musicList里移除
    }

    //添加或移除所有歌曲到播放列表,添加时获取所有歌曲的歌曲地址和歌词地址
    addOrRemoveAll(data){
        let plusOne = document.getElementsByClassName('plus_one')
        let minusOne = document.getElementsByClassName('minus_one')
        //addAll是通过for循环逐次添加
        if(this.state.addRemove){
            //获取所有歌曲的地址和歌词
            for(let i = 0; i < data.length; i++){
                this.props.musicActions.fetchMusic(data[i].hash)
            }
            //把当前要播放的音乐的hash传过去
            this.props.musicActions.getMusicHash({hash: data[0].hash});
            this.props.musicActions.control({playing: true});
            this.props.history.push(`/playControl/#${data[0].hash}`);

            this.setState({
                addRemove:false
            });
            for(let i = 0; i < plusOne.length; i++){
                plusOne[i].style.display = "none";
            }

            for(let i = 0; i < minusOne.length; i++){
                minusOne[i].style.display = "block";
            }
        }//removeAll是一次性把数组清空
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
        this.props.history.goBack()
    }

    //把当前正在播放的音乐的相关存储信息清零，以免进入播放新的歌曲时出现bug
    updatePlayProgress(){
        this.props.musicActions.updateProgress({currentTime:0,percentage:0});
    }

    render(){
        if(this.state.loaded){
            let songList = this.state.songList.map((ele,i)=>{
                return(
                        <li key={i}>
                            <Link onClick={()=>this.updatePlayProgress()} to={{pathname:`/playControl/`, hash:`${ele.hash}`}} >{/*静态参数式*/}
                                <span>
                                    <span>{ele.filename}</span>
                                    <span>{ele.remark}</span>
                                </span>
                            </Link>
                            <span style={{"marginLeft":"20px","display":"flex","justifyContent":"flex-start"}}>
                                <Icon onClick={(e)=>this.addFavorite(e,ele)} type="heart" theme="filled" style={this.setStyle(ele)} />
                                <Icon onClick={(e)=>this.addOne(e,ele)} type="plus" className="plus_one" />
                                <Icon onClick={(e)=>this.removeOne(e,ele)} type="minus" className="minus_one" />
                            </span>
                        </li>
                )
            });

            return(
                <div className="albumList">
                    <Header leftAction={()=>this.back()} rightIcon={false} title={"歌单"} />
                    <div className="album-top" >
                        <div className="album-bg" style={{background:"url("+this.state.songInfo.img.replace(/\{size\}/g,400)+") no-repeat",backgroundSize:"100% auto"}}>

                        </div>
                        <div className="album-content">
                            <img className="album-img" src={this.state.songInfo.img.replace(/\{size\}/g,400)} alt=""/>
                            <div className="album-text">
                                <p>名称:{this.state.songInfo.name}</p>
                                <p>创建人:{this.state.songInfo.creater}</p>
                                <p>更新时间:{this.state.songInfo.time}</p>
                            </div>
                        </div>
                    </div>
                    <div className="album-play">
                        <span>播放全部</span>
                        <Icon type="plus" onClick={()=>this.addOrRemoveAll(this.state.songList)} />
                    </div>
                    <div className="album-list">
                        <ul>{songList}</ul>
                    </div>
                </div>
            )
        }
        else{
            return(
                <Loading />
            )
        }

    }
}

export default AlbumList;