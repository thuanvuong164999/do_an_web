import React from 'react'
import './head-chatbox.scss'
import { socket } from '../../services/socket-service/socket-service'

class HeadChatBox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            roomName: 'Web-D002'
        }
    }

    componentDidMount() {
        this.inRoomName()
    }

    inRoomName() {

    }

    render() {
        return (
            <React.Fragment>
                <div className='headchatbox-bg'>
                    <div className='bg-status-room'>
                        <div className='name-room'>
                            <div className='input-name'>{this.state.roomName}</div>
                        </div>
                    </div>
                    <div className='bg-list-icon'>
                        <div className='icon-info-room'>
                            <i class="fas fa-info-circle"></i>
                        </div>
                        <div className='icon-setting'>
                            <i class="fas fa-cog"></i>
                            <div className='dropdown-setting'>
                                
                            </div>
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