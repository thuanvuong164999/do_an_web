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
            typeroom: 'messenger'
        }
    }

    componentDidMount() {
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

    onClick = (event, id, name) => {
        // console.log('Clicked', id)
        // console.log(name)
        socket.emit('join', {
            userName: userName,
            room: id
        })
        socket.emit('join-room', {
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
                <ul className='messengerlist-bg'>
                    <div className='addb'>
                        + Add the chanels
                    </div>
                    <li className='title-chanels'>
                        <i class="fas fa-plus-circle"></i>
                        <div className='title'>Direct message</div>
                    </li>
                    <li className='list'><ul>
                        {
                            this.state.room.map((value, index) => {
                                return (
                                    <li key={index} onClick={(e) => this.onClick(e, value.id, value.name)}>{value.name}</li>
                                )
                            })
                        }
                    </ul></li>
                </ul>
            </React.Fragment>
        )
    }
}

export default MessList

