import React,{Component} from 'react';
import { Carousel } from 'antd';

import './carousel.css';
import MyCard from "./MyCard";

export default class PreviewContent extends Component{

    render(){
        return(
            <div>
                <Carousel autoplay  >
                    <div style={{display:'inline-block',width:'100%',height:'100%'}}>
                        <img src={require("../../assets/images/cards/上海劝返.jpg")}  alt="上海劝返"/>
                    </div>
                    <div>
                        <img src={require("../../assets/images/cards/sword.jpg")}  alt="上海劝返"/>
                    </div>
                    <div>
                        <img src={require("../../assets/images/cards/中央指导组.jpeg")}  alt="上海劝返"/>
                    </div>
                    <div>
                        <img src={require("../../assets/images/cards/新闻联播.jpg")}  alt="上海劝返"/>
                    </div>
                </Carousel>



                <MyCard/>
            </div>

        )
    }

}
