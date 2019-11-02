/* 进一步填写大神信息的路由容器组件
*
* 因为此组件需要与后台进行交互(点击保存按钮等)，属于容器组件，
* 故放入containers文件夹中
*  */
import React, {Component} from 'react';
import {connect} from 'react-redux';

class DashenInfo extends Component{ //此组件为Main路由下的二级路由，需在Main中映射路由
    render(){
        return(
            <div>DashenInfo</div>
        )
    }
}

export default connect( //将store中的state、从外部引入的actions，传给LaobanInfo
    state => ( {} ), //store中的state
    {  } //从外部引入的actions
)(DashenInfo)
