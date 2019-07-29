import React from 'react'
import './message-list.scss'
import MessageItem from '../message-item/message-item';
import ScrollToBottom from 'react-scroll-to-bottom';

import {socket, userName} from '../../services/socket-service/socket-service'

class MessageList extends React.Component {
  constructor(props) {
    super(props)

    var today = new Date(),
      ddate = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate(),
      ttime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    this.state = {
      DaT: '',  //Date and Time
      receiveMessages: '',
      buttonTitle: 'Join',
      userName: userName,
      message: '',
      emoji: '',
      avatar: '', //Avatar by shorten userName
      changeInput: '',
      open: false,  //noti EmojiMenu was opened ?? 
      date: ddate,
      time: ttime,
      messages: [
      ],
      typing: false,
      users_typing: []
    }

  }

  componentDidMount() {
    this.onReceive()
    this.onTypingFromMember()
    this.onStopTyping()
    this.receiveHistories()
  }

  receiveHistories() {
    socket.on(`histories-${this.state.userName}`, (values) => {
      let items = []
      if (values.userName !== this.state.userName) {
        return
      }
      values.rows.map((value, index) => {
        let user = value.sent_by.trim()
        let item = {
          user: user,
          // user: value.sent_by,
          avatar: value.sent_by,
          message: value.message,
          createAt: value.created_at,
          fr: user === this.state.userName ? 'fr' : ''
        }
        items.push(item)
      })
      this.setState({
        messages: items
      })
       socket.off('histories')
      
    })
  }

  onReceive() {
    socket.on('receive-message', (value) => {
      let item = {
        DaT: value.DaT, //using MomentJS to get Date and Time
        ci: this.state.changeInput,
        ava: value.avatar,
        emoji: this.state.emoji,
        time: this.state.time, //get manually
        date: this.state.date,  //get manually by function
        user: value.userName,
        message: value.message,
        fr: value.userName === this.state.userName ? 'fr' : ''
      }
      let items = this.state.messages
      items.push(item)
      this.setState({
        messages: items
      })
    })
  }

  onStopTyping() {
    socket.on('member_stop_typing', (user) => {
      let listUsers = this.state.users_typing
      let index = listUsers.indexOf(user.userName)
      if (index != -1) {
        listUsers.splice(index, 1)
      }

      let status = true
      if (listUsers.length == 0) {
        status = false
      }
      this.setState({
        typing: status,
        users_typing: listUsers
      })
    })
  }

  onTypingFromMember() {
    socket.on('member_typing', (user) => {
      if (user.userName !== this.state.userName) {
        let listUsers = this.state.users_typing

        if (!listUsers.includes(user.userName)) {
          listUsers.push(user.userName)
        }

        this.setState({
          typing: true,
          users_typing: listUsers
        })
        // this.setMessage(`${user.userName} typing ....`)
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
        <ScrollToBottom className='message-list-container' id='style-1'>
          <div className='message-header'>
            <ul>
              <li>databse</li>
              <button className='h1'>
              <i class="c-icon c-icon--star-o c-icon--inherit c-icon--inline" type="star-o" aria-hidden="true">*</i>
              </button>
              <span className='h2'>|</span>
            </ul>
          </div>
          <div className='message-list'>
            {
              this.state.messages.map((value, index) => {
                return (
                  <MessageItem key={index} value={value}></MessageItem>
                )
              })
            }
          </div>
        </ScrollToBottom>
        <div className={'typing ' + (this.state.typing ? 'show' : '')}>
          <div>{this.state.users_typing.join(',') + ' Typing ....'}</div>
        </div>
      </React.Fragment>
    )
  }
}

export default MessageList