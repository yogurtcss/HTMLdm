//显示指定用户列表的UI组件
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {WingBlank, WhiteSpace, Card} from "antd-mobile";

const Header = Card.Header; //卡片的头部(标题)
const Body = Card.Body; //卡片的主体(内容)

export default class UserList extends Component{
    /* UserList是 显示指定用户列表的UI组件
    *
    * 问：当前UI组件的数据this.props.UserList从哪来？
    * 答：在 被高阶组件connect()强化后的父亲组件<Laoban />或<Dashen />组件中：
    * 通过引入actions.js中的 getUserList，此父组件一上来被渲染就异步获取UserList数据——在componentDidMount中写！！，存入store中；
    * 被强化后的<Laoban />或<Dashen />从store中取出UserList数据，
    * 这才传递给子组件(此UI组件)UseList
    *
    * 查看后端接口文档，可知返回的响应数据UserList 有如下属性：
    * _id、username、type、post、info、header 和 __v(这个暂时没用) 等等
    * company和salary可能没有，需要用 三目运算符判断它是否出现嗷——老番新看环节
    *  */
    static propTypes = {
        userList: PropTypes.array.isRequired
    };
    render(){
        /* 从被强化的父亲组件<Laoban/>或<Dashen/>中，
        * 得到异步返回的响应数据userList
        *  */
        const {userList} = this.props;
        return(
            /* P50解决两个问题：
            * 1.UserList下拉时显示不全——解决：为UserList添加Margin-bottom，值等于 底部导航条navList的高度 style={{marginBottom:50}}
            * 2.最顶部的“老板/大神列表”标题栏随列表滚动——解决：为老板列表设置 position: fixed
            *  */
            <WingBlank style={{marginBottom:50, marginTop:50}} >
                { userList.map(  oneUser=>(
                    /* --------------------这个div开始-------------------- */
                    <div key={oneUser._id} >
                        <WhiteSpace/>
                        <Card>
                            {/* thumb 图片 URL
                            extra 卡片右上角的操作区域
                            */}
                            <Header thumb={require(`../../assets/images/${oneUser.header}.png`)} extra={oneUser.username} />
                            <Body>
                                <div>职位: {oneUser.post}</div>
                                {/* oneUser.company和oneUser.salary存在吗？有值吗？有则显示，否则不显示。三目运算符奥利给！ */}
                                { oneUser.company ? (<div>公司: {oneUser.company}</div>) : null }
                                { oneUser.salary  ? (<div>月薪: {oneUser.salary}</div>)  : null }
                                <div>描述: {oneUser.info}</div>
                            </Body>
                        </Card>
                    </div>
                    /* --------------------这个div结束-------------------- */
                )  )}

            </WingBlank>
        )
    }

}
