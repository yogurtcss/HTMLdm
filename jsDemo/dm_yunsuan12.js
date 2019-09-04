/* 运算符相关
*
*
*  */
window.onload = function(){
    /* 强制类型转换-Number
    *
    *  */
    // var a = '123';
    // //法1，Number(a)
    // console.log( Number(a), typeof(Number(a)) );
    // //法2，专门对付字符串，parseInt(a)
    // var a1 = '123px';
    // console.log( Number(a1), typeof(Number(a1)) ); // NAN, "number"类型
    // console.log( parseInt(a1), typeof(parseInt(a1)) );
    //
    // console.log( '----------' );

    /* 算数运算符 + - * / %
    * + ：
    *   数字相加；
    *   字符串相加，则“拼串”，拼接字符串。规律：任何值x与字符串做 + 运算，都会先将
    * x转为字符串'x'，然后再与字符串进行拼接。由此，可进行 字符串的隐式转换。
    *
    *  */
    // var b = 456;
    // b = b + ''; //b与空字符串相加，则b进行了隐式转换
    // console.log( typeof(b) );

    /* 任何值做 - * / 运算时，都会自动转换成 number型，由此可进行隐式转换，
    * 由此，可进行字符串的隐式转换：
    * 为一个值 -0 *1 /1，即可将其转为Number型，原理同Number()
    *  */
    // var c = '123';
    // // c = c - 1;
    // // c = c * 1;
    // c = c / 1;
    // console.log( c, typeof(c) );
    //
    // console.log( '----------' );
    /* 自增和自减
    *
    *  */
    // var a = 20;
    // var rst = (a++) + (++a) + a; // 20 + 22 + 22 = 64;
    // console.log( rst );

    /* 逻辑运算符 !非
    * 若对某一个值连续进行两次取反，它不会变化。由此可进行boolean的隐式类型转换。
     */
    a = 1;
    a = !!a; //对值进行连续两次取反
    console.log( typeof(a) );




};