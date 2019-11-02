/* 进一步填写老板、大神信息页时，都有共同的一分：选择头像
* 将“选择头像”这块抽出来，成为一个UI组件
* --选择头像的UI组件
*  */

import React, {Component} from 'react';
import {List,Grid} from 'antd-mobile';
import PropTypes from 'prop-types';


export default class HeaderSelector extends Component{
    constructor(props){
        super(props);

        /* 生成Grid中data属性所需的数组，数组元素为对象
        *   - 对象中有两个属性 icon、 text
        *  */
        this.headerList = [];
        for( let i=0, length=20; i<length; i++ ){ //动态价值头像：遍历 读取这20张图片
            this.headerList.push(  { //向这数组尾部添加对象，对象有两个属性: icon、text
                // text2: `头像${i+1}` 使用模板字符串
                text: '头像'+ (i+1)  , //字符串拼串；下标从0开始
                /* 注意，此icon是 图片对象；此时应在此文件中引入图片对象 import XXX
                * 注意到，webpack不仅支持ES6的模块化语法：引入 import XXX
                * 还支持 CommentJS 的模块化语法：引入 require( 'XXX' )
                *
                * 动态加载头像
                *  */
                icon: require( `./images/头像${i+1}.png` ) //在这里不能用import语法
            } )
        }
    };

    render(){
        const listHeader = '请选择头像'; //在List头部要渲染的东西
        return(
            //可以不用div包住这堆内容，改为使用 <List> ... </List>
            //   <div> HeaderSelector </div>

            // List的renderHeader属性：
            // renderHeader的属性值为函数func，(建议使用箭头函数，箭头右端不加花括号，自动return)
            // 此func函数的返回值为 你想要渲染的东西(头部/底部文字 等)

            <List renderHeader={ ()=>listHeader } >
                {/* Grid网格的用法
                * 1.data 传入网格中的数据——类型为 Array < {icon, text} > //数据类型稍后解释。

                    注：data不该在render中准备，因为render可能会执行多次！！(导致data变化等)
                    此data应该在List组件渲染前准备好(在render外)，这样它就不会再变化了；
                    具体步骤如下：
                    (1)把data置为 组件对象中的变量：this.headerList，
                    (2)使 this.headerList 在constructor()中赋值完毕(for循环赋值等)，
                    (3)然后再把 this.headerList 放进<Grid />组件的data中

                   对data数据类型的解释：
                   (1)data的数据类型为一个数组Array；
                   (2)此数组Array每一个元素是 对象：
                      - 对象中有两个属性： (两个属性名分别为) icon、 text

                 * 2.columnNum 列数。缺省时，默认为数值型的5，
                 * 写在组件标签中，是传数值型的5！！要加花括号
                 * 如 columnNum = {5} //表示这是数值型的5
                 *
                 */}

                 {/* 注：此data应该在List组件渲染前准备好(在render外)，这样它就不会再变化了；
                  data置为 组件对象中的变量：this.headerList */}
                 <Grid data={this.headerList} />
            </List>

        )
    }
}
