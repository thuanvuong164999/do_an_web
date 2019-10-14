import React from 'react'
import './messengerlist.scss'
import { serverEndPoint, socket} from '../../services/socket-service/socket-service'
import {Tooltip, ButtonToolbar, OverlayTrigger} from 'react-bootstrap'
import Cookies from 'universal-cookie'


const axios = require('axios');

class MessList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            room: [],
            roomName:'',
            avatar:'',
            typeroom: 'messenger',
            openList: '',
            userName: '',
            userId: ''
        }
    }

    componentDidMount() {
        this.loginChat()

        let self = this

        axios.get(`${serverEndPoint}/api/room-list/user-rooms`)
            .then(function (response) {
                self.setState({
                    room: response.data.data
                })
            })
            .catch(function (error) {
                // console.log(error);
            })
            .finally(function () {

            });
    }

    loginChat() {
        let cookie = new Cookies()
        // console.log(cookie.get('logined'), cookie.get('loginId'))
        this.setState({
            userId: cookie.get('loginId'),
            userName: cookie.get('logined')
        })
    }

    onClick1 = (event) => {
        if (this.state.openList === '') {
            this.setState({
                openList: 'open-list2'
            })
        } else {
            this.setState({
                openList: ''
            })
        }
    }

    onClick = (event, id, name) => {
        // console.log('Clicked', id, this.state.userName)
        // console.log(name)
        socket.emit('join-userroom', {
            typeroom: this.state.typeroom,
            userId: this.state.userId,
            userName: this.state.userName,
            roomName: name,
            room: id
        })
        socket.emit('type-room', {
            room:id,
            avatar: this.state.avatar,
            userName: this.state.userName,
            typeroom: this.state.typeroom
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className='messengerlist-bg'>
                    <div className='title-chanels' onClick={(e) => this.onClick1(e)}>
                    <ButtonToolbar className='title'>
                        {['top'].map(placement => (
                            <OverlayTrigger
                                key={placement}
                                placement={placement}
                                overlay={
                                    <Tooltip id={`tooltip-${placement}`}>
                                        <strong>Open a dirct message</strong>
                                    </Tooltip>
                                }
                            >
                                <div>Direct message</div>
                            </OverlayTrigger>
                        ))}
                    </ButtonToolbar>
                        
                        <div className='icon'>
                        <i className={'plus-icon fas fa-plus-circle ' + this.state.openList} ></i>
                        <i className={'minus-icon fas fa-minus-circle ' + this.state.openList}></i>
                        </div>
                    </div>
                    <div className={'list-bg ' + this.state.openList}>
                        <ul className='list'>
                            {
                                this.state.room.map((value, index) => {
                                    return (
                                        <li key={index} onClick={(e) => this.onClick(e, value.id, value.roomname)}>
                                            <div className='type-room-icon'>
                                                <i id={`user_id-${value.id}`} className="far fa-circle"></i>
                                                {/* <i class="fas fa-circle"></i> */}
                                            </div>
                                            {value.roomname}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default MessList

