import React from 'react'
import './send-message.scss'
import { socket, userName, userId } from '../../services/socket-service/socket-service'

class SendMessage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dat: '',
            daday:'',
            receiveMessages: '',
            userName: userName,
            message: '',
            avatar: '',
            messages: [],
            room: 0,
            changeInput: '',
            text: '',
            open: false,
            emoji:'',
            userId: userId,
            typeroom: ''
        }
    }

    componentDidMount() {
        this.onJoined()
        // this.onLeaved()
    }

    onJoined() {
        socket.on('joined', (user) => {
            // console.log('Joined: ', user)
            this.setMessage(`User ${user.userName} joined ${user.room}`)
            this.setState({
                typeroom: user.typeroom,
                room: user.room
            })
        })
    }

    // onLeaved() {
    //     socket.on('leaved', (user) => {
    //         // console.log('Leaved: ', user)
    //         this.setMessage(`User ${user.userName} leaved ${user.room}`)
    //     })
    // }

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
                    typeroom: this.state.typeroom,
                    userId: this.state.userId,
                    userName: this.state.userName,
                    message: event.target.value,
                    room: this.state.room
                })
                socket.emit('typing', {
                    userName: this.state.userName,
                    text: '',
                    room: this.state.room
                })
            }
            this.setState({
                message: ''
            })
        }
    }

    // join() {
    //     socket.emit('join', {
    //         userName: this.state.userName,
    //         avatar: this.state.avatar
    //     })
    // }

    // leave() {
    //     socket.emit('leave', {
    //         userName: this.state.userName
    //     })
    // }

    onChange = event => {
        // console.log(event.target.value)
        this.setState({
            message: event.target.value
        })

        socket.emit('typing', {
            typeroom: this.state.typeroom,
            userId: this.state.userId,
            userName: this.state.userName,
            text: event.target.value,
            room: this.state.room
        })
    }
    
    render() {
        return (
            <React.Fragment>
                <div className='send-message-bg'>
                    <div className='boder-bg'>
                        <div className='input-area'>
                            <div className='plus-foder-icon'>
                                <i className="fas fa-folder-plus"></i>
                            </div>
                            <span><input className='input-txt' placeholder={`Message ${userName}`} onKeyPress={this.onKeyPress} onChange={this.onChange} value={this.state.message}></input></span>
                            <div className='emoji-icon'>
                                <i className="far fa-smile"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default SendMessage;