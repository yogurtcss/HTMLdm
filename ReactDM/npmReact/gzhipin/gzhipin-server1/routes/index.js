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
    if(user){ //如果此用户存在，则(向action.js中)返回一个提示响应数据(JSON格式)：此用户已存在
      res.send( {code:1, msg:'此用户已存在'} );//code 数据是否为正常数据的标识，1、0的含义根据后端API文档而定
    }
    else{ //不存在，则此post数据进入数据库中，并返回响应数据
      UserModel.create( {
        username, //可以用ES6的对象简写语法，这里暂不用
        password:md5(password), //将用户密码使用md5加密后，再存入数据库中
        type
      },
          /* MongoDB 默认会为每个 document 生成一个 _id 属性，作为默认主键，
          * 且默认值为 ObjectId, 可以更改 _id 的值 (可为空字符串)，
          * 但每个 document 必须拥有 _id 属性。
          *  */
          function(err,user){ //后端API文档要求返回的数据带上_id
            res.cookie( 'userid', user._id, {MaxAge:1000*60*60*24} ); //持久化cookie，一天内免登录

            const myData = {username,type, _id:user._id};
            res.send( {code:0, data:myData} ) //响应数据中，不要返回密码
          })
    }
  } )
  //返回响应数据
} );

/* ----------关于post请求中的注册信息，在postman中测试用的
* 用户名：dashen1，密码：123
* 用户名：dashen2，密码：123
*  */


//登陆路由
router.post( '/login', function(req,res){
    /* 获取请求参数的数据：注意，是req.body！！
    * 而不是req.data！！
    *
    * 一开始我记错了，写成了req.data，
    * 然后post请求不成功！！
    *  */
    const {username, password} = req.body; //注意，获得请求数据，这里是req.body！！
    /* 处理
    * 根据username和password，查询数据库中的users集合
    * 若无，则返回提示错误的信息；
    * 若有，则返回登陆成功的信息
    *  */

    /* Cookie 是 浏览器访问服务器后，
    * 服务器传给浏览器(HTTP头部)的一段识别用户身份、记录历史的数据；
    * 浏览器会将cookie保存到本地，
    * 后续访问服务器时，浏览器再通过HTTP头部把cookie传递给服务器。
    *
    * (1)给浏览器回写一个cookie：
    * res.cookie(name, value [, options]) //回写：即在返回的响应中把cookie传给浏览器喽
    *   - name：标识此cookie的名称
    * 	- value：简单的值(如字符串) 或 对象 或JSON格式
    *   - 可选的options是一个对象 {...}，其中：
    *		- 可设置持久化cookie —— 如一天之内免登录
    *		- maxAge 有效期/存活时间，一个从当前时间算起的毫秒
    *			如 {maxAge: 1000*60*60*24} 就是一天，可实现一天内免登录
    *
    *
    * (2)告诉浏览器(即返回响应res)，清除指定名称name的cookie
    * res.clearCookie( 某cookie的名称name )
    * */

    //查询中：投影 {password:0, __v:0}，取值为0表示 不查询此列(属性)
    UserModel.findOne( {username, password:md5(password)}, {password:0, __v:0} ,function(err,user){ //查询结果为user
        if(user){
            /* 若存在此userA，则：将此userA的_id属性保存到cookie的属性中，同时自动登录
            * cookie的特性：当已登录的userA需要再次发送请求时：会把userA的cookie加入此请求req中，然后发送此请求req
            *
            * 注意，存cookie时，res.cookie是单数形式！！
            * 取请求中的cookies时，req.cookies：这是复数形式！！cookies！！(后面会出现)
            *
            *
            * 当要更新userA的用户信息时，只需在发送userA的update请求时，取出此cookie中_id属性即可
            *   - 发送userA的update请求时，已标识此用户是userA了
            *  */

            /* 注意，回写cookie时，res.cookie是单数形式！！
            * 此cookie名称name为 userid；值value为 user,_id
            *  */
            res.cookie( 'userid', user._id, {maxAge:1000*60*60*24} );
            res.send( {code:0, data:user} );
        }
        else{ //登陆失败
            res.send( {code:1, msg:'用户名或密码错误啦啦'} );
        }
    } )
    //返回响应数据
} );

//更新用户信息的路由，根据后端API文档来写 2019-11-02 16:29:36
router.post( '/update', (req,res)=>{ //这次的回调函数，我写成箭头函数形式
    /* 以变量userSthUpdate，存着请求的参数：header、info、post、salary、company
    * 注，此userSthUpdate (即user something update)中的请求参数，没有 _id属性；
    *
    * 已知事实：_id相当于某用户的标识，我们需要根据 某用户的 _id 属性，检查数据库，来更新该用户的信息；
    *
    * 注意到，已注册用户userA的 _id 已被我们放在了浏览器的cookie中
    *   - res.cookie( 'userid', user._id, {maxAge:...} );
    *
    * 对某个已经注册的userA：userA第一次登录时，将此userA的_id属性保存到cookie的属性中，同时自动登录
    * cookie的特性：当已登录的userA需要再次发送请求时：会把userA的cookie加入此请求req中，然后发送此请求req
    *
    * 当要更新userA的用户信息时，只需在发送userA的update请求时，取出此cookie中_id属性即可
    *   - 发送userA的update请求时，已标识此用户是userA了
    *
    * req的cookies是一个对象：它包含 此请求中所有cookie键值对 的容器
    * 如 { 'userid': user._id,
    *      XXX:  aaa, ....
    *    }
    *  */

    /* 注意，存cookie时，res.cookie是单数形式！！
    * 取请求中的cookies时，req.cookies：这是复数形式！！cookies！！
    *
    * postman测试流程：某用户dashen_update，先执行注册reister或登陆login (把此post请求携带的cookie中的userid先传给服务器)
    * 然后此用户dashen_update 再执行更新update操作
    *  */
    const userid = req.cookies.userid; //从请求中的cookies 得到userid，以从数据库中检索，从而更新数据
    if( !userid ){ //如果user不存在(即未注册)，则返回错误提示
        res.send( {code:1, msg:'请您先登陆！'} )
    }
    else{ //如果user存在，说明此用户已经注册了，
        // 根据userid，在数据库中检索，从而更新数据
        const userSthUpdate = req.body; //从请求中得到 请求的参数，没有userid属性
        UserModel.findByIdAndUpdate(
            { _id: userid }, //参数1：根据此id，找到待修改的文档

            /* update 为更新后的数据
            * 注：只更新 模式schema中已定义属性 下的数据( 如 username, type, post, salary, company )，
            * 而不更新 模式schema中未定义属性 下的数据( new1，new2 等 )，
            * new1、new2将不出现在数据库中
            * 详情见 db_test2_findByIdAndUpdate.js 中的代码示例
            *
            * 显然，这里的userSthUpdate包含的数据为：username, type, post, salary, company
            * 初始时，数据库中的post, salary, company为空值，
            * 现通过此update，更新这3个空值为：userSthUpdate中post请求过来的值
            *
            * 即 用userSthUpdate中的值 填上 原post, salary, company 3处的空值！！
            *  */
            {userSthUpdate},  //参数2：将原数据old 更新为此数据 userSthUpdate，
            (err,oldValue)=>{
                if( !oldValue ){ //若在数据库中不存在旧数据
                    /* 说明此userid是错误的，进而可知此cookie是没用的了
                    * 告诉浏览器(返回响应res以告诉浏览器)，清除此名为userid的cookie
                    * res.clearCookie( 某cookie的名称name )
                    *
                    * 注意，回写cookie时，res.cookie是单数形式！！
                    * 上文中：此cookie名称name为 userid；值value为 user,_id
                    * res.cookie( 'userid', user._id, {...} );
                    *  */
                    res.clearCookie( 'userid' );
                    //向浏览器返回一个错误提示信息
                    res.send( {code:1, msg:'请您先登陆！'} );
                }
                else{ //数据库中存在此旧数据
                    /* post过来的userSthUpdate数据(类型为对象-JSON)：没有_id，但装着其余增量更新的数据(如 职位post、salary、company等)；
                    * 数据库中存着的oldValue(类型为对象-JSON)：装着 _id、username、password等初始数据，
                    * 现在我们想更新数据，就是 增量式地更新(合并、填上差异化的数据)
                    * 实际上，我们要做的就是 合并userSthUpdate与oldValue 这两个对象
                    *
                    * Object.assing( obj1, obj2, obj3, ... ), assign即分配
                    * 官方解释：将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
                    *
                    * 人话：将多个指定的对象(obj1、obj2、obj3、...等，注意书写顺序) 按 这些指定对象的书写之先后顺序，进行合并，
                    * 返回一个最终合并后的对象。
                    *
                    * 注意，因为此合并操作是 按obj书写 先后顺序的：
                    * 若obj1、obj2、obj3、...等，这些指定对象各自的属性有重合(具有相同属性)，后面的某个obj_(i+1) 可能会把前面某个obj 覆盖掉
                    * 若obj1、obj2、obj3、...等，这些指定对象各自的属性不重合(没有相同属性)，则书写顺序是任意的。
                    *  */
                    const {_id, username, type} = oldValue; //解构赋值，从旧数据中取出部分差异数据
                    /* 合并操作，进行OTA更新：增量式、填上差异化的数据
                    * 从后端接口文档，易知 userSthUpdate与{_id, username, type} 没有相同属性，故书写顺序是任意的 。
                    *  */
                    const combineData = Object.assign( userSthUpdate, {_id, username, type} ); //combine 混合、合并
                    res.send( {code:0, data:combineData} ); //返回响应数据
                    /* postman中测试接口
                    * register注册，用户名为 dashen_update，密码123，类型dashen
                    *
                    * postman测试流程：某用户dashen_update，先执行注册reister或登陆login (把此post请求携带的cookie中的userid先传给服务器)
                    * 然后此用户dashen_update 再执行更新update操作
                    *  */
                }
            }
        )
    }
} );

//根据cookie中，userid 获取用户信息的路由
router.get( '/user', (req,res)=>{
    const userid = req.cookies.userid;
    if( !userid ){
        return(  res.send( {code:1, msg:'请先登陆！'} )  );
    }
    UserModel.findOne( {_id:userid}, {password:0, __v:0}, (err,userInfo)=>{
        res.send( {code:0, data:userInfo} );
    } );
} );

/* 接口文档：根据get请求中传来的type，获取用户列表
*
* req取参数的3种方法：
* (1)req.params
*   一般是get请求。取 请求url中带冒号的参数，如
*	router.get( '/user/:id', (req,res)=>{
*	  res.send( 'user'+ req.params.id )
*   } )
*
* (2)req.body
*   使用req.body的一定是post请求
*
* (3)req.query 获取get请求路径(url)中的对象参数值
*   get请求的url中必定附带请求的对象参数值
*
*   如get请求(附带请求的对象参数值q)，
*   取q字段的值：请求url为 /search?q=tobi+ferret
*   则代码为 const q = req.query.q
*   也可以解构赋值：const {q} = req.query
* */
router.get( '/userlist', (req,res)=>{
    const typeFromReq = req.query.type; //取出请求参数中的type，也可以解构赋值 const {type} = req.query;
    UserModel.find( {type:typeFromReq}, {password:0, __v:0}, (err,users)=>{
        res.send( {code:0, data:users} );
    } )
} );




module.exports = router;
