import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar, List, InputItem,Grid,Icon} from "antd-mobile";

import {sendMsg,readMsg} from '../../redux/actions.js'; //发送消息、标消息为已读的异步action

const Item = List.Item;

class Chat extends Component{

    state = { //受控组件，通过组件的状态收集表单数据
        content: '', //用户输入的聊天内容
        isShow: false, //是否显示表情列表，默认不显示
    };

    /* 2019-11-10 15:34:02
    * 我设置的potplayer全局自定义快捷键：ctrl 加 ~ 左上角波折号 ，功能为播放 暂停
    * 可以在全局范围内使用此快捷键迅速播放暂停
    *  */

    //在第一次render()之前执行此函数
    componentWillMount(){
        const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'];
        /* 构造 this.emojis，要求：
        * this.emojis是一个数组，数组元素是对象——其中每一个对象的属性名是 text，属性值是 emojis数组的元素(真正的表情图标)
        *  */
        this.emojis = emojis.map(  oneEmoji=>( {text:oneEmoji} )  );//注意，
    }

    /* 完善2个问题：
    * 1.当进入一个会话时，自动滚动至最底部；
    * 2.当成功发送一条消息时(即会执行 更新页面)，也自动滚动至最底部
    *
    * JS控制滚动条的位置：window.scrollTo(x,y);
    * scroll 滚动；
    * 竖向滚动条置顶 window.scrollTo(0,0);
    * 竖向滚动条置底 window.scrollTo(0,document.body.scrollHeight)
    *
    * 网页正文全文宽： document.body.scrollWidth
    * 网页正文全文高： document.body.scrollHeight
    * */
    componentDidMount(){ //初始化显示列表：当进入一个会话时，自动滚动至最底部；
        window.scrollTo( 0, document.body.scrollHeight );

        /* 发请求更新消息的未读状态
        * 根据后端接口文档(关于这里的内容是空的…)
        *
        * 将 对方发给我的消息 标为已读
        * 传入参数为 对方id(即from)
        *
        * 返回：标为已读的数量
        *  */

        /* 注意main组件中：我定义的路由参数 是userid_otherSide！！
        * <Route path='/chat/:userid_otherSide' component={Chat} />
        *  */
        const markReadFrom = this.props.match.params.userid_otherSide;

        const markReadTo = this.props.user._id; //已标为“已读”的消息 之 发出者
        // debugger
        this.props.readMsg( markReadFrom,markReadTo ); //已标为“已读”的消息 之 接收者


    }


    componentDidUpdate(){ //更新显示列表：当成功发送一条消息时(即会执行 更新页面)，也自动滚动至最底部
        window.scrollTo( 0, document.body.scrollHeight );
    }

    // componentWillUnmount(){ //在退出之前
    //
    // }



    /* changeShow，即toggleShow，切换isShow的true或false状态
    * toggle 拨动(开关)，有切换之意；
    * 我认为还是直接 change 更能突出“切换”之意
    *  */
    changeShow=  ()=>{
        /* 当点击 表情图标 时，立马将this.state.isShow的布尔值 取反！！
        * 得到取反后的isShow布尔值：isShow_opposite
        * opposite相反的
        *  */
        const isShow_opposite = !(this.state.isShow);
        this.setState( {isShow:isShow_opposite} ); //将取反后的isShow值提交更新至状态中
        if(isShow_opposite){ //异步手动派发resize事件,解决表情列表显示的bug
            setTimeout( ()=>{ //如何异步呀？使用延时执行定时器嗷，延时0s也是“延时、异步”！！
                window.dispatchEvent( new Event('resize') ); //固定的写法嗷！！
            }, 0 );
        }
    };

    handleSend=  ()=>{
        //收集数据
        const from = this.props.user._id; //消息发送方: 我。从reducers中产生的新状态user就是我
        /* 通过观察react插件可知，消息接收方的路由路径为 /chat/对方的userid
        * 对方的userid可在 匹配成功(match)至chat路由时 this.props.match.params.参数AAA 获取
        * userid_otherSide是在main组件中定义(映射)路由时，通过params传参定义的
        *  */
        const to = this.props.match.params.userid_otherSide; //消息接收方：匹配成功至chat路由的对方id
        const content = this.state.content.trim(); //输入的内容

        if( content ){ //当content有值时，才发请求
            this.props.sendMsg( {from,to,content} ) //发送异步请求
        }

        this.setState( {content:'', isShow:false} ) //清空输入框内容，同时将表情栏收回(即 将isShow值改为false)

    };

    render(){
        const {user} = this.props; //这是我自己
        /* 解构赋值时，名字一定要一一对应好了！！不然报undefined的错误
         * 我在后台传值给前台时，定义的变量名就是users_getNameHeaderByUserId，解构赋值时一定要注意！！
         *  */
        const {users_getNameHeaderByUserId, chatMsgs} = this.props.chat;

        //计算当前聊天的currChatId
        const myId = user._id; //我的id

        if( !users_getNameHeaderByUserId[myId] ){ //如果还妹有获取数据，直接不做任何显示
            return null; //程序遇到return就停了，在这里直接不做任何显示
        };

        const targetId = this.props.match.params.userid_otherSide; //对方id
        const currChatId = [myId,targetId].sort().join('_'); //构造当前聊天的chatId
        /* 从当前用户的聊天列表(包含所有聊天信息)中，根据当前聊天的chatId，匹配出我想要的那个聊天会话msgs
        * 注意，此msgs包含两个内容：我发给对方的、和 对方发给我的
        *
        *  */
        const msgs = chatMsgs.filter( oneMsg=>(oneMsg.chat_id===currChatId) );

        /* 得到聊天中对方的头像，在这里只需要加载一次即可，不应在map中多次加载
         * users_getNameHeaderByUserId[targetId] 聊天中的 对方
         * */
        const targetHeader = users_getNameHeaderByUserId[targetId].header; //targetHeader对方可能妹有头像呢？三目运算符
        const targetIcon = targetHeader ?  (require(`../../assets/images/${targetHeader}.png`)) : null;

        /* 完善2个问题：
        * 1.当进入一个会话时，自动滚动至最底部；
        * 2.当成功发送一条消息时，也自动滚动至最底部
        *  */

        return(
            <div id='chat-page'>
                {/* icon 出现在最左边的图标占位符
                onLeftClick	导航左边点击回调，点击实现回退
                */}
                <NavBar className='sticky-header' icon={<Icon type='left'/>} onLeftClick={()=>this.props.history.goBack()} >
                    {users_getNameHeaderByUserId[targetId].username}
                </NavBar>
                {/* {marginTop:50,marginRight:50}解决信息内容被上、下部遮盖的问题：为此项标签内容添加上下外边距即可 */}
                <List style={ {marginTop:50,marginBottom:50} } >
                    {/* 上文中，我已根据当前聊天的chatId匹配出我想要的那个聊天会话msgs
                     而此msgs包含两个内容：我发给对方的、和 对方发给我的 ；
                     此msgs的数据结构可能会忘记了，可以回看后端接口文档的描述，
                     msgs中有关键的信息：from、to、content等
                     根据匹配成功的结构msgs，动态产生内容：
                    */}
                    { msgs.map( oneMsg=>{
                        if( myId===oneMsg.to ){ //这是对方发给我的消息，消息的去向to是我
                            /* 返回左边对方的<Item/>
                            * 原代码thumb中，太长了，而且：
                            * 和我在同一个聊天中的对方，他的头像是不变的
                            * 没有必要在map循环中多次加载，我在外面一次加载好(targetIcon)，放进来即可
                            *  */
                            // return(<Item key={msg._id} thumb={require(`../../assets/images/${users[oneMsg.from].header}.png`)} >{msgs.content}</Item>)
                            return(<Item key={oneMsg._id} thumb={targetIcon} >{oneMsg.content}</Item>)
                        }
                        else{ //否则！！这是我发给对方的消息，
                            //返回 我自己的<Item/> 消息正文content也是我发的内容，是对立面
                            return(<Item key={oneMsg._id} className='chat-me' extra='我'>{oneMsg.content}</Item>)
                        }
                    }) }

                </List>

                <div className='am-tab-bar'>
                    <InputItem placeholder='请输入'
                               value={this.state.content}
                               extra={
                                   <span>
                                       {/* onClick= 写的是回调函数
                                       changeShow，切换show的true或false状态

                                       注意，当输入框获得焦点时，此表情栏自动隐藏
                                       */}
                                       <span onClick={this.changeShow} style={{marginRight:5}} >👴</span>
                                       <span onClick={this.handleSend}>发送</span>
                                   </span>
                               }
                               onChange={ val=>this.setState({content:val}) }
                               //受控组件，通过onChange将数据保存(setState)至组件状态中value=this.state.content
                              // 将content的更新结果(有值、或清除后)实时显示到输入框中
                              onFocus={ ()=>this.setState({isShow:false}) } //onFocus输入框获取焦点的事件，传一个响应的回调函数
                              //当此输入框获得焦点时，隐藏表情栏目(即 将表情栏中的isShow值改为false)
                    />

                    { this.state.isShow ? ( //表情的动态显示，三目运算符又来🌶
                        /* 构造 this.emojis，要求：
                        * this.emojis是一个数组，数组元素是对象——其中每一个对象的属性名是 text，属性值是 emojis数组的元素(真正的表情图标)
                        *  */
                        <Grid data={this.emojis} //传入整个网格的数据，类型为Array<{icon, text}>；在这里是表情图标的数据
                              columnNum={8} //传入num数值型(不是字符串)，所以加花括号；网格的列数columnNum
                              isCarousel={true} //Carousel轮播。是否开启轮播效果，默认为false不开启
                              carouseMaxRow={4} //传入num数值型(不是字符串)，所以加花括号；如果开启轮播效果，一页轮播中显示的最大行数
                            //onClick点击每个小网格的回调函数，传入形参为你点击的那个小网格
                              onClick={ oneEmoji_obj=>{ //this.emojis是一个数组，数组元素是对象——其中每一个对象的属性名是 text，属性值是 emojis数组的元素(真正的表情图标)
                                  this.setState( {content:this.state.content+oneEmoji_obj.text} )
                                  /* this.state.content为用户(可能)原本输入的内容，而 oneEmoji_obj.text是真正显示的表情图标
                                  * 用户输入的文字可能后面追加表情，所以整了一个拼串操作
                                  *  */
                              } }
                        />
                    )  :  null }

                </div>

            </div>
        )
    }
}

export default connect(
    state => ({user:state.user, chat:state.chat}),
    {sendMsg, readMsg}
)(Chat);
