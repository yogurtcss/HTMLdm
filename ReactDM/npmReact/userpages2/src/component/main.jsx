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

    componentWillReceiveProps( newProps ) { //此组件 将要被传入新的props时：
        console.log( newProps );
        ////可知传入的newProps为一个对象，属性名为inputValue，属性值是我们输入的内容嗷
        const {inputValue} = newProps; //对象的解构赋值法
        this.setState( { //传入新状态时，更改此时的显示状态：读条中
            initial: false,
            loading: true
        } );
        const url = `https://api.github.com/search/users?q=${inputValue}`;
        //发get请求辣
        axios.get(url)
            .then(
                (response)=>{
                    //得到响应数据
                    const responseData = response.data;
                    console.log( responseData );
                    //更新状态(成功)
                    const users = responseData.items.map(
                        (oneUser) => { //这是一个包裹的花括号
                            return { login: oneUser.login,
                                     avatar_url: oneUser.avatar_url,
                                     html_url: oneUser.html_url
                            } //返回的是一个对象嗷
                        }
                    );
                    this.setState( { initial:false, loading:false, users:users } );
                }
            )
            .catch( //更新状态(失败)
                (err)=>{
                    /* 传入一个对象的时候，这个对象表示该组件的新状态。
                    * 但你只需要传入需要更新的部分就可以了，而不需要传入整个对象。
                    *  */
                    this.setState( {loading:false, errMsg:err.message} );
                }
            )

    }

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