//主界面路由组件

import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

//laoban-info和dashen-info，都是Main路由下的二级路由
import LaobanInfo from '../laoban-info/laoban-info.jsx';
import DashenInfo from '../dashen-info/dashen-info.jsx';

export default class Main extends Component{
    render(){
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
