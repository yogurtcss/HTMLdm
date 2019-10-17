import React, {Component} from 'react';
import { NavLink,Switch,Route,Redirect } from 'react-router-dom';

/* NavLink，导航路由链接
* Switch，切换路由组件
* Route 路由
* Redirect 重定向
*  */

import About from "../views/about.jsx";
import Home from "../views/home.jsx";
import MyNavLink from "./my-nav-link.jsx";

import '../index.css';

export default class App extends Component{
    render(){
        /* <NavLink to='/路径A' > About </NavLink>，中间的About文字，类同<a></a>标签！
        * 此 /路径A 用于 <Route />路由的匹配，
        * 若 某<Route />路径 能匹配某个 Link或NavLink的路径，(加上Switch 选择显示)
        * 路径匹配成功了：则这个Link或NavLink能被显示出来
        *
        *
        * activeClass 后面再添加
        *  */
        return(
            <div>
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-8">
                        <div className="page-header"><h2>React Router Demo</h2></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            {/*<NavLink className="list-group-item" activeClassName='activeClass' to="/about">About</NavLink>*/}
                            {/*<NavLink className="list-group-item" activeClassName='activeClass' to="/home">Home</NavLink>*/}
                            {/*使用改良版的 NavLink*/}
                            <MyNavLink className="list-group-item" to='/about' >About</MyNavLink>
                            <MyNavLink className="list-group-item" to='/home' >Home</MyNavLink>

                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                <div>
                                    <Switch>
                                        <Route path='/about' component={About} />
                                        <Route path='/home'  component={Home} />
                                        <Redirect to='/home' />
                                    </Switch>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}