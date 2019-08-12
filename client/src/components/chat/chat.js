import React from 'react'
import './chat.scss';
import MessageList from '../message-list/message-list'
import SendMessage from '../send-message/send-message';
import RoomList from '../room-list/room-list';
import HeadChatBox from '../head-chatbox/head-chatbox';
import HeadRoomList from '../head-roomlist/head-roomlist';
import DetailRoom from '../details-conversation/details-conversation'

class Chat extends React.Component {

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
                        {
                            <DetailRoom></DetailRoom>
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Chat;