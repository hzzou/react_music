
import React from 'react';
import HomeHeader from './HomeHeader';
import Nav from './Nav';
import Recommend from './Recommend';
import './index.styl';

class Home extends React.Component{

    componentDidMount(){
        console.log(this.props)
        this.props.searchActions.fetchSearchHot()
    }
    render(){
        return(
                <div className="home">
                    <HomeHeader {...this.props} /> {/*把props传递到子级去*/}
                    <Nav {...this.props} />
                    <Recommend {...this.props} />
                </div>
        )
    }
}
export default Home