// import React from 'react'; 不需要这句话了
import {connect} from 'react-redux';

//引入main的路由组件部分
import MainView from "../components/views/main-view.jsx";


export default connect(
    state => {},
    {}
)(MainView);
