import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';

import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';  //要加后缀ICON
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever'; //
import StarIcon from '@material-ui/icons/Star'; //收藏的星标
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MyCard from "../preview/my-card-preview";


const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    //以下是图标的样式
    button: {
        margin: 0,
        color: "white",
    },
    input: {
        display: 'none',
    },
    content: {
        marginTop: 10,
        padding:10, //正文的内边距
        position: 'relative', //开启定位,为绝对定位做参考
    },

}));

function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = event => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                {children}
            </div>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};


function LeftDrawContent(props) {
    const classes = useStyles();

    const back= ()=>{ //返回
        props.history.goBack();
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar style={{position:"relative"}}>
                        {/* 返回按钮 */}
                        <IconButton
                            className={classes.button}
                            aria-label="ArrowBack"
                            size="medium"
                            style={{position:"absolute",left:0}}
                            onClick={back}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        {/* News Content与左箭头相隔50
                        2020-02-17 11:55:25
                        高阶路由组件withRouter把history、match等属性注入到<LeftDrawContent/>的props中
                        */}
                        <Typography variant="h6" style={{position:"absolute",left:50}}>{props.match.params.oneTab}</Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            <Toolbar id="back-to-top-anchor" />
            <Container className="content" >
                {/* 2020-02-17 12:04:28
                遗留的问题：根据oneTab，显示不同的<MyCard />
                react-state 只有在通用组件上是要用的，

                当然，纯 UI 展示组件啥状态都不需要，
                redux store 通常是放 UI 业务状态的，理解这些基本上就知道怎么用了
                思路：当前页码是数据展示页面，数据<MyCard />应该从 redux中，
                使用 高阶函数connect包装当前content组件， 通过props传数据<MyCard />进来！
                */}
                <MyCard/>
            </Container>

            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </React.Fragment>
    );
}

export default withRouter(LeftDrawContent); //高阶路由组件withRouter把history、match等属性注入到<LeftDrawContent/>的props中
