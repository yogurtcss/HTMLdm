import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; //约束


export default class App extends Component{
    constructor( props ){
        super( props );

        //初始状态
        this.state = {
            index: [  ],
            Uname: [  ], //空数组
            Ucmt: [  ],  //空数组

        };

        //改绑this
        this.handIn = this.handIn.bind(this);
        this.delete = this.delete.bind(this);
    };



    handIn(){ //数组.push方法，向数组末尾追加元素
        this.state.Uname.push( this.inputUser.value );
        this.state.Ucmt.push( this.userCmt.value );
        this.state.index.push( this.state.Uname.length ); //按Uname的个数来定下标
        this.setState( this.state );
        console.log( this.state );
    };

    delete(){


    }



    /* <textara></textarea> 长文本输入框，忘记了
    * <textarea className="..."> 添加样式：长和宽！！
    *
    * cmpReply要向右浮动，而我要保持原块级元素user不浮动，
    * 只好让 浮动元素cmpReply放在user前面
    *
    *  *  */
    render(){
        return(
            <div className="app" >
                <div className="title" >
                    {this.props.msgH1}
                </div>

                <div className="main" ref={ (currDiv) => {return this.main=currDiv} } >

                    <div className="user">
                        <h4 className="pUser" >用户名</h4>

                        <input ref={ (currInput)=>{ return this.inputUser=currInput } }
                               className="inputUser" type="text" placeholder="请输入您的用户名" />

                        <h4 className="pUser" >评论内容</h4>

                        <textarea ref={ (currInput)=>{ return this.userCmt = currInput } }
                                  className="userCmt" placeholder="请输入您的评论"  />

                        <button onClick={ this.handIn } className="handIn" >提交</button>
                    </div>


                    <div className="cmpReply" ref={ (currDiv) => {return this.cmpReply=currDiv} } >
                        <p className="head" >评论回复：</p>



                        { this.state.index.map(
                            ( currValue,i ) => {
                                return (
                                    <div className="oneCmp" key={i} ref={ (theDiv) => {return this.delDiv=theDiv} }>
                                        <button className="delete" onClick={this.delete} >删除</button>
                                        <p className="sbSaid"> {this.state.Uname[ currValue-1 ]} </p>
                                        <p className="sbMsg" > {this.state.Ucmt[ currValue-1 ]} </p>
                                    </div>
                                )
                            }
                        ) }

                    </div>



                </div>

            </div>
        )
    }
};
App.propTypes = { //传入的属性，都放进了 this.props 中
    msgH1: PropTypes.string.isRequired

};



