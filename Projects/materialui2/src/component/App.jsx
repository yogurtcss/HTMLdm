import React,{Component} from 'react';
import axios from 'axios';

import {Button} from '@material-ui/core'

import MyTable from "../views/MyTable";

/* 2020-02-04 19:55:03
* 后端返回的数据格式：class java.util.ArrayList 数组嗷！
* [ User{id=41, userName='老王', birthday=Wed Feb 28 01:47:08 CST 2018, sex='男', address='北京'},
    User{id=42, userName='小二王', birthday=Fri Mar 02 23:09:37 CST 2018, sex='女', address='北京金燕龙'},
    User{id=43, userName='小二王', birthday=Sun Mar 04 19:34:34 CST 2018, sex='女', address='北京金燕龙'},
    User{id=45, userName='传智播客', birthday=Sun Mar 04 20:04:06 CST 2018, sex='男', address='北京金燕龙'},
    User{id=46, userName='老王', birthday=Thu Mar 08 01:37:26 CST 2018, sex='男', address='北京'}
]
*  */
export default class App extends Component{
    state = { //状态存储数据
        // list : [ {id:42, userName:'小儿王', birthday:'Wed Feb 28 01:47:08 CST 2018', sex:'男', address:'北京'} ]  //后端返回的数据是 数组形式的
        list : []
    };


    findAll= ()=>{
        const url = "http://localhost:8080/user/findAll";
        /* 直接请求后端  http://localhost:8080/user/findAll
        * 同时，后端的控制器UserController 加注解 @CrossOrigin，表示可以跨域请求
        *  */
        axios.get(url).then( response => {
            const list = response.data; //取得响应的数据 list
            console.log( list );
            this.setState( {list} );
        } )
    };


    render(){
        const {list} = this.state;
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.findAll} >
                    Click to find all
                </Button>

                <hr />
                {/* 把后端传来的数据list传给 <MyTable /> */}
                <MyTable rows={list} />
            </div>
        )
    }
}
