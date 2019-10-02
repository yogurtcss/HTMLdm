//引入文件
import React, {Component} from 'react'
//返回上一级目录..嗷
//引入的资源文件，只能放在src文件夹下嗷
import logo192 from '../data/logo192.png'

//定义一个类，并默认暴露出去
export default class App extends Component{

    render(){
        return(
            <div>
                <img className='logo192' src={logo192} alt="logo192嗷" />
                <p className='title' > react app组件嗷 </p>
            </div>
        )
    }
}
