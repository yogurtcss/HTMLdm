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
    state = { //弄一个状态state保存表单收集的数据
        /* 通过 antd-mobile中 <Button>中的 onChange监听来收集数据
        *   - antd-mobile中 <Button>中的 onChange：能自动传值出来，能直接使用此值
        *         - onChange={ value => ...用到此value ) }
        *   - 原生JS中的onchange：不能自动传值，要自己想办法拿到这个值
        *
        *  */
        username: '', //用户名
        password: '', //密码
        password2: '', //确认密码
        type: '' //用户类型名称：dashen/laoban
    };

    register=() => {
        console.log( this.state );
    };

    //处理输入数据的改变：更新对应的状态
    handleChange=(name,val) => { //欲更新的属性名name，更新的属性值
        //更新状态
        this.setState( { [name]:val } ); //属性名为 变量name的值
    };

    /* 点击“已有账户”，跳转至 <Login/>路由
    * 当 route 匹配到 URL 时会渲染一个 route 的组件，
    * 路由会在渲染时将以下属性注入组件的props中：可以直接通过props拿来用
    *   - history
    *   - location
    *   - params
    *  */
    toLogin=() => {
        this.props.history.replace( '/login' );
    };

    render(){
        const {type} = this.state; //在一开头就读取 单选框中的type值

        return(
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo />

                {/* -----两翼留白开始----- */}
                <WingBlank>
                    <List>
                        <WhiteSpace />   {/* 上下留白 */}
                        <InputItem onChange={
                            val => { this.handleChange('username',val)} } >用户名：</InputItem>
                        <WhiteSpace />

                        <InputItem onChange={
                            val => { this.handleChange('password',val) } }
                                   type='password' >密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace />

                        <InputItem onChange={
                            val => { this.handleChange('password2',val) } }
                                   type='password'>确认密码：</InputItem>
                        <WhiteSpace />

                        <ListItem>  {/* List中的一个列表项 */}
                            {/* 适当添加空隙&nbsp; */}
                            <span>用户类型：</span>
                            &nbsp;&nbsp;&nbsp;

                            {/*antd-mobile中的Radio单选框也有onChange事件，*/}
                            {/*但它没有“自动传返回值”的功能！！切记！！*/}

                            {/*  在一开头就读取 单选框中的type值  */}
                            {/*  const {type} = this.state  */}
                            {/*  单选框Radio中的 checked属性：*/}
                            {/*  指定当前的单选框是否被选中；true选中，否则不选中  */}
                            {/*  在这里，一上来就要判断：*/}
                            {/*  当点击某单选框时，handleChange立马更新状态state中的type值，*/}
                            {/*  旋即checked检查 type===‘...’ 并选中之  */}
                            {/*  当 读取状态state中的type==='dashen'结果为true时，选中此dashen单选框  */}

                            <Radio checked={ type==='dashen' } onChange={
                                () => this.handleChange('type','dashen') } >大神</Radio>

                            {/*<Radio >大神</Radio>*/}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                            <Radio checked={ type==='laoban' } onChange={
                                () => this.handleChange( 'type','laoban' ) } >老板</Radio>
                        </ListItem>
                        <WhiteSpace/>

                        <Button type='primary' onClick={this.register} >注&nbsp;&nbsp;&nbsp;册</Button>
                        <WhiteSpace/>

                        {/* 点击“已有帐户”，跳转至 <Login/>路由 */}
                        <Button onClick={this.toLogin} >已有账户</Button>


                    </List>
                </WingBlank>
                {/* -----两翼留白结束----- */}

            </div>
        )
    }
}