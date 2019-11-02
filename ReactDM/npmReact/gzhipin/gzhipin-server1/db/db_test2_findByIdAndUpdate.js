/* 关于mongoose中的相关测试
* 关于findByIdAndUpdate的更新问题
*  */

const mongoose = require('mongoose');
mongoose.connect( 'mongodb://localhost/mongoose_test' );
const conn = mongoose.connection;
conn.on( 'connected', ()=>{
    console.log( 'db_test2，数据库连接成功喽！' );
} );

const {UserModel} = require( './models.js' ); //我佛了，要用对象的解构赋值法才出来

/* 如果findByIdAndUpdate方法中的：update
*  */
UserModel.findByIdAndUpdate(
    { _id: '5db9521f77aef23388f9e467' }, // dashen2的 _id
    /* update 为更新后的数据
    * 注：只更新 模式schema中已定义属性 下的数据( 如 username, type, post, salary, company )，
    * 而不更新 模式schema中未定义属性 下的数据( new1，new2 等 )，
    *  */
    {
        post:'前端工程师，我在原模式schema中已定义',  //模式schema中已定义的属性，初始时此属性下的值为空，现更新为此值：前端工程师
        salary:'456，我在原模式schema中已定义',      //模式schema中已定义的属性，初始时此属性下的值为空，现更新为此值：456
        company:'疼疼讯',                          //模式schema中已定义的属性，初始时此属性下的值为空，现更新为此值：疼疼讯
        new1:'我在原模式schema中未定义',            //模式schema中未定义的属性
        new2:'我在原模式schema中未定义'            //模式schema中未定义的属性
    },
    (err,old) => { console.log(`我是old：${old}`) }
);


// UserModel.findByIdAndRemove( //删除dashen2
//     { _id: '5db9521f77aef23388f9e467' },
//     (err,doc)=>{}
// );
