//从index.js中，关于store的代码完全抽离出来

import {createStore} from 'redux';
//引入reducer函数
import {counter} from './reducers';
/* 生成一个store对象
* createStore执行时，内部会第一次调用reducer函数，
* 得到初始state
*  */
const store = createStore( counter );
//把store暴露出去
export default store;