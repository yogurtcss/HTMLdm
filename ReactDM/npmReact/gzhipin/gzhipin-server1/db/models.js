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
mongoose.connect('mongodb://127.0.0.1/gzhipin_test'); //连接指定数据库，前缀是 mongodb！！！
const conn = mongoose.connection; //获取连接对象
conn.on( 'connected',function(){ //绑定 连接成功的监听事件
    console.log('数据库连接成功喽！');
} );

const userSchema = mongoose.Schema( { //创建数据库结构 Schema
    username: { type:String, required:true }, //用户名
    password: { type:String, required:true }, //密码
    type: { type:String, required:true }, //用户类型 dashen或者laoban
    header: { type:String }, //头像名称
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

/* 2019-11-07 14:37:19
* 添加新的数据库集合模型 chat
*  */
const chatSchema = mongoose.Schema({ //创建chats集合的文档结构
   from: { type:String, required:true },        //发出消息(即 消息源头)的用户之id
   to: { type:String, required:true },          //接收消息(即 消息去向)的用户之id
   chat_id: { type:String, required:true },     //标识某个对话聊天的id——由from和to组成的字符串，以区分标识 一对聊天的人
    /* chat_id的定义：由from和to组成的字符串
    * 如id分别为 A、B的两人，他们在聊天。
    * A向B发了一条消息XXX，此消息XXX的chat_id为 A-B；
    * 接着，B向A发了一条消息YYY，此消息YYY的chat_id为 B-A；
    * 实际上这两条消息、两个chat_id都是标识同一个对话、同一对人在聊天。到时需要判断嗷
    *  */
   content: { type:String, required:true },     //消息内容
   read: { type:Boolean, default:false },       //标识消息是否已读，默认消息一上来就是false，未读
   create_time: { type:Number }                 //消息创建时间。若某消息XXX的创建时间越新(越晚)，则此消息XXX在消息列表中显示越靠前
});

const ChatModel = mongoose.model( 'chat', chatSchema ); //定义能操作chats集合数据的Model

module.exports.ChatModel = ChatModel; //向外暴露此ChatModel
