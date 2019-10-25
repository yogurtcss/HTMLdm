//登陆路由组件

import React, {Component} from 'react';

import { //引入UI库中的东西
    NavBar,         //导航栏
    WingBlank,      //两翼留白
    List,           //列表
    InputItem,      //文本输入
    WhiteSpace,     //上下留白
    Button          //按钮
} from "antd-mobile";

import Logo from '../../components/logo/logo.jsx';  //引入Logo组件


const ListItem = List.Item; //List列表中的一个列表项

export default class Login extends Component{ //结构与Register类似
    state = { //弄一个状态state保存表单收集的数据
        username: '', //用户名
        password: '', //密码
    };

    login=() => {
        console.log( this.state );
    };

    //处理输入数据的改变：更新对应的状态
    handleChange=(name,val) => { //欲更新的属性名name，更新的属性值
        //更新状态
        this.setState( { [name]:val } ); //属性名为 变量name的值
    };

    /* 跳转至 <Register/>路由
    * 当 route 匹配到 URL 时会渲染一个 route 的组件，
    * 路由会在渲染时将以下属性注入组件的props中：可以直接通过props拿来用
    *   - history
    *   - location
    *   - params
    *  */
    toRegister=() => {
        this.props.history.replace( '/register' );
    };

    render(){
        return(
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo />

                {/* -----两翼留白开始----- */}
                <WingBlank>
                    <List>
                        <WhiteSpace />   {/* 上下留白 */}
                        <InputItem placeholder='请输入用户名' onChange={
                            val => { this.handleChange('username',val)} } >用户名：</InputItem>
                        <WhiteSpace />

                        <InputItem placeholder='请输入密码' onChange={
                            val => { this.handleChange('password',val) } }
                                   type='password' >密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace />


                        <Button type='primary' onClick={this.login} >登&nbsp;&nbsp;&nbsp;陆</Button>
                        <WhiteSpace/>

                        {/* 跳转至 <Register/>路由 */}
                        <Button onClick={this.toRegister} >还没有账户</Button>


                    </List>
                </WingBlank>
                {/* -----两翼留白结束----- */}

            </div>
        )
    }
}