import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import OneDiv from "./onediv.jsx";

//https://api.github.com/search/users?q=${关键字}
export default class Main extends Component{
    state = {
        initial: true, //初始化
        loading: false, //读条中
        users: null, //users数据为 无。users中的数据格式：每一个用户对象，其中每个用户对象都抽取出用户名、头像及主页地址
        errMsg: null
    };

    static propTypes = {
        inputValue: PropTypes.string.isRequired
    };

    componentWillReceiveProps( newProps ){ //组件将要接收到新的props属性时
        console.log( newProps ); //可知newProps是一个对象，属性名为inputValue，属性值为我们输入的值
        const {inputValue} = newProps;
        const url = `https://api.github.com/search/users?q=${inputValue}`;
        //发请求，注意catch错误信息，注意更新状态嗷
        axios.get(url)
            .then(
                (response) => {
                    const responseData = response.data;
                    console.log( responseData );
                    //取得users数据
                    const users = responseData.items.map(
                        (oneUser) => { //将这个对象返回给 users
                            return { login:oneUser.login, avatar_url:oneUser.avatar_url, html_url:oneUser.html_url }
                        }
                    );
                    //更新状态辣
                    this.setState( {initial:false, loading:false, users:users} );
                }
            )
            .catch(
                (err) => { //箭头函数右边的花括号内，务必要加上return关键字呀！(即时这里不加，但还是都加上吧)
                    //在这里直接更新状态即可！！
                    this.setState( {initial:false, loading:false, errMsg:err.message} )
                }
            )

    };




    render(){
        const { initial, loading, users, errMsg } = this.state;
        if( initial ){ //initial===true时，即初始化状态
            return <h2>Please input sth to search：{this.props.inputValue}</h2>
        }
        else if( loading ){ //loading===true时，即此时正等待
            return <h2>Loading</h2>
        }
        else if( errMsg ){
            return <h2> {errMsg} </h2>
        }
        else{ //以上状态全不是，则users中已有数据，注意，return后面必定是跟的标签，而不是花括号的函数
            // return( <div>{ 里面写函数语句 }</div> )，必定要return一个标签出来的！
            return(
                <div>
                    { users.map(
                        (oneUser,index) => { return <OneDiv login={oneUser.login}
                                                            avatar_url={oneUser.avatar_url}
                                                            html_url={oneUser.html_url}
                                                            mapKey={index}                  />     }

                    ) }
                </div>
            )
        }
    }
}