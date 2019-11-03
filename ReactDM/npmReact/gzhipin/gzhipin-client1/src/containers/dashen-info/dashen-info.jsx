/* 进一步填写大神信息的路由容器组件
*
* 因为此组件需要与后台进行交互(点击保存按钮等)，属于容器组件，
* 故放入containers文件夹中
*  */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar, InputItem, Button} from "antd-mobile";
import {Redirect} from 'react-router-dom'; //更新信息后，路由重定向

import HeaderSelector from '../../components/header-selector/header-selector';
import {updateUser} from "../../redux/actions"; //更新信息的异步请求

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
        this.props.updateUser( this.state ); //传入state的表单数据(待更新的信息)，发送post请求
    };


    render(){
        const {header,type} = this.props.user; //从返回响应的信息中取出header、type
        if( header ){ //说明信息已完善，判断重定向之路由，三目运算符
            const path=  (  (type==='dashen') ? ('/dashen'):('/laoban')  );
            return(  <Redirect to={path} />  );
        };

        //如果没有header头像，则return以下这堆东西(信息完善界面)，并渲染这堆东西
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
    state => ( {user:state.user} ), //store中的state
    { updateUser } //从外部引入的actions
)(DashenInfo)
