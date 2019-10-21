import React from 'react';
import ReactDOM from 'react-dom';

import App from "./components/app";
import store from './redux/store.js';

function render(){ //声明渲染的操作
    //将store传给App组件
    ReactDOM.render( <App store={store} />,document.getElementById('root') );
}

render(); //初始化渲染

/* Store 允许使用 store.subscribe 方法设置监听函数，
* 一旦 State 发生变化，就自动执行这个函数。
* 显然，只要把 View 的更新函数（对于 React 项目，
* 就是组件的 render 方法或 setState 方法）放入store.subscribe()中 ，
* 就会实现 View 的自动渲染。
*  */
store.subscribe( render );
