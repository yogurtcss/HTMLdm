function fib( n ){
    if( n>2 ){
        return fib(n-1)+fib(n-2);
    }
    else{
        return 1;
    }
}

var onmessage = function( event ){
    var num = event.data;
    console.log( '分线程从主线程处得到的数据为：'+event.data );
    var rst = fib( num );
    postMessage( rst );
    console.log( '分线程处理的结果为：'+rst );
};