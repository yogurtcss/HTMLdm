import React, {Component} from 'react';

export default class Message2 extends Component{
    state = {
        msgs:[
            // { id:'1', title:'t1' },
            // { id:'2', title:'t2' },
            // { id:'3', title:'t3' }, 异步显示的
        ]
    };
    componentDidMount(){
        setTimeout(
            ()=>{
                const msgs = [
                    { id:1, title:'msg1' },
                    { id:2, title:'msg2' },
                    { id:3, title:'msg3' }
                ];
                this.setState( {msgs} ); //更新状态
            }, 1000
        )
    }

    render(){
        return(
            <ul>
                { this.state.msgs.map(
                    (onemsg,index) => <li key={index}>  <a href='#'>{onemsg.title}</a>  </li>
                ) }
            </ul>
        )
    }
}