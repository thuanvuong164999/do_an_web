import React from 'react'
import './head-chatbox.scss'
import { socket, userName } from '../../services/socket-service/socket-service'

class HeadChatBox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            roomName: 'Web-D002',
            avatar:'',
            typeRoom: [],
            userName:userName,
            typeRoom1: 'channel',
            typeRoom2: 'messenger',
            type1:'',
            type2:''
        }
    }

    componentDidMount() {
        this.inRoomName()
    }

    inRoomName() {
        socket.on('join-in-room', (value) => {
            // console.log(value)
            this.setState({
                roomName: value.roomName
            })
        })
        socket.on('type-in-room', (value) => {
            // console.log(value)
            let item = {
                user: value.userName,
                ava: value.avatar,
                // fr: value.userName === this.state.userName ? 'fr' : '',
                type1: value.typeroom === this.state.typeRoom1 ? 'type1' : '',
                type2: value.typeroom === this.state.typeRoom2 ? 'type2' : ''
            }
            // console.log(item)
            this.setState({
                type1: item.type1,
                type2: item.type2
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className='headchatbox-bg'>
                    <div className='bg-status-room'>
                        {/* <div className={'type-room ' + this.state.type1 + this.state.type2}></div> */}
                        <span className={this.state.type1}><i class="fas fa-hashtag"></i></span>
                        <span className={this.state.type2}><i class="fas fa-circle"></i></span>
                        <div className='input-name'>{this.state.roomName}</div>
                    </div>
                    <div className='bg-list-icon'>
                        <div className='info-room'>
                            <div className='icon-info-room'>
                                <i class="fas fa-info-circle"></i>
                            </div>
                            <span class="tooltiptext">View Details</span>
                        </div>
                        <div className='setting'>
                            <div className='icon-setting'>
                                <i class="fas fa-cog"></i>
                            </div>
                            <span class="tooltiptext">Settings</span>
                            {/* <span class="dropdown-setting">
                                <p>Hello World!</p>
                            </span> */}
                        </div>
                        <div className='search-box'>
                            <input className='search-txt' type='text' name='' placeholder='Search...'></input>
                            <div className='search-btn' href='#'>
                                <i class="fas fa-search"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HeadChatBox