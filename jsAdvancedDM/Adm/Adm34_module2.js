( function(window){
    var msg = '我是匿名函数Module2';
    function dosth(){
        console.log( 'dosth()' + msg.toUpperCase() );
    };
    function dooth(){
        console.log( 'dooth()'+ msg.toLowerCase() );
    }

    //向外暴露函数
    window.module2 = {
        dosth:dosth,
        dooth:dooth
    }

} )(window);