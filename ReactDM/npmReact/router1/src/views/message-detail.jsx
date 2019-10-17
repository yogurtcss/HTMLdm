import React from 'react';

const allMsgs = [
    { id:1, title:'m1', content:'阿巴阿巴打夺夺' },
    { id:2, title:'m2', content:'哒哒哒' },
    { id:3, title:'m3', content:'拉拉' }
];

/* 获得对应的id值，并根据id从allMsgs中获取
*
*  */
export default function MessageDetail(props){
    const {one_id} = props.match.params; //得到请求参数中的 one id，注意到，取出来的one_id是字符串型


    const onemsg = allMsgs.find( // (one_id)*1将字符型转为 数值型；find中写一个 查id的回调函数
        (m) =>  (m.id === (one_id)*1) //返回第一个结果为true的 数组元素
    );

    return(
        <ul>
            <li> ID:{onemsg.id} </li>
            <li> TITLE:{onemsg.title} </li>
            <li> CONTENT:{onemsg.content} </li>
        </ul>
    )

}