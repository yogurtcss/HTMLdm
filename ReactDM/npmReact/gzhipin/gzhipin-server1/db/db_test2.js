/* 关于mongoose中的相关测试
*
*  */


const mongoose = require('mongoose');
mongoose.connect( 'mongodb://localhost/mongoose_test' );
const conn = mongoose.connection;
conn.on( 'connected', ()=>{
    console.log( 'db_test2，数据库连接成功喽！' );
} );

const {UserModel} = require( './models.js' ); //我佛了，要用对象的解构赋值法才出来
/* 测试findByIdAndUpdate
* dashen3的 _id为 5dbb81bb3ab2513c04430e88
* dashen2 的_id 为5db9521f77aef23388f9e467
*  */
// UserModel.findByIdAndUpdate(
//     { _id: '5dbb81bb3ab2513c04430e88' },
//     { username:'dashen3_new' }, //这是 更新后的数据，注意username是已有的属性
//     (err,old) => { console.log(`我是old：${old}`) }
// );

/* 如果findByIdAndUpdate方法中的：
* update为 此前未有的新属性
*  */

UserModel.findByIdAndUpdate(
    { _id: '5db9521f77aef23388f9e467' },
    /* 这是 更新后的数据
    * 注意：post、salary、new1、new2都是此前未有的新属性
    *
    * findByIdAndUpdate中的 update：会先与原数据对比，把出现的新属性加进原数据中
    *
    *  */
    { //如果update全都是 新属性(不含 已有属性)，
        //则不会把这些新属性插入至原数据中
        post:'前端工程师',     //新属性
        salary:'456',         //新属性
    },
    (err,old) => { console.log(`我是old：${old}`) }
);


// UserModel.findByIdAndRemove( //删除dashen2
//     { _id: '5db9521f77aef23388f9e467' },
//     (err,doc)=>{}
// );
