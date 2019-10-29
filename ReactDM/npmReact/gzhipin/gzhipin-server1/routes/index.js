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
router.post( '/register', function(req,res){
  console.log('热更新嗷');
  //1.获取请求的参数 req.body
  const {username,password} = req.body;
  //2.处理
  // console.log( 'register', username, password );
  if( username==='admin' ){ //admin 是已注册用户
    //3.返回响应数据 res.send(...响应数据)
    res.send( {code:1, msg:'此用户已存在'} ); // 注册失败返回: {code: 1, msg: '此用户已存在'}
  }
  else{
    res.send( //注册成功返回: {code: 0, data: {_id: 'abc', username: ‘xxx’, password:’123’}
        {code:0, data:{_id:'abc', username, password} } );
  }

} );



module.exports = router;
