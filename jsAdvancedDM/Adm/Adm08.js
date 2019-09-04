/*
* 1.什么是函数？
*   实现特定功能的n条语句的封装体
* 2.为什么要用函数？
*   提高代码复用效率；便于交流阅读
* 3.如何定义函数？
*   函数声明 function fn1() {}
*   函数表达式 var fn1 = function(){}
* 4.如何调用执行函数？
*   test()，直接调用
*   obj.test()，通过对象调用
*   new test()，new调用
*   test.call/apply(obj)，临时让test成为obj的方法进行调用
*  */
function age( a ){
    if( a<18 ){
        console.log( '未成年，再等等！' );
    }
    else if( a>60 ){
        console.log( '算了吧！' );
    }
    else{
        console.log('刚好！')
    }
}

age(1);

