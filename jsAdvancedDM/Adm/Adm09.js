/* 回调函数
*  */

/* Cannot set property 'onclick' of null 的问题
* 原因：浏览器先加载完按钮节点才执行的 JS，
* 如果将 JS 代码移到 head 标签，这样先执行JS代码（而按钮节点等其他元素都没加载出来）
* 这样JS代码就会执行出错，所以浏览器就会报错，
* 提示：Uncaught TypeError: Cannot set property 'onclick' of null。
* 解决：为window.onload事件绑定响应函数。——P93 文档的加载
*  */
window.onload = function(){
    document.getElementById('btn').onclick = function() {
        alert( this.innerHTML );
    }
};

//设置定时器
setTimeout(
    function(){
        alert( '我是回调函数！' )
    } ,
    200
);