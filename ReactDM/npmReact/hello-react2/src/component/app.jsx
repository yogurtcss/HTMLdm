import React, {Component} from 'react'; //佛了，React、Component 首字母是大写的！！
import logo from '../logo.svg';

//佛了，React、Component 首字母是大写的！！
//之前的 React.Component 也是首字母大写的
export default class App extends Component{
    constructor(props){
        super(props);
    };
    render(){
        return(
            <div>
                <img className="logo" src={logo} alt='logoo' />
                <p className="title" >react-app啦啦啦</p>
            </div>
        )
    }
}

