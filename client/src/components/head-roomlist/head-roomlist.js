import React from 'react'
import './head-roomlist.scss'
import {Tooltip, ButtonToolbar, OverlayTrigger} from 'react-bootstrap'
import { socket } from '../../services/socket-service/socket-service';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'

class HeadRoomList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            id: ''
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

    onLogOutUser(){
        let cookie = new Cookies()
        socket.emit('logout-chat', {
            userName: cookie.get('logined'),
            userId: cookie.get('loginId')
        })
    }

    onClick1() {
        this.onLogOutUser()
        let cookie = new Cookies()
        socket.on(`logout-${cookie.get('logined')}`, value => {
            this.setState({
                id: '/login'
            })
        })
    }

    renderRedirect() {
        if (this.state.id === '/login') {
            return <Redirect to='/login'></Redirect>
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.renderRedirect()}
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
                                    <a href='#' onClick={()=>this.onClick1()}><i className="fas fa-sign-out-alt"></i></a>
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