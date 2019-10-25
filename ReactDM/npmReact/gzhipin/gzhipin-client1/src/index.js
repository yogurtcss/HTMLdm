import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route,Switch} from 'react-router-dom';
/*  HashRouter与BrowseRouter的区别
*
* HashRouter 最简单，不需要服务器端渲染 —— 常用于旧款浏览器
* 服务器端无论对任何 URL 请求都返回一模一样的 HTML 就好，
* 靠浏览器的# 来区分 path 就好；
*
* BrowseRouter —— 使用于现代浏览器
* 稍微复杂一点，因为要求服务器端对不同 URL 返回不同的 HTML。
*
*  */

/* -----引入redux----- */
import {Provider} from 'react-redux';

import store from './redux/store.js';


//引入3个 一级路由组件
import Register from "./containers/register/register.jsx";
import Login from "./containers/login/login.jsx";
import Main from "./containers/main/main.jsx";


ReactDOM.render(
    /* P11：新增 Provider标签
    * 注意：路由Main没有指定路径 path
    * 问：什么时候 去请求Main组件呢？
    * 答：当需要加载 Main下的二级路由组件(如 老板界面、大神界面……)时，
    * 需要这样做：先请求(加载)Main组件，然后再加载 Main下的二级路由组件
    *  */
    (<Provider store={store} >
        <HashRouter>
            <Switch>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login} />
                <Route component={Main} /> {/*默认组件*/}
            </Switch>
        </HashRouter>
    </Provider>  ),

    document.getElementById('root') );