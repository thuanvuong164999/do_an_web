import React from 'react'
import './head-chatbox.scss'
import { socket, userName } from '../../services/socket-service/socket-service'

class HeadChatBox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            roomName: 'Introduce My Project',
            room:'',
            avatar:'',
            typeRoom: [],
            userName:userName,
            typeRoom1: 'channel',
            typeRoom2: 'messenger',
            type1:'',
            type2:'',
            appearSearch: ''
        }
    }

    componentDidMount() {
        this.inRoomName()
    }

    inRoomName() {
        socket.on('join-in-room', (value) => {
            // console.log(value)
            this.setState({
                roomName: value.roomName,
                room: value.room,
                appearSearch: 'appear-search'
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

    onClick = (event) => {

    }

    render() {
        return (
            <React.Fragment>
                <div className='headchatbox-bg'>
                    <div className='bg-status-room'>
                        {/* <div className={'type-room ' + this.state.type1 + this.state.type2}></div> */}
                        <div className='bg-icon-type'>
                            <span><i className={"fas fa-hashtag " + this.state.type2}></i></span>
                            <span><i className={"fas fa-circle " + this.state.type2}></i></span>
                        </div>
                        <div className='input-name'>{this.state.roomName}</div>
                    </div>
                    <div className='bg-list-icon'>
                        <div className='setting'>
                            <div className='icon-setting'>
                                <i className="fas fa-cog"></i>
                            </div>
                            <span className="tooltiptext">Settings</span>
                            {/* <span class="dropdown-setting">
                                <p>Hello World!</p>
                            </span> */}
                        </div>
                        <div className={'search-box ' + this.state.appearSearch}>
                            <input className='search-txt' type='text' name='' placeholder='Search...'></input>
                            <div className='search-btn' href='#'>
                                <i className="fas fa-search"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HeadChatBox