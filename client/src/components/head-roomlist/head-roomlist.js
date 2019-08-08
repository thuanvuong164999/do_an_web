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
                    <div className='ic-bell'>
                        <a href='/login'><i class="fas fa-sign-out-alt"></i></a>
                    </div>
                    <div className='title-room'>
                        WEB-D002 
                    </div>
                    <div className='input-username'>
                        <div className='status-user'></div>
                        <div className='username'>
                        <i class="fas fa-circle"></i>{userName}</div>
                    </div>
                </div>
                {/* <div className='icon-c'>
                    <i class="fas fa-bell"></i>
                </div> */}
            </React.Fragment>
        )
    }
}

export default HeadRoomList