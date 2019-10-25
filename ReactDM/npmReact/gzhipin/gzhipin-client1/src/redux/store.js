//redux最核心的管理对象模块

import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'; //异步中间件
import {composeWithDevTools} from 'redux-devtools-extension'; //扩展工具

import reducers from './reducers.js';

//向外暴露store对象：在外部直接 import store from '..这个/store.js'即可
export default createStore(
    reducers,
    composeWithDevTools( applyMiddleware(thunk) )
);