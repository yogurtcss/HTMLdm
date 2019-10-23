/* reducers
* 根据老的state和action，产生新的state的 纯函数
*  */
import {INCREMENT,DECREMENT} from './action-type';

export function counter( state=0, action ){ //形参state默认值为0
    switch( action.type ){
        case INCREMENT: //变量形式，不用写成字符串形式了
            return ( state+action.data );
        case DECREMENT:
            return ( state-action.data );
        default:
            return state;
    }

}