import React from 'react'
import './send-message.scss'
import { socket } from '../../services/socket-service/socket-service'
import Cookies from 'universal-cookie'

class SendMessage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dat: '',
            daday:'',
            receiveMessages: '',
            userName: '',
            message: '',
            avatar: '',
            messages: [],
            room: 0,
            changeInput: '',
            text: '',
            open: false,
            emoji:'',
            userId: '',
            typeroom: ''
        }
    }

    componentDidMount() {
        // this.loginChat()
        this.onJoined()
        // this.onLeaved()
    }

    // loginChat(){
    //     let cookie = new Cookies()
    //     this.setState({
    //         userName: cookie.get('logined')
    //     })
    // }

    onJoined() {
        socket.on('joined', (user) => {
            // console.log('Joined: ', user)
            this.setMessage(`User ${user.userName} joined ${user.room}`)
            this.setState({
                userId: user.userId,
                userName: user.userName,
                typeroom: user.typeroom,
                room: user.room
            })
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
                    typeroom: this.state.typeroom,
                    userId: this.state.userId,
                    userName: this.state.userName,
                    message: event.target.value,
                    room: this.state.room
                })
                socket.emit('typing', {
                    typeroom: this.state.typeroom,
                    userId: this.state.userId,
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
                            <span><input className='input-txt' placeholder={`Message ${this.state.userName}`} onKeyPress={this.onKeyPress} onChange={this.onChange} value={this.state.message}></input></span>
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