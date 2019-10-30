var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* 注册一个路由：用户注册
* a. 后台应用运行端口指定为 4000
* b. 提供一个用户注册的接口
*   a) path 为: /register
*   b) 请求方式为: POST
*   c) 接收 username 和 password 参数
*   d) admin 是已注册用户
*   e) 注册成功返回: {code: 0, data: {_id: 'abc', username: ‘xxx’, password:’123’}
*   f) 注册失败返回: {code: 1, msg: '此用户已存在'}
*
*  */

/* 注意，写后台应用时，在WebStorm中，
* 把 语言&框架 由JSX改为ECMAScript6(ES6)
* 前台应用：React JSX
* 后台应用：ECMAScript6(ES6)
*  */
// router.post( '/register', function(req,res){
//   console.log('热更新嗷');
//   //1.获取请求的参数 req.body
//   const {username,password} = req.body;
//   //2.处理
//   // console.log( 'register', username, password );
//   if( username==='admin' ){ //admin 是已注册用户
//     //3.返回响应数据 res.send(...响应数据)
//     res.send( {code:1, msg:'此用户已存在'} ); // 注册失败返回: {code: 1, msg: '此用户已存在'}
//   }
//   else{
//     res.send( //注册成功返回: {code: 0, data: {_id: 'abc', username: ‘xxx’, password:’123’}
//         {code:0, data:{_id:'abc', username, password} } );
//   }
//
// } );


/* ----------2019-10-30 10:16:20---------- */

const {UserModel} = require( '../db/models.js' ); //取出UserModel
const md5 = require('blueimp-md5'); //使用md5先加密 password，然后存入数据库中

//注册路由
router.post( '/register', function(req,res){
  //读取请求参数数据
  const {username,password,type} = req.body;
  /* 处理
  * 1.判断用户是否存在：
  * 若存在，则注册失败；
  * 若不存在，则注册成功，此post的数据进入数据库中
  *  */
  UserModel.findOne( {username:username},function(err,user){
    if(user){ //如果此用户存在，则返回一个提示响应数据(JSON格式)：此用户已存在
      res.send( {code:1, msg:'此用户已存在'} );//code 数据是否为正常数据的标识，1、0的含义根据后端API文档而定
    }
    else{ //不存在，则此post数据进入数据库中
      UserModel.create( {
        username:username, //可以用ES6的对象简写语法，这里暂不用
        password:md5(password), //将用户密码使用md5加密后，再存入数据库中
        type:type
      },
          function(err,user){ //后端API文档要求返回的数据带上_id
            res.cookie( 'userid', user._id, {MaxAge:1000*60*60*24} ); //持久化cookie，一天内免登录

            const myData = {username,type, _id:user._id};
            res.send( {code:0, data:myData} ) //响应数据中，不要返回密码
          })
    }
  } )


  //返回响应数据
} );

//登陆路由




module.exports = router;
