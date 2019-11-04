//个人中心主界面路由容器组件

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Result, List, WhiteSpace, Button} from "antd-mobile";



const Item = List.Item; //列表项
const Brief = Item.Brief; //列表项的辅助简要说明文字；brief简要的、短暂的

class Personal extends Component{ //此组件需要从redux中读取user状态，拿到这里显示
    render(){
        const {username, info, header, company, post, salary} = this.props.user;
        return(
            <div>
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
                    <Button type='warning' >退出登录</Button>
                </List>
            </div>
        )
    }
}



export default connect(
    state => ( {user:state.user} ),
)(Personal);
