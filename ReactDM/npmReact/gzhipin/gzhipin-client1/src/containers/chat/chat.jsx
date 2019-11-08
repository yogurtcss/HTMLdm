import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar, List, InputItem} from "antd-mobile";

const Item = List.Item;

class Chat extends Component{
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
                    <InputItem placeholer='请输入' extra={<span>发送</span>} />
                </div>

            </div>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(Chat);
