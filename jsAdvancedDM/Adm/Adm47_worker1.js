/* 直接在这里写JS代码了，
*  不用写script标签了。
*  */
function fib( n ){
    if( n>2 ){
        return fib(n-1)+fib(n-2);
    }
    else{
        return 1;
    }
}

console.log( this );
//分线程开始整活了
var onmessage = function( event ){ //固定格式！
    //不能用函数声明式，只能用函数表达式
    //event.data是主线程与分线程相互传输的数据
    var num = event.data;
    console.log( '分线程接收到主线程的发送的数据为'+event.data );
    //计算辣
    var rst = fib( num );
    //将计算结果返回给主线程：postMessage()
    postMessage( rst );
    console.log( '分线程向主线程返回的数据为'+rst );


};
