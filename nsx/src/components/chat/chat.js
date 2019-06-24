import React from 'react'
import './chat.scss';
import socketIOClient from 'socket.io-client'
import MessageList from '../message-list/message-list'
import SendMessage from '../send-message/send-message';

const socket = socketIOClient('http://40c4330c.ngrok.io')

class Chat extends React.Component {
    constructor() {
        super()
        this.state = {
          messages: [
          ]
        }
      }

      onCallBack = msg => {
          console.log(msg)
          let items = this.state.messages
          items.push(msg)
          this.setState({
              messages: items
          })
      }
    
    render() {
        return (
            <React.Fragment>
                <div className="Chat">
                    <div className='Chat-Container'>
                        <div className='chat-box'>
                            <div className='receive-messages'>
                            {
                                <MessageList messages={this.state.messages}></MessageList>
                            }
                            {/* <textarea value={this.state.receiveMessages}></textarea> */}
                            </div>
                            <div className='send-message'>
                                {
                                    <SendMessage callback={this.onCallBack}></SendMessage>
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