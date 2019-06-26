import React from 'react'
import './message-list.scss'
import MessageItem from '../message-item/message-item';
import ScrollToBottom from 'react-scroll-to-bottom';

import socket from '../../services/socket-service/socket-service'

class MessageList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            receiveMessages: '',
            buttonTitle: 'Join',
            userName: 'K son',
            message: '',
            messages: [
            ],
            typing: false,
            users: []
          }
    }
    
    componentDidMount() {
        this.onReceived()
        this.onTypingFromMember()
      }  //tao method
      

      onReceived() {
        socket.on('receive-message', (value) => {
          let item = {
            user: value.userName,
            avatar: value.avatar,
            message: value.message,
            createAt: value.created_at,
            fr: value.userName == this.state.userName ? 'fr' : ''
          }
        //   this.props.callback(item)
        // //   this.setMessage(`${value.userName}: ${value.message}`)
        })
      }

      onTypingFromMember() {
        socket.on('member_typing', (user) => {
          if(user.userName != this.state.userName) {
              let listusers = this.state.users
              if(!listusers.includes(user.userName))
            this.setState({
                typing: true,
                users: listusers
            })
            this.setMessage(`${user.userName} typing ....`)
          }
        })
      }

      setMessage(message) {
        let messages = this.state.receiveMessages
        // messages = messages + '\n' + message
        messages = message + '\n' + messages
        this.setState({
          receiveMessages: messages
        })
      }


    render() {
        return (
            <React.Fragment>
                <ScrollToBottom className='message-list-container'>
                    <div className='message-list'>
                        {
                            this.state.messages.map((value, index) => {
                                return(
                                    <MessageItem key={index} value={value}></MessageItem>
                                )
                            })
                        }
                    </div>
                </ScrollToBottom>
                <div className={'typing' + this.state.typing ? 'show' : ''}>
                    <div>{this.state.users + 'Typing ...'}</div>
                </div>
            </React.Fragment>
        )
    }
}

export default MessageList