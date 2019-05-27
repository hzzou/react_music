
import React from 'react'
import {Link} from 'react-router-dom'

class Nav extends React.Component{

    render(){
        return(
                <ul className="nav">
                    {
                        this.props.tabs.map((item,i)=>{
                            return <li key={i} className={this.props.location.pathname===item.path ? 'active':''}>
                                <Link to={`${item.path}`}>{item.text}</Link>
                            </li>
                        })
                    }
                </ul>
        )
    }
}
Nav.defaultProps = {
    tabs:[
        {
            text:"个性推荐",
            path:"/"
        },
        {
            text:"新歌速递",
            path:"/new"
        },
        {
            text:"排行榜",
            path:"/rank"
        },
        {
            text:"歌手",
            path:"/artist"
        }
    ]
}
export default Nav;
