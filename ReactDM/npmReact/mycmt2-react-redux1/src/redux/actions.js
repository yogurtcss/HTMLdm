import {ADD,DELETE} from "./action-types";

//同步添加
export const addCmt=(cmt) => ({ type:ADD, data:cmt });
//同步删除
export const deleteCmt=(index) => ({ type:DELETE, data:index });