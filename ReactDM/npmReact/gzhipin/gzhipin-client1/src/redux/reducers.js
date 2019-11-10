//包含n个reducer函数：根据旧的state和指定的action，返回一个新的state

import {combineReducers} from 'redux';

import {
    AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER,
    RESET_USER,RECEIVE_USER_LIST,
    RECEIVE_MSG,RECEIVE_MSG_LIST
} from "./action-types";
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
        case RECEIVE_USER: //data是 更新的用户信息
            return action.data; //向store返回已更新的数据
        case RESET_USER: //data是 msg
            return { ...initUser, msg: action.data }; //更新失败，返回初始数据(initUser中全为空字段)
        default:
            return state;
    }
};

//产生userlist状态的reducer
const initUserList = [];
function userList( state=initUserList, action ){
    switch ( action.type ){
        case RECEIVE_USER_LIST:
            return action.data; //data为userlist
        default:
            return state;
    }
}

const initChat = { //根据后端接口文档返回的chat数据所得
    users_getNameHeaderByUserId: {},      //所有用户的用户名、头像信息，属性名userid，属性值{ username,header }。注意，是所有用户！！
    chatMsgs: [],   //聊天中当前用户的所有相关msg的数组
    unReadCount: 0 //总的未读数量
};


//产生聊天状态的reducer
function chat( state=initChat, action ){
    switch( action.type ){
        case RECEIVE_MSG_LIST: //传来的data是一个对象： { users:{}, chatMsgs:[] }
            /* 用户一登陆上来，就该获取当前用户的消息列表
            * 用户什么时候登陆成功?
            * 1.通过register注册成功后，就自动登陆成功；
            * 2.通过login登陆成功
            * 3.getUser获取用户信息成功时，此用户也是登陆成功了
            *
            *  */
            /* 解构赋值时，名字一定要一一对应好了！！不然报undefined的错误
            * 我在后台传值给前台时，定义的变量名就是users_getNameHeaderByUserId，解构赋值时一定要注意！！
            *  */
            const {users_getNameHeaderByUserId,chatMsgs,userid} = action.data;
            return { users_getNameHeaderByUserId:users_getNameHeaderByUserId, chatMsgs:chatMsgs, unReadCount:0 }; //属性名与属性值同名，原本可以使用对象的解构赋值法，这里不用了
        case RECEIVE_MSG: //返回的data为：一条消息chatMsg
            /* 此时的users_getNameHeaderByUserId：还是我原来的用户，state.users_getNameHeaderByUserId
            *  */
            const {chatMsg} = action.data;
            return {
                users_getNameHeaderByUserId:state.users_getNameHeaderByUserId, //我佛了，排了一个小时的bug，就在这里！
                chatMsgs: [ ...(state.chatMsgs), chatMsg ], //聊天中当前用户的所有相关msg的数组。将新消息合并进来； ...是拆包操作
                unReadCount: 0
            };
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
    user,           //关于用户个人信息的状态数据
    userList,        //关于用户信息列表展示的数据：dashen、laoban
    chat
});

