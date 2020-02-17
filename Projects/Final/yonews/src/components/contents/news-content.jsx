import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import Slide from '@material-ui/core/Slide';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';  //要加后缀ICON
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import StarIcon from '@material-ui/icons/Star'; //收藏的星标
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


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


const cardDatas_Content = [
    /* 2020-02-16 20:37:13
    * 注意，id的值不能是字符串，否则在路由props.match.params中取id值时，造成判断错误而显示不出数据！
    * 如 id:"101" 加了双引号就会导致显示不了数据！
    * 可以尝试以下加个双引号！ id:"101"
    *  */
    {   id: 101,
        img: "应勇新官上任.png",
        title: "应勇新官上任第一天开了3个会连说16个“战”字",
        from: "新京报",
        time: "2020-02-15 14:20:12",
        content: "我是正文1",  },

    {   id: 102,
        img: "新闻联播.jpg",
        title: "赞！《新闻联播》疑加急稿 海霞低头念稿12分钟",
        from: "网易娱乐专稿",
        time: "2020-02-15 14:23:54",
        content: "我是正文2",  },

    {   id: 103,
        img: "上海劝返.jpg",
        title: "上海已劝返8220名来沪人员 劝返的标准是什么？",
        from: "第一财经日报",
        time: "2020-02-15 14:23:54",
        content: "我是正文3",   },

    {   id: 104,
        img: "中央指导组.jpeg",
        title: "中央：发起武汉保卫战、湖北保卫战全面总攻",
        from: "央视新闻客户端",
        time: "2020-02-15 14:23:54",
        content: "我是正文4", },
];

function MyNewsContent(props) {
    const classes = useStyles();

    const back= ()=>{ //返回
        props.history.goBack();
    };

    const {id} = props.match.params; //从路由中取出id值

    const cardData_fitRouteId = cardDatas_Content.find(
        (oneCardData) => (oneCardData.id===id*1)
    );

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
                        {/* News Content与左箭头相隔50 */}
                        <Typography variant="h6" style={{position:"absolute",left:50}}>News Content</Typography>
                        {/* 收藏按钮 */}
                        <IconButton
                            className={classes.button}
                            aria-label="Star"
                            size="medium"
                            style={{position:"absolute",right:0}}
                        >
                            <StarIcon />
                        </IconButton>

                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            <Toolbar id="back-to-top-anchor" />

            <Container className={classes.content}>
                <Typography variant="h5"  >
                    {cardData_fitRouteId.title}
                </Typography>
                {/* 正文的内边距是10,这里绝对定位的偏移量为10,正好与正文标题对齐 */}
                <Typography variant="caption" color="textSecondary" style={{position:"absolute",left:10,bottom:-30}} >
                    {cardData_fitRouteId.from}
                </Typography>
                <Typography variant="caption" color="textSecondary" style={{position:"absolute",right:10,bottom:-30}}>
                    {cardData_fitRouteId.time}
                </Typography>
            </Container>
            <Container style={{marginTop:50}} className={classes.content}>
                <Typography>
                    {cardData_fitRouteId.content}
                </Typography>
            </Container>


            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </React.Fragment>
    );
}

export default withRouter(MyNewsContent);
