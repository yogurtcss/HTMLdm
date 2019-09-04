/* 对象的创建
*
*  */

//使用构造函数创建对象
var obj1 = new Object();
console.log( typeof(obj1), obj1 );
//增：为obj1添加一些属性
obj1.name = '老王';
obj1.age = 12;
obj1.gender = '男';
console.log( obj1 );
//删：delete
delete obj1.gender;
console.log( obj1 );
//改：直接对某属性赋新值
obj1.age = 22;
console.log( obj1 );

console.log( obj1['name'] );
/* 检查一个对象中是否含有指定的属性：
* '属性名'(这是字符串！！) in 对象
*  */
console.log( ('age' in obj1), ('name' in obj1), ('haha' in obj1) );
console.log( ('122' in obj1), ('233' in obj1) );
console.log( 'laowang' in obj1 );


