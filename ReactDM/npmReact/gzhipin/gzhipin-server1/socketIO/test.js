model.exports=  (server)=>{ //箭头函数写法
    const io = require('socket.io')(server); //得到io对象
    io.on('connection', (socket)=>{
        console.log( 'socketio connected' );
        socket.on( 'sendMsg', (data)=>{ //绑定sendMsg监听，接收客户端发送的消息
            console.log( '服务器收到浏览器的消息', data );
            io.emit( 'receiveMsg', data.name+'_'+data.date );
            console.log( '服务器向浏览器发送消息', data );
        } )
    } )

};
