//主界面路由组件

import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

//laoban-info和dashen-info，都是Main路由下的二级路由
import LaobanInfo from '../laoban-info/laoban-info.jsx';
import DashenInfo from '../dashen-info/dashen-info.jsx';

class Main extends Component{
    render(){
        /* 某种特殊情况：正当用户登陆后，此用户的cookie信息不慎丢失了；
        * 当此用户要更新信息(点击 保存 按钮时)，则将此用户强退(重定向)至 登陆界面
        *
        * 根据已登陆用户信息 cookie中的userid判断：
        * 检查用户是否登陆，若未登陆，则自动重定向至登陆界面
        *  */
        const {user} = this.props;
        if( !user._id ){
            return( <Redirect to={'/login'} /> )
        }

        return(
            //laoban-info和dashen-info，都是Main路由下的二级路由
            <div>
                <Switch>
                    {/* 映射 这两个组件 为Main路由下的二级路由 */}
                    <Route path='/laobaninfo' component={LaobanInfo} />
                    <Route path='/dasheninfo' component={DashenInfo} />
                </Switch>
            </div>
        )
    }
}

export default connect(
    state => ( {user:state.user} )
)(Main);
