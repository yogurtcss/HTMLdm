/* 2020-02-13 20:01:07
主界面main的路由组件部分
——抽取出来，然后再加入 connect()(...)的redux代码

路由组件是特殊的一类containers
*  */
import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';

import MyHeaderWithLeftDrawer from './left-draw-view.jsx';  //函数组件的引入
import SimpleTabs from '../preview/homepage-preview'


export default class MainView extends Component{

    render(){
        return(
            <Grid container direction="column" justify="center" alignItems="stretch"  >
                <Grid item  >
                    {/*/!* 头部 MyHeaderWithLeftDrawer *!/*/}
                    <MyHeaderWithLeftDrawer/>
                </Grid>
                <Grid item>
                    <SimpleTabs />
                </Grid>
            </Grid>
        )
    }
}
