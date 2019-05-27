
//search页面会共用这个header
import React from 'react';
import {Icon} from 'antd'; //ant里不只是包括Icon所以需要使用{},不用{}则表示只有它一个元素
import './header.styl';

class Header extends React.Component{
    render(){
        let str;
        if(this.props.rightIcon){
            if(this.props.rightClassName === "plus"){
                str = <Icon type={'plus'} className={this.props.rightClassName} onClick={this.props.rightAction} />;
            }
            else if(this.props.rightClassName === "ellipsis"){
                str = <Icon type={'ellipsis'} className={this.props.rightClassName} onClick={this.props.rightAction} />;
            }
        }
        else{
            str = null;
        }
        return(
                <div className={'header'} style={this.props.style ? this.props.style : null}>
                    <div className={'headerBack'} onClick={this.props.leftAction}>
                        <Icon type={'arrow-left'} />
                    </div>
                    <div className={'headerTitle'}>
                        {this.props.title}
                    </div>
                    <div className={'headerRight'}>
                        {str}
                    </div>
                </div>
        )
    }
}

export default Header