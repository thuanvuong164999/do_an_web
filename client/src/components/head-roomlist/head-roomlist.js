import React from 'react'
import './head-roomlist.scss'
import {Tooltip, ButtonToolbar, OverlayTrigger} from 'react-bootstrap'
import { socket } from '../../services/socket-service/socket-service';
import Cookies from 'universal-cookie';

class HeadRoomList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userName: ''
        }
    }

    componentDidMount(){
        this.loginChat()
    }

    loginChat() {
        let cookie = new Cookies()
        this.setState({
            userName: cookie.get('logined')
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className='headroomlist-bg'>
                    <ButtonToolbar className='ic-bell'>
                        {['bottom'].map(placement => (
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
                        <i className="fas fa-circle"></i>{this.state.userName}
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