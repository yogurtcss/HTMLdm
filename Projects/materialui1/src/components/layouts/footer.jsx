import React,{Component} from 'react';
import {Tabs,Tab,} from '@material-ui/core';


export default class Footer extends Component{


    /* 2020-01-26 09:54:21
    //在app.jsx中：为Footer组件注入一个 mainData属性
    <Footer mainData={mainData}/>
    *  */

    render(){
        //解构赋值法，我忘记怎么写了！
        const {mainData} = this.props;
        return(

            <Tabs
                value={0} //固定选中某个选项，下标从0开始
                variant="fullWidth" //100% 宽度
                centered  //居中对齐
                aria-label="simple tabs example">

                <Tab key="all" label="全部" />

                {/* 忘记map()方法怎么写了：
                map( 回调函数-箭头函数的写法 )
                */}
                { mainData.map( (item,index)=>(
                    //变量要用花括号括住
                    // <div key={index} >{item}</div>
                    <Tab key={index} label={item} />
                ) ) }
            </Tabs>
        )
    }
}
