
/*路由配置(为方便本地打包，使用HashRouter)
开发环境下使用BrowerHistory,打包上线时使用hashHistory*/
//BrowserRouter不带#，HashRouter带#
import React from 'react';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
//HashRouter,BrowserRouter
import NotFound from '../common/NotFound/NotFound'; //无store
import Search from '../containers/Search/Search';
import Result from '../containers/Search/Result';
import Home from '../containers/Home/index';
import AlbumList from '../containers/AlbumList/AlbumList';
import MusicList from '../containers/MusicList/MusicList';
import PlayControl from '../containers/Play/PlayControl';
import PlayAudio from '../containers/Play/PlayAduio';
import SingerInfo from '../components/Artist/SingerInfo'; //无store

const Routes = ()=>(
        <div className='App'>
            <PlayAudio/>
            <Router>
                <Switch>
                    <Route path={'/404'} component={NotFound} />
                    <Route path={'/search/result'} component={Result} /> {/*子级跳转路由要放在父级前面*/}
                    <Route path={'/search'} component={Search} />
                    <Route path={'/musiclist'} component={MusicList} />
                    <Route path={'/playcontrol'} component={PlayControl} />{/*静态,可以跟hash*/}
                    <Route path={'/albumlist/:id'} component={AlbumList} />{/*动态参数式*/}
                    <Route path={'/singer/info'} component={SingerInfo} />
                    <Route path={'/'} component={Home} />
                    <Redirect from={"*"} to={'/404'} />
                </Switch>
            </Router>
        </div>
)
export default Routes;

