/* 关于变量赋值问题
* var a = xxx，a内存中保存的是啥？
* 若xxx是基本数据，则a保存的是这个数据;
* 若xxx是对象，   则a保存的是对象的地址值;
* 若xxx是变量，   则a保存的是xxx的内存内容;
*
* 将一个变量b赋值给另一个变量a，即b=a，是做了什么事情？
* 即将a的内存内容拷贝给了b
*
* 2个引用变量a,b指向同一个对象X，通过其中一个变量a修改对象内部数据，则另一个变量b看到的是修改后的数据;
* 2个引用变量a,b指向同一个对象X，让其中一个变量a指向另一个对象X2，则另一个引用变量b仍然指向前一个对象X;
*
* JS引擎如何管理内存
* 1.内存生命周期：
*   分配小内存空间，得到它的使用权 -> 存储数据，进行反复操作 -> 释放小内存空间
* 2.释放内存：
*   (1)局部变量。函数执行完，自动释放；
*   (2)对象：被赋值为null从而成为垃圾对象，被垃圾回收器自动回收。
*
*
*  */

var obj1 = {
    name:'Tom',
    age:12
};
var obj2 = obj1;
obj1.name = 'Jack';
obj2.age = 233;
console.log( obj2.name, obj1.age ); //Jack

//隐秘点的
function fn(obj){
    obj.name = 'A';
}
//调用函数fn
fn(obj1);
console.log(obj2.name);//A

var a = {
    age:122
};
var b = a;
//a指向了新对象
a = {
    name:'haha',
    age:2
};
console.log( b.age, a.name, a.age );//122, haha, 2;

var x = 3;
function fn1(x){
    x = x + 1;
    // return x;
};
fn1(x);
console.log( fn1(x) ); //函数没有返回值，这里返回的是 undefined
console.log( x ); //3



