import React, {Component} from 'react';
import {Paper} from "@material-ui/core";

//pane 窗玻璃；窗格；嵌板；
export default class RightPane extends Component{ //right pane 右窗格
    render(){
        const {styles} = this.props; //外部传来的属性props：样式styles
        return(
            <Paper style={styles.paper}>
                Right
            </Paper>
        )
    }
}
