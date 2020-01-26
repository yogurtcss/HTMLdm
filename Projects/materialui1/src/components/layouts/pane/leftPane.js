import React, {Component} from 'react';
import {Paper,Typography,List, ListItem, ListItemText} from "@material-ui/core";

/*
<Typography />组件：活版印刷，清晰展示字体
<Typography variant样式="h1" component="h2">
  h1. Heading
</Typography>
*  */


//pane 窗玻璃；窗格；嵌板；
export default class LeftPane extends Component{ //left pane 左窗格
    render(){
        const {styles} = this.props; //外部传来的属性props：样式styles
        const {newData} = this.props;
        /* newData 数据结构为： 
        [ //map遍历每一个子数组curr：
            [ 下标为0--"项目一",  下标为1--[ {id:"1", title:"1-01", detail:"明细1", mainData:"项目一"}, {id:"2", title:"1-02", detail:"明细2", mainData:"项目一"} ]  ],
            [ 下标为0--"项目二",  下标为1--[ {...},{...} ]     ],
            [ 下标为0--"项目三",  下标为1--[ {...},{...} ]     ]
        ]
        *  */

        return(
            <Paper style={styles.paper}>
                {   //Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组，转换后才能使用 map()方法！
                    newData.map( (curr,index)=>(
                        <div key={'main'+index} >
                            {/* <Typography />组件：活版印刷，清晰展示字体
                            注意看newData 数据结构！curr[0]恰好是编号名
                            */}
                            <Typography variant="h6" key={'m'+index}> {curr[0]} </Typography>
                            <List key={'L'+index}>
                                { //注意看newData 数据结构，curr[1] 还是一个有东西的数组！
                                    curr[1].map( (every,i)=>(
                                        <ListItem
                                            key={'LL'+i}
                                            button
                                            onClick={handleDetail}
                                        >
                                            <ListItemText key={'LLL'+i}>
                                                {every.title}
                                            </ListItemText>
                                        </ListItem>
                                    ) )
                                }
                            </List>
                        </div>
                    ) )
                }
            </Paper>
        )
    }
}
