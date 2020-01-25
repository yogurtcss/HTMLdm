import React,{Component} from 'react';
import {Tabs,Tab,} from '@material-ui/core';

export default class Footer extends Component{

    render(){
        return(
            <Tabs
                value={0} //固定选中某个选项，下标从0开始
                variant="fullWidth" //100% 宽度
                centered  //居中对齐
                aria-label="simple tabs example">
                <Tab label="Item One"  />
                <Tab label="Item Two"  />
                <Tab label="Item Three"  />
            </Tabs>
        )
    }
}
