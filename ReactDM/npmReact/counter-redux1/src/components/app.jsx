import React, {Component} from 'react';

import {INCREMENT,DECREMENT} from "../redux/action-type";
import * as actions from '../redux/actions'

export default class App extends Component{

    add=() => {
        const number = this.select.value*1;
        /* 通过store分发(触发)事件:dispatch( 某类action )
        * 这里actions.increment(number)，即类别为increment的事件action，
        * 传入数据data为number
        *
        * 使用 dispatch (action) 方法更新 state
        *  */
        this.props.store.dispatch( actions.increment(number) ); //提交更新操作
    };
    minus=() => {
        const number = this.select.value*1;
        this.props.store.dispatch( actions.decrement(number) );
    };
    addOdd=() => {
        const number = this.select.value*1;
        const count = this.props.store.getState();
        if( count%2!==0 ){
            this.props.store.dispatch( actions.increment(number) );
        }
    };
    addAsync=() => {
        setTimeout(
            () => {
                const number = this.select.value*1;
                this.props.store.dispatch( actions.increment(number) );
            },1000
        )
    };


    render(){
        return(
            <div>
                <p> click {this.props.store.getState()} times </p>
                <div>
                    {/*获得select框内的值：ref*/}
                    <select ref={ curr => this.select=curr } >
                        <option value='1' >1</option>
                        <option value='2' >2</option>
                        <option value='3' >3</option>
                    </select> &nbsp;
                    <button onClick={this.add} > + </button> &nbsp;
                    <button onClick={this.minus} > - </button> &nbsp;
                    {/*当前数字为奇数时，才增加*/}
                    <button onClick={this.addOdd} > increment if odd </button> &nbsp;
                    {/*异步增加*/}
                    <button onClick={this.addAsync} > increment if async </button> &nbsp;
                </div>
            </div>
        )
    }

}