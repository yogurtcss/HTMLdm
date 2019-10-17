import React, {Component} from 'react';

export default class News extends Component{
    state = {
        news:[ 'n1','n2','n3' ]
    };

    render(){
        return(
            <ul>
                { this.state.news.map(
                    (onenews,index) => <li key={index} >{onenews}</li>
                ) }
            </ul>
        )
    }
}