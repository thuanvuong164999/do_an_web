import React from 'react'
import './head-roomlist.scss'
import { userName } from '../../services/socket-service/socket-service';
import {Tooltip, ButtonToolbar, OverlayTrigger} from 'react-bootstrap'

class HeadRoomList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className='headroomlist-bg'>
                    <ButtonToolbar className='ic-bell'>
                        {['top'].map(placement => (
                            <OverlayTrigger
                                key={placement}
                                placement={placement}
                                overlay={
                                    <Tooltip id={`tooltip-${placement}`}>
                                        <strong>Log Out</strong>
                                    </Tooltip>
                                }
                            >
                                <div>
                                    <a href='/login'><i className="fas fa-sign-out-alt"></i></a>
                                </div>
                            </OverlayTrigger>
                        ))}
                    </ButtonToolbar>
                    {/* <div className='ic-bell'>
                        <a href='/login' data-toggle="tooltip" data-placement="bottom" title="Log Out"><i className="fas fa-sign-out-alt"></i></a>
                    </div> */}
                    <div className='title-room'>
                        WEB-D002
                    </div>
                    <div className='input-username'>
                        <div className='status-user'></div>
                        <div className='username'>
                            <i className="fas fa-circle"></i>{userName}</div>
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