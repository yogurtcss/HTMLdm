import React, {Component} from 'react';

import CmtAdd from "../cmt-add/cmt-add";
import CmtList from "../cmt-list/cmt-list";

export default class App extends Component{
    state = {
      comments: [
          { Uname:'Tom', Ucmt:'lala' },
          { Uname:'Jack', Ucmt:'ahaha' }
      ]
    };

    //给CmtAdd修改app状态的权限 的函数
    addCmt=(oneCmt) => { //传入参数为一条评论oneCmt。把这函数传递给CmtAdd时，不是立即调用所以不用传形参！
        this.state.comments.unshift( oneCmt ); //增加
        this.setState( this.state ); //提交状态
    };
    deleteCmt=(index) => { //给CmtItem的删除的函数，传递路径：app - CmtList - CmtItem，目前只能逐层传递
        this.state.comments.splice( index, 1 );//传入参数为 被删除元素的下标，数组的方法splice
        this.setState( this.state );
    };

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
                    <CmtAdd addCmt={this.addCmt} />
                    <CmtList comments={this.state.comments} deleteCmt={this.deleteCmt} />
                </div>
            </div>
        )
    }
}