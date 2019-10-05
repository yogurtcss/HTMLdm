import React from 'react'
import ReactDOM from 'react-dom' //提示react-dom未安装？？ npm install react-dom -g
import App from './component/app.jsx'
import './index.css'

ReactDOM.render( <App msgH1="请发表对React的评论嗷" />,
                 document.getElementById('root') );