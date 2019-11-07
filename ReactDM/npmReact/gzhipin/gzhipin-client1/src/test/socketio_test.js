import io from 'socket.io-client';


/* socket，原意是 插座
*
* io 连接后台的(强化过的、新的)socketIO服务器
* 地址为ws://localhost:5000；
* 注意前缀为ws：WebSocket
* 其中服务器地址为 5000端口的server地址
*  */

const socket = io('ws://localhost:5000'); //连接服务器，得到 当前：服务器端与客户端已建立连接的socket端口对象

socket.on('receiveMsg', function(data){//绑定receiveMsg的监听事件，以接收服务器发送的消息；回调函数传入形参为 服务器发来的数据data
    console.log('浏览器接收到消息',data);
});

/* emit，原意是 发射
* 当前的 服务器端与客户端已建立连接的socket端口对象，向服务器端发送消息
*  */
socket.emit('sendMsg', {name:'哈哈', date:Date.now()});
console.log('浏览器端向服务器发送消息：', {name:'哈哈', date:Date.now()} );

/* 如何执行此文件 socketio_test.js ？
* 已知事实：webpack打包，是从入口index.js加载所有模块的。
* 我只需要在 入口index.js中，import此socketio_test.js，
* 然后npm start运行整个项目，即可执行此文件 socketio_test.js
*  */
