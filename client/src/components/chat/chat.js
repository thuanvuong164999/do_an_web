import React from 'react'
import './chat.scss';
import {socket} from '../../services/socket-service/socket-service'
import MessageList from '../message-list/message-list'
import SendMessage from '../send-message/send-message';
import RoomList from '../room-list/room-list';
import HeadChatBox from '../head-chatbox/head-chatbox';
import HeadRoomList from '../head-roomlist/head-roomlist';
import Cookies from 'universal-cookie';
import SideBar from '../sidebar/sidebar';
class Chat extends React.Component {

    constructor(props){
        super(props)

        this.state={
            userName: '',
            userId: '',
            onSideBar: 'offSideBar'
        }
    }    

    componentDidMount(){
        this.loginedChat()
    }

    loginedChat(){

        let cookie = new Cookies()
        this.setState({
            userName: cookie.get('logined'),
            userId: cookie.get('loginId')
        })

        socket.emit('login-online', {
            userName: cookie.get('logined'),
            userId: cookie.get('loginId')
        })
    }

    updateItemWidth(){
        if(this.state.onSideBar=='offSideBar'){
            this.setState({
                onSideBar:'onSideBar'
            })
        }else{
            this.setState({
                onSideBar:'offSideBar'
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="chat">
                    <div className='roomlist-bg'>
                        {
                            <HeadRoomList></HeadRoomList>
                        }
                        {
                            <RoomList></RoomList>
                        }
                    </div>
                    <div className='chat-box'>
                        {
                            <HeadChatBox updateItemWidth={()=>this.updateItemWidth()}></HeadChatBox>
                        }
                        <div className='bottom-div'>
                            <div className={'left-div '+this.state.onSideBar}>
                                {
                                    <MessageList></MessageList>
                                }
                                {
                                    <SendMessage onSideBar={this.state.onSideBar}></SendMessage>
                                }
                            </div>
                            <div className={'right-div '+this.state.onSideBar}>
                                {
                                    <SideBar></SideBar>
                                }
                            </div>
                        </div>
                        
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Chat;