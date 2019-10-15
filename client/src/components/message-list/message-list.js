import React from 'react'
import './message-list.scss'
import MessageItem from '../message-item/message-item';
import ScrollToBottom from 'react-scroll-to-bottom';
import { socket } from '../../services/socket-service/socket-service';
import Cookies from 'universal-cookie';

class MessageList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dat: '',
            daday: '',
            receiveMessages: '',
            userName: '',
            message: '',
            avatar: '',
            messages: [],
            typing: false,
            users_typing: [],
            roomId: '',
            userId: '',
            tong: '',
            tich: '',
            typeroom: '',
            hide: ''
        }
    }

    componentDidMount() {
        // this.loginChat()
        this.onJoined()
        this.receiveHistories()
        this.onReceived()
        this.onStopTyping()
        this.onTypingFromMember()
    }

    // loginChat() {
    //     let cookie = new Cookies()
    //     this.setState({
    //         userName: cookie.get('logined')
    //     })
    // }

    onJoined() {
        let cookie = new Cookies()
        socket.on(`joined-${cookie.get('logined')}`, (user) => {
            // console.log('Joined: ', user)
            this.setState({
                userName: user.userName,
                userId: user.userId,
                typeroom: user.typeroom,
                roomId: user.room,
                tong: Number(user.userId) + Number(user.room),
                tich: Number(user.userId) * Number(user.room)
            })
            // console.log(this.state.tong, this.state.tich)
            // console.log(`receive-message-${this.state.tong}-${this.state.tich}`)
            this.onReceivedUser(this.state.tong, this.state.tich)
        })
    }

    receiveHistories() {
        let cookie = new Cookies()

        socket.on(`histories-${cookie.get('logined')}`, (values) => {
            // console.log(values)
            let items = []
            values.rows.map((value, index) => {
                console.log(value)
                // console.log(value.user_id, cookie.get('loginId'))
                console.log(value.user_id == cookie.get('loginId'))
                // let user = value.username.trim()
                let user = value.username
                let item = {
                    user: user,
                    avatar: value.username,
                    message: value.message,
                    dat: value.datime,
                    daday: value.daday,
                    fr: (value.userId == cookie.get('loginId'))?'fr':'', // 2 dau =, so sanh gia tri khac loai
                }
                items.push(item)
                console.log(items)
            })
            this.setState({
                messages: items
            })

            if (values.userName !== cookie.get('logined')) {
                return
            }
        })
    }

    onReceivedUser(tong, tich){
        // console.log(this.state.tong, this.state.tich)
        socket.on(`receive-message-${tong}-${tich}`, (value) => {
            // console.log(value)
            // console.log(this.state.userId)
            // console.log((this.state.userId !== value.userId) && (this.state.userId !== value.room))
            let item = {
                user: value.userName,
                ava: value.avatar,
                message: value.message,
                dat: value.dat,
                daday: value.daday,
                fr: value.userName === this.state.userName ? 'fr' : '',
                hide: ((this.state.userId !== value.userId) && (this.state.userId !== value.room)) ? 'hide' : ''
            }
            let items = this.state.messages
            items.push(item)
            this.setState({
                typeroom: value.typeroom,
                messages: items
            })
        })
    }

    onReceived() {
        let cookie = new Cookies()
        // console.log(`receive-message-${cookie.get('logined')}`)
        socket.on(`receive-message-${cookie.get('logined')}`, (value) => {
            let item = {
                user: value.userName,
                ava: value.avatar,
                message: value.message,
                dat: value.dat,
                daday: value.daday,
                fr: 'fr'
            }
            let items = this.state.messages
            items.push(item)
            this.setState({
                typeroom: value.typeroom,
                messages: items
            })
        })

        socket.on('receive-message', (value) => {
            // console.log(value)
            // console.log(this.state.userId)
            // console.log((this.state.userId !== value.userId) && (this.state.userId !== value.room))
            let item = {
                user: value.userName,
                ava: value.avatar,
                message: value.message,
                dat: value.dat,
                daday: value.daday,
                fr: value.userName === this.state.userName ? 'fr' : '',
                hide: ((this.state.userId !== value.userId) && (this.state.userId !== value.room)) ? 'hide' : ''
            }
            let items = this.state.messages
            items.push(item)
            this.setState({
                typeroom: value.typeroom,
                messages: items
            })
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