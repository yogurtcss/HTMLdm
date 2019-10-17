import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';


export default class MyNavLink extends Component{
    render(){ // ... 拆包作用
        // {...this.props}将外部传入的所有属性传递给NavLink标签
        return <NavLink {...this.props} activeClassName="activeClass" />
    }

}