import React, {Component} from 'react';

import Search from "./search.jsx";
import Main from "./main.jsx";
import '../css/app.css'

export default class App extends Component{
    state = {
        inputValue: ''
    };
    /* 向子组件中传入：可改变父亲App状态的组件，以获取输入内容inputValue
    * 接着向Main中传入此inputValue，即可完成 兄弟组件中的通信
    *  */
    changeState=(inputValue) => { this.setState({inputValue} )  } ;

    render(){
        return(
            <div className="app" >
                <Search changeState={this.changeState} />
                <Main inputValue={this.state.inputValue} />
            </div>
        )
    }
}
