//包含所有的Acton creator：生成action对象的工厂函数
import {INCREMENT,DECREMENT} from "./action-type";

export const increment=(number) => { //增加
    return { type:INCREMENT, data:number }
};
export const decrement=(number) => { //减少
    return { type:DECREMENT, data:number }
};

