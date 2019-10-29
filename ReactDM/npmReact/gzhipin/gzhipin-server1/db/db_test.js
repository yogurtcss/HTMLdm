/* 使用mongoose操作mongodb的测试文件
*
*  */


/* ----- 1.连接数据库 ----- */
//1 引入mongoose
const mongoose = require( 'mongoose' );

/* mongodb 中不需要建立数据库，
* 当你需要连接的数据库不存在时，会自动创建一个出来。
* 目前我已建有的数据库：gzhipin_test
*  */
mongoose.connect( 'mongodb://127.0.0.1/mongoose_test' );
//获取连接对象，并监听之：是否连接成功
const conn = mongoose.connection;
conn.on( 'connected', function(){ //绑定连接对象，监听connected事件
    console.log('数据库连接成功喽！') //连接成功的提示
} );

/* 2.获取 集合，使用Model
*  */
const userSchema = mongoose.Schema({
    //指定文档的结构：属性名、属性值的类型，是否为 必须
    username: { type:String, required:true },
    password: { type:String, required:true },
    type: { type:String, required:true }, //用户类型 dashen或laoban
    header: { type:String }
});

/* 注！
* mongoose.小写model！！
* 而定义结构中：mongoose.首字母大写Schema！！
*  */
const UserModel = mongoose.model( 'user', userSchema ); //集合名 users
// 返回的 UserModel 是一个 构造函数，以生成 实例 document

/* 实现 Model的 CRUD 增查改删
*
*  */
const user1 = new UserModel({
    username: 'u1',
    password: '123',
    type: 'dashen',
});

// user1.save( function(err){
//     if(!err){
//         console.log( '保存成功咯！' )
//     }
// } );

/* 当执行了一次的 实例user1.save后(此时，此条数据已经进入了数据库)，
* 就要注释掉这一堆的 user1.save代码，然后 再执行 UserModel.find(...)查询
*
*
* 若不注释这一堆的 user1.save代码，接着执行UserModel.find(...)查询，
* 则：数据照样会(多次)进入数据库，但是会查询出多个重复的结果
* 这显然不是我们想要的
*  */

UserModel.find( {username:'u1'}, function(err,docs){
    console.log( 'find()',docs );
} );

UserModel.findOne( {_id:'5db80211132c433d5c0865c3'},function(err,doc){
    console.log( 'findOne()', doc );
} );
