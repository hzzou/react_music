
import React from 'react';
import request from '../../util/request';
import Header from '../../common/Header/Header';
import Loading from '../../common/Loading/Loading';
import Cheerio from 'cheerio';
import './singerInfo.styl';

class SingerInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loaded:false
        };
    }


    componentDidMount(){
        request.get(`/yy_kugou/singer/home/${this.props.location.state.singerId}.html`).then(res => res.text()).then(res => {
            const $ = Cheerio.load(res);
            console.log($)
            const text = $("#singer_content").text();
            this.setState({
                loaded:true,
                singerInfo:text
            });
        }).catch(err => {
            console.log("Error:"+err);
        })

    }

    //回退
    back(){
        this.props.history.goBack()
    }

    render(){
        return (
            <div className="singer-info">
                <Header leftAction={()=>this.back()} title={this.state.loaded ? '歌手简介' : null} />
                { this.state.loaded ?
                    <div className="singer-con">
                        <p className="text-con">
                            {this.state.singerInfo}
                        </p>
                    </div>:
                    <Loading />
                }
            </div>
        )
    }
}

export default SingerInfo;