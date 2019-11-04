//n个action type名称常量

// authorization授权
export const AUTH_SUCCESS = 'auth_success'; //注册及登陆成功
export const ERROR_MSG = 'error_msg'; //请求前或请求后 的错误提示信息

/* 为什么ERROR_MSG 不写成：AUTH_Failure或AUTH_ERROR (授权失败)呢？
* 理由：前端验证(后面补充)
*  */

export const RECEIVE_USER = 'receive_user'; //接收 返回响应中的、更新完毕的用户信息
export const RESET_USER = 'reset_user'; //重置用户信息：将之恢复为初始值
