import React from 'react'
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import { Picker, emojiIndex } from 'emoji-mart';
import './send-message.scss'
import { socket, userName } from '../../services/socket-service/socket-service'
import EmojiMenu from '../emoji-menu/emoji'

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
            emoji:''
        }
    }

    componentDidMount() {
        this.onJoined()
        this.onLeaved()
    }

    onJoined() { //kiểm tra lại, suy nghĩ áp dụng thông báo người tham gia room
        socket.on('joined', (user) => {
            // console.log('Joined: ', user)
            this.setMessage(`User ${user.userName} joined ${user.room}`)
            this.setState({
                room: user.room
            })
        })
    }

    onLeaved() { //kiểm tra lại, suy nghĩ thông báo người thoát room
        socket.on('leaved', (user) => {
            // console.log('Leaved: ', user)
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

    leave() {
        socket.emit('leave', {
            userName: this.state.userName
        })
    }

    onChange = event => {
        // console.log(event.target.value)
        this.setState({
            message: event.target.value
        })

        socket.emit('typing', {
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