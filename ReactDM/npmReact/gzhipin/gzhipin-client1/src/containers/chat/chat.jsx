import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar, List, InputItem} from "antd-mobile";

import {sendMsg} from '../../redux/actions.js'; //发送消息的异步action

const Item = List.Item;

class Chat extends Component{

    state = { //受控组件，通过组件的状态收集表单数据
        content: ''
    };

    handleSend=  ()=>{
        //收集数据
        const from = this.props.user._id; //消息发送方: 我。从reducers中产生的新状态user就是我
        /* 通过观察react插件可知，消息接收方的路由路径为 /chat/对方的userid
        * 对方的userid可在 匹配成功(match)至chat路由时 this.props.match.params.参数AAA 获取
        * userid_otherSide是在main组件中定义(映射)路由时，通过params传参定义的
        *  */
        const to = this.props.match.params.userid_otherSide; //消息接收方：匹配成功至chat路由的对方id
        const content = this.state.content.trim(); //输入的内容

        if( content ){ //当content有值时，才发请求
            this.props.sendMsg( {from,to,content} ) //发送异步请求
        }

        this.setState( {content:''} )

    };

    render(){
        return(
            <div id='chat-page'>
                <NavBar>aa</NavBar>
                <List>
                    <Item thumb={require('../../assets/images/头像1.png')} >你好嗷</Item>
                    <Item thumb={require('../../assets/images/头像1.png')} >你好嗷1</Item>

                    <Item className='chat-me' extra='我'>好好好</Item>
                    <Item className='chat-me' extra='我'>好好好22</Item>
                </List>

                <div className='am-tab-bar'>
                    <InputItem placeholder='请输入'
                               value={this.state.content}
                               extra={<span onClick={this.handleSend}>发送</span>}
                               onChange={ val=>this.setState({content:val}) }    />
                               {/* 受控组件，通过onChange将数据保存(setState)至组件状态中
                                value=this.state.content，将content的更新结果(有值、或清除后)实时显示到输入框中  */}
                </div>




            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {sendMsg}
)(Chat);
