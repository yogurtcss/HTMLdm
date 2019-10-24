// addLessLoader 自定义主题的关键字

/* config-overrides.js中，要复制进来的代码
*
* 主要参考了 antd-mobile中，自定义主题的代码，网址如下：
* https://ant.design/docs/react/use-with-create-react-app-cn
* 在此网页的：
* 	大标题“在 create-react-app 中使用” - “自定义主题” 部分
*
* */

const {override, fixBabelImports,addLessLoader} = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        /* 原本是style : 'css'，
        * 改为 style : true。注意这里的 true 没有单引号！
        * 注意这里的 true 没有单引号！
        * 注意这里的 true 没有单引号！
        *  */
        style: true
    }),
    addLessLoader({
            javascriptEnabled: true,
            modifyVars: {
                "@brand-primary": "#1cae82",
                "@brand-primary-tap": "#1DA57A"
            }
    }),
);


