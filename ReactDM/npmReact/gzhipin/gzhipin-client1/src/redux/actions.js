//包含n个action creator：同步action、异步action

import {reqRegister,reqLogin} from '../api/index.js';

//注册的异步action
export const register = ( (userInfo)=>{
    return ( async dispatch=>{ //发送注册的异步请求，使用async-await写法
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

        /* 我已在此函数的外部，使用了async声明
        *  */
        const promise = reqRegister(userInfo); //从某处返回出来的promise对象
        const response = await promise; //等待，至promise获得结果，并赋给变量response
        const rst = response.data; //取出响应中的数据 rst
        if( rst.code===0 ){ //标记码code为0时，成功状态
            //分发一个同步的、成功状态的action

        }
        else{ //标记码code为1时，失败状态
            //分发一个同步的、失败状态的action

        };


    } );
} );

/* 登陆的异步action ，与注册的异步action是同理写法的
* 尝试默写之
*  */
export const login = ( (userInfo)=>{
    return( async dispatch=>{
        const promise = reqLogin( userInfo ); //从某处得到的promise对象
        const response = await promise; //等待，至promise获得结果，并赋给变量response
        const rst = response.data; //取出响应中的数据
        if( rst.code===0 ){ //成功状态

        }
        else{ //失败状态

        }
    } );
} );
