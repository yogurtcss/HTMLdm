import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';


import App from "./components/app";

//用<BrowserRouter>...</BrowserRouter> 包住 <App />标签
render( <BrowserRouter> <App/> </BrowserRouter>,
    document.getElementById('root')
);