//包含n个工具函数的模块

/* ----------2019-11-02 15:31:08 动态计算跳转路由---------- */
/* redirectTo有4个路由去向
*   2类用户(dashen/laoban)，每类用户有2种情况( 信息已完善/未完善 )
*
* 动态计算（判断）跳转路由之条件
*   -判断用户类型： user. type
*   -判断此用户是否已经完善信息： user.header是否有值
*  */
export function getRedirectTo( type,header ){ //返回对应的路由路径
    let path = ''; //最终跳转到的路由路径

    if( type==='laoban' ){ //判断type
        path = '/laoban';
    }
    else{
        path = '/dashen';
    }

    if( !header ){ //如果header没有值：即 !header为真，则跳转至信息完善界面
        path = path + 'info';
    } //没有else了：用户信息完善了就直接跳转到 用户主界面/dashen或/laoban

    return path;
};
