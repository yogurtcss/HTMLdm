// module.exports = function override(config, env) {
//     // do stuff with the webpack config...
//     return config;
// };

//以上的内容要删掉啊！

const { override, fixBabelImports,addBabelPlugins } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        //style: 'css',  //加上这句话，会覆盖material ui的样式：导致点击、滑动屏幕失效，我佛了
    }),

);
