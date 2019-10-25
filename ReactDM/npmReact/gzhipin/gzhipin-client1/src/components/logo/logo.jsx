/* 简单显示Logo的组件
* 因为没有用到状态，没有任何交互
* 所以用工厂函数组件
*
*  */

import React from 'react';
import logo from './logo.png';
import './logo.less';

export default function Logo(){
    return(
        <div className="logo-container" >
            <img src={logo} alt="logo" className='logo-img' />
        </div>
    )
}

