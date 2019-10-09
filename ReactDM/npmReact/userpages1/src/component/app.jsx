import React, {Component} from 'react'
import axios from 'axios'
import Search from './search';
import Onediv from "./onediv";
import Loadingshow from "./loadingshow";
//搜索用户的地址：https://api.github.com/search/users?q=${关键字哈哈}
export default class App extends Component{
    constructor( props ){
        super(props);
        this.state = {
            login: [], //用户名
            avatar_url: [], //用户头像图片的链接
            html_url: [], //用户主页

            divs: [],
            inputSth: '' //搜索框中的输入内容
        }
    }
    componentWillUpdate(){ //将要更新状态时
        let keyName = this.state.inputSth;
        const url = `https://api.github.com/search/users?q=${keyName}`;
        axios.get(url).then(
            (response) => { ////返回值 res 就是包含 status 的对象， 直接使用 if(res.status === 200) 就是了
                if( response.status===200 || response.status===304 ){
                    // console.log( response.data ); //显示一下数据：是一个对象
                    // console.log( response.data.items ); //数据的items属性是啥：是一个数组
                    const allUsers = response.data.items; //这是所有 符合关键字的 user信息的数组，数组中每个元素都是一个对象
                    // console.log( allUsers );
                    for( let i=0, length=allUsers.length; i<length; i++ ){
                        /* 我佛了，我设置的login、avatar_url、html_url原来是数组！！
                        * 里面的元素，全是一一对应的
                        *  */
                        this.state.login.push( allUsers[i]['login'] );
                        this.state.avatar_url.push( allUsers[i]['avatar_url'] );
                        this.state.html_url.push( allUsers[i]['html_url'] );

                        this.state.divs.push( <Onediv avatar_url={this.state.avatar_url[i]}
                                                      login={this.state.login[i]}
                                                      html_url={this.state.html_url[i]}     /> );

                    }
                }
            }
        );

    };

    getValueFromChild=(inputSth) => {
        this.setState( {inputSth} );
    };

    render(){
        return(
            <div>
                <Search getValueFromChild={ inputSth => {return this.getValueFromChild(inputSth)} } />
                <Loadingshow login={this.state.login}  avatar_url={this.state.avatar_url}
                             html_url={this.state.html_url}  divs={this.state.divs}  />

                {/*<img src="https://avatars1.githubusercontent.com/u/28438?v=4" alt="嘻嘻嘻" /> 我是注释嗷*/}
            </div>
        )
    }
}
