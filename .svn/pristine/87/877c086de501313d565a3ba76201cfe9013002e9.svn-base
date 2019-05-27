
import React from "react";
import {Icon} from 'antd';
import "./musicList.styl"
class MusicList extends React.Component{

    close(){

    }

    render(){
        console.log(this.props)
        const musicList = this.props.musicList;
        //即是musicList的length大于0就执行后面的语句
        const lists = musicList.length > 0 && musicList.map((ele,index)=>{
            return(
                    <li key={index}>
                        <span>{ele.filename}</span>
                        <Icon type="close" />
                    </li>
            )
        })

        return(
                <div className={`music-list ${this.props.show ? 'translateY-0':''}`}>
                    <div className="list-title">
                        <Icon type="close" />
                        <span>播放列表({musicList.length})首</span>
                        <em>清除</em>
                    </div>
                    <ul className="list-ul">
                        {lists}
                    </ul>
                </div>
        )
    }
}

export default MusicList;