//n个action type名称常量

// authorization授权
export const AUTH_SUCCESS = 'auth_success'; //注册及登陆成功
export const ERROR_MSG = 'error_msg'; //请求前或请求后 的错误提示信息

/* 为什么ERROR_MSG 不写成：AUTH_Failure或AUTH_ERROR (授权失败)呢？
* 理由：前端验证(后面补充)
*  */

export const RECEIVE_USER = 'receive_user'; //接收 返回响应中的、更新完毕的用户信息
export const RESET_USER = 'reset_user'; //重置用户信息：将之恢复为初始值
/* ----------以上action的类型，均是关于user状态的---------- */

/* ----------以下action的类型，是一个新的状态，需由一个新的reducer处理---------- */
export const RECEIVE_USER_LIST = 'receive_user_list'; //接收用户列表数据

export const RECEIVE_MSG_LIST = 'receive_msg_list'; //接收所有相关消息的列表
export const RECEIVE_MSG = 'receive_msg';  //接收一条消息
