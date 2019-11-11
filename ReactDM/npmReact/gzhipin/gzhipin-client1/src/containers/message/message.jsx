//消息主界面路由容器组件

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Badge} from 'antd-mobile';
/* Badge 徽标数，即图标右上角的圆形徽标数字。
* 一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，
* 通过醒目视觉形式吸引用户处理。
*  */

const Item = List.Item;
const Brief = Item.Brief;




class Message extends Component{

    /* 我定义在此类中，需要用this.getLastMsgs调用之
    * 对chatMsgs 按chat_id进行分组，并得到 由每个分组的lastMsg 组成的数组
    * 1.找出每个会话的lastMsg，并用一个对象容器来保存{chat_id, lastMsg}
    * 2.得到所有lastMsg的数组
    * 3.对数组进行排序(按create_time降序)
    *  */
    getLastMsgs=  (chatMsgs)=>{
        //1.找出每个会话的lastMsg，并用一个对象容器来保存{属性名chat_id : 属性值lastMsg}
        const lastMsg_obj = {};

        chatMsgs.forEach( oneMsg=>{
            /* 找出最晚(最新)的消息lastMsg，并显示在页面上
            *
            * 注意到：在同一个会话中，我发给对方的 每条msg的chat_id都是相同的( chat_id都是 from_to 结构 )
            * 我发的某条msg有可能已在 lastMsg_obj中，也可能不在，需判断；
            *
            * 根据chat_id索引：当我发的某条msg不在lastMsg_obj中时，则此条msg即“转正”成为 正式的lastMsg，(并显示在页面上)
            * 根据chat_id索引：当我发的某条msgA已在lastMsg_obj中时，则需比较 已有的上一条lastMsg 与 当前此消息msgA 的创建时间，
            * 谁创建时间最晚的(最新的)，谁就转正成为正式的lastMsg
            *  */
            //得到其中某条消息oneMsg的chat_id
            const oneMsg_chatId = oneMsg.chat_id;
            //根据oneMsg_chatId，尝试在lastMsg_obj中索引查找
            let lastMsg_possible = lastMsg_obj[oneMsg_chatId]; //可能存在的、试探性的lastMsg_possible，不确定，需判断

            if( !(lastMsg_possible) ){ //如果不存在此 试探性的lastMsg
                /* 排雷！又排了一个小时！
                * 2019-11-11 12:15:55
                *  lastMsg_obj[oneMsg_chatId] = lastMsg_possible ，这样写是错的！
                * */
                lastMsg_obj[oneMsg_chatId] = oneMsg; //则 使此消息oneMsg“转正”，成为正式的latMsg，保存至lastMsg_obj
            }
            else{ //否则，即此试探性的lastMsg是确实存在的，用lastMsg_really_old标识一哈
                /* 其实可以不用另外赋值给新变量lastMsg_really_old的，下文直接用 lastMsg_possible (心里默认它是really、old的即可)
                * 但我这样 见名知意， 手动标识为 确实存在的really、且是 上一条的、旧的(old)，就更明白一些
                *  */
                let lastMsg_really_old = lastMsg_possible; //用lastMsg_really_old标识一哈
                //比较 两条消息的创建时间。
                if(  (oneMsg.create_time)>(lastMsg_really_old.create_time)  ){ // 如果当前这条消息创建得晚的
                    lastMsg_obj[oneMsg_chatId] = oneMsg; //你就转正喽
                }
            }
        } );

        /* 2.得到所有lastMsg的数组
        *
        * Object.values(某个obj) 返回一个数组，其数组元素是在对象obj上找到的可枚举属性值。
        * 属性的顺序与通过手动循环对象的属性值所给出的顺序相同。
        * 人话：把对象obj中的所有属性值(作为数组元素) 按原顺序 生成一个数组，返回值为数组
        *  */
        const lastMsgs_array = Object.values( lastMsg_obj );

        //3.对所得的 各个不同分组的lastMsg 的数组， 按create_time降序 排序
        lastMsgs_array.sort( (m1,m2)=>{ //自定义的 比较函数，按此函数进行排序。数组.sort()类似于冒泡排序
            /* sort中的自定义比较函数：传入形参为 数组中的某两个元素；
            * sort方法 是根据自定义比较函数的返回值return 来排序的
            *
            * ans结果 = m2创建时间-m1创建时间
            * 如果 ans<0，说明m1时间大(即创建时间晚)，则m1与m2互换位置，使m1排在 较前
            * 如果 ans>0，说明m2时间大(即创建时间晚)，则m2与m1互换位置，使m2排在 较前
            *  */
            return (m2.create_time-m1.create_time)
        } );
        console.log( `我是lastMsg_array嗷：${lastMsgs_array}` );

        return lastMsgs_array; //函数的最后，返回结果为：各个不同分组的lastMsg 按create_time降序 排序完毕的 数组
    };

    render(){
        const {user} = this.props;

        const {users_getNameHeaderByUserId, chatMsgs} = this.props.chat;

        /* 分组显示消息内容：要点如下
        * 1.按不同的chat_id进行分组；
        * 2.显示在页面上的消息时：只显示本会话中最后一条消息
        *  */
        const lastMsgs_array = this.getLastMsgs( chatMsgs );
        // debugger;
        return(
            <List style={{marginTop:50,marginBottom:50}} >
                {/* 关于Badge标签：
                 status 设置Badge为状态点
                 text 在设置了 status 的前提下有效，设置状态点的文本

                 关于List.Item标签：
                 thumb 缩略图 (当为 string 类型时作为 img src)
                 extra 右边内容
                 arrow 箭头方向 (右，上，下),
                   - 可选horizontal,up,down,empty，如果是empty则存在对应的 dom, 但是不显示
                */}

                {/* 对所得的lastMsgs_array，动态显示
                 每个不同分组中的最晚一条消息oneLastMsg_differentGroup

                 */}
                { lastMsgs_array.map( (oneLastMsg_differentGroup)=>{
                    /* 在此 最后(最晚)发送的消息中，谁是最后一个发消息的？(谁是最后的消息接收者?)
                    *
                    * 最后的消息接收者(to)是我，那么显示发消息的人的头像——对方from头像；
                    * 最后的消息接收者(to)是他人， 那么显示发消息的人的头像——我被设定为不显示头像！那就显示对方to的头像
                    *
                    * from：他人； to：我
                    *
                    * from:我； to：他人
                    *
                    * */

                    const targetUserId = (oneLastMsg_differentGroup.to===user._id)? (oneLastMsg_differentGroup.from):(oneLastMsg_differentGroup.to);
                    //获得目标用户的信息嗷
                    const targetUser = users_getNameHeaderByUserId[targetUserId];

                    return(
                        <Item key={oneLastMsg_differentGroup._id}
                              extra={<Badge text={0} />}
                              thumb={ targetUser.header? require(`../../assets/images/${targetUser.header}.png`):null } //可能妹有头像，需判断嗷，三目运算符
                              arrow='horizontal'
                              onClick={ ()=>this.props.history.push(`/chat/${targetUserId}`) }  >
                            {/* 点击具体某个item，进入消息详情：路由路径为/chat/目标ID 即targetUserid */}
                            {oneLastMsg_differentGroup.content}
                            <Brief>{targetUser.username}</Brief>
                        </Item>
                    )
                }   )}


            </List>
        )
    }
}

export default connect(
    state => ( {user:state.user, chat:state.chat} ),
    {}
)(Message);
