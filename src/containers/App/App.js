//根节点

import React, { Component } from 'react';
import {Provider} from 'react-redux';
import Routes from '../../route/index';
import configureStore from '../../store/configureStore';
import 'antd/dist/antd.less'; //直接引入css文件会报警告
import './App.styl';

const store = configureStore(); //把configureStore这个函数运行起来

//可以简写返回对象时用括号把对象括起来
//即箭头函数后直接跟小括号
class App extends Component {
  render() {
    return (
         <Provider store={store}>
             <Routes/>
         </Provider>
    );
  }
}

export default App;

