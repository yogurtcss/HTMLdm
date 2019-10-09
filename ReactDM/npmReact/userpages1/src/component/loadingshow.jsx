import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Onediv from "./onediv";

export default class Loadingshow extends Component{
    constructor(props){
        super(props);
    };

    render(){
        if( this.props.divs.length===0 ){
            return <h3>Please input something to search</h3>
        }
        else{
            return this.props.divs.map(
                (onediv) => onediv
            )
        }
    }


}
