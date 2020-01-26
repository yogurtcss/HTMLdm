import React,{Component} from 'react';
import {Header,Footer,Content} from './Layouts/layout1.js';
import {mainData,detailData} from "../props/store.js";

/* 2020-01-26 11:03:23
//reduce 减少，降低
JS中：数组.reduce(回调函数fun-箭头函数)
接收一个回调函数fun作为累加器，
数组中的每个值都按回调函数fun执行 (从左到右)开始缩减，
最终计算为一个 “具体的结果”

//compose 组成，构成
reduce()方法 可用于 函数式编程compose：
用于将多个函数合并，上一个函数的返回值作为当前函数的入参，当前函数的返回值再作为下一个函数的入参，

array.reduce(
    必需-function( total, -必需。初始值, 或者计算结束后的返回值
                  currentValue, -必需。当前元素
                  currentIndex, -可选。当前元素的索引
                  arr -可选。当前元素所属的数组对象  ){

                        //每一次执行回调时：当前reduce中的回调参数total是 上一次回调执行的结果

                  },

    可选-initialValue 传递给回调函数的初始值
)

createData()函数的预期效果：
{
    "项目一": [ {...有关项目1的明细...}, {...有关项目1的明细...}, {...有关项目1的明细...} ],
    "项目二": [ {...}, {...}, {...} ],
}

*  */

export default class App extends Component{
    /* 2020-01-26 12:31:01
    mainData是一个数组，可以使用 数组.reduce()方法
    忘记定义函数时 箭头函数的写法了……
    *  */
    createData=  ()=>{
        //---1.生成基础的base：{ "项目一":[], "项目二":[], "项目三":[] }
        var base = mainData.reduce( (final,curr)=>{
            final = {
                ...final,  //每一次执行回调时：当前reduce中的回调参数final是 上一次回调执行的结果
                [curr]:[]  //这不是数组形式！当属性名是变量时，要用中括号括住！[]
            };
            return final;
        },   {} );  //初始值是空对象 {}
        //console.log( base );

        /* ---2.以base变量为基础，按照 对应属性(项目X) 填充 对应的 “属性值”
        预期的 rst = {
          "项目一": [ {...有关项目1的明细...}, {...有关项目1的明细...}, {...有关项目1的明细...} ],
          "项目二": [ {...}, {...}, {...} ],
        }
        * */
        var rst = detailData.reduce( (final,curr)=>{
            final[curr.mainData] = [  //在当【当前项目编号X】下
                /* 拆解上一次的结果进来。
                * 注意：是在当【当前项目编号X】下，拆解 【相同项目编号X】的上一次结果进来！
                * 不要把 其他不同项目编号的结果 给拆进来了啊！！
                *  */
                ...final[curr.mainData], //拆解 【相同项目编号X】的上一次结果进来！
                curr
            ];
            return final;
        },   base ); //初始值是 base={ "项目一":[], "项目二":[], "项目三":[] }

        //---3.最终返回结果
        return rst;
    };


    render(){
        console.log( this.createData() );
        return(
            <div>
                <Header />
                <Content  />
                {/* 为Footer组件注入一个 mainData属性 */}
                <Footer mainData={mainData}/>
            </div>
        )
    }
}
