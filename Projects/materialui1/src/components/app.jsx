import React,{Component} from 'react';
import {Header,Footer,Content} from './Layouts/layout1.js';

export default class App extends Component{

    render(){
        return(
            <div>
                <Header />
                <Content />
                <Footer />
            </div>
        )
    }
}
