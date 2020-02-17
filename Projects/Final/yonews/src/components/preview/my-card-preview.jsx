import React from 'react';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom'; //路由

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea'; //卡片点击特效
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
//2020-02-15 10:35:51
import Grid from '@material-ui/core/Grid'; //响应式布局Grid：纵向排列Card卡片
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles({
    grid: { // <Card />组成的 <Grid />的最外围：上边的外边距为10
        marginTop: 10
    },
    gridItem: { //网格中每个item相隔的距离
        marginBottom: 10
    },

    root: {
        minWidth: 275,
        position: "relative", // position: "relative", 开启相对定位，作为 cardContentBottom底部文字的参考原点！
    },

    // cardContent:{      //卡片正文的样式
    //     paddingTop:2,
    //     paddingBottom:2,
    //     paddingRight:10
    // },
    // <CardContent />的样式必需使用 style={...} 这样才能实现我想要的效果，
    // 使用 className 还是不够完美！

    cardMedia: { //卡片图片
        width: 120,
        height: 100,
        float: 'left',
    },
    cardContentTitle: { //卡片正文的标题样式
        fontSize: 15,
    },
    cardContentBottom: { //卡片正文的底部：共同的样式(字号，内外边距)，区别只是向左向右浮动
        position: 'absolute', //底部文字设置为 绝对定位，以父元素 <Card />为参考的原点
        bottom: 3, //底部文字统一靠在底部；“更新时间”另外单独设置right属性
        marginBottom: 0,
        paddingBottom: 0,
        fontSize: 10,
    },
});


const cardDatas_noContent = [
    /* 2020-02-16 20:37:13
    * 注意，id的值不能是字符串，否则在路由props.match.params中取id值时，造成判断错误而显示不出数据！
    * 如 id:"101" 加了双引号就会导致显示不了数据！
    *  */
    {   id: 101,
        img: "应勇新官上任.png",
        title: "应勇新官上任第一天开了3个会连说16个“战”字",
        from: "新京报",
        time: "2020-02-15 14:20:12", },

    {   id: 102,
        img: "新闻联播.jpg",
        title: "赞！《新闻联播》疑加急稿 海霞低头念稿12分钟",
        from: "网易娱乐专稿",
        time: "2020-02-15 14:23:54", },

    {   id: 103,
        img: "上海劝返.jpg",
        title: "上海已劝返8220名来沪人员 劝返的标准是什么？",
        from: "第一财经日报",
        time: "2020-02-15 14:23:54", },

    {   id: 104,
        img: "中央指导组.jpeg",
        title: "中央：发起武汉保卫战、湖北保卫战全面总攻",
        from: "央视新闻客户端",
        time: "2020-02-15 14:23:54", },
];


function MyCard(props) {
    const classes = useStyles();

    const handleClick= (id)=>{
        props.history.push(`/newsContent/${id}`);
    };


    return (
        /* 2020-02-15 11:54:21
        * <Grid />组件中的 alignItems="stretch" 可随页面而伸展
        * <Card />组成的 <Grid />的最外围：上边的外边距为10
        *
        * 2020-02-15 14:20:28
        * 卡片<Card />布局设计
        *
        * 2020-02-16 19:54:02
        * 第一次尝试动态数据cardDatas.map
        * require(`模板字符串-变量`) 绝活！
        * 向回调函数中传参数！()=>handleClick(oneCardData.id)
        *  */
        <Grid container direction="column" justify="center" alignItems="stretch" className={classes.grid} >
            {
                cardDatas_noContent.map( (oneCardData,index)=>(
                    <Grid item className={classes.gridItem} key={oneCardData.id}>
                        <Card className={classes.root} onClick={()=>handleClick(oneCardData.id)} >
                            <CardActionArea>
                                <CardMedia
                                    className={classes.cardMedia}
                                    component="img"
                                    image={require(`../../assets/images/cards/${oneCardData.img}`)}
                                    title={oneCardData.title}
                                />

                                {/* CardContent 卡片正文，
                                paddingBottom:0 使得 “来源、更新时间”可以贴到底部
                                paddingRight:0 使得“更新时间”可以浮动到最右边
                                marginLeft:100 与 卡片图片相隔的距离

                                <CardContent />的样式必需使用 style={...} 这样才能实现我想要的效果，
                                使用 className 还是不够完美！
                                */}
                                <CardContent style={{paddingTop:10,paddingBottom:2,paddingRight:10,marginLeft:110}} >
                                    <Typography className={classes.cardContentTitle} color="h1" component="h2">
                                        {oneCardData.title}
                                    </Typography>
                                    <Typography className={classes.cardContentBottom}  color="textSecondary" >
                                        {oneCardData.from}
                                    </Typography>
                                    {/* 底部文字统一靠在底部；“更新时间”另外单独设置right属性:5 */}
                                    <Typography className={classes.cardContentBottom}  color="textSecondary" style={ {right:5} } >
                                        {oneCardData.time}
                                    </Typography>

                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ) )
            }

        </Grid>
    );
}

export default withRouter(MyCard);
