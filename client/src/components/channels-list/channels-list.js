import React from 'react'
import './channels-list.scss'
import { serverEndPoint, socket, userId } from '../../services/socket-service/socket-service'
import {Tooltip, ButtonToolbar, OverlayTrigger} from 'react-bootstrap'
import Cookies from 'universal-cookie'

const axios = require('axios')


class ChannelList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            room: [],
            roomName: '',
            avatar: '',
            typeroom: 'channel',
            openList: '',
            userName: ''
        }
    }

    componentDidMount() {
        this.loginChat()

        let self = this

        axios.get(`${serverEndPoint}/api/room-list/chanels`)
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
        // console.log(cookie.get('logined'))
        this.setState({
            userName: cookie.get('logined')
        })
    }

    onClick1 = (event) => {
        if (this.state.openList === '') {
            this.setState({
                openList: 'open-list1'
            })
        } else {
            this.setState({
                openList: ''
            })
        }
    }

    onClick = (event, id, name) => {
        // console.log('Clicked', id, this.state.userName)
        socket.emit('join', {
            typeroom: this.state.typeroom,
            userId: userId,
            userName: this.state.userName,
            roomName: name,
            room: id
        })
        socket.emit('type-room', {
            room: id,
            avatar: this.state.avatar,
            userName: this.state.userName,
            typeroom: this.state.typeroom
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className='chanellist-bg'>
                    <div className='title-chanels' onClick={(e) => this.onClick1(e)}>
                    <ButtonToolbar className='title'>
                        {['top'].map(placement => (
                            <OverlayTrigger
                                key={placement}
                                placement={placement}
                                overlay={
                                    <Tooltip id={`tooltip-${placement}`}>
                                        <strong>Browse all channels</strong>
                                    </Tooltip>
                                }
                            >
                                <div>Chanels</div>
                            </OverlayTrigger>
                        ))}
                    </ButtonToolbar>
                        <div className='icon'>
                            <i className={"plus-icon fas fa-plus-circle " + this.state.openList} ></i>
                            <i className={"minus-icon fas fa-minus-circle " + this.state.openList}></i>
                        </div>
                    </div>
                    <div className={'list-bg ' + this.state.openList}>
                        <ul className='list'>
                            {
                                this.state.room.map((value, index) => {
                                    return (
                                        <li key={index} onClick={(e) => this.onClick(e, value.id, value.roomname)}>
                                            <div className='type-room-icon'>
                                                <i className="fas fa-hashtag"></i>
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

export default ChannelList