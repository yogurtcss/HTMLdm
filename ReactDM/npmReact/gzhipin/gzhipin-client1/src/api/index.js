/* 包含了n个接口请求函数的模块
* 每个函数返回的都是promise对象
*
* 以下的所有接口，都是根据后端API文档的要求编写的
* */

import ajax from './ajax';

/* 请求注册 req-Register
* 传入数据为 userInfo对象 { username: ..., password: ... }
* 函数表达式的写法：const reqRegister = 某个箭头函数
*  */
export const reqRegister = (  (userInfo)=> //函数表达式的写法
    /* 发送此POST请求 至 localhost:/register
    * 后端应用根据此path (/register)，处理数据
    * 然后将数据返回至 redux 的 action中
    *  */
    ajax('/register', userInfo, 'POST') //后端API文档说明是POST请求
);

/* 请求登陆 req-Login
* 传入数据为 userInfo对象 { username: ..., password: ... }
*  */
export const reqLogin = (  (userInfo)=>
    ajax('/login', userInfo, 'POST') //后端API文档说明是POST请求
);

//更新用户 的接口
export const reqUpdateUser = ( (userInfo)=>
    ajax( '/update', userInfo, 'POST' )
);

//获取用户信息
export const reqUser=  ( ()=>ajax('/user') ); //get请求

/* 获取用户列表
* 传入形参type；
* 第2个参数是 在自定义ajax函数中的data是以对象形式传入的，第3个参数默认是get请求
* */
export const reqUserList=  (type)=>ajax('/userlist', {type} );

//获取当前用户的聊天消息列表
export const reqChatMsgList=  ()=>ajax('/msglist');
//修改指定消息为已读，传入形参为：消息发送方
export const reqReadMsg=  (from)=>ajax('/readmsg',{from}, 'POST');
