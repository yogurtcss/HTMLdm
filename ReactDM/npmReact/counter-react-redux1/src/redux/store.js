//从index.js中，关于store的代码完全抽离出来

/* -----P42 redux异步编程-----
* applyMiddleware( thunk )，应用异步中间件
*  */
import {createStore,applyMiddleware} from 'redux';
//引入reducer函数
import {counter} from './reducers';
//异步中间件
import thunk from 'redux-thunk';

/* 生成一个store对象
* createStore执行时，内部会第一次调用reducer函数，
* 得到初始state
*  */
const store = createStore(
    counter,
    applyMiddleware(thunk)
);
//把store暴露出去
export default store;