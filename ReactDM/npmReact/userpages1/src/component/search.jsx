import React, {Component} from 'react';

export default class Search extends Component{
    constructor(props){
        super(props);
    }
    handleOnclick=() => {
        const sth = this.input.value.trim();
        this.props.getValueFromChild( sth );
    };


    render(){
        return(
            <div className="header">
                <h3>Search Github Users</h3>
                <div>
                    <input type="text" placeholder="Search for somebody"
                        ref={ currInput => {return this.input=currInput} }  />&nbsp;

                    <button onClick={this.handleOnclick} >Search</button>
                </div>
            </div>
        )
    }

}