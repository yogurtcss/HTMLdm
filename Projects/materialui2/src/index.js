import React from 'react';
import ReactDOM from 'react-dom';


import App from "./component/App.jsx";

/* 2020-02-04 19:55:03
* 后端返回的数据格式：class java.util.ArrayList 数组嗷！
* [ User{id=41, userName='老王', birthday=Wed Feb 28 01:47:08 CST 2018, sex='男', address='北京'},
    User{id=42, userName='小二王', birthday=Fri Mar 02 23:09:37 CST 2018, sex='女', address='北京金燕龙'},
    User{id=43, userName='小二王', birthday=Sun Mar 04 19:34:34 CST 2018, sex='女', address='北京金燕龙'},
    User{id=45, userName='传智播客', birthday=Sun Mar 04 20:04:06 CST 2018, sex='男', address='北京金燕龙'},
    User{id=46, userName='老王', birthday=Thu Mar 08 01:37:26 CST 2018, sex='男', address='北京'}
]
*  */


ReactDOM.render( <App />, document.getElementById('root') );
