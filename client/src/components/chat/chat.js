import React from 'react'
import './chat.scss';
import {socket} from '../../services/socket-service/socket-service'
import MessageList from '../message-list/message-list'
import SendMessage from '../send-message/send-message';
import RoomList from '../room-list/room-list';
import HeadChatBox from '../head-chatbox/head-chatbox';
import HeadRoomList from '../head-roomlist/head-roomlist';
import Cookies from 'universal-cookie';
// import Cookies from 'universal-cookie';

class Chat extends React.Component {

    constructor(props){
        super(props)

        this.state={
            userName: '',
            userId: '',
        }
    }    

    componentDidMount(){
        this.loginedChat()
    }

    loginedChat(){

        let cookie = new Cookies()
        // console.log(cookie.get('logined'), cookie.get('loginId'))
        this.setState({
            userName: cookie.get('logined'),
            userId: cookie.get('loginId')
        })

        socket.emit('login-online', {
            userName: cookie.get('logined'),
            userId: cookie.get('loginId')
        })
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
                            <HeadChatBox></HeadChatBox>
                        }
                        {
                            <MessageList></MessageList>
                        }
                        {
                            <SendMessage></SendMessage>
                        }
                        
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Chat;