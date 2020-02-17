import React,{Component} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import ReactMCarousel from 'react-m-carousel';

import MyCard from "../preview/my-card-preview";
import {Route, Switch} from "react-router-dom";
import NewsContent from "./news-content";


const useStyles = makeStyles({
    root: {
        display: 'flex',
        width: '100%',
        height:'100%',
    },
    words:{ //banner的文字、页码
        width:"100%",
        position:"absolute",
        bottom:0,
        left:0,
        backgroundColor:"white",
        opacity:0.8,
        font: 200,
    },
    page:{ //页码：绝对定位：固定在最下方
        position:"absolute",
        bottom:0,
        right:1
    },

});
const cardDatas_noContent = [
    /* 2020-02-16 20:37:13
    * 注意，id的值不能是字符串，否则在路由props.match.params中取id值时，造成判断错误而显示不出数据！
    * 如 id:"101" 加了双引号就会导致显示不了数据！
    *  */
    {   id: 101,
        img: "应勇新官上任.png",
        title: "应勇新官上任第一天开了3个会连说16个“战”字",  },

    {   id: 102,
        img: "新闻联播.jpg",
        title: "赞！《新闻联播》疑加急稿 海霞低头念稿12分钟", },

    {   id: 103,
        img: "上海劝返.jpg",
        title: "上海已劝返8220名来沪人员 劝返的标准是什么？",  },

    {   id: 104,
        img: "中央指导组.jpeg",
        title: "中央：发起武汉保卫战、湖北保卫战全面总攻",  },
];

export default function PreviewContent(props){
    const classes = useStyles();
    return(
        <Grid  container direction="column" justify="center" alignItems="stretch">

            <Grid Item>
                <ReactMCarousel auto={3000} loop style={{zIndex:"-1",overflow:"hidden"}} responsive={40}>
                    {
                        cardDatas_noContent.map( (oneCardData,index)=>(
                            <div>
                                <img src={require(`../../assets/images/cards/${oneCardData.img}`)} alt="啊啊" className={classes.root}/>
                                <span className={classes.words}>
                                    {/* 这里的短标题，使用了 img图片名称 去掉了文件名后缀！
                                        (oneCardData.img) .split(".")[0]
                                        根据 "."点号分割为字符串数组：[ "中央指导组", ".jpeg" ]
                                        则第0个元素就是我们要的短标题！
                                    */}
                                    <span style={{marginLeft:4}}>{oneCardData.img.split(".")[0]}</span>
                                </span>
                                <span className={classes.page}>
                                    <span style={{marginRight:4}}>{index+1}/5</span>
                                </span>
                            </div>
                        ) )
                    }
                </ReactMCarousel>

                <MyCard />
            </Grid>

        </Grid>
    )


}
