import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CmtItem from "../cmt-item/cmt-item";
import './cmt-list.css';

export default class CmtList extends Component{
    static propTypes = { //comments是一个数组，元素是对象
        comments: PropTypes.object.isRequired,
        deleteCmt: PropTypes.func.isRequired
    };

    render(){
        /* 传给 <CmtItem />的有：comments数组中的每一个元素，
        * 及数组元素所在的下标 arrIndex，在删除操作时用得着嗷
        * 注意，每个CmtItem都有自己 独有的唯一的arrIndex
        *  */

        /* 注意，最后一步，根据comments的长度，判断是否要显示 暂无评论
        * 用到了 三目运算符
        * block为显示，none为不显示
        *  */
        const display = this.props.comments.length===0 ? 'block':'none';
        return(
            <div className="col-md-8">
                <h3 className="reply">评论回复：</h3>
                <h2 style={{display}}>暂无评论，点击左侧添加评论！！！</h2>
                <ul className="list-group">
                    {
                        this.props.comments.map(
                            (oneCmtObj,index) =>
                                <CmtItem cmtObj={oneCmtObj} key={index} arrIndex={index}
                                         deleteCmt={this.props.deleteCmt}   />
                        )
                    }
                </ul>
            </div>
        )
    }
}