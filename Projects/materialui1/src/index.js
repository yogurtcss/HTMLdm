import React from 'react';
import ReactDOM from 'react-dom';

//相对路径：必须以 .（当前目录） 或者 ..（返回至上一级目录） 开头
import App from "./components/app.jsx";

ReactDOM.render(<App />, document.getElementById('root'));

