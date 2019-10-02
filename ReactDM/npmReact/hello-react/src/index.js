//入口JS，渲染的嗷
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import App from './component/app.jsx'
import './index.css'

//get谁的ID？public中 index.html 中的真实DOM容器！！
ReactDOM.render( <App />, document.getElementById('root') );