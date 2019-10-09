/* 用于show出来的每一个div */
import React, {Component} from 'react';

export default class Onediv extends Component{
    render(){
        return(
            <div className="oneDiv" >
                <img src={this.props.avatar_url} alt={this.props.login} />
                <a href={this.props.html_url}>{this.props.login}</a>
            </div>
        )
    }
}