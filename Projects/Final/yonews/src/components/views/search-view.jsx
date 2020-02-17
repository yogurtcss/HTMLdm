import React from 'react';
import {withRouter} from 'react-router-dom'; //2020-02-16 21:30:34
//withRouter高阶组件，使得非路由组件也有路由组件的props属性：history属性可实施跳转

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh'; //刷新按钮，清空搜索结果(实际上只是返回上一级路由而已)

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        //这里不指定宽度width了，使用属性fullWidth
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

function MySearch(props) {
    const classes = useStyles();

    const search=  ()=>{ //点击，搜索
        props.history.push( "/homePage/searchRst" );
    };
    const clear=  ()=>{ //点击，刷新，清空搜索结果(实际上只是返回上一级路由而已)
        props.history.goBack();
    };

    return (
        <Paper component="form" className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="menu">
                <RefreshIcon onClick={clear} />
            </IconButton>
            {/* fullWidth属性：自适应铺满全屏 */}
            <InputBase
                className={classes.input}
                placeholder="Search some news"
                inputProps={{ 'aria-label': 'Search some news' }}
                fullWidth
            />
            <Divider className={classes.divider} orientation="vertical" />
            {/* 以下是点击搜索的“放大镜”按钮，要绑定单击响应函数 */}
            <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                <SearchIcon onClick={search} />
            </IconButton>
        </Paper>
    );
};
export default withRouter(MySearch);
