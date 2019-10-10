import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../css/onediv.css';

export default class OneDiv extends Component{
    static propTypes = { //类的静态属性嗷
        avatar_url: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired,
        html_url: PropTypes.string.isRequired,
        mapKey: PropTypes.any //任意类型
    };

    render(){
        /* 将图像宽度和高度分别设置为 200 像素
        * <img src="/i/mouse.jpg" height="200" width="200" />
        *  */
        return(
            <div className="onediv" key={this.props.mapKey}>
                <img src={this.props.avatar_url} alt={this.props.login} width="100" />
                <div>
                    <a href={this.props.html_url} target="_blank"> {this.props.login} </a>
                </div>
            </div>
        )
    }
}
