import React from 'react'
import './head-chatbox.scss'
import {userName} from '../../services/socket-service/socket-service'

class HeadChatBox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render(){
        return(
            <React.Fragment>
                <div className='headchatbox-bg'>
                    <div className='name-room'>
                        <div className='input-name'>{userName}</div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HeadChatBox