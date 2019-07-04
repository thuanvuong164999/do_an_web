import React from 'react'
import './chat.scss';
import MessageList from '../message-list/message-list'
import SendMessage from '../send-message/send-message';
import RoomList from '../room-list/room-list';

class Chat extends React.Component {

    render() {
        return (
            <React.Fragment>
                <div className="Chat">
                    <RoomList></RoomList>
                    <div className='Chat-Container'>
                        <div className='chat-box'>
                            <div className='receive-messages'>
                            {
                                <MessageList></MessageList>
                            }
                            {/* <textarea value={this.state.receiveMessages}></textarea> */}
                            </div>
                            <div className='send-message'>
                            {
                                <SendMessage></SendMessage>
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