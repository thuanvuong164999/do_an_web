import React from 'react'
import './message-list.scss'
import MessageItem from '../message-item/message-item';
import ScrollToBottom from 'react-scroll-to-bottom';
import { socket, userName } from '../../services/socket-service/socket-service'

class MessageList extends React.Component {
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
            typing: false,
            users_typing: [],
            roomId: '',
            userId: '',
            typeroom: '',
            hide: ''
        }
    }

    componentDidMount() {
        this.onReceived()
        this.receiveHistories()
        this.onStopTyping()
        this.onTypingFromMember()
        this.onJoined()
    }

    onJoined() {
        socket.on('joined', (user) => {
            // console.log('Joined: ', user)
            this.setState({
                userId: user.userId,
                typeroom: user.typeroom,
                room: user.room
            })
        })
    }

    onReceived() {
        socket.on('receive-message', (value) => {
            // console.log(value)
            // console.log(this.state.userId)
            // console.log(`(${this.state.userId} !== ${value.userId}) || (${this.state.userId} !== ${value.room})`)
            let item = {
                user: value.userName,
                ava: value.avatar,
                message: value.message,
                dat: value.dat,
                daday:value.daday,
                fr: value.userName === this.state.userName ? 'fr' : '',
                hide: ((this.state.userId !== value.userId) || (this.state.userId !== value.roomId)) ? 'hide' : ''
            }
            let items = this.state.messages
            items.push(item)
            this.setState({
                typeroom: value.typeroom,
                messages: items
            })
        })
    }

    receiveHistories() {
        // console.log(`histories-${this.state.userName}`)

        socket.on(`histories-${this.state.userName}`, (values) => {
            // console.log(values)
            let items = []
            values.rows.map((value, index) => {
                // console.log(value)
                let user = value.username.trim()
                let item = {
                    user: user,
                    avatar: value.username,
                    message: value.message,
                    dat: value.datime,
                    daday:value.daday,
                    fr: user === this.state.userName ? 'fr' : '',
                }
                items.push(item)
            })
            this.setState({
                messages: items
            })

            if (values.userName !== this.state.userName) {
                return
            }
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
                this.setMessage(`${user.userName} typing ....`)
            }
        })
    }

    setMessage(message) {
        let messages = this.state.receiveMessages
        messages = message + '\n' + messages
        this.setState({
            receiveMessages: messages
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className='receive-message-bg'>
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
                </div>

            </React.Fragment>
        )
    }
}

export default MessageList