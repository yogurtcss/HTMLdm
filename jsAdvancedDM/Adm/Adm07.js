/*
* 1.什么是对象
* 多个数据的封装体，用来保存多个数据的容器；
* 一个对象代表现实中的一个事务
*
* 2.为什么要用对象？
* 统一管理多个数据
*
* 3.对象的组成
* 属性：属性名(默认是字符串形式)，属性值(任意)
* 方法：一种特殊的属性(其属性值是函数)
*
* 4.如何访问对象内部数据？
* (1) .属性名          简单，但有时不能用；
* (2) ['属性名']       麻烦，能通用
*  */

/* 通过对象字面量来创建对象p，
* 对象中的各 属性名值对 */
var p ={
    name:'我是pp',
    age:12,
    setName:function(name){
        this.name = name;
    },
    setAge:function(age){
        this.age = age;
    }
};

//输出对象p的各种值
console.log( p );
console.log( '我的年龄是：'+p.age );
//修改p的name属性
p.setName('啦啦啦');
console.log( p.name );
//查看p的setName属性，这是一个函数对象
console.log( p.setName );
//修改p的age属性
p['setAge'](38);
console.log( p.age );

/* 什么时候用到 ['属性值']?
* 1.属性名中含有特殊字符，如 - 空格
* 2.属性名不确定，即属性名存于变量中
*  */
var p1 = {};
//为p1添加新属性 content-type : text/json
// p1.content-type = 'text/json' 这句话不行
p1['content-type'] = 'text/json';
console.log( p1['content-type'] );
//当属性名不确定(即属性名存于变量中)
propName = 'myAge';
propAge = 233;
//直接用 .方式 添加新属性，康康行不行
p1.propName = propAge;
console.log( p1 );
//删除误添加的propName属性，delete obj.属性名
delete p1.propName;
console.log( '被删去propName属性后的p1：' );
console.log( p1 );
//正确的添加方式
p1[propName] = propAge;
console.log( p1 );
console.log( p1[propName] );
