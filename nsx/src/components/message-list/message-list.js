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
    this.onReceived()
    this.onTypingFromMember()
    this.onStopTyping()
    this.receiveHistories()
  }  //tao method

  onReceived() {
    socket.on('receive-message', (value) => {
      let item = {
        user: value.userName,
        ava: value.avatar,
        message: value.message,
        // createAt: value.created_at,
        DaT: value.DaT, //using MomentJS to get Date and Time
        // ci: this.state.changeInput,
        // emoji: this.state.emoji,
        time: this.state.time, //get manually
        date: this.state.date,  //get manually by function
        fr: value.userName === this.state.userName ? 'fr' : ''
      }
      let items = this.state.messages
      items.push(item)
      this.setState({
        messages: items
      })
      //this.props.callback(item)
      //this.setMessage(`${value.userName}: ${value.message}`)
    })
  }

  receiveHistories() {
    console.log(`histories-${this.state.userName}`)
    socket.on(`histories-${this.state.userName}`, (values) => { // server gửi về socket tín hiệu histories

      console.log(values)
      let items = [] //ban đầu là trống

      values.rows.map((value, index) => {
        let user = value.username.trim()
        // sent_by lay tu database
        let item = {
          user: user,
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

      if(values.userName !== this.state.userName) { //nếu không phải mình thì sẽ không lập lại
        return
      }
      // socket.off('histories') // chuc nang dung khi chay 1 lan, sử dụng không được khi nhiều room
    })
  }

  onStopTyping() {
    socket.on('member_stop_typing', (user) => {
      let listUsers = this.state.users_typing
      let index = listUsers.indexOf(user.userName)
      if (index !== -1) {
        listUsers.splice(index, 1)
      }

      let status = true
      if (listUsers.length === 0) {
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
        <ScrollToBottom className='message-list-container'>
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
          <div>{this.state.users_typing.join(',') + ' typing ...'}</div>
        </div>
      </React.Fragment>
    )
  }
}

export default MessageList