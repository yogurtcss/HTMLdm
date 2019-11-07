module.exports=  (server)=>{ //箭头函数写法
    const io = require('socket.io')(server); //得到io对象：得到一个新的socket.io服务器——不是原本的server了
    /* 引入socket.io库：require('socket.io')返回的是一个函数，
    * 此函数紧接着传入形参(server 服务器) —— 理解为 引入socket.io库，强化原本的服务器server
    * 得到一个全局的、强化的、新的socket.io服务器(它也是一个socket端口对象)——不是原本的server了
    *
    * 此全局的、强化的、新的socket.io服务器 可以同时连接着若干个客户端，可以相互通信
    * 也可以由具体的某个 连接对象socket进行相互通信
    *
    * 类似于 connect(.强化..)(组件A) 的写法
    *  */

    /* Socket.io 允许你触发或响应自定义的事件，
    * 除了 connect，message，disconnect 这些事件的名字不能使用之外，
    * 你可以触发任何自定义的事件名称。
    *
    * socketio的常用内置事件：connection、disconnect
    *  */

    /* emit和on是最重要的两个api；emit发送  on监听 。
    * socket端口对象.emit(eventName [, ...args])：发射（触发）一个事件
    * socket端口对象.on(eventName, callback)：监听一个 emit 发射的事件
    *
    * 一方使用emit发送事件后，另一方可以使用 on, 或者once方法，对该事件进行监听
    *  */

    /* 当客户端与服务器端建立连接时：
    * 强化的、新的socket.io服务器的on：监听浏览器连接至我服务器的事件(connection事件)
    * 当有一个浏览器(客户端)与我服务器完全建立连接后才被触发
    *  */
    io.on('connection', function(socket){  //回调函数中的形参socket是 当前：服务器端与客户端已建立连接的socket端口对象
        console.log( 'socketio connected' );
        /* 客户端中socket.emit( 'sendMsg',  ...数据data... ); 解释如下
        * 在客户端中向服务器发送消息，并指定此次 客户端向服务器发送消息 的事件名为sendMsg
        * 相当于是一个标识，客户端与服务器的接头暗号为sendMsg。注意，可以自定义事件名(接头暗号)，
        * 记住客户端与服务器的接头暗号要一一对应好(即 客户端发出事件名与服务器监听事件名一一对应好)，这样才能正确通信
        *
        *
        * 当服务器接收到客户端发送的消息时：当前已建立连接的socket端口对象 监听来自客户端的某个sendMsg事件，
        *
        * 注意！！这里的 socket.on是 当前已建立连接的socket端口对象 监听来自客户端的某个XXX事件
        * 而上面的 io.on是 强化的、新的socket.io服务器 监听 任意一个浏览器连接至我服务器的YYY事件
        *
        * 已建立连接的socket端口对象使用接头暗号sendMsg对上客户端(监听来自客户端的某个sendMsg事件)，——这样客户端与服务器就连接成功了，
        *
        *  */
        //这里的 socket.on是 当前已建立连接的socket端口对象 监听来自客户端的某个XXX事件
        socket.on( 'sendMsg', function(data){ //回调函数中的形参是客户端发送的数据data(或消息)
            console.log( '服务器收到浏览器的消息', data );
            /* 要向客户端发送消息了
            * 谁向客户端发送消息？
            *   (1)全局的、强化的、新的socket.io服务器(在这里，名为io)
            *   (2)当前 当前已建立连接的socket端口对象
            *
            * 此全局的、强化的、新的socket.io服务器 可以同时连接着若干个客户端，一(全局服务器)对多(客户端)的通信，所有连接上我io服务器的客户端都能收到消息
            * 也可以由具体的某个 连接对象socket进行相互通信(这是 具体某个的、一对一的通信，即当前socket端口对象的通信，只能有一个客户端收到消息)
            *
            * emit，原意是 发射
            * socket对象.emit(eventName [, ...args])：发射（触发）一个事件
            *  */
            io.emit( 'receiveMsg', data.name+'_'+data.date );
            //socket.emit( 'receiveMsg', data.name+'_'+data.date );
            console.log( '服务器向浏览器发送消息', data );
        } )
    } )

};
