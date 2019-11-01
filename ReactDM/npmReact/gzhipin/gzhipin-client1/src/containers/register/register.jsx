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

import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'; //登陆成功后，跳转至某页面


import Logo from '../../components/logo/logo.jsx';  //引入Logo组件
import {register} from '../../redux/actions.js'; //注册的异步action



/* ----------Register组件开始---------- */
const ListItem = List.Item; //List列表中的一个列表项
class Register extends Component{
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
        // console.log( this.state );
        //使用action.js中传来的异步操作register，发送注册的异步请求
        this.props.register( this.state );
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
        /* 失败的响应: 对象为 { code:1, msg:'XXX错误提示' }
        *  */
        const {msg,redirectTo} = this.props.user; //取出：响应数据user中的msg提示信息

        if( redirectTo ){ //如果 跳转的页面 有着落了，那我就直接跳到该页面去，不渲染接下来的东西了
            return <Redirect to={redirectTo} />
        };

        /* ----------如果我上面 跳转的页面 有着落了，那我就直接跳到该页面去，不渲染接下来的东西了---------- */
        return(
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo />

                {/* -----两翼留白开始----- */}
                <WingBlank>
                    <List>
                        {/* 将错误提示在前台中展示
                         巧妙地使用了三目运算符：
                         msg存在吗？有就出现div，没有则null
                         */}
                        {/*  <div>{...JS代码...}</div> 注意，这两个div中间放的是JS代码：变量msg！ */}
                        { (msg)? <div className='error-msg'>{msg}</div> : null } {/* ← 此花括号内，表示JS代码嗷 */}

                        <WhiteSpace />   {/* 上下留白 */}
                        <InputItem placeholder='请输入用户名' onChange={
                            // 注意，箭头函数右端这里，不要写花括号！！不然没有返回值！！点击注册按钮没反应！
                            val => ( this.handleChange('username',val) )     } >用户名：</InputItem>
                        <WhiteSpace />

                        <InputItem placeholder='请输入密码' onChange={
                            // 注意，箭头函数右端这里，不要写花括号！！不然没有返回值！！点击注册按钮没反应！
                            val =>  this.handleChange('password',val)       }
                                   type='password' >密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace />

                        <InputItem placeholder='请输入确认密码' onChange={
                            val =>  this.handleChange('password2',val)      }
                                   type='password'>确认密码：</InputItem>
                        <WhiteSpace />

                        <ListItem>  {/* List中的一个列表项 */}
                            {/* 适当添加空隙&nbsp; */}
                            <span>用户类型：</span>
                            &nbsp;&nbsp;&nbsp;

                            {/*antd-mobile中的Radio单选框也有onChange事件——在点击时触发，*/}
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
                                () => {this.handleChange('type','dashen')} } >大神</Radio>

                            {/*<Radio >大神</Radio>*/}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                            <Radio checked={ type==='laoban' } onChange={
                                () => {this.handleChange( 'type','laoban' )} } >老板</Radio>
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
/* ----------Register组件结束---------- */

/* 2019-11-01 13:02:03
* 关于react-redux与后台交互的新的理解！！
* */

/* connect方法 将 store上的 mapStateToProps 和 mapStateToProps 包装成组件的 props
*
* */
export default connect(
    /* 在actions中，接收到后端返回的响应数据，传给reducers；
    * 经reducers处理后，产出的新状态newState 名为user，将之作为 一般数据：状态数据state的属性 存入store中
    *  */

    /* 形参名state(可以任意命名)，这是store上的状态数据
    * 因为当前这个 <Register /> 组件被 <Provider />标签包着，
    * 所以 <Register />能拿到得到store中的数据：state状态
    *
    * 如何让组件也有 分发事件、从而操控store改变自身state 的能力？
    *   - 答：在此组件中，引入外部的dispatch函数，如 import {register} from '../../redux/actions.js'，
    *         并把此dispatch传给此组件，那么此组件就有了 分发事件、从而操控store改变自身state 的能力了
    *  */

    /* 注意，此state是store中的state (新状态newState的值)
    * 而 dispatch则通过引入外部文件：import {register} from '../../redux/actions.js'  (以props形式)传给<Register/>组件
    *  */
    state => ( {user:state.user} ), //mapStateToProps函数。注意，此user是从reducers.js中产出、储存在store中，在这里以props形式传给<Register/>组件

    /* register(从action.js中产出的)，注册的异步操作，
    * 给Register组件中的"注册按钮" 单击响应函数使用的
    *  */

    /* 注意，此state是store中的state (新状态newState的值)
    * 而 dispatch则通过引入外部文件：import {register} from '../../redux/actions.js'  (以props形式)传给<Register/>组件
    *  */
    {register} //mapDispatchToProps函数。注意，此register是从action.js中产出的，在这里以props形式传给<Register/>组件
)(Register);
