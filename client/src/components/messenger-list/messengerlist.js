import React from 'react'
import './messengerlist.scss'
import { serverEndPoint, socket, userName } from '../../services/socket-service/socket-service'

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
            // online: ''
        }
    }

    componentDidMount() {
        // this.loginJoin()
        this.openList()

        let self = this

        axios.get(`${serverEndPoint}/api/room-list/messengers`)
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

    // loginJoin() {
    //     socket.on('login-join', (value) => {
    //         console.log(value)
    //     })
    // }

    openList() {
        socket.on(`open-list2-${userName}`, (value) => {
            if (this.state.openList === '') {
                this.setState({
                    openList: 'open-list2'
                })
            } else {
                this.setState({
                    openList: ''
                })
            }
        })
    }

    onClick1 = (event) => {
        socket.emit('appear-list2', {
            openList: '',
            userName: userName
        })
    }

    onClick = (event, id, name) => {
        // console.log('Clicked', id)
        // console.log(name)
        socket.emit('join', {
            userName: userName,
            roomName: name,
            room: id
        })
        socket.emit('type-room', {
            room:id,
            avatar: this.state.avatar,
            userName: userName,
            typeroom: this.state.typeroom
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className='messengerlist-bg'>
                    <div className='title-chanels'>
                        <div className='title'>Direct message</div>
                        <div className='icon'>
                        <i className={'plus-icon fas fa-plus-circle ' + this.state.openList} onClick={(e) => this.onClick1(e)}></i>
                        <i className={'minus-icon fas fa-minus-circle ' + this.state.openList} onClick={(e) => this.onClick1(e)}></i>
                        </div>
                    </div>
                    <div className={'list-bg ' + this.state.openList}>
                        <ul className='list'>
                            {
                                this.state.room.map((value, index) => {
                                    return (
                                        <li key={index} onClick={(e) => this.onClick(e, value.id, value.name)}>
                                            <div className='type-room-icon'>
                                                <i className="far fa-circle"></i>
                                                {/* <i class="fas fa-circle"></i> */}
                                            </div>
                                            {value.name}
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

