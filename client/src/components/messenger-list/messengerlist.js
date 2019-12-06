import React from 'react'
import './messengerlist.scss'
import { serverEndPoint, socket } from '../../services/socket-service/socket-service'
import { Tooltip, ButtonToolbar, OverlayTrigger } from 'react-bootstrap'
import Cookies from 'universal-cookie'
import { truncate } from 'fs'
import UserItem from '../user-item/user-item'


const axios = require('axios');

class MessList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            room: [],
            roomName: '',
            avatar: '',
            typeroom: 'messenger',
            openList: '',
            userName: '',
            userId: '',
            status: '',
            users_login: [],
            login: false,
            status: 'online'
        }
    }

    componentDidMount() {
        this.userLogining()
        this.userLogined()

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

    userLogined() {
        socket.on('up-logined', (values) => {
            let items = []
            values.rows.map((value, index) => {
                // console.log(value)
                let item = {
                    roomName: value.roomname,
                    id: value.id,
                    userName: value.username,
                    status: value.status,
                    online: (value.status == 'offline')?'far':'fas',
                }
                items.push(item)
                // console.log(items)
                // console.log(value.status == 'offline')
            })
            this.setState({
                users_login: items
            })
            // console.log(this.state.users_login)
        })
    }

    userLogining() {
        let cookie = new Cookies()
        // console.log(cookie.get('logined'), cookie.get('loginId'))
        this.setState({
            userId: cookie.get('loginId'),
            userName: cookie.get('logined')
        })

        socket.emit('join-chatpage', {
            // listUsers : listUsers,
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

    onClick = (event, id, name, status) => {
        // console.log('Clicked', id, name)
        // console.log(name)
        socket.emit('join-userroom', {
            status: status,
            typeroom: this.state.typeroom,
            userId: this.state.userId,
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
                                this.state.users_login.map((value, index) => {
                                    return (
                                        <li onClick={(e) => this.onClick(e, value.id, value.roomName, value.status)}>
                                            <UserItem key={index} value={value}></UserItem>
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

