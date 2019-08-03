import React from 'react'
import './send-message.scss'
import { socket, userName } from '../../services/socket-service/socket-service'

class SendMessage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            DaT: '',
            receiveMessages: '',
            userName: userName, //tuyền từ socketservice
            message: '',
            avatar: '',
            messages: [
            ],
            room: 0,
            changeInput: '',
            text: ''
        }
    }

    componentDidMount() {
        this.onJoined()
        this.onLeaved()
    }

    onJoined() {
        socket.on('joined', (user) => {
            console.log('Joined: ', user)
            this.setMessage(`User ${user.userName} joined ${user.room}`)
            this.setState({
                room: user.room
            })
        })
    }

    onLeaved() {
        socket.on('leaved', (user) => {
            console.log('Leaved: ', user)
            this.setMessage(`User ${user.userName} leaved ${user.room}`)
        })
    }

    setMessage(message) {
        let messages = this.state.receiveMessages
        messages = message + '\n' + messages
        this.setState({
            receiveMessages: messages
        })
    }

    onKeyPress = event => {
        if (event.key === 'Enter') {
            // console.log(event.target.value)
            if (event.target.value === '')
                return;
            else {
                socket.emit('send-message', {
                    userName: this.state.userName,
                    message: event.target.value,
                    room: this.state.room
                })
            }
        }

        this.setState({
            message: ''
        })
    }

    onClick = event => {

    }

    join() {
        socket.emit('join', {
            userName: this.state.userName,
            avatar: this.state.avatar
        })
    }

    leave() {
        socket.emit('leave', {
            userName: this.state.userName
        })
    }

    onChange = event => {
        // console.log(event.target.value)
        this.setState({
            message: event.target.value,
        })

        this.setState({
            changeInput: '<span role="image" aria-label="slightly-smiling-face">&#x1f642</span>'
        })

        socket.emit('typing', {
            userName: this.state.userName,
            text: event.target.value
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className='send-message-bg'>
                    <div className='boder-bg'>
                        <div className='input-area'>
                            <input onKeyPress={this.onKeyPress} onChange={this.onChange}></input>
                            {/* tại sao value={this.state.message} bị lỗi */}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default SendMessage;