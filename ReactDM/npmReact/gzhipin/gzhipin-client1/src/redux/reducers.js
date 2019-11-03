//包含n个reducer函数：根据旧的state和指定的action，返回一个新的state

import {combineReducers} from 'redux';

import {AUTH_SUCCESS,ERROR_MSG} from "./action-types";
import {getRedirectTo} from '../utils/index.js'; //引入工具函数


const initUser = {
    username: '',
    type: '', //用户类型 dashen或laoban
    msg: '', //错误提示信息
    redirectTo: '' //需要自动跳转的路由path
};

/*  产生user状态的 reducer函数：
* 函数名为user
*
*  */
function user( state=initUser, action ){
    switch ( action.type ){
        case AUTH_SUCCESS: //data是user，返回正确的数据user
            const {type,header} = action.data;
            //授权成功后，跳转至哪里？需动态计算跳转路由
            return { ...action.data, redirectTo:getRedirectTo(type,header) };
        case ERROR_MSG: //data是msg，返回错误提示信息msg
            return { ...state, msg: action.data };
        default:
            return state;
    }
};

// function xxx( state=0, action ){
//     return state;
// }
//
// function yyy( state=0, action ){
//     return state;
// }

//向combineReducers传入：以多个不同 reducer函数作为value的对象object
// export default combineReducers({
//     xxx,
//     yyy
// } )
/*
* combineReducers返回值(即 向外暴露的状态的结构：)：
* 向store 返回一个state对象：
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
export default combineReducers({ //将此新状态(对象)暴露出去，传给store
    user
});

