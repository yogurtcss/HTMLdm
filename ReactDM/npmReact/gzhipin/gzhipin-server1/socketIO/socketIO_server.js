
const {ChatModel} = require('../db/models.js');

module.exports = function(server){ //得到增强后的、新的socket.io服务器
    const io = require('socket.io')(server);
    io.on( 'connection', (socket)=>{
        console.log('有一个客户端连接上了服务器');
        socket.on( 'sendMsg', ({from,to,content})=>{
            console.log('服务器接收到客户端发送的消息',{from,to,content});

            /* 将前台发来的消息保存至数据库中
            *
            * 注意：chat_id怎么整？如：有两个用户：A、B
            * 当from为A，to为B时，经过某种操作(假设为函数f)，chat_id为 A_B
            * 而当from为B，to为A时，同样经过某个操作f，使得chat_id也同样为 A_B，怎么整？
            * 答案：字符串数组的排序sort方法。先将待排序的字符串放入数组[]中，接着调用数组的sort()方法：
            * 代码为：[ 待排序字符串1, 待排序字符串2, ... , ].sort()
            *
            * 经过字符串的sort排序(在这里用默认排序，按字符的 ASCⅡ值从大到小排序)
            * 无论你from、to值的顺序如何，经过我的sort这么一排序，得到的排序结果必相同
            *
            * 然后把排序完毕的字符串，按给定的分隔符放进一个字符串中(我们最终要的形式不是数组，而是要这个排序完毕拼在一起的字符串嗷)
            * 使用数组的join方法
            * 代码为： 排序完毕拼在一起的字符串 =  [ 待排序字符串1, 待排序字符串2, ... , ].sort().join( '自定义分隔符' )
            *
            * 所以，使用 from、to 构造 chat_id 的方法为：见上方的解释嗷
            * const chat_id = [ from,to ].sort().join('_')  //无论你from、to值的顺序如何，经过我的sort这么一排序，得到的排序结果必相同
            *
            *  */

            /* 补充数组的sort()、join()方法
            * sort( 可选比较函数function(){...} ) 对数组中的元素进行排序，返回值为：数组
            * 注 1.sort方法可以接收一个比较函数作为参数；
            * 2.即使数组中的每一项都是数值，sort比较的也是字符串
            * 3.sort会改变原元素
            *
            *
            * join( 可选的给定的分隔符'...' ) 把数组中的所有元素按给定的分隔符 放进一个字符串中，返回值为：一个字符串
            * 注 1. 可选的给定的分隔符为字符串型，加单引号
            * 2.默认是以','分割，传入形参也可以自定义分割符
            *  */

            /* 现在数据库中，chats集合中的属性为 from, to, content, chat_id, create_time
            * 而现在我们已有了传入的 from, to, content，则需要 获取chat_id, create_time的值，然后一并存入数据库的chats集合中
            *  */

            //无论你from、to值的顺序如何，经过我的sort这么一排序，得到的排序结果必相同
            const chat_id = [ from,to ].sort().join('_');  //数组的join方法 把数组中的所有元素按给定的分隔符 放进一个字符串中，返回值为：一个字符串
            const create_time= Date.now();
            //通过模型，将新数据保存(即新增)至数据库中
            ChatModel.create( { //因为属性值和属性名相同，可以采用 对象的解构赋值法，这里暂时不用
                from:from,  to:to,  content:content, //这三项数据，是我前台传过来的
                chat_id:chat_id,  create_time:create_time
            },function(err,chatMsg){ //保存(即新增)成功后的回调函数，err报错信息 和 创建成功的此doc记录(即chatMsg)
                //向所有连接上的客户端发消息
                io.emit( 'receiveMsg', chatMsg );
            } );




        } )
    } )
};
