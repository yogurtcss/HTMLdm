import Header from './header.jsx';
import Footer from './footer.jsx';
import Content from './content.jsx';

/* 2020-01-25 21:51:19 复习
ES6 中 export 和 import 一般的用法有两种
命名导出（Named exports）
默认导出（Default exports）

命名导出（Named exports）
就是每一个需要导出的数据类型都要有一个 name，统一引入一定要带有 {}，
(即便只有一个需要导出的数据类型时，也要带有{} )
这种写法清爽直观，是推荐的写法。

//------ lib.js ------
const sqrt = Math.sqrt;
function square(x) {
    return x * x;
}
function diag(x, y) {
    return sqrt(square(x) + square(y));
}
//按名字name，导出这3个东西：
export {sqrt, square, diag}

*  */

//导出集中导出这两个东西 Header、Footer组件
export {Header, Footer, Content};
