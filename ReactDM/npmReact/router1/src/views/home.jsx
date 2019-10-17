import React, {Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
//嵌套路由啦
import MyNavLink from "../components/my-nav-link";
//1. 分别指定子路由组件
import Message from "./message";
import News from "./news";

export default class Home extends Component{ //2.在父路由(在这里是Home)中指定 路由链接<NavLink/>和路由<Route />
    render(){
        /* 注：1.<ul className='nav nav-tabs' >下，是两个路由链接<MyNavLink />
        * 2.嵌套路由的地址：注意看MyNavLink中的 to='/home/news'，即home下的news，这就是嵌套
        *  */
        return(
            <div>
                <h2>Home router嗷！</h2>
                <ul className='nav nav-tabs'>
                    <li> <MyNavLink to='/home/news' >News</MyNavLink> </li>
                    <li> <MyNavLink to='/home/message' >Message</MyNavLink> </li>
                </ul>
                <div>
                    <Switch>
                        <Route path='/home/news' component={News} />
                        <Route path='/home/message' component={Message} />
                        <Redirect to='/home/news' />
                    </Switch>
                </div>
            </div>
        )
    }
}