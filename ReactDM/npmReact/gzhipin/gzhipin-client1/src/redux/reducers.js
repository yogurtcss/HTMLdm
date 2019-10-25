//包含n个reducer函数：根据旧的state和指定的action，返回一个新的state

import {combineReducers} from 'redux';

function xxx( state=0, action ){

    return state;
}

function yyy( state=0, action ){

    return state;
}

//向combineReducers传入：以多个不同 reducer函数作为value的对象object
export default combineReducers({
    xxx,
    yyy
} )
/*
* combineReducers返回值(即 向外暴露的状态的结构：)：
* 返回一个state对象：
*   -属性名：传入给combineReducers时 对应的key( 即 各reducer的名字 )
*   -属性值：combineReducers中，每个reducer返回的state
*
* combineReducers返回值：向外暴露的状态的结构 如下
*   -属性名：各reducer的名字
*   -属性值：各reducer返回的state
* { xxx: 0,
*   yyy:0  }
*
*  */