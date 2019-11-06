//个人中心主界面路由容器组件

import React, {Component} from 'react';
import {connect} from 'react-redux';
//Modal对话框，它不是标签，是对象！！
import {Result, List, WhiteSpace, Button, Modal} from "antd-mobile";
import Cookies from 'js-cookie';

import {resetUser} from "../../redux/actions";

const Item = List.Item; //列表项
const Brief = Item.Brief; //列表项的辅助简要说明文字；brief简要的、短暂的


class Personal extends Component{ //此组件需要从redux中读取user状态，拿到这里显示

    logout=  ()=>{ //登出
        /* Modal是 非标签组件——它不是标签，它是对象！！
        * 我佛了，antd-mobile和google上找不到 Modal.alert的用法！
        *
        *
        * dialog对话，对话框
        * 生成对话框窗口 Modal.alert(...)
        * Modal.alert( dialogTitle，必须。对话框标题，
        *              dialogWords，必须。对话框内文字，
        *              arrayBtns，  必须。关于两个按钮的数组arrayBtns
        *                - arrayBtns数组元素为(2个)对象：对象btn_obj1即按钮1；对象btn_obj2即按钮2 (取消、确认 顺序任意)
        *                     - 这两个对象btn_obj都有着共同的属性名：
        *                       (1)text按钮文本；
        *                       (2)onPress轻触响应，属性值为 (箭头)回调函数。如 onPress: ()=>{...我是箭头回调函数}
        *            )
        *
        *  */
        const dialogTitle = '退出';
        const dialogWords = '确认退出登录吗？';
        const cancelBtn_obj1 = { //取消按钮
            text: '取消',
            onPress: ()=>console.log('cancel')
        };
        const confirmBtn_obj2 = { //确认按钮
            text: '确认',
            onPress: ()=>{
                Cookies.remove('userid'); //清除cookie中的userid
                this.props.resetUser(); //重置redux中的user状态
            }
        };
        const arrayBtns = [ cancelBtn_obj1, confirmBtn_obj2 ]; //两个按钮的数组
        Modal.alert( dialogTitle,dialogWords,arrayBtns ); //把以上准备的参数塞进Modal.alert里面
    };


    render(){
        const {username, info, header, company, post, salary} = this.props.user;
        return(
            <div style={{marginBottom:50, marginTop:50}}>  {/* 此样式解决personal个人界面被顶上去的问题 */}
                {/* message消息列表可能也需要这个样式，记住 */}
                <Result  img = {   <img src={require(`../../assets/images/${header}.png`)}
                                        style={ {width:50} }
                                        alt="header"/>     }
                         title = {username}
                         message = {company}
                />

                <List renderHeader={ ()=>'相关信息' } >
                    {/* Item默认是单行显示的
                    Item中的 multipleLine={true} 开启多行显示模式 */}
                    <Item multipleLine={true} >
                        <Brief>职位：{post}</Brief>
                        <Brief>简介：{info}</Brief>
                        {/* salary有值吗？有就显示这个组件，否则不显示 */}
                        { salary ? (<Brief>薪资：{salary}</Brief>) : null }
                    </Item>
                </List>
                <WhiteSpace/>

                <List>
                    <Button type='warning' onClick={this.logout} >退出登录</Button>
                </List>
            </div>
        )
    }
}



export default connect(
    state => ( {user:state.user} ),
    {resetUser} //增强Personal组件
)(Personal);
