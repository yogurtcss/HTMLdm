//包含所有的Acton creator：生成action对象的工厂函数
import {INCREMENT,DECREMENT} from "./action-type";

/* 包含所有的action
* 同步的action，都返回一个对象
* 异步的action，都返回一个（回调）函数：在回调函数中就可以执行异步的代码
*/

//同步的action，都返回一个对象
export const increment=(number) => { //增加
    return { type:INCREMENT, data:number }
};
export const decrement=(number) => { //减少
    return { type:DECREMENT, data:number }
};

//异步的action，都返回一个（回调）函数：在回调函数中就可以执行异步的代码

/*
    export const 异步操作的函数 = () => {
        //返回一个方法：一个(固定)入参为 dispatch 的函数
        return (dispatch) => { ...可以在任意位置调用dispatch... }

        //可以通过返回此dispatch函数异步进行 dispatch，
        //并且可以在 action 中获取到 Store 里的 state

    };
*
*
*  */

export const incrementAsync=(number) => {
    return( //返回一个 固定入参为dispatch的回调函数
        dispatch => { setTimeout( //...可以在任意位置调用dispatch...
            () => { dispatch(increment(number)) }, //这里执行一个同步的操作：增加
            1000
        ) }
    )
};
