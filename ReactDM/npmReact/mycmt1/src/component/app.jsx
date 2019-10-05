import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; //约束
import NameCmtDiv from "./nameCmtDiv.jsx";


export default class App extends Component{
    constructor( props ){
        super( props );

        //初始状态
        this.state = {
            nameCmtDivs: []
        };

        //改绑this
        this.handIn = this.handIn.bind( this );
        this.deleteDiv = this.deleteDiv.bind( this );
    };


    handIn(){
        const NewDiv = <NameCmtDiv Uname={this.inputUser.value}
                                   Ucmt={this.userCmt.value}
                                   deleteDiv={this.deleteDiv}  /> ;
        this.state.nameCmtDivs.unshift( NewDiv );
        this.setState( this.state );
        this.inputUser.value = ''; //清空原输入的值
        this.userCmt.value = '';
    };

    // findIndex( value, array ){ //通过数组元素值，找到它所在的下标
    //     for( let i=0, length=array.length; i<length; i++ ){
    //         if( value===array[i] ){
    //             return i;
    //         }
    //         else{
    //             return -1;
    //         }
    //     }
    // };
    // delete( value, array ){ //在array数组中，通过 值value，来删除这个值
    //     let index = this.findIndex( value, array );
    //     if( index>-1 ){
    //         array.splice( index, 1 );
    //     }
    // }

    deleteDiv( event ){ //关键的event！！
        const delBtn = event.target;
        // console.log( event.target ); //谁触发了事件
        // console.log( delBtn.parentElement ); //它的父亲节点
        // console.log( delBtn.nextElementSibling.innerHTML.trim() ); //它的下一个兄弟节点 中的文本值(Uname值)，trim去除空格
        // console.log( this.state.nameCmtDivs[0].props['Uname'] ); // 原状态数组中的Uname值

        //先通过该按钮找到：该按钮所在的div中，它所对应的Uname值
        const deleteMark = delBtn.nextElementSibling.innerHTML.trim();
        let deleteIndex; //删除的标记下标

        // //遍历原来的state数组，查找与之deleteMark标志相同的元素 下标
        for( let i=0, length=this.state.nameCmtDivs.length; i<length; i++ ){
            if( this.state.nameCmtDivs[i].props['Uname']===deleteMark ){ //找到标记相同者
                deleteIndex = i; //返回它的下标
                break; //跳出循环辣
            }
        }
        this.state.nameCmtDivs.splice( deleteIndex, 1 ); //删除这个div
        this.setState( this.state ); //提交更新操作
    };


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
                        { this.state.nameCmtDivs.map(
                            (oneDiv,i) => {

                                return oneDiv }
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



