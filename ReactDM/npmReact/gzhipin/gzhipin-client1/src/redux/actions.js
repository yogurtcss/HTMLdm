/* 包含n个action creator：同步action、异步action
* 同步的action，都返回一个对象
* 异步的action，都返回一个（回调）函数：在回调函数中就可以执行异步的代码
*/

import {
    reqRegister,reqLogin,reqUpdateUser,
    reqUser,reqUserList,
    reqChatMsgList,reqReadMsg
} from "../api/index.js";

import {
    AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER,
    RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG
} from "./action-types";
import io from 'socket.io-client'; //注意，从外部引入的io函数(函数也是对象)是一个 外部的、全局对象。在创建单例对象时可选择保存到io中

/* 为什么ERROR_MSG 不写成：AUTH_Failure或AUTH_ERROR (授权失败)呢？
* 理由：前台验证(后面补充)
*  */

/* -----2019-11-08 16:58:11----- */
/* 将建立socket连接对象的操作，封装成一个函数
* 单例模式：一个类只能构建一个对象的设计模式
*
* 在这里利用单例模式，规定：执行一次sendMsg(即 发送一个消息)，只能创建一个socket对象(不会重复创建多个相同的socket对象)
*
* 可以调用多次函数initIO()，但是同一个socket对象只创建一次，则此socket对象称为 单例对象
*
* 单例对象的创建方式
* 1.创建对象XXX之前：判断对象XXX是否已经存在——只有不存在时，才创建此对象XXX ——这就是单例对象的关键、精髓！
* 2.创建对象XXX之后：保存对象XXX
*    保存对象XXX到哪？
*    1.保存此对象至外部的、已有的全局对象AAA中——令XXX成为此全局对象AAA的一个属性，通过AAA.XXX调用此单例对象XXX
*    2.保存此对象至另一个非全局对象BBB中——令XXX成为BBB的一个属性，通过BBB.XXX调用此单例对象XXX
*
*  */
function initIO(dispatch,userid){
    // 判断 欲创建的对象是否已经存在——只有不存在时，才创建此对象
    if( !io.socket ){ //欲创建一旦存在了，就不再创建了——这就是单例对象的关键、精髓！
        /* 注意，欲创建对象 要提前指定好保存到哪，
        * 在这里我选择保存在 外部的、全局对象io中(令其成为此全局对象io的一个属性)
        * 故将 欲创建的对象命名为 io.socket
        *  */
        //连接 强化后的io服务器，得到连接对象socket
        io.socket = io('ws://localhost:5000'); //创建对象之后：在这里，保存socket对象到外部的、全局对象io中，使socket对象成为全局对象io的一个属性

        io.socket.on( 'receiveMsg', (chatMsg)=>{
            console.log('客户端接收服务器发送的消息', chatMsg);
            /* 在这里我是通过io全局发消息的，
            * 当chatMsg是与当前用户相关的消息时，我才去分发同步action保存消息
            *  */
            if( userid===chatMsg.from || userid===chatMsg.to ){
                dispatch(receiveMsg(chatMsg));
            }
        } );
    }

}

/* 用户一登陆上来，就该获取当前用户的消息列表
 * 用户什么时候登陆成功?
 * 1.通过register注册成功后，紧接着登陆，就登陆成功；——接着调用getMsgList()
 * 2.通过login登陆成功；——接着调用getMsgList()
 * 3.getUser获取用户信息成功时，此用户也是登陆成功了；——接着调用getMsgList()
 *
 * 将获取消息列表这一操作，封装成一个函数
 *  */
async function getMsgList(dispatch,userid){ //异步获取消息列表数据，传入形参dispatch，用于分发同步action
    /* 之前的 return async dispatch=>{...}  这也是传入形参dispatch的写法！！想起来了。
    *  */
    initIO(dispatch,userid); //登陆成功后：准备获取消息列表getMsgList，这时立马初始化io
    const res = await reqChatMsgList();
    const rst = res.data; //若不知道rst的数据结构，可以到后端接口文档中查看返回数据的格式
    if( rst.code===0 ){
        const {users_getNameHeaderByUserId,chatMsgs} = rst.data;
        dispatch( receiveMsgList({users_getNameHeaderByUserId,chatMsgs}) ); //分发同步action

    }
}





export const sendMsg=  ({from,to,content})=>{ //发送消息的异步请求
    return( dispatch=>{
        console.log('客户端向服务器发送消息嗷', {from,to,content});
        /* 调用已封装的函数，连接至io服务器，
        * 注意：在函数内部的if(!io.socket) 已经限制了 此连接对象只能创建一次
        * 多次执行此sendMsg，也不会重复创建socket连接对象
        *  */
        // initIO(); //改为 放在函数getMsgList()中
        io.socket.emit( 'sendMsg',{from,to,content} ); //发送消息至服务器
    } )
};

//接收消息列表的同步action，后来在排BUG时加上的userid，但没用上
const receiveMsgList=  ({users_getNameHeaderByUserId,chatMsgs, userid})=>( {type:RECEIVE_MSG_LIST, data:{users_getNameHeaderByUserId,chatMsgs, userid}} );
//接收一个消息的同步action，后来在排BUG时加上的userid，但没用上
const receiveMsg=  (chatMsg)=>( {type:RECEIVE_MSG, data:{chatMsg}} );



/* 授权成功的同步action；
* 1.使用函数表达式(也叫 函数字面量)写法；
*    - 函数表达式创建的函数是在运行时进行赋值，且要等到表达式赋值完成后才能调用
*   - 语法
*     var/let/const 变量名XXX = function(参数){ //没有函数表示标识符
*       要执行的代码...
*     }
*   - 调用： 变量名XXX(参数)
*
* 2.使用箭头函数：没有花括号{}，箭头自动return
*
*  */
const authSuccess =    (userInfo)=>( {type:AUTH_SUCCESS, data:userInfo} );
//错误提示信息的同步action
const errorMsg    =    (msg)=>( {type:ERROR_MSG, data:msg} );
//接收 返回响应中的、更新完毕的用户信息 的同步action
const receiveUser =    (userInfo)=>( {type:RECEIVE_USER, data:userInfo} );
//重置用户信息的同步action，后面再说
//暴露为 logout 单击响应函数用
export const resetUser  =     (msg)=>( {type:RESET_USER, data:msg} );
//接收用户列表的同步action
export const receiveUserList=  (userList)=>( {type:RECEIVE_USER_LIST, data:userList} );

//注册的异步action
/* 之前我写的是 export const register ！！！
*
*  */
export const register =  (userInfo)=>{
    /* ----------同步action：前台验证，开始---------- */
    const {username, password, password2, type} = userInfo;
    /* 做表单的前台检查，
    * 若检查不通过，返回一个errorMsg的同步action
    *  */
    if(!username){
        return errorMsg('请指定您的用户名！');
    }
    else if( password!==password2 ){
        return errorMsg('2次输入的密码必须一致嗷！！')
    };
    /* ----------同步action：前台验证，结束---------- */

    return ( async dispatch=>{ //发送注册的异步请求，使用async-await写法

        /* ----------异步action：前台验证----------
        * 不能用return，而是用dispatch！！
        *   if(...) {
        *     dispatch errorMsg(...)
        *   }
        *
        * 就因为这个BUG，排了一个多小时！
        *  */


        /* 法一：promise写法
        * promise对象.then( 成功的回调函数response=>{...里面取response.data} )
        * 太长了，不想写，直接用 async-await写法
        *  */
        // const promise = reqRegister(userInfo);//得到的是promise对象
        // promise.then( response=>{
        //     const rst = response.data; //{ code:0/1, data:user }
        // } )

        /* 法二：async-await写法
        *  (1)async必须声明的是一个function
        *     - await就必须是在这个  async声明的函数内部使用
        *     - 这里的 async 表示：该函数将始终(隐式地)返回一个 promise
        *
        *  (2)await 在异步操作处声明，等待promise执行完毕——有返回值时，代码才继续执行下去
        *     - await仅仅能在 async 标记的函数中生效。
        *
        * 示例如下：
        * async function myFun(){ //使用 async标记此函数，函数体内执行异步操作
        *     const promise = ...某处返回出来的promise对象... ;
        *     const rst = await promise; //等待，至promise获得结果，并赋值给变量rst
        *     console.log(rst); //显示结果喽
        * }
        *
        *  */

        //到了这里，表单数据合法，进行异步请求
        /* 我已在此函数的外部，使用了async声明
        *  */
        const promise = reqRegister({username, password, type});
        const response = await promise; //向后端发送请求，等待后端处理完毕后，接收此响应结果，并dispatch响应事件
        const rst = response.data; //取出响应中的数据 rst

        if( rst.code===0 ){ //标记码code为0时，成功状态
            //1.通过register注册成功后，紧接着登陆，就登陆成功；——接着调用getMsgList()
            getMsgList( dispatch,rst.data._id );
            /* 分发一个同步的、成功状态的action
            *   - 向成功态中的同步action传入rst.data，
            *   - 并分发 此成功态的同步action
            *
            * 函数表达式创建的函数是在运行时进行赋值，且要等到表达式赋值完成后才能调用
            * 调用：变量名XXX(参数)
            *  */
            dispatch( authSuccess(rst.data) ); //分发从后端返回的数据
        }
        else{ //标记码code为1时，失败状态
            /* 分发一个同步的、失败状态的action
            *   - 向失败态中的同步action传入rst.msg，
            *   - 并分发 此失败态的同步action
            *
            * 函数表达式创建的函数是在运行时进行赋值，且要等到表达式赋值完成后才能调用
            *  */
            dispatch( errorMsg(rst.msg) ); //分发从后端返回的数据
        }

    } )
} ;

/* 登陆的异步action ，与注册的异步action是同理写法的
* 尝试默写之
*  */
export const login = ( (userInfo)=>{
    //前台检查
    const {username, password} = userInfo;
    if( !username ){
        return errorMsg('请指定您的用户名！');
    }
    else if( !password ){
        return errorMsg( '请输入密码！' );
    };

    return( async dispatch=>{
        const promise = reqLogin( userInfo ); //从某处得到的promise对象
        const response = await promise; //等待，至promise获得结果，并赋给变量response
        const rst = response.data; //取出响应中的数据
        if( rst.code===0 ){ //成功状态
            //2.通过login登陆成功；——接着调用getMsgList()
            getMsgList( dispatch,rst.data._id );
            dispatch( authSuccess(rst.data) ); //分发一个成功的同步action
        }
        else{ //失败状态
            dispatch( errorMsg(rst.msg) ); //分发一个失败的同步action
        }
    } );
} );

/* 更新的异步action，与注册的异步action是同理写法
*  */
export const updateUser =  (userInfo)=>{
    return( async dispatch=>{
        //reqUpdateUser发送post的Ajax异步请求，在这里我用await取得响应
        const res = await reqUpdateUser( userInfo );
        /* 取出响应中的内容rst内容数据
        * res.data中的内容数据：共3项
        *  (1)标识码code、
        *  (2)rst.data真正可用的响应数据，属性名为data——即经过OTA差异更新，合并后的数据combineData
        *  (3)错误提示信息msg
        *  */
        const rst = res.data;
        //首先，判断标识码状态：成功/失败
        if( rst.code===0 ){ //更新成功
            //分发 更新成功的同步action
            dispatch( receiveUser(rst.data) );
        }
        else{ //更新失败
            //分发 更新失败的同步action
            dispatch( resetUser(rst.msg) );
        }
    } );
};

//获取用户信息的异步action
export const getUser=  ()=>{
    return( async dispatch=>{
        const res = await reqUser();
        const rst = res.data;
        if( rst.code===0 ){ //成功
            //3.getUser获取用户信息成功时，此用户也是登陆成功了；——接着调用getMsgList()
            getMsgList( dispatch,rst.data._id );
            dispatch( receiveUser(rst.data) )
        }
        else{ //失败
            dispatch( resetUser(rst.msg) );
        }
    } )
};

export const getUserList=  (type)=>{ //获取用户列表的异步action
    return( async dispatch=>{
        const res = await reqUserList(type); //执行ajax异步请求，并等待返回结果
        const rst = res.data; //取出返回的响应数据
        if( rst.code===0 ){ //得到结果后，分发一个同步action
            dispatch( receiveUserList(rst.data) );
        }
        //没有else了
    } )
};
