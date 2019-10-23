import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'; //引入connect后，要使用怪异的写法！

/* 如果最末尾用到了 connect()(App)
* 为原App注入props，成为新的App，并暴露之：
* export default connect( mapStateToProps,mapDispatchToProps )(App)
* 所以在类 class Counter的一开始，不要export default class App！
*  */
export default class Counter extends Component{
    static propTypes = { //若我传入了这3个东西，则我就不需要用到this.props.store这东西啦
        //接收的数据
        count: PropTypes.number.isRequired,
        //两个行为action
        increment: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired,
        //P42 redux异步编程
        incrementAsync: PropTypes.func.isRequired
    };

    add=() => {
        const number = this.select.value*1;
        this.props.increment( number );// 创建increment的事件对象，后面通过connect连接redux
    };
    minus=() => {
        const number = this.select.value*1;
        this.props.decrement( number );
    };
    addOdd=() => {
        const number = this.select.value*1;
        const count = this.props.count; //通过props获得当前的状态
        if( count%2!==0 ){
            this.props.increment( number )
        }
    };
    addAsync=() => {
        const number = this.select.value*1;
        this.props.incrementAsync( number );
    };

    render(){
        return(
            <div>
                <p> click {this.props.count} times </p>
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

/*  export default connect( mapStateToProps, mapDispatchToProps )( 待注入props的UI组件 )
* 转移到 app.jsx中了，react和redux的耦合度更低
*  */

