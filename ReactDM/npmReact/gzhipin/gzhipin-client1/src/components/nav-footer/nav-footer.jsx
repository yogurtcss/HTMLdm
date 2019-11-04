import React, {Component} from 'react';
import {TabBar} from "antd-mobile";
import PropTypes from 'prop-types';
//希望在 非路由组件中，使用路由库的api
import {withRouter} from 'react-router-dom';

/* React 高阶组件 (Higher Order Component)，简称HOC
* 简单来说，一个高阶组件就是一个函数，这个函数接受一个组件作为输入，
* 然后返回一个新的、被增强的组件作为结果，而且，
* 返回的新组件拥有了原本输入组件所不具有的功能
*
*
*  */


const TBitem = TabBar.Item; //标签栏中的每一个切换标签的选项TB_item

class NavFooter extends Component{
    static propTypes = {
        navList: PropTypes.array.isRequired
    };

    render(){
        const {navList} = this.props;
        /* 某次请求时要访问的路由路径path
        * 当请求成功时，此路由A就渲染成功了；
        * 这时关于路由A的：location、history、params此三者将注入至路由A的props中
        *
        * 如路由A的 this.props.location.pathname，即标识此渲染成功的路由A的 路由路径名，
        * 直接取出来即可
        *
        * 注意到，当前原本的NavFooter组件不是路由组件，它不具有location、history、params这三个东西，
        * 所以，原本的NavFooter组件的props中，是不会被注入location、history、params的；
        *
        *  withRouter的源码对我们的原参数组件做了什么增强：用 Route 包裹我们的参数组件，
        * 然后把 match、location、history 作为 props 传入我们的参数组件。
        *
        * 所谓 withRouter 的适用场景其实就是，
        * 当你想要访问 match、location、history 这三个对象的时候。
        *  */
        const reqPathname = this.props.location.pathname; //某次请求时要访问的路由路径path
        /* 注意到，NavFooter不是路由组件！——它不是由<Route/>包住的
        *
        *  */


        return(

            <TabBar>
                {/* 标签栏中的每一个切换标签的选项TB_item，包含：
                1.图标(未选中、选中时的状态)：图标什么时候被选中？
                2.文本
                */}
                { navList.map(  oneNav =>
                    <TBitem key={oneNav.path} title={oneNav.text}
                            icon={ {uri:require(`./images/${oneNav.icon}.png`)} }
                            selectedIcon={ {uri:require(`./images/${oneNav.icon}-selected.png`)} }
                            selected={ reqPathname===oneNav.path }
                            onPress={ ()=>this.props.history.replace(oneNav.path) }
                    />
                    //icon={ {传入图片对象uri} } 最外面的花括号表示JS代码；oneNav.icon是图片的文件名
                    //使用过commentJS的require()，动态加载icon
                    //selectedIcon={ {传入图片对象uri} }
                    //此时被选中图片的文件名为：./images/ ${oneNav.icon}-selected.png
                    //selected=(条件a)，当条件a为true时，选中此选项；当选中时，图片和文字都会不一样
                    //onPress 点触时，跳转至另一个路由；onPress={ 箭头函数 }
                ) }

            </TabBar>
        )
    }
}

export default withRouter(NavFooter); //向外暴露 强化原组件
