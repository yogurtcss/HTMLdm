var a = null;
console.log( typeof a );

//将其他数据类型转为字符串
var a = "123";
//法1，toString()方法
var b = a.toString();
console.log( b );
console.log( typeof b );
//法2，直接String()方法；
console.log( typeof(String(a)) );

/* 注，null和undefined这两个值没有toString方法
*
*
*
*  */

