import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import MessageDetail from "./message-detail";
import MyNavLink from "../components/my-nav-link";

export default class Message extends Component{
    state = {
        msgs:[
            // { id:1, title:'m1' },
            // { id:2, title:'m2' },
            // { id:3, title:'m3' },
        ]
    };
    componentDidMount(){ //模拟发送请求
        setTimeout( //延时执行定时器
            ()=>{
                const msgs = [
                    { id:1, title:'m1' },
                    { id:2, title:'m2' },
                    { id:3, title:'m3' }    ];
                this.setState( {msgs} );
            }, 1000
        );
    }

    render(){ // <a href={这里是JS代码嗷}
        return(
            <div>
                <ul>
                    { this.state.msgs.map(
                        (onemsg,index) =>
                            (<li key={index}>
                                {/*非路由链接: <a >标签，点击后会发出请求；*/}
                                {/*路由链接：<Link>点击后不发出请求*/}
                                {/*<a href= {`/home/message/messagedetail/${onemsg.id}`} >{onemsg.title}</a>*/}
                                <MyNavLink to={`/home/message/messagedetail/${onemsg.id}`} >{onemsg.title}</MyNavLink>
                            </li>)
                    ) }
                </ul>
                {/* 动态路由：就是在匹配路径 path 的后面加上冒号  加  参数(形参)A， 如 path ="products/:id"
                 * 这样，在message-detail取出这个 id值，即可根据id进行匹配(查询)得到其对应的 详情content！
                 * 注意，参数A的名不能有短杠- 等特殊字符 ！！(这样此路由将无法显示) ，下划线是合法的
                 *
                 * 定义路由Route时，可以指定一个 path，然后指定通配符(如冒号)可以携带参数A到指定的 path
                 * 即传值到指定的component组件中：
                 *
                 * 因为要从 <Route>的path中传形参id给组件MessageDetail，建议用 工厂函数法 创建MessageDetail
                 * 当然也可以用 组件类的方法，记得要在类中加上构造函数：constructor(props){ super(props) }，
                 * 使用 this.props.match.params.形参A(如id) 来获取相应的id值
                 *
                 * 此方法可以传递一个或多个值，但是每个值的类型都是字符串，
                 * 没法传递一个对象，如果要传的话可以将 json 对象转换为字符串，传递过去之后再将 json 字符串转换为对象。
                 */}
                <Route path='/home/message/messagedetail/:one_id' component={MessageDetail} />
            </div>
        )
    }
}