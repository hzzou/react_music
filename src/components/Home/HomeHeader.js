
import React from 'react'
import { Link } from 'react-router-dom'
import {Icon} from 'antd'
import classNames from 'classnames' /*动态控制多个class类的存在*/

class HomeHeader extends React.Component{
    constructor(props){
        super(props)
        this.onFocus = this.onFocus.bind(this);
    }

    onFocus(){
        this.props.history.push({pathname:"/search"}); //跳转到真正的搜索页面
    }

    render(){
        const play = this.props.control.playing;

        return(
                <div className='homeHeader'>
                    <div className="userName">
                        <Link to="/">
                            <Icon type="user" />
                        </Link>
                    </div>
                    <div className="searchBar">
                        <div className="searchInput">
                            <Icon type="search" />
                            <input onFocus={this.onFocus} type="text" placeholder="请输入关键字" />
                        </div>
                    </div>
                    <div className="music-icon">
                        <Link to="/">
                            <div className="music-icon-animate">
                                {
                                    ['one','two','three','four'].map((ele,i)=>{
                                        return(
                                                <span key={i} className={classNames(ele,play ? 'playing':'paused')}></span>
                                        )
                                    })
                                }
                            </div>
                        </Link>
                    </div>
                </div>
        )
    }
}

export default HomeHeader