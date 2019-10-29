/* 包含n个操作数据库集合之数据的Model模块
* 使得：在外部可以操作数据库中的数据
*
* 1. 连接数据库
*   1.1. 引入mongoose
*   1.2. 连接指定数据库(URL只有数据库是变化的)
*   1.3. 获取连接对象
*   1.4. 绑定连接完成的监听(用来提示连接成功)
*
* 2. 定义出对应特定集合的Model并向外暴露
*   2.1. 字义Schema(描述文档结构)
*   2.2. 定义Model(与集合对应, 可以操作集合)
*   2.3. 向外暴露Model
*  */

const mongoose = require('mongoose'); //引入mongoose
mongoose.connect('mongoose://127.0.0.1/gzhipin_test'); //连接指定数据库
const conn = mongoose.connection; //获取连接对象
conn.on( 'connected',function(){ //绑定 连接成功的监听事件
    console.log('数据库连接成功喽！');
} );

const userSchema = mongoose.Schema( { //创建数据库结构 Schema
    username: { type:String, required:true }, //用户名
    password: { type:String, required:true }, //密码
    type: { type:String, required:true }, //用户类型 dashen或者laoban
    header: { type:String, required:true }, //头像名称
    post: { type:String }, //职位
    info: { type:String }, // 个人或职位简介
    company: { type:String }, //公司名称
    salary: { type:String }
} );

const UserModel = mongoose.model( 'user', userSchema );
// 返回的UserModel是构造函数(所以其首字母是大写的)，用于实例化 document

module.exports.UserModel = UserModel; //向外暴露Model

/* 1.一次性暴露： module.exports = xxx
*
* 2.多次暴露——对象写法
*   其实。module.exports.xxx = xxx 可以简写为 exports.xxx = xxx
*    省略 module.
*
* module.exports.导出后的变量名1 = 将导出的变量1
* module.exports.导出后的变量名2 = 将导出的变量2
*
* module.exports.xxx = xxx
* module.exports.yyy = yyy
*
* 多次暴露的另一种写法：
*   - export let b = 2;
*   - export let c =3;
*
*
*  */
