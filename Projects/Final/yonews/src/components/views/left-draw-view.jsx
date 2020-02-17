import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import QueueIcon from '@material-ui/icons/Queue'; //频道 图标
import RestoreIcon from '@material-ui/icons/Restore'; //历史 图标
import BookmarksIcon from '@material-ui/icons/Bookmarks'; //收藏 图标
import SettingsIcon from '@material-ui/icons/Settings'; //设置 图标
import EcoIcon from '@material-ui/icons/Eco'; //关于 图标

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"; //滑动抽屉

import {withRouter} from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}));

function MyHeaderWithLeftDrawer(props) { //基于 Persistent drawer 改造的
    const classes = useStyles();

    const currListItemText = "";

    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const handleClick=  (oneTab)=>{
        props.history.push(`/leftDrawContent/${oneTab}`);
    };


    const toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                { ['channel','history', 'collection', 'settings'].map( (oneTab,textIndex)=>(
                    // 动态生成 <ListItem />标签，使得channel等文本能以 “变量”oneTab 形式存在，
                    // 这样，onClick单击响应函数就能使用 文本的 “变量”了！进而可以用来标识路由路径！
                    // props.history.push(`/leftDrawContent/${oneTab}`);
                    <ListItem button key={oneTab} onClick={()=>(handleClick(oneTab))}>  {/* 太妙了！text变量装着文本，可以用来标识路由路径！ */}
                        <ListItemIcon>
                            {/* 文本数组与图标数组 下标是一一对应的关系：文本数组[0] 对应的图标为 图标数组[0] */}
                            { [<QueueIcon/>,<RestoreIcon/>,<BookmarksIcon/>,<SettingsIcon/>].map( (oneIcon, iconIndex)=>{
                                if( textIndex===iconIndex ){ //当文本下标==图标的下标时，就返回这个图标
                                    return oneIcon;
                                }
                            } ) }
                        </ListItemIcon>
                        <ListItemText primary={oneTab} />
                    </ListItem>
                ) ) }
            </List>
            <Divider />
            <List>
                { ['about'].map( (oneTab,index)=>(
                    <ListItem button key={oneTab} onClick={()=>(handleClick(oneTab))} >
                        <ListItemIcon>
                            { [<EcoIcon/>].map( (oneIcon, index1)=>{
                                if( index===index1 ){
                                    return oneIcon;
                                }
                            } ) }
                        </ListItemIcon>
                        <ListItemText primary={oneTab} />
                    </ListItem>
                ) ) }
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer('left', true)}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/* 2020-02-14 17:39:56
                    解决引入 ant design后，material ui中的样式字体 Yo News 变黑的问题：
                    手动加入样式 style={ {color:"white"} }
                    */}
                    <Typography variant="h6" noWrap style={ {color:"white"} }>
                        Yo News
                    </Typography>
                </Toolbar>

            </AppBar>


            <SwipeableDrawer
                open={state.left}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {sideList('left')}
            </SwipeableDrawer>


            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />

            </main>
        </div>
    );
}

export default withRouter(MyHeaderWithLeftDrawer);
