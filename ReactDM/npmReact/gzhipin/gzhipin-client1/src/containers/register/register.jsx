//注册路由组件

import React, {Component} from 'react';

import { //引入UI库中的东西
    NavBar,         //导航栏
    WingBlank,      //两翼留白
    List,           //列表
    InputItem,      //文本输入
    WhiteSpace,     //上下留白
    Radio,          //单选框
    Button          //按钮
} from "antd-mobile";

import Logo from '../../components/logo/logo.jsx';  //引入Logo组件


const ListItem = List.Item; //List列表中的一个列表项
export default class Register extends Component{
    render(){
        return(
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo />

                {/* -----两翼留白开始----- */}
                <WingBlank>
                    <List>
                        <WhiteSpace />   {/* 上下留白 */}
                        <InputItem>用户名：</InputItem>
                        <WhiteSpace />
                        <InputItem type='password' >密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace />
                        <InputItem type='password'>确认密码：</InputItem>
                        <WhiteSpace />

                        <ListItem>  {/* List中的一个列表项 */}
                            {/* 适当添加空隙&nbsp; */}
                            <span>用户类型：</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio>大神</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio>老板</Radio>
                        </ListItem>
                        <WhiteSpace/>

                        <Button type='primary' >注&nbsp;&nbsp;&nbsp;册</Button>
                        <WhiteSpace/>
                        <Button>已有账户</Button>


                    </List>
                </WingBlank>
                {/* -----两翼留白结束----- */}

            </div>
        )
    }
}