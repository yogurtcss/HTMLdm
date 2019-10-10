import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../css/search.css'
export default class Search extends Component{
    static propTypes = {
        changeState: PropTypes.func.isRequired
    };
    handleCilck=() => {
        this.props.changeState( this.input.value.trim() ); //将输入框的值，更新到父组件App中
    };

    render(){
        return(
            <div className="search">
                <h3>Search for Github Users</h3>
                <input type="text" placeholder="Please input sth to search"
                 ref={ currInput => this.input=currInput }   />&nbsp;
                <button onClick={this.handleCilck} >Search</button>
            </div>
        )
    }
}