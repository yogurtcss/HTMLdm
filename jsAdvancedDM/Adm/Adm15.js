/* 原型对象
*
*
*  */
window.onload = function(){
    console.log( Date.prototype, typeof(Date.prototype) );

    //自定义构造函数fun
    function fun(){

    };
    //查看fun的原型对象
    console.log( fun.prototype );
    //新建fun的实例对象
    var f = new fun();
    //查看实例f的原型对象 __proto__
    console.log( f.__proto__ );
    //判断 构造函数的原型对象 与 实例的原型对象 是否相同
    console.log( f.__proto__ === fun.prototype ); //true
    //给原型对象添加属性（一般是方法），这样实例对象也可访问
    fun.prototype.test = function(){
        console.log( '我是test函数！' );
    };
    f.test();



};