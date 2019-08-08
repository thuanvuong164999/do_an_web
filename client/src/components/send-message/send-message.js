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
            changeInput:'',
            emoji:''
        }
    }

    componentDidMount() {
        this.onJoined()
        this.onLeaved()
        // this.openEmojiMenu()
        // this.closeEmojiMenu()
        // this.setZindexMenuON()
        // this.setZindexMenuOFF()
    }

    onJoined() {
        socket.on('joined', (user) => {
            // console.log('Joined: ', user)
            this.setMessage(`User ${user.userName} joined ${user.room}`)
            this.setState({
                room: user.room
            })
        })
    }

    onLeaved() {
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
            changeInput: '<span role="image" aria-label="slightly-smiling-face">&#x1f642</span>'
        })

        socket.emit('typing', {
            userName: this.state.userName,
            text: event.target.value,
            room: this.state.room
        })
    }

    // onOffEmoij = event => {
    //     if (this.state.open) {
    //       this.setState({
    //         open: false
    //       })
    //       this.closeEmojiMenu(event)
    //       this.setZindexMenuOFF(event)
    //     } else {
    //       this.setState({
    //         open: true
    //       })
    //       this.openEmojiMenu(event)
    //       this.setZindexMenuON(event)
    //     }
    //     event.preventDefault() //Tranh bi lap lai 
    // }
    
    // setZindexMenuON = event => {
    //     document.getElementById("overlay-menu").style.zIndex = "1022"
    //     document.getElementById("emoji-menu-btn").style.zIndex = "1025"
    // }
    // setZindexMenuOFF = event => {
    //     document.getElementById("overlay-menu").style.zIndex = "-1"
    //     document.getElementById("emoji-menu-btn").style.zIndex = "0"
    // }
    // openEmojiMenu = event => {
    //     document.getElementById("emoji-mart").style.display = "block"
    // }
    
    // closeEmojiMenu = event => {
    //     document.getElementById("emoji-mart").style.display = "none"
    // }
    
    render() {
        return (
            <React.Fragment>
                <div className='send-message-bg'>
                    <div className='boder-bg'>
                        <div className='input-area'>
                            <div className='plus-foder-icon'>
                                <i class="fas fa-folder-plus"></i>
                            </div>
                            <input className='input-txt' placeholder={`Message ${userName}`} onKeyPress={this.onKeyPress} onChange={this.onChange} value={this.state.message}></input>
                            {/* <ReactTextareaAutocomplete
                                className='input'
                                row="1"
                                data-emojiable="true"
                                value={this.state.message}
                                onKeyPress={this.onKeyPress}
                                onChange={this.onChange}
                                loadingComponent={() => <span>Loading</span>}
                                placeholder='Type your message here ...'
                                trigger={{
                                    ':': {
                                    dataProvider: token =>
                                        emojiIndex.search(token).map(o => ({
                                        colons: o.colons,
                                        native: o.native,
                                        })),
                                    component: ({ entity: { native, colons } }) => (
                                        <div>{`${colons} ${native}`}</div>
                                    ),
                                    output: item => `${item.native}`,
                                    },
                                }}
                            />                    
                            <div className='emoji-btn-menu' id='emoji-menu-btn'>
                                <button type='button' className='emoji-menu' onClick={e => this.onOffEmoij(e)} id='emoji-menu-btn'>
                                    <i className="far fa-smile fa-2x" id='emoji-menu-btn'></i>
                                </button>
                            </div> */}
                            <div className='emoji-icon'>
                                <i class="far fa-smile"></i>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.open ? (<Picker set="emojione" onSelect={this.addEmoji} />) : null}
            </React.Fragment>
        )
    }

}

export default SendMessage;