import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './cmt-item.css'

export default class CmtItem extends Component{
    static propTypes = {
        cmtObj: PropTypes.object.isRequired,
        arrIndex: PropTypes.number.isRequired, //每个数组元素的下标嗷
        deleteCmt: PropTypes.func.isRequired
    };
    handleClick=() => {
        const { cmtObj,arrIndex,deleteCmt } = this.props; //对象的解构赋值法
        if( window.confirm(`确定删除${this.props.cmtObj.Uname}的评论吗？`) ){ //弹出框，确认吗？
            this.props.deleteCmt( this.props.arrIndex );  //点击时，根据当前点击处的下标，删除该数组元素
        }
    };

    render(){
        /* 在cmt-list中，我已经把每一个cmtObj分给了CmtItem，
        * 现在CmtItem只需 把单个用户的评论 显示出来即可
        *  */
        return(
            <li className="list-group-item">
                <div className="handle">
                    <a href="#" onClick={this.handleClick}>删除</a>
                </div>
                <p className="user"><span>{this.props.cmtObj.Uname}</span><span>说:</span></p>
                <p className="centence">{this.props.cmtObj.Ucmt}</p>
            </li>
        )
    }
}