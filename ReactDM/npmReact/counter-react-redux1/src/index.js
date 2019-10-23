import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'; //新增嗷

import App from './containers/app';
import store from './redux/store.js';

/* 引入了Provider后，我不需使用
* store.subscribe(render)来订阅监听了
* 使用 Provider标签来管理App
* */
//必须把store传入给Provider标签，让它来管理App
ReactDOM.render(
    ( <Provider store={store} >
        <App />
    </Provider> ),

    document.getElementById('root')      );
