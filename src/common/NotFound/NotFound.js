
import React from 'react';
import img_404 from '../../assets/img/404.png';
import { Link } from 'react-router-dom';
import './notFound.styl'

export default class NotFound extends React.Component{
    render(){
        return(
                <div className={'notFound'}>
                    <img src={img_404} alt="img_404"/>
                    <span>抱歉，页面出错了！你访问的页面已经离开地球</span>
                    <Link to={'/'}>返回首页</Link>
                </div>
        )
    }
}