/* 使用axios封装的ajax请求函数，
* 此函数返回的是promise对象
*  */
import axios from 'axios';

//形参默认值：url为空字符串，data为空对象
export default function ajax( url='', data={}, type='GET' ){
    if( type==='GET' ){ //发送GET请求
        /* 假设有一个请求的数据data(是一个对象Object) ：{ username: Tom,  password: 123 }，
        * 则经过拼串后的url为：dataStr：username=Tom&password=123；
        *
        * 拼串操作，显然要先取出data对象中的 所有属性与所有与之对应属性值，
        * 然后再拼在一起
        *
        * Object.keys(obj) —— 取出对象obj中的所有属性
        *    - obj: 传入的任意一个对象
        *    返回值：一个数组——其中数组元素为：obj对象中所有可枚举的属性
        *  */

        /* Object.keys(obj)的返回值是一个数组，(数组值是 所有属性)
        * 可以紧接着调用数组的forEach方法
        * 紧接着取得 该属性下对应的属性值
        *
        * Array.forEach( callback回调函数 [, thisArg] )
        *
        *   callback回调函数：callback( currentValue [, index]  [, arr]  )
        *     - currentValue 必须。遍历时当前、正在被处理的数组项
        *     - index 可选。当前项的索引值（下标）
        *     - array 可选。数组本身
        *
        * */

        /* forEach( (currValue) => {...} )
        * currValue 遍历时 当前被处理的数组元素(在这里是 属性)
        *  */
        let dataStr = ''; //数据拼接字符串
        Object.keys(data).forEach( (currValue)=>{
            /* dataStr 上一次处理后的字符串
            * currValue 遍历时 当前被处理的数组元素(在这里是 属性)
            * data[currValue] 当 属性名是变量时，对象的索引方式(取该属性名下的属性值)是 [ ] 方框写法
            *
            * 加号在这里的作用：
            * 若一方为 String 类型，2个值都进行 ToString() 转换，最后进行字符串连接操作。
            *  */
            dataStr = dataStr + ( currValue+'='+data[currValue]+'&' ); //拼串操作
            /* 遍历到最后一个元素时，显然最后一个元素的末尾也加上了 &号
            * 但是实际上在最后一个元素是没有 &号的，需在forEach结束后：
            *   - 法1：去除最后一个元素的 &号
            *   - 法2：使用 字符串.substring() 方法，提取有效部分(除 最后一个元素的 &号 之外的部分)
            *        s = s.substring( 0, s.length-1 ) // 注意 .length是字符串的属性！！字符串.length 返回此字符串的长度
            *
            * 其实，法2与法1 是同理的，建议用法2！！
            *
            * 字符串.substring( from, to ) 方法。返回值：字符串
            *   - 提取字符串中 介于两个指定下标[ from, to ) 之间的字符。
            *   - substring (from, to)方法返回的子串包括 开始from 处的字符，但不包括 结束to 处的字符。
            *
            *
            * 字符串.lastIndexOf( searchvalue [,start] )。
            *   返回值：Number数值型——查找的字符串最后出现的位置，如果没有找到匹配字符串则返回 -1。
            *   - searchvalue 必需。规定需检索的字符串值。
            *   - start 可选的整数参数。规定在字符串中开始检索的位置，若缺省，则默认从字符串的最后一个字符处开始检索
            *
            *
            * 字符串.lastIndexOf( '&' ) //返回 &最后出现的位置(下标)，可放入 substring( from,to )的to参数中，以去除此&
            *  */
        } );
        /* 当forEach结束后，提取有效部分(除 最后一个元素的 &号 之外的部分)
        * 并进入最终拼接：GET请求中，可用的url
        *  */
        if( dataStr !== '' ){ //遍历到最后一个元素时，显然最后一个元素的末尾也加上了 &号
            dataStr = dataStr.substring( 0, dataStr.lastIndexOf('&') ); //提取有效部分
            /* 或者：dataStr = dataStr.substring( 0, (dataStr.length-1) )也是可以的
            *  */
            url = url + '?' + dataStr; //最终拼接成 GET请求中可用的url
        }
        return ( axios.get(url) ) //最终发送GET请求
    }
    else{ //如果发送post请求，
        //则url和data是已给定的，无需其他操作，直接axios.post(url,data)即可
        return ( axios.post(url,data) )
    }
}
