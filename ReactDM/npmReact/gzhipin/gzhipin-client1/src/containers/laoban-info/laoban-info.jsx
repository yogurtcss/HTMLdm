/* 进一步填写老板信息的路由容器组件
*
* 因为此组件需要与后台进行交互(点击保存按钮等)，属于容器组件，
* 故放入containers文件夹中
*  */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';

import HeaderSelector from '../../components/header-selector/header-selector.jsx';


class LaobanInfo extends Component{ //此组件为Main路由下的二级路由，需在Main中映射路由
    render(){
        return(
            <div>
                <NavBar>老板信息完善</NavBar>
                <HeaderSelector />
                <InputItem placeholder='请输入招聘职位' >招聘职位：</InputItem>
                <InputItem placeholder='请输入公司职位' >公司职位：</InputItem>
                <InputItem placeholder='请输入职位薪资' >职位薪资：</InputItem>
                {/* TextareaItem多行文本输入。title指定标签体内的文字，row指定初始占用的行数 */}
                <TextareaItem title='职位要求' row={3} />
                <Button type='primary' >保&nbsp;&nbsp;&nbsp;存</Button>

            </div>
        )
    }
}

export default connect( //将store中的state、从外部引入的actions，传给LaobanInfo
   state => ( {} ), //store中的state
    {  } //从外部引入的actions
)(LaobanInfo)
