/* ajax.js的备份文件，回忆默写ajax.js的代码
* 极少注释之版本
*  */
import axios from 'axios';

export default function ajax( url='', data={}, type='GET' ){
    if( type==='GET' ){ //若为GET请求，则需要利用data进行拼串操作，生成GET请求所需url
        let dataStr = ''; //拼串的中间结果
        Object.keys(data).forEach( (currValue)=>{ //拼串 1阶段：取出所有属性及对应之属性值，拼在一起
            dataStr = dataStr + ( currValue+'='+data[currValue]+'&' );
        } );
        if( dataStr !== '' ){
            dataStr = dataStr.substring( 0, dataStr.lastIndexOf('&') ); //拼串 2阶段：去除 所得dataStr中最后一个 &
            /* dataStr = dataStr.substring( 0, (dataStr.length-1) );  //dataStr.length是字符串长度，长度-1即为最后一个元素之下标
            *  使substring( from,to )的to值为 dataStr的最后一个下标，也可实现同样效果
            *  */
            url = url + '?' + dataStr; //拼串 3阶段：最终 生成GET请求所需url
        }
        return ( axios.get(url) ); //最终发送GET请求
    }
    else{ //若为POST请求，则url和data是已给定的，无需其他操作，直接axios.post(url,data)即可
        return ( axios.post(url,data) );
    }
}

