import React from 'react'
import socketIOClient from 'socket.io-client'

const socket = socketIOClient('http://40c4330c.ngrok.io')

class SendMessage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            receiveMessages: '',
            buttonTitle: 'Join',
            userName: 'K son',
            message: '',
            messages: [
            ]
          }
    }
    componentDidMount() {
        this.onReceived()
        this.onJoined()
        this.onLeaved()
        this.onTypingFromMember()
      }
    
      onTypingFromMember() {
        socket.on('member_typing', (user) => {
          if(user.userName != this.state.userName) {
            this.setMessage(`${user.userName} typing ....`)
          }
        })
      }
    
      onReceived() {
        socket.on('receive-message', (value) => {
          let item = {
            user: value.userName,
            avatar: value.avatar,
            message: value.message,
            createAt: value.created_at,
            fr: value.userName == this.state.userName ? 'fr' : ''
          }
          this.props.callback(item)
          this.setMessage(`${value.userName}: ${value.message}`)
        })
      }
    
      onJoined() {
        socket.on('joined', (user) => {
          console.log('Joined: ', user)
          this.setMessage(`User ${user.userName} joined`)
        })
      }
    
      onLeaved() {
        socket.on('leaved', (user) => {
          console.log('Leaved: ', user)
          this.setMessage(`User ${user.userName} leaved`)
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
    
      onKeyPress = event => {
        if (event.key === 'Enter') {
          console.log(event.target.value)
          socket.emit('send-message', {
            userName: this.state.userName,
            message: event.target.value
          })  
          this.setState({
            message: ''
          })
        }
      }
    
      onClick = event => {
        let title = 'Join'
        if(this.state.buttonTitle === 'Join') {
          title = 'Leave'
          this.join()
        } else {
          this.leave()
        }
        this.setState({
          buttonTitle: title
        })
      }
    
      join() {
        socket.emit('join', {
          userName: this.state.userName   
        })
      }
    
      leave() {
        socket.emit('leave', {
          userName: this.state.userName
        })
      }
    
      onChange = event => {
        this.setState({
          message: event.target.value
        })
        socket.emit('typing', {
          userName: this.state.userName
        })
      }
      
    render() {
        return (
            <React.Fragment>
                <div className='send-message-field'>
                    <input value={this.state.message} onKeyPress={this.onKeyPress} onChange={this.onChange}></input>
                </div>
                <div className='send-message-action'>
                    <button onClick={e => this.onClick(e)}>{this.state.buttonTitle}</button>
                </div>
            </React.Fragment>
        )
    }
}

export default SendMessage