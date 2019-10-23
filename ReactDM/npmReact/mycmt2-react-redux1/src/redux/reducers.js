
import {ADD,DELETE,RECEIVE} from "./action-types";
import {combineReducers} from 'redux'; //将多个reducer函数合在一起 并暴露之

//当有多个reducer函数时：
// function otherReducer( state=0, action ){
//         return '123';
// };

// const initCmts = [
//         { Uname:'Tom', Ucmt:'lala' },
//         { Uname:'Jack', Ucmt:'ahaha' }
// ];

/* -----P45 异步获取initCmts----- */
const initCmts = [];

export function cmts( state=initCmts, action ){
        switch( action.type ){
                case ADD: //增
                    // ...三点运算符，表示将剩余的参数action.data放入一个数组中
                    //用上redux后，在操作数组时， 三点运算符...用的挺多
                        return [action.data, ...state];
                case DELETE: //删
                    /* 不能使用 (state)数组.splice( 下标,1 )来删除，这会修改原状态state！
                    * 我们应返回新状态，而不是修改原状态!
                    *
                    * filter()--数组过滤 此方法创建一个新的数组，
                    * 新数组中的元素是：通过检查指定数组中符合(过滤)条件的所有元素。
                    *
                    * array.filter(    function( currentValue-必须,index-可选,arr-可选 ), --必须。数组中的每个元素都会执行这个函数
                    *                  thisValue-可选    )
                    *
                    * 注1：filter () 不会对空数组进行检测。
                    * 注2： filter () 不会改变原始数组。
                    *
                    * action.data 是指定被删除的下标
                    *  */
                        return( state.filter( //过滤条件(函数)：不是 被指定删除的下标(action.data)，可以留下来嗷
                            (currCmt,currIndex) => ( currIndex!==action.data )
                        ) );
                case RECEIVE: //返回一个 接收的数组
                        return( action.data );
                default:
                        return state;
        }
}

/* 当有多个reducer函数时，需用到
* combineReducers( {reducer1, reducer2, ...} )，
* 其中reducer1、2最好与上面定义的reducer同名
*
*  */
