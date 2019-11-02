/* 进一步填写大神信息的路由容器组件
*
* 因为此组件需要与后台进行交互(点击保存按钮等)，属于容器组件，
* 故放入containers文件夹中
*  */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar, InputItem, Button} from "antd-mobile";

import HeaderSelector from '../../components/header-selector/header-selector';


class DashenInfo extends Component{ //此组件为Main路由下的二级路由，需在Main中映射路由

    state = { //受控组件收集表单数据，与 LaobanInfo 同理
        header: '',     //头像图片名称；此属性在另一个组件 <HeaderSelector /> 中
        post: '',       //职位
        info: '',       //个人或职位简介
    };

    handleChange=  (name,val)=>{
        this.setState( {
            //属性名是变量，需用 [ ]方括号
            [name] : val
        } );
    };

    setHeader=  (headerName)=>{
        this.setState( {header:headerName} );
    };

    save=  ()=>{ //点击"保存"，将发送异步请求
        console.log(this.state);
    };



    render(){
        return( //与 LaobanInfo 类似
            <div>
                <NavBar> 大神信息完善 </NavBar>
                <HeaderSelector setHeader={this.setHeader} />
                <InputItem placeholder='请输入求职岗位' onChange={ val=>this.handleChange('post',val) } >求职岗位：</InputItem>
                <InputItem placeholder='请输入个人介绍' onChange={ val=>this.handleChange('info',val) } >个人介绍：</InputItem>
                <Button type='primary' onClick={this.save} >保&nbsp;&nbsp;&nbsp;存</Button>

            </div>
        )
    }
}

export default connect( //将store中的state、从外部引入的actions，传给LaobanInfo
    state => ( {} ), //store中的state
    {  } //从外部引入的actions
)(DashenInfo)
