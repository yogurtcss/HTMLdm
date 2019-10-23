import {ADD,DELETE,RECEIVE} from "./action-types";

//同步添加
export const addCmt=(cmt) => ({ type:ADD, data:cmt });
//同步删除
export const deleteCmt=(index) => ({ type:DELETE, data:index });
//同步接收：这是在异步操作中使用到的 同步操作，只是给getCmtAsync使用而已，没必要暴露出去
export const receiveCmt=(cmts) => ( {type:RECEIVE, data:cmts} );


//异步从后台获取数据
//在这里是 异步显示一个新数组！！注意，只是显示一个新数组而已！！
export const getCmtAsync=() => {
    return( dispatch => {
        setTimeout(
            () => {
                const cmts = [
                    { Uname:'Tom', Ucmt:'lala' },
                    { Uname:'Jack', Ucmt:'ahaha' }
                ];
                dispatch( receiveCmt(cmts) ); //分发喽
            }, 1000
        )
    } )
};