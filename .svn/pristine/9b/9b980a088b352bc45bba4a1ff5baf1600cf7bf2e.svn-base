
import React from 'react'
import {Link} from 'react-router-dom'
import request from '../../util/request'
import Loading from '../../common/Loading/Loading'
import { Carousel, Card} from 'antd'
import API from '../../util/api'

class Recommend extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loaded:false
        }
        this.getData = this.getData.bind(this)
    }

    componentDidMount(){
        this.getData();
    }

    async getData(){
        try{
            //得到的是fetch封装的地址
            let banner_response = await request.get(`/kugou/${API.new_song}`);
            console.log(banner_response)
            //通过fetch里json()方法得到真正的数据
            let banner_data = await banner_response.json();
            console.log(banner_data)
            let song_response = await request.get(`/kugou/${API.song_play}`);
            let song_data = await song_response.json();

            this.setState({
                loaded:true,
                banner:banner_data.banner,
                song_list:song_data.plist.list.info
            })

        }catch(err){
            console.log(err)
        }
    }


    render(){

        if(this.state.loaded){
            let setting = {
                dots:true,
                autoplay:true,
                effect:"fade"
            }
            let carousel = this.state.banner.map((ele,index)=>{
                return(
                        <div key={index}>
                            <img className="carImg" src={ele.imgurl} alt={ele.title} />
                        </div>
                )
            });
            /*动态link参数式*/
            let songList = this.state.song_list.map((ele,index)=>{
                return(
                        <Card style={{boxSizing:"content-box!important"}} key={index}
                              className="songList" cover={<Link to={{pathname:`/albumlist/${ele.specialid}`,state:{searchValue:ele}}}><img src={ele.imgurl.replace(/\{size\}/g,400)} alt={ele.specialname} /></Link>}>
                            <p>{ele.specialname}</p>
                        </Card>
                )
            })

            return(
                    <div className="recommend">
                        <Carousel {...setting}>
                            {carousel}
                        </Carousel>
                        <div className="recommendTitle">推荐歌单</div>
                        <div className="songWrap">
                            {songList}
                        </div>
                    </div>
            )
        }
        else{
            return(
                    <Loading/>
            )
        }
    }
}

export default Recommend;