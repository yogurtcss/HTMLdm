//主界面路由组件

import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from 'js-cookie'; //操作前端cookie的对象：set设置、get获得、remove删除

import {getRedirectTo} from "../../utils"; //计算跳转之路由
import {getUser} from "../../redux/actions";

//laoban-info和dashen-info，都是Main路由下的二级路由
import LaobanInfo from '../laoban-info/laoban-info.jsx';
import DashenInfo from '../dashen-info/dashen-info.jsx';

class Main extends Component{
    componentDidMount(){
        /* 之前登陆过(cookie中有userid)，但现在没有登陆(redux管理的user中没有_id)，
        * 则发请求获取对应的user
        *  */
        const userid = Cookies.get('userid'); //cookie中的userid
        const {_id} = this.props.user; //redux管理的user中的_id
        if( (userid) && (!_id) ){ // (!_id) 没有此_id
            // console.log( '发送ajax请求获取user' ) //发送ajax请求获取user
            this.props.getUser();
        }
    }


    render(){
        const userid = Cookies.get( 'userid' ); //读取cookie中的userid

        if( !userid ){
            return( <Redirect to='/login' /> )
        }

        const {user} = this.props; //读取redux中的user信息

        if( !user._id ){ //如果redux中的user没有_id
            return null;
        }
        else{
            /* 如果已经登陆，当请求 根路径 / 时：
            *  根据user的type和header，判断得出重定向的路由路径path，并自动重定向至此path
            *
            * 当 route 匹配到 URL 时会渲染一个 route 的组件，
            * 路由会在渲染时将以下属性注入组件的props中：
            * - history、location、params
            *  */
            let path = this.props.location.pathname;
            if( path==='/' ){
                getRedirectTo( user.type, user.header ); //动态计算路由
                return( <Redirect to={path} /> ); //跳转过去
            }


        }

        /* 某种特殊情况：正当用户登陆后，此用户的cookie信息不慎丢失了；
        * 当此用户要更新信息(点击 保存 按钮时)，则将此用户强退(重定向)至 登陆界面
        *
        * 根据已登陆用户信息 cookie中的userid判断：
        * 检查用户是否登陆，若未登陆，则自动重定向至登陆界面
        *  */
        // const {user} = this.props;
        // if( !user._id ){
        //     return( <Redirect to={'/login'} /> )
        // }

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
    state => ( {user:state.user} ),
    {getUser}
)(Main);

/*  Main组件中的功能
* 1.实现自动登录
*   (1)在componentDidMount中实现：之前登陆过(cookie中有userid)，但现在没有登陆(redux管理的user中没有_id)，则发请求获取对应的user
*      以下均在 render 中实现
*         a.若redux中的user没有_id，则说明此用户未完善信息，没啥可显示的！
*           (已知事实：当用户信息出现_id时，说明数据已经OTA差异化合并完成，用户信息已完善)，则返回null，不做任何显示
*         b.若redux中的user有_id，则此用户已登陆，进入 第2.步
*   (2)如果cooke中没有userid，则自动进入login界面
*
* 2.在 render 中实现：如果已经登陆，当请求 根路径 / 时：
*   根据user的type和header，判断得出重定向的路由路径，并自动重定向
*  */
