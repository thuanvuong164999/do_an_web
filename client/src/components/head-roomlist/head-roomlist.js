import React from 'react'
import './head-roomlist.scss'
import { userName } from '../../services/socket-service/socket-service';

class HeadRoomList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render(){
        return(
            <React.Fragment>
                <div className='headroomlist-bg'>
                    <div className='title-room'>
                        WEB-D002
                    </div>
                    <div className='input-username'>
                        <div className='status-user'></div>
                        <div className='username'>{userName}</div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HeadRoomList