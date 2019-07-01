import React from 'react'
import socket from '../../services/socket-service/socket-service'

class SendMessage extends React.Component {
    constructor(props){
        super(props)
        // let SocketService = new SocketService()
        // SocketService.join('ks')

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
        this.onJoined()
        this.onLeaved()
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
          userName: this.state.userName,
          text: event.target.value
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