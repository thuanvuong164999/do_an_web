import React from 'react'
import './channels-list.scss'
import { serverEndPoint, socket, userName } from '../../services/socket-service/socket-service'

const axios = require('axios')


class ChannelList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            room: [],
            roomName: '',
            avatar:'',
            typeroom: 'channel'
        }
    }

    componentDidMount() {
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
    
    onClick = (event, id, name) => {
        // console.log('Clicked', id)
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
                <ul className='chanellist-bg'>
                    <div className='addc'>
                        <i class="fas fa-comment-alt">Threads</i>
                    </div>
                    <li className='title-chanels'>
                        <i class="fas fa-plus-circle"></i>
                        <div className='title'>Chanels</div>
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

export default ChannelList