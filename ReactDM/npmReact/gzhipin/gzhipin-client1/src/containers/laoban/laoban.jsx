//老板主界面路由容器组件

import React, {Component} from 'react';
import {connect} from 'react-redux';

import UserList from "../../components/user-list/user-list"; //我是UI组件嗷
import {getUserList} from "../../redux/actions"; //传给Laoban的分发事件的功能函数，强化Laoban！！

class Laoban extends Component{

    /* UserList是 显示指定用户列表的UI组件
    *
    * 问：当前UI组件的数据this.props.UserList从哪来？
    * 答：在 被高阶组件connect()强化后的父亲组件<Laoban />或<Dashen />组件中：
    * 通过引入actions.js中的 getUserList，组件一上来被渲染就异步获取UserList数据——在componentDidMount中写！！，并存入store中；
    * 被强化后的<Laoban />或<Dashen />从store中取出UserList数据，
    * 这才传递给子组件(此UI组件)UseList
    *
    * 查看后端接口文档，可知返回的响应数据UserList 有如下属性：
    * _id、username、type、post、info、header 和 __v(这个暂时没用) 等等
    * company和salary可能没有，需要用 三目运算符判断它是否出现嗷——老番新看环节
    *  */
    componentDidMount(){ //Laoban组件一上来被渲染就获取dashen列表
        this.props.getUserList('dashen');
    };

    render(){
        return(
            <UserList userList={this.props.userList} /> //利用抽离出来的UI组件：UserList
        )
    }
}

export default connect(
    //此时state对象中有两个状态：user和userList
    state => ( {userList:state.userList} ), //从reducer中取出状态数据userList，存入父亲组件<Laoban>或<Dashen>的props中
    {getUserList}  //从action.js传过来，强化Laoban组件，使之能分发事件
)(Laoban);
