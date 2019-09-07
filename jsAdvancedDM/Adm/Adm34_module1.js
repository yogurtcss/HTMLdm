/* Adm34_module1.js
* 法1，普通定义函数
*
*  */
function module1(){
    //私有变量
    var msg = 'Module1';
    //操作函数
    function dosth(){
        console.log( 'dosth()'+ msg.toUpperCase() );
    }
    function dooth(){
        console.log( 'dooth()'+ msg.toLowerCase() );
    }
    //向外暴露函数
    return {
        dosth:dosth,
        dooth:dooth
    }
}