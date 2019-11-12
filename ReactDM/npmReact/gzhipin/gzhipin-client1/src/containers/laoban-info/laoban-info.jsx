/* 进一步填写老板信息的路由容器组件
*
* 因为此组件需要与后台进行交互(点击保存按钮等)，属于容器组件，
* 故放入containers文件夹中
*  */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'; //完善信息后，执行路由重定向
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';

import HeaderSelector from '../../components/header-selector/header-selector.jsx';
import {updateUser} from "../../redux/actions"; //点击保存，发送异步请求以更新用户信息

class LaobanInfo extends Component{ //此组件为Main路由下的二级路由，需在Main中映射路由

    state = { //受控组件收集表单数据
        header: '',     //头像图片名称；此属性在另一个组件 <HeaderSelector /> 中
        post: '',       //职位
        info: '',       //个人或职位简介
        company: '',    //公司名称
        salary: ''      //月薪
    };
    /* 通过 antd-mobile中 <Button>中的 onChange监听来收集数据
    *   - antd-mobile中 <Button>中的 onChange：能自动传值出来，能直接使用此值
    *         - onChange={ value =>   ...回调函数 this.handleChange(value)... ) } // 使用箭头函数向回调函数传递(形参)参数，下面有注释
    *   - 原生JS中的onchange：不能自动传值，要自己想办法拿到这个值
    *
    *
    * 使用箭头函数向回调函数传递形参:
    * 如 onChange = { val=>this.handleChange(val) } //箭头函数带形参val，箭头右端返回 某回调函数func，并向func传入形参val
    *  */
    handleChange=  (name,val)=>{
        this.setState( {
            //属性名是变量，需用 [ ]方括号
            [name] : val
        } );
    };

    /* 更新header状态的功能函数，交给子组件<HeaderSelector />调用
    * 以更新 我父组件中状态的 header值：头像图片名称
    *  */
    setHeader=  (headerName)=>{
        this.setState( {header:headerName} );
    };

    save=  ()=>{ //点击"保存"，将发送异步请求
        this.props.updateUser( this.state ); //将state状态保存的表单数据 发送post请求
    };



    render(){
        const {header,type} = this.props.user;
        if( header ){ //说明信息已完善，判断重定向之路由，三目运算符
            const path=  (   (type==='dashen') ? ('/dashen'):('/laoban')   );
            return (  <Redirect to={path} />  ) //return此路由，并渲染之
        }

        //如果没有header头像，则return以下这堆东西(信息完善界面)，并渲染这堆东西
        return(
            <div>
                <NavBar>老板信息完善</NavBar>

                {/* 更新header状态的功能函数this.setHeader，
                 * 交给子组件<HeaderSelector />调用，
                 * 以更新 我父组件中状态的 header值
                 */}
                <HeaderSelector setHeader={this.setHeader} />

                {/* 获取输入框InputItem中的值：(受控组件)
                 * onChange= { val=>this.handleChange(该变量的名字标识name, val) }
                 * 注意：该变量的名字标识name 要与该组件中 状态的属性名完全一致( 即name的值为：header、post、info、company、salary )
                 * 这样我在 回调函数handleChange中 this.setState时：更新对象的属性名可以直接用 [name] 加方括号 索引之
                 */}
                <InputItem placeholder='请输入招聘职位' onChange={ val=>this.handleChange('post',val)} >招聘职位：</InputItem>
                <InputItem placeholder='请输入公司名称' onChange={ val=>this.handleChange('company',val) } >公司名称：</InputItem>
                <InputItem placeholder='请输入职位薪资' onChange={ val=>this.handleChange('salary',val) } >职位薪资：</InputItem>
                {/* TextareaItem多行文本输入。title指定标签体内的文字，row指定初始占用的行数 */}
                <TextareaItem title='职位要求' row={3}  onChange={ val=>this.handleChange('info',val) } />
                {/* 单击响应函数 this.save */}
                <Button type='primary' onClick={ this.save } >保&nbsp;&nbsp;&nbsp;存</Button>

            </div>
        )
    }
}

export default connect( //将store中的state、从外部引入的actions，传给LaobanInfo
   state => ( {user:state.user} ), //store中的state
    { updateUser } //从外部引入的actions
)(LaobanInfo)
