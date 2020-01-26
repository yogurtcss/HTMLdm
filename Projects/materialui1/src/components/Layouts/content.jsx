import React,{Component} from 'react';
import {Grid,Paper} from '@material-ui/core';


const styles = {
    paper: {marginTop:10, marginBottom:10, padding:30}
};

export default class Content extends Component{
    /* 2020-01-26 10:39:10
    Grid 是一个布局类，可以成为 “容器” 或者 “容器的单项item”，
    只需要在声明 Grid 对象的时候表明：container 或 item 即可，例如：
    <Grid container></Grid>  //表明此Grid组件是容器，里面要放有 <Grid 单项item />
    <Grid item></Grid> //明此Grid组件是item单项，此item要放在 <Grid 容器container />中


    Material design 外边距和列遵循 ** 8px ** 的方块形基线栅格
    1.spacing 属性设置为一个在 0 和 10 之间的整数，且并包括 0 和 10。
    默认情况下，两个网格项之间的间距遵循这样的线性函数： output(spacing) = spacing * 8px，
    例如 spacing={2} 会创建一个 16px 的宽间距。
    2.有五个网格断点：xs，sm，md，lg 和 xl
    //为了获得最佳的用户体验，material design 的接口需要在各种断点范围下自适应布局需要。
    sm 小：600px

    *  */

    // 我是jsx代码中的注释    {/*  */}
    render(){
        return(
            //<Grid container></Grid>  //表明此Grid组件是容器，里面要放有 <Grid 单项item />
            <Grid container spacing={2}>   {/* spacing={2} 会创建一个 16px 的宽间距 */}
                <Grid item sm> {/* <Grid item></Grid> //明此Grid组件是item单项，此item要放在 <Grid 容器container />中 */}
                    {/* <Paper />组件：在屏幕上展现了纸张的物理属性
                    应用程序的的背景类似纸张一样平坦、不透明，
                    而其行为也像纸张一样，能够改变大小、与其他纸张绑定或者调换顺序。
                    */}
                    <Paper style={styles.paper}>
                        left
                    </Paper>
                </Grid>
                <Grid item sm>
                    <Paper style={styles.paper}>
                        right
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}
