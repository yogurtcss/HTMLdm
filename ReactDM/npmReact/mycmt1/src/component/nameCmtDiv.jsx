import React, {Component} from 'react';
import PropTypes from 'prop-types';


//组件名首字母必须大写！！这样在别的App组件中才能正确渲染出来
export default class NameCmtDiv extends Component{
    constructor(props){
        super(props);
    };



    render(){
        return(
            <div className="oneCmp"  >
                <button className="delete" onClick={this.props.deleteDiv} > 删除 </button>
                <p className="sbSaid" > {this.props.Uname} </p>
                <p className="sbMsg" > {this.props.Ucmt} </p>
            </div>
        )
    }
}

