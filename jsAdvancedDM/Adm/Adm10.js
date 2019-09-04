/*
* IIFE，
* Immediately-Invoked Function Expression
* 立即调用函数表达式
*
* 作用：1.隐藏实现，2.不污染 外部（全局）命名空间
*  */

//测试
(   function(){
        var a = 1;

        function test(){
            console.log( (++a) + '，函数test()执行了' );
        };

        window.$ = function(){
            return {
                //注意，fa是属性名，
                // test是属性值：函数test，可加括号，可不加括号
                fa: test
            };
        };
    }
) ();

//直接输出a
$().fa();
//查看$()是啥
// console.log( $() );
console.log( $().fa() ); //undefined


