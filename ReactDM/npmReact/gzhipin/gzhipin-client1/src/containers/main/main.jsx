//主界面路由组件

import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from 'js-cookie'; //操作前端cookie的对象：set设置、get获得、remove删除
import {NavBar} from "antd-mobile"; //Main的头部


import {getRedirectTo} from "../../utils"; //计算跳转之路由
import {getUser} from "../../redux/actions";

//laoban-info和dashen-info，都是Main路由下的二级路由
import LaobanInfo from '../laoban-info/laoban-info.jsx';
import DashenInfo from '../dashen-info/dashen-info.jsx';

import Dashen from '../dashen/dashen.jsx';
import Laoban from '../laoban/laoban.jsx';
import Message from '../message/message.jsx';
import Personal from '../personnal/personal.jsx';
import NotFound from '../../components/not-found/not-found.jsx';
import NavFooter from "../../components/nav-footer/nav-footer"; //底部标签栏
import Chat from '../chat/chat.jsx';


class Main extends Component{
    /* 无static前缀，为Main组件对象定义(即 添加)一个 属性navList
    * 此navList，无前缀 static，表示为当前组件对象添加属性
    * 若有前缀static，则为 组件类 添加属性
    * 如 state = { ... }
    *  */
    navList = [ //最底下的导航图标。path为路由路径，icon为图片文件名
        { path:'/laoban',   component:Laoban,   title:'大神列表', icon:'dashen',   text:'大神' }, //老板主界面，显示大神列表
        { path:'/dashen',   component:Dashen,   title:'老板列表', icon:'laoban',   text:'老板' }, //大神主界面，显示老板列表
        { path:'/message',  component:Message,  title:'消息列表', icon:'message',  text:'消息' },
        { path:'/personal', component:Personal, title:'个人中心', icon:'personal', text:'个人' },
    ];

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

        const navList = this.navList; //或者解构赋值：const {navList} = this;
        const currPath = this.props.location.pathname; //当前请求的path
        const currNav = navList.find( (oneNav)=> oneNav.path===currPath ); //得到当前的nav，可能是不存在的

        if( currNav ){ //如果currNav存在时，才考虑是否向其加入 hide属性(决定它显示与否)
            //决定哪个路由需要隐藏
            if( user.type==='laoban' ){ //老板主界面，则隐藏 老板列表：navList数组第2个元素
                navList[1].hide = true; //下标为1，第2个；添加hide属性
            }
            else{ //大神主界面。则隐藏 大神列表：navList第1个元素
                navList[0].hide = true; //下标为0，第1个；添加hide属性
            }
        }

        return( //laoban-info和dashen-info，都是Main路由下的二级路由
            <div>
                { currNav ? (<NavBar className='sticky-header'>{currNav.title}</NavBar>) : null }  {/* currNav存在吗？如果有，则显示；否则就null */}
                <Switch>
                    {/* 中间: 映射navList中的4个导肮路由组件，数组的map方法 */}
                    { navList.map(
                        (oneNav,index) => ( <Route path={oneNav.path} component={oneNav.component} key={index}/> )
                    ) }

                    {/* 映射 这两个组件 为Main路由下的二级路由 */}
                    <Route path='/laobaninfo' component={LaobanInfo} />
                    <Route path='/dasheninfo' component={DashenInfo} />
                    {/* chat的路由路径有点特殊：使用params传参的路由， 冒号+参数名AAA，
                    此参数AAA可在 匹配成功(match)至chat路由时 this.props.match.params.参数AAA 获取

                    加入标识某个会话的userid_otherSide(在某个聊天中，对方的userid) */}
                    <Route path='/chat/:userid_otherSide' component={Chat} />

                    {/* 当以上的路由都没被匹配时，not found */}
                    <Route component={NotFound} />
                </Switch>
                {/* 底部的导航条——单独抽离出来的一个UI组件：信息完善界面不需要此底部的导航条
                    传入标签栏信息 navList
                */}
                { currNav ? (<NavFooter navList={navList} />) : null }
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
