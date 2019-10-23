import React, {Component} from 'react';
import PropTypes from 'prop-types';


export default class CmtAdd extends Component{ //CommentAdd，我缩写辣
    state = { //受控组件的状态，
        /* 注意到这里state的属性名
        * 与父组件的state.comments中属性名 相同，
        * 方便直接更新父组件状态
        *  */
        Uname: '',
        Ucmt: ''
    };

    static propTypes = { //接收父组件的增加的 权限函数
        addCmt: PropTypes.func.isRequired
    };

    handleUname=(event) =>{ //把Uname更新到受控组件的state中
        const Uname = event.target.value.trim(); //trim()去空格
        this.setState( {Uname} ); //对象的解构赋值法
    };
    handleUcmt=(event) =>{ //把Ucmt更新到受控组件的state中
        const Ucmt = event.target.value.trim();
        this.setState( {Ucmt} ); //对象的解构赋值法
    };
    handleSubmit=() => {
        const cmts = this.state; //收集state
        this.props.addCmt( cmts ); //更新父组件的状态

        //清除输入状态：将状态置为空
        this.setState( { Uname:'', Ucmt:'' } );
    };

    render(){// value为 标签input、textarea元素的值，将value的值设置为状态中的值，这样才能正确显示
        return(
            <div className="col-md-4">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label>用户名</label>
                        <input type="text" className="form-control" placeholder="用户名" value={this.state.Uname}
                               ref={ (currInput)=>this.inputUname=currInput }
                               onChange={ this.handleUname }   />
                    </div>
                    <div className="form-group">
                        <label>评论内容</label>
                        <textarea className="form-control" rows="6" placeholder="评论内容" value={this.state.Ucmt}
                                  ref={ (currInput)=>this.inputUcmt=currInput }
                                  onChange={ this.handleUcmt }  />
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="button" className="btn btn-default pull-right"
                                    onClick={this.handleSubmit}>提交</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}