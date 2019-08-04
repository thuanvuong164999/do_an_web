import React from 'react'
import './head-chatbox.scss'
import {userName, socket} from '../../services/socket-service/socket-service'

class HeadChatBox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            roomName:''
        }
    }

    componentDidMount() {
        // this.inRoomName()
    }

    // inRoomName(){
    //     socket.on('join', (value) =>{
    //         this.setState({
    //             roomName: value.inRoomName
    //         })
    //     })
    // }

    render(){
        return(
            <React.Fragment>
                <div className='headchatbox-bg'>
                    <div className='name-room'>
                        <div className='input-name'>{this.state.roomName}</div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HeadChatBox