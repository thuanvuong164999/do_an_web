import React from 'react'
import './chat.scss';
import MessageList from '../message-list/message-list'
import SendMessage from '../send-message/send-message';

class Chat extends React.Component {
    constructor() {
        super()
      }

    render() {
        return (
            <React.Fragment>
                <div className="Chat">
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