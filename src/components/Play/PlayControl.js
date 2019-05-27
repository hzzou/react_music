//音频播放控制页

import React from 'react'
import Header from "../../common/Header/Header"
import Loading from "../../common/Loading/Loading"
import noData from "../../assets/img/nodata.png"
import {Icon} from "antd";
import InputRange from "react-input-range"
import svg1 from "../../assets/img/svg-1.svg"
import svg2 from "../../assets/img/svg-2.svg"
import classnames from "classnames"
import {formatTime} from "../../util/tool"
import "./playControl.styl"

class PlayControl extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            modal:false, //歌曲列表弹框
            dot:false, //音量弹框
            volumed:true,//设置音量静音图标,为false则静音
            lyricHeight:38, //歌词高度
            progress:localStorage.getItem("currentVolume")  > 0 ? localStorage.getItem("currentVolume")*100+"%" : this.props.volumeObj.volume*100+"%" //声音大小控制
        }
    }
    componentWillMount() {
        console.log(this.props)
        let hash = this.props.location.hash.replace(/#/,"");
        if(hash !== void 0 && hash !== null && hash !== this.props.currentMusic.hash){
            this.props.musicActions.getMusicHash({hash:hash});
            this.props.musicActions.fetchMusic(hash);
            this.props.musicActions.control({playing:true});
        }
    }

    //获取当前音乐
    getCurrentSong() {
        let musicList = this.props.musicList;
        let hash = this.props.currentMusic.hash;
        let currentSong = null;
        if(musicList.length > 0 && hash !== ""){
            musicList.map((ele)=>{
                if(ele.song.hash === hash){
                    currentSong = ele;
                }
                return 0;
            })
        }
        return currentSong;
    }
    //通过右上角省略号弹出弹框,调节音量等
    openDot(){
        this.setState({dot: true,modal: false});
    }
    //关闭通过省略号弹出的弹框
    closeDot(){
        this.setState({dot: false});
    }
    //回退
    back(){
        this.props.history.goBack();
    }
    //设置收藏图标的样式
    favouriteStyle(){
        return this.props.favoriteMusic.toString().indexOf(this.props.currentMusic.hash) > -1 ? {color:'rgb(233, 32, 61)'} : {color:''}
    }
    //添加收藏
    addFavourite(event,filename){
        const currentEle = event.currentTarget;
        if(currentEle.style.color === ''){
            this.props.musicActions.addFavoriteMusic(this.props.currentMusic.hash+','+filename);
        }
        else{
            currentEle.style.color = '';
            this.props.musicActions.removeFavoriteMusic(this.props.currentMusic.hash+','+filename);
        }
    }
    //通过歌手id查看歌手信息
    singerInfo(id){
        this.props.history.push({pathname:'/singer/info',state:{singerId:id}})
    }
    //设置是否静音模式
    setVolume(){
        let currentVolume = localStorage.getItem('currentVolume'); //来自函数handleMove拖动过程中存储的值
        //静音控制值取反
        this.setState({volumed:!this.state.volumed});
        //如果静音控制值为真,则音量大小设为0
        console.log(this.state.volumed)
        if(this.state.volumed){
            console.log(this.state.volumed)
            this.props.musicActions.volumeControl({volume:0});
            this.setState({progress:0}); //把音量的长度设为0
        }
        else{
            console.log(this.state.volumed)
            if(currentVolume && currentVolume !== null){ //有手动拖动后的值
                this.props.musicActions.volumeControl({volume:parseFloat(currentVolume)});
                this.setState({progress:parseFloat(currentVolume)*100+"%"});
            }
            else{ //设置默认(一半音量)
                this.setState({progress:0.5*100+"%"});
                this.props.musicActions.volumeControl({volume:0.5});
            }
        }
    }
    //设置静音图标
    setSVG(){
        //静音图标是svg2，为假时设置静音
        return this.state.volumed ? {backgroundImage:`url(${svg1})`} : {backgroundImage:`url(${svg2})`};
    }
    //设置音量，拖动开始时获取相关参数
    handleStart(e){
        console.log(this)
        //console.log(e)

        const touchObj_1 = e.changedTouches[0];
        const x = touchObj_1.clientX;  //手指开始滑动的x方向位置
        const l = e.target.offsetLeft; //圆点的x轴上的原始位置

        let leftVal = x - l;   //手指初始位置和圆点最左边的距离

        this.setState({
            leftVal:leftVal,
            sliderWidth:this.refs.slider.offsetWidth,
            barWidth:e.target.offsetWidth
        })
        console.log(this.state)
    }
    //拖动的过程当中就设置音量大小，而非等到拖动结束
    handleMove(e){
        //解构赋值把state里已存在的赋值给左边
        const {leftVal, sliderWidth, barWidth} = this.state;
        const touchObj_2 = e.changedTouches[0];
        const moveX = touchObj_2.clientX;

        let barLeft = moveX - leftVal; //圆点距离最左边的距离

        if(barLeft < 0){
            barLeft = 0;  //最左边的时候
        }
        else if(barLeft > (sliderWidth - barWidth)){
            barLeft = sliderWidth - barWidth;  //最右边的时候
        }

        const currentValue = sliderWidth - barWidth > 0 ? (barLeft / (sliderWidth - barWidth)).toFixed(2) : 0.5;

        if(currentValue >= 0 && currentValue <= 1){
            //为0时设置静音图标,静音图标是当volumed为false
            parseFloat(currentValue) === 0 ? this.setState({volumed:false}) : this.setState({volumed:true});
            this.props.musicActions.volumeControl({volume:parseFloat(currentValue)});
            localStorage.setItem('currentVolume',currentValue);
            this.setState({progress:currentValue*100+"%"});
        }
        else{
            this.props.musicActions.volumeControl({volume:0.5});
            this.setState({progress:0.5*100+"%"});
        }
    }
    //拖动播放条改变播放位置
    onChange(value){
        //只是把播放的位置改变，所有播放状态恒为true
        this.props.musicActions.control({playing:true});
        //inputRange插件的minValue和maxValue的变动范围在0到1之间不行
        //播放对象把播放节点控制到拖动的位置
        this.props.audioPlayer.player.seekTo(parseFloat(value/100))
    }
    //切换播放状态
    changeStatus(){
        this.props.musicActions.control({playing:!this.props.control.playing});
    }

    render() {
        if(this.getCurrentSong() !== null){
            let currentSong = this.getCurrentSong().song;
            let currentLyrics = this.getCurrentSong().lyrics;
            let albumImg = currentSong.album_img.replace(/\{size\}/g,400);
            let currentTime = formatTime(this.props.progress.currentTime); //已播放的时间
            let duration = formatTime(localStorage.getItem('duration')); //总的持续时间
            let percentage = this.props.progress.percentage*100; //此处获取到的percentage是小数,使用到的最小需要扩大10倍至100倍
            //console.log(percentage)
            //console.log(currentSong)

            if(currentSong.error){
                return (
                    <div className="play-control">
                        <Header leftAction={()=>this.back()} rightIcon={false} />
                        <div className="no-data">
                            <img src={noData} alt="无音乐"/>
                            <p>{"获取音乐失败"}</p>
                        </div>
                    </div>
                )
            }
            else{
                return (
                    <div className="play-control">
                        <Header leftAction={()=>this.back()} rightIcon={true} rightClassName={"ellipsis"} title={currentSong.fileName} rightAction={()=>this.openDot()} />
                        <div className="play-bg"  style={{backgroundImage:`url(${albumImg})`}}></div>
                        <div className="component-album">
                            <div className={classnames('album-pic', this.props.control.playing ? 'playing' : 'paused')}
                                 style={{background: `url(${albumImg}) center center`, backgroundSize: 'cover'}}></div>
                        </div>
                        <div className="lyric"></div>
                        <div className="play-control-box">
                            <div className="play-time-bar">
                                <div className="time_left">{currentTime}</div>
                                <div className="play-range">
                                    <InputRange maxValue={100} minValue={0} value={percentage || 0} onChange={value => this.onChange(value)} />
                                </div>
                                <div className="time_right">{duration}</div>
                            </div>
                            <div className="play-control-bar">
                                <div className="previous"></div>
                                {/*此处正好相反，播放的时显示的是暂停键,暂停时,显示播放键*/}
                                <div onClick={()=>this.changeStatus()} className={classnames(this.props.control.playing ? 'paused' : 'playing')}></div>
                                <div className="next"></div>
                                <div className="menu"></div>
                            </div>
                        </div>
                        <div className={`dot-modal ${this.state.dot ? 'translateY-0' : ''}`}>
                            <h1>{currentSong.fileName}</h1>
                            <div className="move-btn">
                                <div className="icon-btn">
                                    <Icon style={this.favouriteStyle()} onClick={(event)=>this.addFavourite(event,currentSong.fileName)} type="heart" theme="filled"/>
                                </div>
                                <div className="icon-btn">
                                    <Icon type="user" onClick={()=>this.singerInfo(currentSong.singerId)} />
                                </div>
                            </div>
                            <div className="volume">
                                <div className="volume-icon" style={this.setSVG()} onClick={()=>this.setVolume()}></div>
                                <div className="volume-slider" ref="slider">
                                    <div className="volume-mask" style={ { width:this.state.progress}}></div>
                                    <div className="volume-bar"
                                         style={{left:this.state.progress}}
                                         onTouchStart={(e)=>this.handleStart(e)}
                                         onTouchMove={(e)=>this.handleMove(e)}
                                    ></div>
                                </div>
                            </div>
                            <p className="cancel" onClick={()=>this.closeDot()}>取消</p>
                        </div>
                    </div>
                )
            }

        }
        else if(this.props.currentMusic.hash === null || this.props.currentMusic.hash === void 0){
            return (
                <div className="play-control">
                    <Header leftAction={()=>this.back()} rightIcon={false} />
                    <div className="no-data">
                        <img src={noData} alt="无音乐"/>
                        <p>{"无音乐"}</p>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className="play-control">
                    <Loading/>
                </div>
            )
        }
    }
}
export default PlayControl