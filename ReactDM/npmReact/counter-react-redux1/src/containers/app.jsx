import React from 'react';
import {connect} from "react-redux";
import {decrement, increment, incrementAsync} from "../redux/actions";

import Counter from '../components/counter'

export default connect(
    state => { //传递一般数据state
        return {count:state}
    },
    //传递函数数据：简洁语法，直接传action对象，或者传多个action方法的对象
    { increment, decrement, incrementAsync }
)( Counter )