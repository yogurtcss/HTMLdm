/* 包含n个action creator：同步action、异步action
* 同步的action，都返回一个对象
* 异步的action，都返回一个（回调）函数：在回调函数中就可以执行异步的代码
*/

import {reqRegister,reqLogin} from "../api/index.js";
import {AUTH_SUCCESS, ERROR_MSG} from "./action-type";

/* 为什么ERROR_MSG 不写成：AUTH_Failure或AUTH_ERROR (授权失败)呢？
* 理由：前台验证(后面补充)
*  */


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
            dispatch( authSuccess(rst.data) ); //分发一个成功的同步action
        }
        else{ //失败状态
            dispatch( errorMsg(rst.msg) ); //分发一个失败的同步action
        }
    } );
} );
