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
        const {user} = this.props; //这是我自己
        /* 解构赋值时，名字一定要一一对应好了！！不然报undefined的错误
         * 我在后台传值给前台时，定义的变量名就是users_getNameHeaderByUserId，解构赋值时一定要注意！！
         *  */
        const {users_getNameHeaderByUserId, chatMsgs} = this.props.chat;

        //计算当前聊天的currChatId
        const myId = user._id; //我的id

        if( !users_getNameHeaderByUserId[myId] ){ //如果还妹有获取数据，直接不做任何显示
            return null; //程序遇到return就停了，在这里直接不做任何显示
        };

        const targetId = this.props.match.params.userid_otherSide; //对方id
        const currChatId = [myId,targetId].sort().join('_'); //构造当前聊天的chatId
        /* 从当前用户的聊天列表(包含所有聊天信息)中，根据当前聊天的chatId，匹配出我想要的那个聊天会话msgs
        * 注意，此msgs包含两个内容：我发给对方的、和 对方发给我的
        *
        *  */
        const msgs = chatMsgs.filter( oneMsg=>(oneMsg.chat_id===currChatId) );

        //得到聊天中对方的头像，在这里只需要加载一次即可，不应在map中多次加载
        const targetHeader = users_getNameHeaderByUserId[targetId].header; //targetHeader对方可能妹有头像呢？三目运算符
        const targetIcon = targetHeader ?  (require(`../../assets/images/${targetHeader}.png`)) : null;

        return(
            <div id='chat-page'>
                <NavBar>aa</NavBar>
                <List>
                    {/* 上文中，我已根据当前聊天的chatId匹配出我想要的那个聊天会话msgs
                     而此msgs包含两个内容：我发给对方的、和 对方发给我的 ；
                     此msgs的数据结构可能会忘记了，可以回看后端接口文档的描述，
                     msgs中有关键的信息：from、to、content等
                     根据匹配成功的结构msgs，动态产生内容：
                    */}
                    { msgs.map( oneMsg=>{
                        if( myId===oneMsg.to ){ //这是对方发给我的消息，消息的去向to是我
                            /* 返回左边对方的<Item/>
                            * 原代码thumb中，太长了，而且：
                            * 和我在同一个聊天中的对方，他的头像是不变的
                            * 没有必要在map循环中多次加载，我在外面一次加载好(targetIcon)，放进来即可
                            *  */
                            // return(<Item key={msg._id} thumb={require(`../../assets/images/${users[oneMsg.from].header}.png`)} >{msgs.content}</Item>)
                            return(<Item key={oneMsg._id} thumb={targetIcon} >{oneMsg.content}</Item>)
                        }
                        else{ //否则！！这是我发给对方的消息，
                            //返回 我自己的<Item/> 消息正文content也是我发的内容，是对立面
                            return(<Item key={oneMsg._id} className='chat-me' extra='我'>{oneMsg.content}</Item>)
                        }
                    }) }

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
    state => ({user:state.user, chat:state.chat}),
    {sendMsg}
)(Chat);
