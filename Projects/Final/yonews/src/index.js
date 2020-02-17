import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import 'typeface-roboto';

import Main from './containers/main'; //被connect()增强过的<Main />组件
import store from "./redux/store";

import NewsContent from "./components/contents/news-content";
import LeftDrawContent from "./components/contents/left-draw-content";

ReactDOM.render(
    ( <Provider store={store}>
        <BrowserRouter>
            <Switch>
                {/* 在这里注册 所有要跳转的路由! */}
                <Route path="/homePage"  component={Main}/>
                <Route path="/newsContent/:id" component={NewsContent} />
                <Route path="/leftDrawContent/:oneTab" component={LeftDrawContent} />
            </Switch>
        </BrowserRouter>
    </Provider> ),


    document.getElementById("root")
);
