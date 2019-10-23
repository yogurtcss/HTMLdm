import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import CmtAdd from "../../components/cmt-add/cmt-add";
import CmtList from "../../components/cmt-list/cmt-list";
import { addCmt, deleteCmt, getCmtAsync } from '../../redux/actions';

class App extends Component{
    static propTypes = {
        cmts: PropTypes.array.isRequired,
        addCmt: PropTypes.func.isRequired,
        deleteCmt: PropTypes.func.isRequired,
        getCmtAsync: PropTypes.func.isRequired
    };


    componentDidMount(){ //异步获取cmt——在这里只是显示数组而已
        this.props.getCmtAsync();
    }

    render(){
        return(
            <div>
                <header className="site-header jumbotron">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <h1>请发表对React的评论</h1>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <CmtAdd addCmt={this.props.addCmt} />
                    <CmtList comments={this.props.cmts} deleteCmt={this.props.deleteCmt} />
                </div>
            </div>
        )
    }
};

export default connect(
    state => {
        return { cmts:state } //state就是一个cmts数组
    },

    { addCmt, deleteCmt, getCmtAsync } //注入至App中！！
)( App );